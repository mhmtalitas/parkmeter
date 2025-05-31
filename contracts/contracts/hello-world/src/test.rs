#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger},
    Address, Env, String
};

#[test]
fn test_initialize_contract() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    
    env.mock_all_auths();
    client.initialize(&admin);
    
    // Test by trying to register an operator (only admin can do this)
    let operator = Address::generate(&env);
    let result = client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128,
    );
    assert_eq!(result, true);
}

#[test]
fn test_register_operator() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Initialize contract
    client.initialize(&admin);
    
    // Register operator
    let result = client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128, // 0.1 XLM per hour
    );
    
    assert_eq!(result, true);
    
    // Check operator data
    let operator_data = client.get_operator(&operator).unwrap();
    assert_eq!(operator_data.address, operator);
    assert_eq!(operator_data.name, String::from_str(&env, "Test Operator"));
    assert_eq!(operator_data.hourly_rate, 1000000i128);
    assert_eq!(operator_data.is_active, true);
}

#[test]
fn test_create_entry() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Set initial timestamp
    env.ledger().with_mut(|li| {
        li.timestamp = 1000;
    });
    
    // Initialize and setup
    client.initialize(&admin);
    client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128,
    );
    
    // Create entry
    let license_plate = String::from_str(&env, "34ABC1234");
    let result = client.create_entry(&operator, &license_plate);
    
    assert_eq!(result, license_plate);
    
    // Check entry data
    let entry = client.get_entry(&license_plate).unwrap();
    assert_eq!(entry.license_plate, license_plate);
    assert_eq!(entry.entry_time, 1000u64);
    assert_eq!(entry.operator_address, operator);
    assert_eq!(entry.is_paid, false);
    
    // Check entry count
    let total_entries = client.get_total_entries();
    assert_eq!(total_entries, 1u32);
}

#[test]
fn test_calculate_fee() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Set initial timestamp
    env.ledger().with_mut(|li| {
        li.timestamp = 1000;
    });
    
    // Initialize and setup
    client.initialize(&admin);
    client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128, // 0.1 XLM per hour
    );
    
    // Create entry
    let license_plate = String::from_str(&env, "34ABC1234");
    client.create_entry(&operator, &license_plate);
    
    // Move time forward by 1 hour (3600 seconds)
    env.ledger().with_mut(|li| {
        li.timestamp = 4600; // 1000 + 3600
    });
    
    // Calculate fee
    let (duration, fee) = client.calculate_fee(&license_plate);
    
    assert_eq!(duration, 3600u64); // 1 hour
    assert_eq!(fee, 1000000i128); // 0.1 XLM
}

#[test]
fn test_complete_payment() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Set initial timestamp
    env.ledger().with_mut(|li| {
        li.timestamp = 1000;
    });
    
    // Initialize and setup
    client.initialize(&admin);
    client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128,
    );
    
    // Create entry
    let license_plate = String::from_str(&env, "34ABC1234");
    client.create_entry(&operator, &license_plate);
    
    // Move time forward
    env.ledger().with_mut(|li| {
        li.timestamp = 4600;
    });
    
    // Complete payment
    let result = client.complete_payment(&license_plate, &1000000i128); // Exact amount
    
    assert_eq!(result, true);
    
    // Check entry is marked as paid
    let entry = client.get_entry(&license_plate).unwrap();
    assert_eq!(entry.is_paid, true);
    assert_eq!(entry.exit_time, Some(4600u64));
    assert_eq!(entry.payment_amount, Some(1000000i128));
}

#[test]
#[should_panic(expected = "Vehicle already has an active parking session")]
fn test_duplicate_entry_fails() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Initialize and setup
    client.initialize(&admin);
    client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128,
    );
    
    let license_plate = String::from_str(&env, "34ABC1234");
    
    // Create first entry
    client.create_entry(&operator, &license_plate);
    
    // Try to create duplicate entry - should panic
    client.create_entry(&operator, &license_plate);
}

#[test]
#[should_panic(expected = "Insufficient payment amount")]
fn test_insufficient_payment_fails() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Set initial timestamp
    env.ledger().with_mut(|li| {
        li.timestamp = 1000;
    });
    
    // Setup
    client.initialize(&admin);
    client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128,
    );
    
    let license_plate = String::from_str(&env, "34ABC1234");
    client.create_entry(&operator, &license_plate);
    
    // Move time forward to generate a fee
    env.ledger().with_mut(|li| {
        li.timestamp = 4600; // 1 hour later
    });
    
    // Try payment with insufficient amount - should panic
    client.complete_payment(&license_plate, &500000i128); // Half the required amount
}

#[test]
fn test_operator_status_management() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let operator = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Initialize and setup
    client.initialize(&admin);
    client.register_operator(
        &operator,
        &String::from_str(&env, "Test Operator"),
        &1000000i128,
    );
    
    // Operator should be active initially
    let operator_data = client.get_operator(&operator).unwrap();
    assert_eq!(operator_data.is_active, true);
    
    // Deactivate operator
    let result = client.set_operator_status(&operator, &false);
    assert_eq!(result, true);
    
    // Check operator is now inactive
    let operator_data = client.get_operator(&operator).unwrap();
    assert_eq!(operator_data.is_active, false);
}

#[test]
fn test_admin_update() {
    let env = Env::default();
    let contract_id = env.register(ParkingMeterContract, ());
    let client = ParkingMeterContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let new_admin = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Initialize contract
    client.initialize(&admin);
    
    // Update admin
    let result = client.update_admin(&new_admin);
    assert_eq!(result, true);
    
    // Test new admin can register operators
    let operator = Address::generate(&env);
    let result = client.register_operator(
        &operator,
        &String::from_str(&env, "New Operator"),
        &2000000i128,
    );
    assert_eq!(result, true);
}
