#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short,
    Address, Env, Map, String, Symbol, Vec, vec
};

#[derive(Clone)]
#[contracttype]
pub struct ParkingEntry {
    pub license_plate: String,
    pub entry_time: u64,
    pub exit_time: Option<u64>,
    pub operator_address: Address,
    pub is_paid: bool,
    pub payment_amount: Option<i128>,
}

#[derive(Clone)]
#[contracttype]
pub struct ParkingOperator {
    pub address: Address,
    pub name: String,
    pub hourly_rate: i128, // XLM cinsinden saatlik ücret (stroops)
    pub is_active: bool,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Entry(String),      // Araç plakası ile giriş kaydı
    Operator(Address),  // Operatör adresi ile operatör bilgisi
    EntryCount,         // Toplam giriş sayısı
    Admin,              // Admin adresi
}

const HOUR_IN_SECONDS: u64 = 3600;
const STROOPS_PER_XLM: i128 = 10_000_000;

#[contract]
pub struct ParkingMeterContract;

// This is a sample contract. Replace this placeholder with your own contract logic.
// A corresponding test example is available in `test.rs`.
//
// For comprehensive examples, visit <https://github.com/stellar/soroban-examples>.
// The repository includes use cases for the Stellar ecosystem, such as data storage on
// the blockchain, token swaps, liquidity pools, and more.
//
// Refer to the official documentation:
// <https://developers.stellar.org/docs/build/smart-contracts/overview>.
#[contractimpl]
impl ParkingMeterContract {
    /// Sözleşmeyi başlatır ve admin'i belirler
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    /// Yeni operatör kaydeder
    pub fn register_operator(
        env: Env,
        operator: Address,
        name: String,
        hourly_rate: i128,
    ) -> bool {
        // Admin yetkilendirmesi gerekli
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let operator_data = ParkingOperator {
            address: operator.clone(),
            name,
            hourly_rate,
            is_active: true,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Operator(operator), &operator_data);

        true
    }

    /// Araç giriş kaydı oluşturur
    pub fn create_entry(
        env: Env,
        operator: Address,
        license_plate: String,
    ) -> String {
        operator.require_auth();

        // Operatörün aktif olup olmadığını kontrol et
        let operator_data: ParkingOperator = env
            .storage()
            .persistent()
            .get(&DataKey::Operator(operator.clone()))
            .unwrap();

        if !operator_data.is_active {
            panic!("Operator is not active");
        }

        // Aynı plaka ile aktif giriş var mı kontrol et
        if let Some(existing_entry) = env
            .storage()
            .persistent()
            .get::<DataKey, ParkingEntry>(&DataKey::Entry(license_plate.clone()))
        {
            if !existing_entry.is_paid {
                panic!("Vehicle already has an active parking session");
            }
        }

        let current_time = env.ledger().timestamp();
        
        let entry = ParkingEntry {
            license_plate: license_plate.clone(),
            entry_time: current_time,
            exit_time: None,
            operator_address: operator,
            is_paid: false,
            payment_amount: None,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Entry(license_plate.clone()), &entry);

        // Giriş sayısını artır
        let mut count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::EntryCount)
            .unwrap_or(0);
        count += 1;
        env.storage().instance().set(&DataKey::EntryCount, &count);

        license_plate
    }

    /// Park süresini ve ücretini hesaplar
    pub fn calculate_fee(
        env: Env,
        license_plate: String,
    ) -> (u64, i128) {
        let entry: ParkingEntry = env
            .storage()
            .persistent()
            .get(&DataKey::Entry(license_plate))
            .unwrap();

        let current_time = env.ledger().timestamp();
        let duration_seconds = current_time - entry.entry_time;

        let operator_data: ParkingOperator = env
            .storage()
            .persistent()
            .get(&DataKey::Operator(entry.operator_address))
            .unwrap();

        // Saatlik ücret hesaplama (dakika bazında yukarı yuvarlama)
        let duration_minutes = (duration_seconds + 59) / 60; // Yukarı yuvarlama için +59
        let fee_xlm = (duration_minutes as i128 * operator_data.hourly_rate) / 60;

        (duration_seconds, fee_xlm)
    }

    /// Ödeme işlemini tamamlar
    pub fn complete_payment(
        env: Env,
        license_plate: String,
        payment_amount: i128,
    ) -> bool {
        let mut entry: ParkingEntry = env
            .storage()
            .persistent()
            .get(&DataKey::Entry(license_plate.clone()))
            .unwrap();

        if entry.is_paid {
            panic!("Payment already completed");
        }

        let (_, calculated_fee) = Self::calculate_fee(env.clone(), license_plate.clone());

        if payment_amount < calculated_fee {
            panic!("Insufficient payment amount");
        }

        entry.is_paid = true;
        entry.exit_time = Some(env.ledger().timestamp());
        entry.payment_amount = Some(payment_amount);

        env.storage()
            .persistent()
            .set(&DataKey::Entry(license_plate), &entry);

        true
    }

    /// Araç giriş bilgisini getirir
    pub fn get_entry(env: Env, license_plate: String) -> Option<ParkingEntry> {
        env.storage()
            .persistent()
            .get(&DataKey::Entry(license_plate))
    }

    /// Operatör bilgisini getirir
    pub fn get_operator(env: Env, operator_address: Address) -> Option<ParkingOperator> {
        env.storage()
            .persistent()
            .get(&DataKey::Operator(operator_address))
    }

    /// Toplam giriş sayısını döndürür
    pub fn get_total_entries(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::EntryCount)
            .unwrap_or(0)
    }

    /// Operatörü aktif/pasif yapar
    pub fn set_operator_status(
        env: Env,
        operator_address: Address,
        is_active: bool,
    ) -> bool {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let mut operator_data: ParkingOperator = env
            .storage()
            .persistent()
            .get(&DataKey::Operator(operator_address.clone()))
            .unwrap();

        operator_data.is_active = is_active;

        env.storage()
            .persistent()
            .set(&DataKey::Operator(operator_address), &operator_data);

        true
    }

    /// Admin adresini günceller
    pub fn update_admin(env: Env, new_admin: Address) -> bool {
        let current_admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        current_admin.require_auth();

        env.storage().instance().set(&DataKey::Admin, &new_admin);
        true
    }
}

mod test;
