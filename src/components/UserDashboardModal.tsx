'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent } from '@mui/material';
import { FiUser, FiAward, FiShoppingBag, FiHeart, FiScissors, FiShield, FiX, FiLock, FiMail, FiPhone, FiLogOut, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background: #141414;
  color: #ffffff;
  border: 1px solid #d4af37;
  border-radius: 8px;
  position: relative;
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
        margin: 0;
      }

      span {
        font-size: 0.8rem;
        color: #d4af37;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 600;
      }
    }

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

  .tabs-container {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 24px;
    gap: 20px;

    button {
      background: none;
      border: none;
      color: #888888;
      font-size: 0.9rem;
      font-weight: 600;
      padding-bottom: 12px;
      cursor: pointer;
      position: relative;
      transition: color 0.3s ease;

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
    margin-bottom: 28px;

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

  .auth-tabs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 28px;

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
    gap: 18px;

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
      text-transform: uppercase;
      padding: 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 6px;

      &:hover {
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        transform: translateY(-1px);
      }
    }
  }

  .guest-divider {
    display: flex;
    align-items: center;
    margin: 24px 0 18px;
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
    formatPrice,
    addToCart
  } = useShop();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [activeTab, setActiveTab] = useState<'orders' | 'measurements' | 'wishlist'>('orders');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const router = useRouter();
  const safeCloseModal = useSafeCloseModal();
  const handleClose = () => safeCloseModal(() => setIsUserDashboardOpen(false));

  const handleContinueAsGuest = () => {
    safeCloseModal(() => setIsUserDashboardOpen(false));
    router.push('/checkout');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      if (!name || !email || !password) return;
      userRegister(name, email, password, phone);
    } else {
      if (!email || !password) return;
      userLogin(email, password);
    }
  };

  const handleDemoLogin = () => {
    userRegister('Chief Mrs. Elizabeth', 'elizabeth@richeekay.com', 'demo123', '+2348007424335');
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
          /* LOGGED IN VIP DASHBOARD VIEW */
          <DashboardContainer>
            <div className="header-row">
              <div className="user-info">
                <div className="avatar">{currentUser.name.charAt(0)}</div>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>👑 {currentUser.vipTier}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button className="logout-btn" onClick={userLogout} title="Sign Out">
                  <FiLogOut /> Sign Out
                </button>
                <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#888888', fontSize: '1.4rem', cursor: 'pointer' }}>
                  <FiX />
                </button>
              </div>
            </div>

            <div className="kpi-row">
              <div className="kpi-card">
                <div className="num">{currentUser.points.toLocaleString()}</div>
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

            <div className="tabs-container">
              <button
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={() => setActiveTab('orders')}
              >
                Order History ({orders.length})
              </button>
              <button
                className={activeTab === 'measurements' ? 'active' : ''}
                onClick={() => setActiveTab('measurements')}
              >
                Saved Custom Measurements
              </button>
              <button
                className={activeTab === 'wishlist' ? 'active' : ''}
                onClick={() => setActiveTab('wishlist')}
              >
                My Wishlist ({wishlist.length})
              </button>
            </div>

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div>
                {orders.length > 0 ? (
                  orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.2)',
                        padding: '16px',
                        marginBottom: '12px',
                        borderRadius: '4px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '700', color: '#d4af37' }}>Order #{o.id}</span>
                        <span style={{ fontSize: '0.8rem', color: '#aaaaaa' }}>{o.date}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#cccccc' }}>
                        Total Amount: <strong>{formatPrice(o.totalNGN)}</strong> | Status: <span style={{ color: '#25d366' }}>{o.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: '#888888', padding: '30px 0' }}>
                    No order history found yet.
                  </p>
                )}
              </div>
            )}

            {/* MEASUREMENTS TAB */}
            {activeTab === 'measurements' && (
              <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '4px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#d4af37', marginBottom: '16px' }}>
                  ✂️ Your Saved Haute Couture Profile
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.88rem' }}>
                  <div>Bust: <strong>{userMeasurements.bust}"</strong></div>
                  <div>Waist: <strong>{userMeasurements.waist}"</strong></div>
                  <div>Hips: <strong>{userMeasurements.hips}"</strong></div>
                  <div>Shoulder: <strong>{userMeasurements.shoulder}"</strong></div>
                  <div>Sleeve: <strong>{userMeasurements.sleeve}"</strong></div>
                  <div>Full Length: <strong>{userMeasurements.fullLength}"</strong></div>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#aaaaaa', marginTop: '14px' }}>
                  Preferred Fabric: {userMeasurements.fabricType}
                </p>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div>
                {wishlistProducts.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: '#0a0a0a',
                          border: '1px solid rgba(255,255,255,0.1)',
                          padding: '12px',
                          display: 'flex',
                          gap: '12px',
                          borderRadius: '4px'
                        }}
                      >
                        <img src={p.images[0]} alt={p.name} style={{ width: '60px', height: '80px', objectFit: 'cover' }} />
                        <div>
                          <h5 style={{ fontSize: '0.9rem', color: '#ffffff', margin: '0 0 4px' }}>{p.name}</h5>
                          <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: '700' }}>{formatPrice(p.priceNGN)}</span>
                          <button
                            onClick={() => addToCart(p, p.colors[0]?.name || 'Gold', p.sizes[0] || 'M', 1)}
                            style={{
                              display: 'block',
                              marginTop: '8px',
                              background: '#d4af37',
                              color: '#0a0a0a',
                              border: 'none',
                              padding: '4px 10px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
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
                  <p style={{ textAlign: 'center', color: '#888888', padding: '30px 0' }}>
                    Your wishlist is currently empty.
                  </p>
                )}
              </div>
            )}
          </DashboardContainer>
        ) : (
          /* NOT LOGGED IN AUTH FORM VIEW */
          <AuthContainer>
            <button className="close-top" onClick={handleClose}>
              <FiX />
            </button>

            <div className="auth-header">
              <img src="/rklogo.png" alt="RICHEEKAY Logo" className="brand-mark" />
              <h2>RICHEEKAY VIP Hub</h2>
              <p>Sign in or create a VIP account to save measurements & earn loyalty rewards.</p>
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
              {authMode === 'register' && (
                <div className="input-group">
                  <FiUser className="icon" />
                  <input
                    type="text"
                    placeholder="Full Name (e.g. Chief Mrs. Elizabeth)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <FiMail className="icon" />
                <input
                  type="email"
                  placeholder="Email Address"
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

              {authMode === 'register' && (
                <div className="input-group">
                  <FiPhone className="icon" />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional for VIP delivery notifications)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}

              <button type="submit" className="submit-btn">
                {authMode === 'register' ? 'CREATE VIP ACCOUNT (+1,500 POINTS)' : 'SIGN IN TO VIP HUB'}
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
              👑 Quick Demo Login (As Chief Mrs. Elizabeth)
            </button>
          </AuthContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};
