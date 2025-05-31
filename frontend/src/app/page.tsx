'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Navbar, Button, ButtonGroup } from 'react-bootstrap';
import WalletConnect from '@/components/WalletConnect';
import ParkingEntryForm from '@/components/ParkingEntry';
import ParkingList from '@/components/ParkingList';
import { ParkingEntry } from '@/types/parking';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const [connectedWallet, setConnectedWallet] = useState<string>('');
  const [parkingEntries, setParkingEntries] = useState<ParkingEntry[]>([]);
  const [hourlyRate] = useState<number>(100); // 100 XLM/saat

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    const savedEntries = localStorage.getItem('parkingEntries');
    
    if (savedWallet) {
      setConnectedWallet(savedWallet);
    }
    
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      // Date objelerini yeniden oluştur
      const parsedEntries = entries.map((entry: any) => ({
        ...entry,
        entryTime: new Date(entry.entryTime),
        exitTime: entry.exitTime ? new Date(entry.exitTime) : undefined,
      }));
      setParkingEntries(parsedEntries);
    }
  }, []);

  // Wallet bağlantısını kaydet
  const handleWalletConnected = (publicKey: string) => {
    setConnectedWallet(publicKey);
    localStorage.setItem('connectedWallet', publicKey);
  };

  // Yeni araç girişi
  const handleEntryCreated = (entry: ParkingEntry) => {
    const updatedEntries = [...parkingEntries, entry];
    setParkingEntries(updatedEntries);
    localStorage.setItem('parkingEntries', JSON.stringify(updatedEntries));
  };

  // Ödeme tamamlandığında
  const handlePaymentCompleted = (entryId: string, txHash: string) => {
    const updatedEntries = parkingEntries.map(entry => 
      entry.id === entryId 
        ? { 
            ...entry, 
            isPaid: true, 
            paymentTxHash: txHash,
            exitTime: new Date()
          }
        : entry
    );
    setParkingEntries(updatedEntries);
    localStorage.setItem('parkingEntries', JSON.stringify(updatedEntries));
  };

  // İstatistikler
  const activeVehicles = parkingEntries.filter(entry => !entry.isPaid).length;
  const totalVehicles = parkingEntries.length;
  const paidVehicles = parkingEntries.filter(entry => entry.isPaid).length;

  return (
    <>
      {/* Header */}
      <Navbar bg="white" className="shadow-sm" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95) !important' }}>
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Left side - Language Switch */}
            <div className="d-flex align-items-center">
              <ButtonGroup size="sm">
                <Button 
                  variant={language === 'tr' ? 'primary' : 'outline-primary'}
                  onClick={() => setLanguage('tr')}
                  style={{ minWidth: '50px' }}
                >
                  TR
                </Button>
                <Button 
                  variant={language === 'en' ? 'primary' : 'outline-primary'}
                  onClick={() => setLanguage('en')}
                  style={{ minWidth: '50px' }}
                >
                  EN
                </Button>
              </ButtonGroup>
            </div>

            {/* Center - Brand */}
            <Navbar.Brand className="fw-bold text-primary">
              <i className="bi bi-car-front me-2"></i>
              {t.appTitle}
            </Navbar.Brand>

            {/* Right side - Spacer for balance */}
            <div style={{ width: '100px' }}></div>
          </div>
        </Container>
      </Navbar>

      {/* Wallet Connection Strip */}
      <div className="bg-light border-bottom py-2">
        <Container fluid>
          <Row>
            <Col>
              <div className="d-flex justify-content-end align-items-center">
                <small className="text-muted me-3">{t.wallet}</small>
                <div className="position-relative">
                  <WalletConnect 
                    onWalletConnected={handleWalletConnected}
                    connectedWallet={connectedWallet}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="py-4">
        <Row>
          <Col lg={8} className="mx-auto">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">
                {language === 'tr' ? 'Stellar Network Otopark Sistemi' : 'Stellar Network Parking System'}
              </h1>
              <p className="lead text-muted">
                {language === 'tr' 
                  ? 'Blockchain teknolojisi ile akıllı ödeme çözümü'
                  : 'Smart payment solution with blockchain technology'
                }
              </p>
            </div>

            {/* İstatistikler */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="parking-card text-center">
                  <Card.Body>
                    <h3 className="text-primary">{activeVehicles}</h3>
                    <small className="text-muted">{t.activeVehicles}</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="parking-card text-center">
                  <Card.Body>
                    <h3 className="text-success">{paidVehicles}</h3>
                    <small className="text-muted">{t.paidVehicles}</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="parking-card text-center">
                  <Card.Body>
                    <h3 className="text-info">{totalVehicles}</h3>
                    <small className="text-muted">{t.totalVehicles}</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Ücret Bilgisi */}
            <Alert variant="info" className="mb-4">
              <i className="bi bi-info-circle me-2"></i>
              <strong>{t.feeRate}</strong> {hourlyRate} {t.perHour} {t.minuteBased}
            </Alert>

            {/* Araç Giriş Formu */}
            <ParkingEntryForm 
              onEntryCreated={handleEntryCreated}
              operatorWallet={connectedWallet}
            />

            {/* Park Halindeki Araçlar */}
            <ParkingList 
              entries={parkingEntries}
              onPaymentCompleted={handlePaymentCompleted}
              operatorWallet={connectedWallet}
              hourlyRate={hourlyRate}
            />

            {/* Footer */}
            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                <i className="bi bi-shield-check me-2"></i>
                {t.securePayment}
              </p>
              <small className="text-muted">
                {t.testnetWarning}
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
