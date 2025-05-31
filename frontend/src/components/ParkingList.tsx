'use client';

import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { ParkingEntry } from '@/types/parking';
import { StellarService } from '@/utils/stellar';
import { useLanguage } from '@/contexts/LanguageContext';
import QRPayment from './QRPayment';

interface ParkingListProps {
  entries: ParkingEntry[];
  onPaymentCompleted: (entryId: string, txHash: string) => void;
  operatorWallet?: string;
  hourlyRate: number;
}

export default function ParkingList({ 
  entries, 
  onPaymentCompleted, 
  operatorWallet, 
  hourlyRate 
}: ParkingListProps) {
  const { t, language } = useLanguage();
  const [selectedEntry, setSelectedEntry] = useState<ParkingEntry | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateDuration = (entryTime: Date): number => {
    return Math.floor((currentTime.getTime() - entryTime.getTime()) / (1000 * 60));
  };

  const calculateCost = (durationMinutes: number): number => {
    return StellarService.calculateParkingCost(durationMinutes, hourlyRate);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (language === 'tr') {
      return `${hours}s ${mins}dk`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };

  const formatTime = (date: Date): string => {
    const locale = language === 'tr' ? 'tr-TR' : 'en-US';
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const activeEntries = entries.filter(entry => !entry.isPaid);

  if (activeEntries.length === 0) {
    return (
      <Card className="parking-card">
        <Card.Body className="text-center py-5">
          <i className="bi bi-car-front display-4 text-muted mb-3"></i>
          <h5 className="text-muted">{t.noActiveVehicles}</h5>
          <p className="text-muted">{t.startParking}</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="parking-card mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-car-front me-2"></i>
            {t.currentVehicles}
          </h5>
          <Badge bg="primary">
            {activeEntries.length} {language === 'tr' ? 'araç' : 'vehicles'}
          </Badge>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>{t.plate}</th>
                <th>{t.entryTimeShort}</th>
                <th>{t.duration}</th>
                <th>{t.cost}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {activeEntries.map((entry) => {
                const duration = calculateDuration(entry.entryTime);
                const cost = calculateCost(duration);
                
                return (
                  <tr key={entry.id}>
                    <td>
                      <strong>{entry.licensePlate}</strong>
                    </td>
                    <td>{formatTime(entry.entryTime)}</td>
                    <td>
                      <Badge bg="info">{formatDuration(duration)}</Badge>
                    </td>
                    <td>
                      <strong className="text-success">{cost.toFixed(2)} XLM</strong>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => setSelectedEntry(entry)}
                        disabled={!operatorWallet}
                      >
                        <i className="bi bi-qr-code me-1"></i>
                        {t.collectPayment}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {selectedEntry && operatorWallet && (
        <QRPayment
          entry={selectedEntry}
          operatorWallet={operatorWallet}
          hourlyRate={hourlyRate}
          currentTime={currentTime}
          onPaymentCompleted={(txHash) => {
            onPaymentCompleted(selectedEntry.id, txHash);
            setSelectedEntry(null);
          }}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </>
  );
} 