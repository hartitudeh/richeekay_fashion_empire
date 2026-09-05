'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent, Box, Stepper, Step, StepLabel } from '@mui/material';
import { FiClock, FiSearch, FiTruck, FiPackage, FiScissors, FiCheckCircle, FiX } from 'react-icons/fi';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background: #ffffff;
  color: #1a1a1a;
  padding: 32px;

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.8rem;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 20px;

    span {
      color: #b8860b;
    }
  }

  .search-row {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;

    input {
      flex-grow: 1;
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.35);
      border-radius: 4px;
      color: #1a1a1a;
      padding: 12px 16px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.95rem;

      &:focus {
        outline: none;
        border-color: #b8860b;
      }
    }

    button {
      background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
      color: #ffffff;
      font-weight: 700;
      padding: 0 24px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .order-card {
    background: #faf8f5;
    border: 1px solid rgba(201, 162, 39, 0.3);
    border-radius: 8px;
    padding: 24px;

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
      font-size: 0.85rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding-bottom: 16px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .label {
        color: #b8860b;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.7rem;
      }
      .val {
        color: #1a1a1a;
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

  const safeClose = useSafeCloseModal();

  const getStepIndex = (status: string) => {
    const idx = trackerSteps.indexOf(status);
    return idx >= 0 ? idx : 2;
  };

  return (
    <Dialog
      open={isOrderTrackerOpen}
      onClose={() => safeClose(() => setIsOrderTrackerOpen(false))}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          style: {
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            overflow: 'visible'
          }
        }
      }}
    >
      <DialogContent style={{ background: '#ffffff', border: '1px solid #c9a227', borderRadius: '12px', padding: 0, position: 'relative', overflow: 'hidden', boxShadow: '0 15px 50px rgba(0,0,0,0.12)' }}>
        <button
          onClick={() => safeClose(() => setIsOrderTrackerOpen(false))}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#c9a227', fontSize: '1.4rem', cursor: 'pointer', zIndex: 10 }}
        >
          <FiX />
        </button>
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
              <p style={{ fontSize: '0.85rem', color: '#b8860b', marginBottom: '8px', fontWeight: 600 }}>Your Recent Active Orders:</p>
              {orders.map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    setSearchId(o.id);
                    setActiveOrder(o);
                  }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(201, 162, 39, 0.3)',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    marginBottom: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#1a1a1a'
                  }}
                >
                  <span>Order #{o.id} ({o.date})</span>
                  <span style={{ color: '#b8860b', fontWeight: 600 }}>{o.status}</span>
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
                  <div className="val" style={{ color: '#b8860b' }}>24-48 Hours</div>
                </div>
              </div>

              <Box sx={{ width: '100%', margin: '20px 0' }}>
                <Stepper activeStep={getStepIndex(activeOrder.status)} alternativeLabel>
                  {trackerSteps.map((step) => (
                    <Step key={step}>
                      <StepLabel
                        sx={{
                          '& .MuiStepLabel-label': { color: '#1a1a1a', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 },
                          '& .Mui-active': { color: '#c9a227 !important' },
                          '& .Mui-completed': { color: '#b8860b !important' }
                        }}
                      >
                        {step}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <div style={{ background: '#ffffff', border: '1px solid rgba(201,162,39,0.2)', padding: '14px', borderRadius: '6px', fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 500 }}>
                <FiClock style={{ color: '#c9a227', marginRight: '6px' }} />
                Current Phase: <strong style={{ color: '#1a1a1a' }}>{activeOrder.status}</strong> - Our master tailors and quality assurance team are working on your bespoke gold packaging.
              </div>
            </div>
          )}
        </ModalContainer>
      </DialogContent>
    </Dialog>
  );
};
