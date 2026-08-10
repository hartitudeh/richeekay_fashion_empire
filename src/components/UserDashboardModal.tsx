'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';
import { FiUser, FiAward, FiShoppingBag, FiHeart, FiScissors, FiShield, FiX } from 'react-icons/fi';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background: #141414;
  color: #ffffff;
  padding: 32px;

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;

      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 800;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #f4e798;
      }

      h3 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.5rem;
        color: #ffffff;
      }

      span {
        font-size: 0.8rem;
        color: #d4af37;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }

  .kpi-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 28px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .kpi-card {
      background: #0a0a0a;
      border: 1px solid rgba(212, 175, 55, 0.3);
      padding: 18px;
      text-align: center;

      .num {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: #d4af37;
      }

      .lbl {
        font-size: 0.75rem;
        color: #aaaaaa;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 4px;
      }
    }
  }
`;

export const UserDashboardModal: React.FC = () => {
  const {
    isUserDashboardOpen,
    setIsUserDashboardOpen,
    orders,
    wishlist,
    products,
    userMeasurements,
    formatPrice,
    addToCart
  } = useShop();

  const safeClose = useSafeCloseModal();
  const [activeTab, setActiveTab] = useState(0);

  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <Dialog open={isUserDashboardOpen} onClose={() => safeClose(() => setIsUserDashboardOpen(false))} maxWidth="md" fullWidth>
      <DialogContent style={{ background: '#141414', padding: 0 }}>
        <DashboardContainer>
          <div className="header-row">
            <div className="user-info">
              <div className="avatar">E</div>
              <div>
                <h3>Chief Mrs. Elizabeth</h3>
                <span>
                  <FiAward style={{ color: '#D4AF37' }} /> Royal Gold VIP Member
                </span>
              </div>
            </div>

            <button
              onClick={() => safeClose(() => setIsUserDashboardOpen(false))}
              style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              <FiX />
            </button>
          </div>

          <div className="kpi-row">
            <div className="kpi-card">
              <div className="num">1,250</div>
              <div className="lbl">VIP Loyalty Points</div>
            </div>
            <div className="kpi-card">
              <div className="num">{orders.length}</div>
              <div className="lbl">Total Orders Placed</div>
            </div>
            <div className="kpi-card">
              <div className="num">{wishlist.length}</div>
              <div className="lbl">Saved Wishlist Items</div>
            </div>
          </div>

          <Box sx={{ borderBottom: 1, borderColor: 'rgba(212, 175, 55, 0.3)', marginBottom: '20px' }}>
            <Tabs value={activeTab} onChange={(_e, v) => setActiveTab(v)}>
              <Tab label="Order History" />
              <Tab label="Saved Measurements" />
              <Tab label="My Wishlist" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <div>
              {orders.length === 0 ? (
                <p style={{ color: '#aaa', textAlign: 'center', padding: '30px' }}>No order history found yet.</p>
              ) : (
                orders.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      background: '#0a0a0a',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      padding: '16px',
                      marginBottom: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ color: '#D4AF37' }}>Order #{o.id}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#aaa' }}>{o.date}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#ccc' }}>
                      Status: <strong style={{ color: '#FFF' }}>{o.status}</strong> | Total: <strong>{formatPrice(o.totalNGN)}</strong>
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 1 && (
            <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <h4 style={{ color: '#D4AF37', marginBottom: '14px' }}>Saved Bespoke Dimensions</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.9rem' }}>
                <div>Bust: <strong>{userMeasurements.bust}"</strong></div>
                <div>Waist: <strong>{userMeasurements.waist}"</strong></div>
                <div>Hips: <strong>{userMeasurements.hips}"</strong></div>
                <div>Shoulder: <strong>{userMeasurements.shoulder}"</strong></div>
                <div>Sleeve: <strong>{userMeasurements.sleeve}"</strong></div>
                <div>Full Length: <strong>{userMeasurements.fullLength}"</strong></div>
              </div>
              <p style={{ marginTop: '14px', fontSize: '0.85rem', color: '#aaa' }}>
                Fabric Preference: <strong style={{ color: '#FFF' }}>{userMeasurements.fabricType}</strong>
              </p>
            </div>
          )}

          {activeTab === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {wishedProducts.length === 0 ? (
                <p style={{ color: '#aaa', gridColumn: 'span 2', textAlign: 'center', padding: '30px' }}>Your wishlist is empty.</p>
              ) : (
                wishedProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: '#0a0a0a',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      padding: '12px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    <img src={p.images[0]} alt={p.name} style={{ width: '60px', height: '70px', objectFit: 'cover' }} />
                    <div>
                      <h5 style={{ fontSize: '0.9rem', color: '#FFF' }}>{p.name}</h5>
                      <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '0.9rem' }}>{formatPrice(p.priceNGN)}</span>
                      <button
                        onClick={() => addToCart(p, p.colors[0]?.name || 'Standard', p.sizes[0] || 'Standard')}
                        style={{
                          display: 'block',
                          marginTop: '6px',
                          background: '#D4AF37',
                          color: '#0A0A0A',
                          border: 'none',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </DashboardContainer>
      </DialogContent>
    </Dialog>
  );
};
