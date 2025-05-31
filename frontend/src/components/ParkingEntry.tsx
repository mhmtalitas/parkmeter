'use client';

import React, { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { ParkingEntry } from '@/types/parking';
import { useLanguage } from '@/contexts/LanguageContext';

interface ParkingEntryProps {
  onEntryCreated: (entry: ParkingEntry) => void;
  operatorWallet?: string;
}

export default function ParkingEntryForm({ onEntryCreated, operatorWallet }: ParkingEntryProps) {
  const { t } = useLanguage();
  const [licensePlate, setLicensePlate] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Şu anki tarihi YYYY-MM-DDTHH:MM formatında al
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Component yüklendiğinde şu anki zamanı varsayılan olarak ayarla
  React.useEffect(() => {
    if (!entryTime) {
      setEntryTime(getCurrentDateTime());
    }
  }, []);

  const validateLicensePlate = (plate: string): boolean => {
    // Yeni Türk plaka formatı:
    // - İlk iki hane: 01-81 arası zorunlu rakam
    // - Boşluk
    // - İkinci kısım: Tek harf (A-Z), 2 karakterli harf (AB) veya 3 karakterli harf (ACK)
    // - Boşluk  
    // - Son kısım: 2-5 basamak sayı (01-99999)
    
    const turkishPlateRegex = /^(0[1-9]|[1-7][0-9]|8[0-1])\s([A-Z]{1,3})\s([0-9]{2,5})$/;
    
    if (!turkishPlateRegex.test(plate.toUpperCase())) {
      return false;
    }

    // İl kodu kontrolü (01-81)
    const ilKodu = parseInt(plate.substring(0, 2));
    if (ilKodu < 1 || ilKodu > 81) {
      return false;
    }

    // Son kısım sayı kontrolü (01-99999)
    const parts = plate.split(' ');
    const sonSayi = parseInt(parts[2]);
    if (sonSayi < 1 || sonSayi > 99999) {
      return false;
    }

    return true;
  };

  const formatPlateInput = (value: string): string => {
    // Sadece sayı, harf ve boşluk karakterlerini tut
    let cleaned = value.replace(/[^0-9A-Za-z\s]/g, '').toUpperCase();
    
    // Çoklu boşlukları tek boşluğa çevir
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // Otomatik boşluk ekleme
    const parts = cleaned.split(' ');
    let formatted = '';
    
    if (parts[0]) {
      // İlk iki rakam
      const ilKodu = parts[0].substring(0, 2);
      formatted = ilKodu;
      
      if (parts[0].length > 2 || parts.length > 1) {
        formatted += ' ';
        
        // Harf kısmı
        let harfKismi = '';
        if (parts[0].length > 2) {
          harfKismi = parts[0].substring(2);
        }
        if (parts[1]) {
          harfKismi += parts[1];
        }
        
        // 1, 2 veya 3 karakter harf
        if (harfKismi.length > 0) {
          if (harfKismi.length <= 3) {
            formatted += harfKismi;
          } else {
            formatted += harfKismi.substring(0, 3);
          }
          
          // Eğer harf kısmı tamamlandıysa ve sayı kısmı varsa
          if ((harfKismi.length >= 1 && parts.length > 2) || 
              (harfKismi.length >= 3 && parts[0].length > 5) ||
              (parts[0].length > 5)) {
            formatted += ' ';
            
            // Sayı kısmı
            let sayiKismi = '';
            if (parts[0].length > 5) {
              sayiKismi = parts[0].substring(5);
            }
            if (parts[2]) {
              sayiKismi += parts[2];
            }
            
            // Son 5 basamağı al
            if (sayiKismi.length > 0) {
              formatted += sayiKismi.substring(0, 5);
            }
          }
        }
      }
    }
    
    return formatted;
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPlateInput(e.target.value);
    setLicensePlate(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!operatorWallet) {
      setError('Önce cüzdanınızı bağlayın');
      return;
    }

    if (!entryTime) {
      setError(t.selectEntryTime);
      return;
    }

    const formattedPlate = licensePlate.trim();
    
    if (!validateLicensePlate(formattedPlate)) {
      setError(t.invalidPlate);
      return;
    }

    // Giriş saatinin geçerli olup olmadığını kontrol et
    const selectedEntryTime = new Date(entryTime);
    const now = new Date();
    
    if (selectedEntryTime > now) {
      setError(t.futureTimeError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newEntry: ParkingEntry = {
        id: Date.now().toString(),
        licensePlate: formattedPlate,
        entryTime: selectedEntryTime,
        isPaid: false,
      };

      onEntryCreated(newEntry);
      setLicensePlate('');
      setEntryTime(getCurrentDateTime());
    } catch (error) {
      setError('Giriş kaydı oluşturulurken hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="parking-card mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-car-front me-2"></i>
          {t.vehicleEntry}
        </h5>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>{t.licensePlate}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t.plateExample}
                  value={licensePlate}
                  onChange={handlePlateChange}
                  required
                  disabled={!operatorWallet}
                  style={{ textTransform: 'uppercase', fontSize: '1.1rem', fontWeight: '500' }}
                  maxLength={11}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t.entryTime}</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={entryTime}
                  onChange={(e) => setEntryTime(e.target.value)}
                  required
                  disabled={!operatorWallet}
                  max={getCurrentDateTime()}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button 
              type="submit" 
              variant="success"
              disabled={isSubmitting || !operatorWallet}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  {t.creating}
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  {t.createEntry}
                </>
              )}
            </Button>
          </div>
        </Form>

        {!operatorWallet && (
          <Alert variant="warning" className="mt-3 mb-0">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {t.connectWalletFirst}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
} 