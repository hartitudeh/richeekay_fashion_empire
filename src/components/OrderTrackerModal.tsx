'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Dialog, DialogContent, Box, Stepper, Step, StepLabel } from '@mui/material';
import { FiClock, FiSearch, FiTruck, FiPackage, FiScissors, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background: #141414;
  color: #ffffff;
  padding: 32px;

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.8rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px;

    span {
      color: #d4af37;
    }
  }

  .search-row {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;

    input {
      flex-grow: 1;
      background: #0a0a0a;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #ffffff;
      padding: 12px 16px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.95rem;

      &:focus {
        outline: none;
        border-color: #d4af37;
      }
    }

    button {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 700;
      padding: 0 24px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .order-card {
    background: #0a0a0a;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 24px;

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
      font-size: 0.85rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 16px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .label {
        color: #d4af37;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.7rem;
      }
      .val {
        color: #ffffff;
        font-weight: 500;
        margin-top: 2px;
      }
    }
  }
`;

export const OrderTrackerModal: React.FC = () => {
  const { isOrderTrackerOpen, setIsOrderTrackerOpen, getOrderById, orders, formatPrice } = useShop();
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<any>(null);

  const trackerSteps = [
    'Order Placed',
    'Fabric Cut',
    'In Tailoring',
    'Gold Box Packed',
    'Out for Delivery',
    'Delivered'
  ];

  const handleSearch = () => {
    if (!searchId) return;
    const found = getOrderById(searchId);
    if (found) {
      setActiveOrder(found);
    } else {
      // Create mock active order demo if ID not in localstorage
      setActiveOrder({
        id: searchId.toUpperCase(),
        date: 'Today',
        customerName: 'VIP Customer',
        deliveryState: 'Lagos Express',
        totalNGN: 145000,
        status: 'In Tailoring',
        items: []
      });
    }
  };

  const getStepIndex = (status: string) => {
    const idx = trackerSteps.indexOf(status);
    return idx >= 0 ? idx : 2;
  };

  return (
    <Dialog open={isOrderTrackerOpen} onClose={() => setIsOrderTrackerOpen(false)} maxWidth="md" fullWidth>
      <DialogContent style={{ background: '#141414', padding: 0 }}>
        <ModalContainer>
          <h2>
            REAL-TIME <span>ORDER TRACKING</span>
          </h2>

          <div className="search-row">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. #RCK-10948)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FiSearch /> Track Status
            </button>
          </div>

          {!activeOrder && orders.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.85rem', color: '#d4af37', marginBottom: '8px' }}>Your Recent Active Orders:</p>
              {orders.map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    setSearchId(o.id);
                    setActiveOrder(o);
                  }}
                  style={{
                    background: '#1f1f1f',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    padding: '10px 14px',
                    marginBottom: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}
                >
                  <span>Order #{o.id} ({o.date})</span>
                  <span style={{ color: '#D4AF37', fontWeight: 600 }}>{o.status}</span>
                </div>
              ))}
            </div>
          )}

          {activeOrder && (
            <div className="order-card">
              <div className="info-grid">
                <div>
                  <div className="label">Order ID</div>
                  <div className="val">#{activeOrder.id}</div>
                </div>
                <div>
                  <div className="label">Destination</div>
                  <div className="val">{activeOrder.deliveryState}</div>
                </div>
                <div>
                  <div className="label">Estimated Delivery</div>
                  <div className="val" style={{ color: '#D4AF37' }}>24-48 Hours</div>
                </div>
              </div>

              <Box sx={{ width: '100%', margin: '20px 0' }}>
                <Stepper activeStep={getStepIndex(activeOrder.status)} alternativeLabel>
                  {trackerSteps.map((step) => (
                    <Step key={step}>
                      <StepLabel
                        sx={{
                          '& .MuiStepLabel-label': { color: '#AAAAAA', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif' },
                          '& .Mui-active': { color: '#D4AF37 !important' },
                          '& .Mui-completed': { color: '#D4AF37 !important' }
                        }}
                      >
                        {step}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <div style={{ background: '#1f1f1f', padding: '14px', borderRadius: '4px', fontSize: '0.85rem', color: '#ccc' }}>
                <FiClock style={{ color: '#D4AF37', marginRight: '6px' }} />
                Current Phase: <strong style={{ color: '#FFF' }}>{activeOrder.status}</strong> - Our master tailors and quality assurance team are working on your bespoke gold packaging.
              </div>
            </div>
          )}
        </ModalContainer>
      </DialogContent>
    </Dialog>
  );
};
