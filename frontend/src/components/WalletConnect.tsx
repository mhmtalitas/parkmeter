'use client';

import React, { useState, useEffect } from 'react';
import { Button, Alert, Modal, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { StellarService } from '@/utils/stellar';
import { useLanguage } from '@/contexts/LanguageContext';

interface WalletConnectProps {
  onWalletConnected: (publicKey: string) => void;
  connectedWallet?: string;
}

export default function WalletConnect({ onWalletConnected, connectedWallet }: WalletConnectProps) {
  const { t } = useLanguage();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<{ xlm: string; usdc: string } | null>(null);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  useEffect(() => {
    if (connectedWallet) {
      loadBalance();
    }
  }, [connectedWallet]);

  const loadBalance = async () => {
    if (!connectedWallet) return;
    
    try {
      const balanceData = await StellarService.getAccountBalance(connectedWallet);
      setBalance(balanceData);
    } catch (error) {
      console.error('Balance load error:', error);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const publicKey = await StellarService.connectWallet();
      if (publicKey) {
        onWalletConnected(publicKey);
        console.log('Wallet connected:', publicKey);
      } else {
        setError(t.connectionFailed);
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      setError(t.freighterConnectionFailed);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleManualConnect = () => {
    if (manualAddress.length === 56 && manualAddress.startsWith('G')) {
      onWalletConnected(manualAddress);
      setShowManualModal(false);
      setManualAddress('');
      setError(null);
    } else {
      alert(t.invalidStellarAddress);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    setBalance(null);
    localStorage.removeItem('connectedWallet');
    onWalletConnected('');
  };

  if (connectedWallet) {
    return (
      <Dropdown align="end">
        <Dropdown.Toggle 
          variant="outline-success" 
          size="sm"
          className="d-flex align-items-center"
        >
          <i className="bi bi-wallet2 me-2"></i>
          {formatAddress(connectedWallet)}
          {balance && (
            <span className="badge bg-primary ms-2">
              {parseFloat(balance.xlm).toFixed(1)} XLM
            </span>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ minWidth: '280px' }}>
          <Dropdown.ItemText>
            <div className="text-center p-2">
              <small className="text-muted d-block">{t.connected}</small>
              <strong className="d-block font-monospace small">{connectedWallet}</strong>
            </div>
          </Dropdown.ItemText>
          
          <Dropdown.Divider />
          
          {balance && (
            <>
              <Dropdown.ItemText>
                <div className="row px-2">
                  <div className="col-6 text-center">
                    <small className="text-muted d-block">XLM</small>
                    <strong>{parseFloat(balance.xlm).toFixed(2)}</strong>
                  </div>
                  <div className="col-6 text-center">
                    <small className="text-muted d-block">USDC</small>
                    <strong>{parseFloat(balance.usdc).toFixed(2)}</strong>
                  </div>
                </div>
              </Dropdown.ItemText>
              <Dropdown.Divider />
            </>
          )}
          
          <Dropdown.Item onClick={loadBalance}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            {t.refreshBalance}
          </Dropdown.Item>
          
          <Dropdown.Item onClick={handleDisconnect} className="text-danger">
            <i className="bi bi-x-circle me-2"></i>
            {t.disconnect}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <>
      <div className="d-flex gap-2">
        <Button 
          variant="primary" 
          size="sm"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {t.connecting}
            </>
          ) : (
            <>
              <i className="bi bi-wallet2 me-2"></i>
              {t.connectFreighter}
            </>
          )}
        </Button>
        
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={() => setShowManualModal(true)}
        >
          <i className="bi bi-pencil me-1"></i>
          {t.manual}
        </Button>
      </div>
      
      {error && (
        <div className="position-absolute end-0 mt-1" style={{ top: '100%', zIndex: 1000 }}>
          <Alert variant="danger" className="p-2 small" style={{ fontSize: '0.8rem', minWidth: '300px' }}>
            {error}
          </Alert>
        </div>
      )}

      {/* Manuel Bağlantı Modal */}
      <Modal show={showManualModal} onHide={() => setShowManualModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t.manualConnectionTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            {t.manualConnectionDesc}
          </p>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t.stellarAddress}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-wallet2"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                />
              </InputGroup>
              <Form.Text className="text-muted">
                {t.stellarAddressHelper}
              </Form.Text>
            </Form.Group>
            
            <div className="mb-3">
              <Button 
                variant="outline-info" 
                size="sm"
                onClick={() => setManualAddress('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF')}
              >
                <i className="bi bi-clipboard me-1"></i>
                {t.useTestAddress}
              </Button>
            </div>
          </Form>

          <Alert variant="info" className="small">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Not:</strong> {t.manualConnectionNote}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowManualModal(false)}>
            {t.cancel}
          </Button>
          <Button variant="primary" onClick={handleManualConnect}>
            <i className="bi bi-check-circle me-2"></i>
            {t.connectButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 