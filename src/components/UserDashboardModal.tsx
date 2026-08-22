'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent } from '@mui/material';
import { FaCrown } from 'react-icons/fa6';
import {
  FiUser,
  FiAward,
  FiShoppingBag,
  FiHeart,
  FiScissors,
  FiShield,
  FiX,
  FiLock,
  FiMail,
  FiPhone,
  FiLogOut,
  FiCheckCircle,
  FiExternalLink,
  FiSmartphone,
  FiCopy
} from 'react-icons/fi';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background: #141414;
  color: #ffffff;
  border: 1px solid #d4af37;
  border-radius: 8px;
  position: relative;
  padding: 32px;

  @media (max-width: 600px) {
    padding: 20px 16px;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    gap: 16px;
    flex-wrap: wrap;

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
        flex-shrink: 0;
      }

      .user-details {
        h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          color: #ffffff;
          margin: 0 0 4px;
          word-break: break-all;
        }

        .user-email {
          font-size: 0.85rem;
          color: #d4af37;
          font-weight: 600;
        }

        .device-tag {
          font-size: 0.72rem;
          color: #aaaaaa;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }
      }
    }

    .action-group {
      display: flex;
      align-items: center;
      gap: 10px;

      .logout-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #cccccc;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 77, 77, 0.2);
          border-color: #ff4d4d;
          color: #ff4d4d;
        }
      }
    }
  }

  .privacy-banner {
    background: rgba(212, 175, 55, 0.08);
    border: 1px dashed rgba(212, 175, 55, 0.35);
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 24px;
    font-size: 0.78rem;
    color: #e6c875;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      color: #d4af37;
      font-size: 1rem;
      flex-shrink: 0;
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
      border-radius: 6px;

      .num {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.7rem;
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

      .sub-lbl {
        font-size: 0.7rem;
        color: #25d366;
        margin-top: 2px;
      }
    }
  }

  .tabs-container {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 24px;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 4px;

    button {
      background: none;
      border: none;
      color: #888888;
      font-size: 0.85rem;
      font-weight: 600;
      padding-bottom: 12px;
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;

      &.active {
        color: #d4af37;

        &:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #d4af37;
        }
      }
    }
  }
`;

const AuthContainer = styled.div`
  background: #141414;
  color: #ffffff;
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 36px 32px;
  position: relative;

  @media (max-width: 600px) {
    padding: 24px 18px;
  }

  .close-top {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: #888888;
    font-size: 1.4rem;
    cursor: pointer;
    &:hover { color: #d4af37; }
  }

  .auth-header {
    text-align: center;
    margin-bottom: 24px;

    .brand-mark {
      height: 55px;
      width: auto;
      margin: 0 auto 12px;
      display: block;
      object-fit: contain;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #ffffff;
      margin-bottom: 6px;
    }

    p {
      font-size: 0.85rem;
      color: #aaaaaa;
    }
  }

  .privacy-notice {
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 24px;
    font-size: 0.78rem;
    color: #f4e798;
    line-height: 1.5;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 10px;

    svg {
      color: #d4af37;
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  .auth-tabs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;

    button {
      flex: 1;
      padding: 12px;
      background: #0a0a0a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #aaaaaa;
      font-weight: 600;
      font-size: 0.85rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 700;
        border-color: #d4af37;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .input-group {
      position: relative;

      input {
        width: 100%;
        padding: 14px 16px 14px 44px;
        background: #0a0a0a;
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 4px;
        color: #ffffff;
        font-size: 0.9rem;
        outline: none;

        &:focus {
          border-color: #d4af37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }
      }

      .icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #d4af37;
        font-size: 1.1rem;
      }
    }

    .submit-btn {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 1.5px;
      padding: 14px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);

      &:hover {
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        transform: translateY(-1px);
      }
    }
  }

  .guest-divider {
    display: flex;
    align-items: center;
    margin: 20px 0 16px;
    color: #666666;
    font-size: 0.8rem;
    gap: 12px;

    &:before, &:after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .guest-btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #cccccc;
    font-size: 0.82rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d4af37;
      color: #ffffff;
    }
  }
`;

export const UserDashboardModal: React.FC = () => {
  const {
    isUserDashboardOpen,
    setIsUserDashboardOpen,
    currentUser,
    userLogin,
    userRegister,
    userLogout,
    orders,
    wishlist,
    products,
    userMeasurements,
    saveUserMeasurements,
    formatPrice,
    addToCart
  } = useShop();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'royalty' | 'measurements'>('orders');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [bust, setBust] = useState(userMeasurements.bust || '36');
  const [waist, setWaist] = useState(userMeasurements.waist || '28');
  const [hips, setHips] = useState(userMeasurements.hips || '40');
  const [shoulder, setShoulder] = useState(userMeasurements.shoulder || '15');
  const [sleeve, setSleeve] = useState(userMeasurements.sleeve || '24');
  const [fullLength, setFullLength] = useState(userMeasurements.fullLength || '58');

  const [copiedLink, setCopiedLink] = useState(false);

  const router = useRouter();
  const safeCloseModal = useSafeCloseModal();
  const handleClose = () => safeCloseModal(() => setIsUserDashboardOpen(false));

  const handleContinueAsGuest = () => {
    safeCloseModal(() => setIsUserDashboardOpen(false));
    router.push('/checkout');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (authMode === 'register') {
      const nameFromEmail = email.split('@')[0];
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      userRegister(formattedName, email, password);
    } else {
      userLogin(email, password);
    }
  };

  const handleDemoLogin = () => {
    userRegister('Royal VIP Client', 'client@richeekay.com', 'demo123');
  };

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserMeasurements({
      ...userMeasurements,
      bust,
      waist,
      hips,
      shoulder,
      sleeve,
      fullLength
    });
    alert('✂️ Your custom fitting measurements have been saved locally to your phone!');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://richeekay-fashion-empire.vercel.app/richeekay-loyalty-program?ref=VIP849');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <Dialog
      open={isUserDashboardOpen}
      onClose={handleClose}
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
      <DialogContent style={{ padding: 0 }}>
        {currentUser ? (
          <DashboardContainer>
            <div className="header-row">
              <div className="user-info">
                <div className="avatar" style={{ overflow: 'hidden', padding: 0 }}>
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    currentUser.email.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="user-details">
                  <h3>{currentUser.name || 'RICHEEKAY VIP Account'}</h3>
                  <div className="user-email">✉️ {currentUser.email}</div>
                  <div className="device-tag">
                    <FiSmartphone /> Purchase history & likes saved on this phone
                  </div>
                </div>
              </div>

              <div className="action-group">
                <button
                  onClick={() => {
                    handleClose();
                    router.push('/dashboard');
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Full Dashboard &rarr;
                </button>
                <button className="logout-btn" onClick={userLogout} title="Sign Out">
                  <FiLogOut /> Sign Out
                </button>
                <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#888888', fontSize: '1.4rem', cursor: 'pointer' }}>
                  <FiX />
                </button>
              </div>
            </div>

            <div className="privacy-banner">
              <FiShield />
              <span>
                <strong>Privacy Guaranteed:</strong> Only your email (<code>{currentUser.email}</code>) is stored. All purchase orders, wishlist items, fitting measurements, and Gold Points are stored safely on your device.
              </span>
            </div>

            <div className="kpi-row">
              <div className="kpi-card">
                <div className="num">{(currentUser.points || 1250).toLocaleString()}</div>
                <div className="lbl">Royalty Gold Points</div>
                <div className="sub-lbl">Worth ₦{((currentUser.points || 1250) * 2).toLocaleString()} Cash Discount</div>
              </div>
              <div className="kpi-card">
                <div className="num">{orders.length}</div>
                <div className="lbl">Purchase History</div>
                <div className="sub-lbl">Saved on Device</div>
              </div>
              <div className="kpi-card">
                <div className="num">{wishlist.length}</div>
                <div className="lbl">Liked Items</div>
                <div className="sub-lbl">Saved on Device</div>
              </div>
            </div>

            <div className="tabs-container">
              <button
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={() => setActiveTab('orders')}
              >
                <FiShoppingBag /> Purchase History ({orders.length})
              </button>
              <button
                className={activeTab === 'wishlist' ? 'active' : ''}
                onClick={() => setActiveTab('wishlist')}
              >
                <FiHeart /> Liked Couture ({wishlist.length})
              </button>
              <button
                className={activeTab === 'royalty' ? 'active' : ''}
                onClick={() => setActiveTab('royalty')}
              >
                <FaCrown /> Royalty Club Points
              </button>
              <button
                className={activeTab === 'measurements' ? 'active' : ''}
                onClick={() => setActiveTab('measurements')}
              >
                <FiScissors /> Fitting Measurements
              </button>
            </div>

            {activeTab === 'orders' && (
              <div>
                {orders.length > 0 ? (
                  orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.25)',
                        padding: '16px',
                        marginBottom: '14px',
                        borderRadius: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontWeight: '700', color: '#d4af37' }}>Order #{o.id}</span>
                        <span style={{ fontSize: '0.8rem', color: '#aaaaaa' }}>{o.date}</span>
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#cccccc', marginBottom: '12px' }}>
                        Total Paid: <strong style={{ color: '#ffffff' }}>{formatPrice(o.totalNGN)}</strong> | Status:{' '}
                        <span style={{ color: '#25d366', fontWeight: '700' }}>{o.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => {
                            handleClose();
                            router.push(`/order-tracking?orderId=${o.id}`);
                          }}
                          style={{
                            background: 'rgba(212,175,55,0.15)',
                            border: '1px solid #d4af37',
                            color: '#d4af37',
                            padding: '6px 14px',
                            fontSize: '0.78rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <FiExternalLink /> Track Package
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', color: '#888888', padding: '40px 0' }}>
                    <FiShoppingBag style={{ fontSize: '2.2rem', color: '#d4af37', marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>No orders placed on this phone yet.</p>
                    <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '4px' }}>
                      Purchases you make will be saved automatically to your device history.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                {wishlistProducts.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: '#0a0a0a',
                          border: '1px solid rgba(255,255,255,0.12)',
                          padding: '12px',
                          display: 'flex',
                          gap: '12px',
                          borderRadius: '6px',
                          alignItems: 'center'
                        }}
                      >
                        <img src={p.images[0]} alt={p.name} style={{ width: '64px', height: '84px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                          <h5 style={{ fontSize: '0.9rem', color: '#ffffff', margin: '0 0 4px' }}>{p.name}</h5>
                          <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: '700' }}>{formatPrice(p.priceNGN)}</span>
                          <button
                            onClick={() => addToCart(p, p.colors[0]?.name || 'Gold', p.sizes[0] || 'M', 1)}
                            style={{
                              display: 'block',
                              marginTop: '8px',
                              background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                              color: '#0a0a0a',
                              border: 'none',
                              padding: '6px 12px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              borderRadius: '30px',
                              cursor: 'pointer'
                            }}
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#888888', padding: '40px 0' }}>
                    <FiHeart style={{ fontSize: '2.2rem', color: '#d4af37', marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>No liked items saved on your phone yet.</p>
                    <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '4px' }}>
                      Click the heart icon on any gown or tunic set to save it to your phone.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'royalty' && (
              <div style={{ background: '#0a0a0a', padding: '24px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FaCrown style={{ fontSize: '1.8rem', color: '#d4af37' }} />
                  <div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '1.3rem', margin: 0 }}>
                      RICHEEKAY Royalty Gold Points
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#25d366', fontWeight: '700' }}>
                      Active Member • Tier 2 Royal Sovereign
                    </span>
                  </div>
                </div>

                <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px dashed #d4af37', padding: '16px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#d4af37', fontFamily: "'Playfair Display', serif" }}>
                    {(currentUser.points || 1250).toLocaleString()} GOLD POINTS
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#ffffff', marginTop: '4px', fontWeight: '600' }}>
                    Cash Discount Value: <span style={{ color: '#25d366' }}>₦{((currentUser.points || 1250) * 2).toLocaleString()} OFF</span> at Checkout
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.82rem', color: '#aaaaaa', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Next Tier Progress (Empire VIP Dynasty)</span>
                    <span style={{ color: '#d4af37' }}>1,250 / 50,000 Pts</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#222222', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '12%', height: '100%', background: 'linear-gradient(90deg, #c9a227 0%, #d4af37 100%)' }} />
                  </div>
                </div>

                <div style={{ background: '#141414', padding: '14px 18px', borderRadius: '4px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#cccccc' }}>Your VIP Invite Link (+1,500 Pts):</span>
                  <button
                    onClick={handleCopyReferral}
                    style={{
                      background: '#d4af37',
                      color: '#0a0a0a',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontWeight: '700',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FiCopy /> {copiedLink ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleClose();
                    router.push('/richeekay-loyalty-program');
                  }}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    padding: '12px',
                    borderRadius: '30px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <FaCrown /> View Full Royalty Program Terms & Benefits &rarr;
                </button>
              </div>
            )}

            {activeTab === 'measurements' && (
              <form onSubmit={handleSaveMeasurements} style={{ background: '#0a0a0a', padding: '24px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.25)' }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#d4af37', marginBottom: '8px', fontSize: '1.2rem' }}>
                  ✂️ Bespoke Custom Fitting Measurements
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#aaaaaa', marginBottom: '18px' }}>
                  All body measurements are saved securely on your phone for instant bespoke orders.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Bust (Inches)</label>
                    <input
                      type="text"
                      value={bust}
                      onChange={(e) => setBust(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#141414', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Waist (Inches)</label>
                    <input
                      type="text"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#141414', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Hips (Inches)</label>
                    <input
                      type="text"
                      value={hips}
                      onChange={(e) => setHips(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#141414', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Shoulder (Inches)</label>
                    <input
                      type="text"
                      value={shoulder}
                      onChange={(e) => setShoulder(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#141414', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Sleeve Length</label>
                    <input
                      type="text"
                      value={sleeve}
                      onChange={(e) => setSleeve(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#141414', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Full Dress Length</label>
                    <input
                      type="text"
                      value={fullLength}
                      onChange={(e) => setFullLength(e.target.value)}
                      style={{ width: '100%', padding: '10px', background: '#141414', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Save Fitting Profile to Phone
                </button>
              </form>
            )}
          </DashboardContainer>
        ) : (
          <AuthContainer>
            <button className="close-top" onClick={handleClose}>
              <FiX />
            </button>

            <div className="auth-header">
              <img src="/rklogo.png" alt="RICHEEKAY Logo" className="brand-mark" />
              <h2>RICHEEKAY VIP Dashboard</h2>
              <p>Enter your Email Address to create or sign in to your VIP account.</p>
            </div>

            <div className="privacy-notice">
              <FiShield />
              <div>
                <strong>Privacy Guaranteed:</strong> The only information saved to your account profile is your <strong>Email Address</strong>. Your purchase history, liked items, custom measurements, and Royalty Gold Points are stored safely on your phone/browser.
              </div>
            </div>

            <div className="auth-tabs">
              <button
                className={authMode === 'register' ? 'active' : ''}
                onClick={() => setAuthMode('register')}
              >
                Create VIP Account
              </button>
              <button
                className={authMode === 'login' ? 'active' : ''}
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleAuthSubmit}>
              <div className="input-group">
                <FiMail className="icon" />
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <FiLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                {authMode === 'register' ? 'CREATE VIP ACCOUNT (+1,500 POINTS)' : 'SIGN IN TO VIP DASHBOARD'}
              </button>
            </form>

            <div className="guest-divider">OR GUEST CHECKOUT</div>

            <button
              className="guest-btn"
              onClick={handleContinueAsGuest}
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                color: '#0a0a0a',
                fontWeight: '800',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: 'none',
                padding: '14px 16px',
                marginBottom: '10px'
              }}
            >
              Skip Registration & Proceed to Payment Section as Guest &rarr;
            </button>

            <button className="guest-btn" onClick={handleDemoLogin}>
              👑 Quick Demo VIP Sign In
            </button>
          </AuthContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};
