'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import QRCode from 'qrcode';
import { ParkingEntry } from '@/types/parking';
import { StellarService } from '@/utils/stellar';
import { useLanguage } from '@/contexts/LanguageContext';

interface QRPaymentProps {
  entry: ParkingEntry;
  operatorWallet: string;
  hourlyRate: number;
  currentTime: Date;
  onPaymentCompleted: (txHash: string) => void;
  onClose: () => void;
}

export default function QRPayment({
  entry,
  operatorWallet,
  hourlyRate,
  currentTime,
  onPaymentCompleted,
  onClose
}: QRPaymentProps) {
  const { t, language } = useLanguage();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState<string>('');

  const duration = Math.floor((currentTime.getTime() - entry.entryTime.getTime()) / (1000 * 60));
  const cost = StellarService.calculateParkingCost(duration, hourlyRate);

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      setIsGenerating(true);

      const paymentData = {
        destination: operatorWallet,
        amount: cost.toString(),
        memo: `Park-${entry.licensePlate}-${entry.id}`,
      };

      const stellarUrl = StellarService.generatePaymentQR(paymentData);
      setPaymentUrl(stellarUrl);

      const qrUrl = await QRCode.toDataURL(stellarUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('QR kod oluşturma hatası:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (language === 'tr') {
      return `${hours} saat ${mins} dakika`;
    } else {
      return `${hours} hours ${mins} minutes`;
    }
  };

  const handlePaymentCheck = () => {
    // Gerçek uygulamada burada Stellar network'ü kontrol ederiz
    // Şimdilik demo için ödeme tamamlandı olarak işaretliyoruz
    const mockTxHash = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    onPaymentCompleted(mockTxHash);
  };

  const formatTime = (date: Date): string => {
    const locale = language === 'tr' ? 'tr-TR' : 'en-US';
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-qr-code me-2"></i>
          {t.paymentQR}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Card className="h-100">
              <Card.Header>
                <h6 className="mb-0">{t.paymentDetails}</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <strong>{t.plate}:</strong> {entry.licensePlate}
                </div>
                <div className="mb-3">
                  <strong>{t.entryTimeShort}:</strong> {formatTime(entry.entryTime)}
                </div>
                <div className="mb-3">
                  <strong>{t.parkingDuration}:</strong> {formatDuration(duration)}
                </div>
                <div className="mb-3">
                  <strong>{t.hourlyRate}</strong> {hourlyRate} {t.perHour}
                </div>
                <hr />
                <div className="text-center">
                  <h4 className="text-success mb-0">
                    {cost.toFixed(2)} XLM
                  </h4>
                  <small className="text-muted">{t.totalAmount}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="h-100">
              <Card.Header>
                <h6 className="mb-0">{t.qrPayment}</h6>
              </Card.Header>
              <Card.Body className="text-center">
                {isGenerating ? (
                  <div className="py-5">
                    <div className="spinner-border text-primary mb-3" />
                    <p>{language === 'tr' ? 'QR kod oluşturuluyor...' : 'Generating QR code...'}</p>
                  </div>
                ) : (
                  <div className="qr-container">
                    <img 
                      src={qrCodeUrl} 
                      alt="Payment QR Code" 
                      className="img-fluid mb-3"
                    />
                    <p className="small text-muted">
                      {language === 'tr' 
                        ? 'Stellar cüzdanınızla QR kodu okutun'
                        : 'Scan QR code with your Stellar wallet'
                      }
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Alert variant="info" className="mt-3">
          <i className="bi bi-info-circle me-2"></i>
          <strong>{t.paymentInstructions}</strong>
          <ol className="mb-0 mt-2">
            <li>{t.paymentSteps.step1}</li>
            <li>{t.paymentSteps.step2}</li>
            <li>{t.paymentSteps.step3}</li>
            <li>{t.paymentSteps.step4}</li>
          </ol>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t.cancel}
        </Button>
        <Button 
          variant="success" 
          onClick={handlePaymentCheck}
          className="me-2"
        >
          <i className="bi bi-check-circle me-2"></i>
          {t.paymentCompleted}
        </Button>
      </Modal.Footer>
    </Modal>
  );
} 