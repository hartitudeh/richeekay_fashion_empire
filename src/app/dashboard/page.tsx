'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '../../context/ShopContext';
import { FaCrown } from 'react-icons/fa6';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiShield,
  FiShoppingBag,
  FiHeart,
  FiScissors,
  FiAward,
  FiLogOut,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiCamera,
  FiSmartphone,
  FiLock
} from 'react-icons/fi';
import styled from 'styled-components';

const DashboardPageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  padding: 60px 24px;

  @media (max-width: 768px) {
    padding: 30px 16px;
  }

  .inner-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .header-card {
    background: linear-gradient(135deg, #1c180e 0%, #141414 100%);
    border: 1px solid #d4af37;
    border-radius: 12px;
    padding: 36px 40px;
    margin-bottom: 32px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.15);

    @media (max-width: 768px) {
      padding: 24px 20px;
    }

    .profile-hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;

      .profile-left {
        display: flex;
        align-items: center;
        gap: 24px;

        @media (max-width: 600px) {
          flex-direction: column;
          text-align: center;
          width: 100%;
        }

        .avatar-uploader {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 3px solid #d4af37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          cursor: pointer;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }

          .avatar-placeholder {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
            color: #0a0a0a;
            font-size: 2.8rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cam-badge {
            position: absolute;
            bottom: 2px;
            right: 2px;
            background: #d4af37;
            color: #0a0a0a;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            border: 2px solid #0a0a0a;
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.15);
              background: #ffffff;
            }
          }
        }

        .meta-text {
          h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2rem;
            color: #ffffff;
            margin: 0 0 6px;
          }

          .fashion-bio {
            font-size: 0.9rem;
            color: #d4af37;
            font-weight: 600;
            margin-bottom: 6px;
          }

          .email-tag {
            font-size: 0.82rem;
            color: #aaaaaa;
            display: flex;
            align-items: center;
            gap: 6px;

            @media (max-width: 600px) {
              justify-content: center;
            }
          }
        }
      }

      .crown-tier-badge {
        background: rgba(212, 175, 55, 0.12);
        border: 1px solid #d4af37;
        padding: 14px 24px;
        border-radius: 30px;
        text-align: center;

        @media (max-width: 600px) {
          width: 100%;
        }

        .pts {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #d4af37;
        }

        .lbl {
          font-size: 0.75rem;
          color: #ffffff;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
      }
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 32px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .sidebar {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 10px;
    padding: 20px 16px;
    height: fit-content;

    .nav-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      color: #aaaaaa;
      padding: 14px 16px;
      border-radius: 6px;
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s ease;
      margin-bottom: 6px;

      &:hover {
        background: rgba(212, 175, 55, 0.08);
        color: #d4af37;
      }

      &.active {
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 700;
      }
    }
  }

  .main-content {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 10px;
    padding: 32px;

    @media (max-width: 600px) {
      padding: 20px 16px;
    }

    .content-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.6rem;
      color: #d4af37;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

export default function DashboardPage() {
  const {
    currentUser,
    updateUserProfile,
    orders,
    wishlist,
    products,
    userMeasurements,
    saveUserMeasurements,
    formatPrice,
    addToCart,
    userLogout
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'royalty' | 'measurements'>('profile');

  // Input states
  const [name, setName] = useState(currentUser?.name || 'Chief Mrs. Elizabeth');
  const [bio, setBio] = useState(currentUser?.bio || 'Royalty Fashion & Aso-Ebi Icon');
  const [phone, setPhone] = useState(currentUser?.phone || '+234 808 427 8440');
  const [address, setAddress] = useState(currentUser?.address || 'Victoria Island, Lagos State');
  const [copied, setCopied] = useState(false);

  // Fitting measurements state
  const [bust, setBust] = useState(userMeasurements.bust || '36');
  const [waist, setWaist] = useState(userMeasurements.waist || '28');
  const [hips, setHips] = useState(userMeasurements.hips || '40');
  const [shoulder, setShoulder] = useState(userMeasurements.shoulder || '15');
  const [sleeve, setSleeve] = useState(userMeasurements.sleeve || '24');
  const [fullLength, setFullLength] = useState(userMeasurements.fullLength || '58');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Profile image upload handler (converts to base64 Data URL)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateUserProfile({ avatar: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      bio,
      phone,
      address
    });
    alert('✨ Your VIP profile details have been saved locally!');
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
    alert('✂️ Fitting measurements saved locally to your device!');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://richeekay-fashion-empire.vercel.app/richeekay-loyalty-program?ref=VIP849');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  const userEmail = currentUser?.email || 'client@richeekay.com';
  const userPoints = currentUser?.points || 1250;

  return (
    <DashboardPageWrapper>
      <div className="inner-container">
        {/* HEADER HERO CARD */}
        <div className="header-card">
          <div className="profile-hero">
            <div className="profile-left">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <div
                className="avatar-uploader"
                onClick={() => fileInputRef.current?.click()}
                title="Click to Upload Profile Photo"
              >
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="Profile Photo" />
                ) : (
                  <div className="avatar-placeholder">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="cam-badge">
                  <FiCamera />
                </div>
              </div>

              <div className="meta-text">
                <h1>{name}</h1>
                <div className="fashion-bio">✨ {bio}</div>
                <div className="email-tag">
                  <FiMail /> {userEmail} • <FiSmartphone /> Saved on Device
                </div>
              </div>
            </div>

            <div className="crown-tier-badge">
              <div className="pts">{userPoints.toLocaleString()} PTS</div>
              <div className="lbl">👑 Royal Sovereign VIP</div>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid-layout">
          {/* SIDEBAR */}
          <div className="sidebar">
            <button
              className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser /> My Profile & Photo
            </button>
            <button
              className={`nav-btn ${activeTab === 'royalty' ? 'active' : ''}`}
              onClick={() => setActiveTab('royalty')}
            >
              <FaCrown /> Royalty Club & Points
            </button>
            <button
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingBag /> Purchase History ({orders.length})
            </button>
            <button
              className={`nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <FiHeart /> Liked Couture ({wishlist.length})
            </button>
            <button
              className={`nav-btn ${activeTab === 'measurements' ? 'active' : ''}`}
              onClick={() => setActiveTab('measurements')}
            >
              <FiScissors /> Fitting Measurements
            </button>
            <button
              className="nav-btn"
              onClick={userLogout}
              style={{ color: '#ff4d4d', marginTop: '16px' }}
            >
              <FiLogOut /> Sign Out
            </button>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="main-content">
            {/* TAB 1: PROFILE & PHOTO */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="content-title">
                  <FiUser /> Edit VIP Profile & Photo
                </h3>

                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cccccc', display: 'block', marginBottom: '6px' }}>
                      Profile Photo
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: 'rgba(212,175,55,0.15)',
                        border: '1px solid #d4af37',
                        color: '#d4af37',
                        padding: '10px 18px',
                        borderRadius: '30px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FiCamera /> Choose New Profile Picture
                    </button>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cccccc', display: 'block', marginBottom: '6px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: '6px',
                        color: '#ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cccccc', display: 'block', marginBottom: '6px' }}>
                      Fashion Bio / Tagline
                    </label>
                    <input
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: '6px',
                        color: '#ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cccccc', display: 'block', marginBottom: '6px' }}>
                      Phone Number (Saved on Phone)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: '6px',
                        color: '#ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cccccc', display: 'block', marginBottom: '6px' }}>
                      Primary Boutique Delivery Address (Saved on Phone)
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: '6px',
                        color: '#ffffff'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                      color: '#0a0a0a',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '30px',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      width: 'fit-content'
                    }}
                  >
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: ROYALTY CLUB */}
            {activeTab === 'royalty' && (
              <div>
                <h3 className="content-title">
                  <FaCrown /> RICHEEKAY Royalty Club & Gold Points
                </h3>

                <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px dashed #d4af37', padding: '24px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#d4af37', fontFamily: "'Playfair Display', serif" }}>
                    {userPoints.toLocaleString()} GOLD POINTS
                  </div>
                  <div style={{ fontSize: '1rem', color: '#ffffff', marginTop: '6px', fontWeight: '600' }}>
                    Cash Discount Value: <span style={{ color: '#25d366' }}>₦{(userPoints * 2).toLocaleString()} OFF</span> at Checkout
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#aaaaaa', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Progress to Empire VIP Dynasty Tier</span>
                    <span style={{ color: '#d4af37' }}>{userPoints.toLocaleString()} / 50,000 Pts</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#222222', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: '15%', height: '100%', background: 'linear-gradient(90deg, #c9a227 0%, #d4af37 100%)' }} />
                  </div>
                </div>

                <div style={{ background: '#0a0a0a', padding: '16px 20px', borderRadius: '6px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{ fontSize: '0.88rem', color: '#cccccc' }}>Your VIP Referral Link (+1,500 Pts per friend):</span>
                  <button
                    onClick={handleCopyReferral}
                    style={{
                      background: '#d4af37',
                      color: '#0a0a0a',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FiCopy /> {copied ? 'Copied!' : 'Copy Invite Link'}
                  </button>
                </div>

                <Link
                  href="/richeekay-loyalty-program"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#d4af37',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textDecoration: 'underline'
                  }}
                >
                  View Full Royalty Program Terms & Tiers &rarr;
                </Link>
              </div>
            )}

            {/* TAB 3: ORDERS */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="content-title">
                  <FiShoppingBag /> Purchase History
                </h3>

                {orders.length > 0 ? (
                  orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid rgba(212,175,55,0.3)',
                        padding: '20px',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontWeight: '700', color: '#d4af37', fontSize: '1rem' }}>Order #{o.id}</span>
                        <span style={{ fontSize: '0.85rem', color: '#aaaaaa' }}>{o.date}</span>
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#cccccc', marginBottom: '14px' }}>
                        Total Paid: <strong style={{ color: '#ffffff' }}>{formatPrice(o.totalNGN)}</strong> | Status:{' '}
                        <span style={{ color: '#25d366', fontWeight: '700' }}>{o.status}</span>
                      </div>
                      <button
                        onClick={() => router.push(`/order-tracking?orderId=${o.id}`)}
                        style={{
                          background: 'rgba(212,175,55,0.15)',
                          border: '1px solid #d4af37',
                          color: '#d4af37',
                          padding: '8px 18px',
                          fontSize: '0.82rem',
                          borderRadius: '30px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <FiExternalLink /> Track Order Status
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', color: '#888888', padding: '40px 0' }}>
                    <FiShoppingBag style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '10px' }} />
                    <p style={{ fontSize: '1rem' }}>No purchase history found on this device.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                <h3 className="content-title">
                  <FiHeart /> Liked Couture ({wishlist.length})
                </h3>

                {wishlistProducts.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: '#0a0a0a',
                          border: '1px solid rgba(255,255,255,0.12)',
                          padding: '16px',
                          display: 'flex',
                          gap: '16px',
                          borderRadius: '8px',
                          alignItems: 'center'
                        }}
                      >
                        <img src={p.images[0]} alt={p.name} style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                          <h5 style={{ fontSize: '0.95rem', color: '#ffffff', margin: '0 0 6px' }}>{p.name}</h5>
                          <span style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: '700' }}>{formatPrice(p.priceNGN)}</span>
                          <button
                            onClick={() => addToCart(p, p.colors[0]?.name || 'Gold', p.sizes[0] || 'M', 1)}
                            style={{
                              display: 'block',
                              marginTop: '10px',
                              background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                              color: '#0a0a0a',
                              border: 'none',
                              padding: '8px 16px',
                              fontSize: '0.78rem',
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
                    <FiHeart style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '10px' }} />
                    <p style={{ fontSize: '1rem' }}>Your wishlist is currently empty.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: MEASUREMENTS */}
            {activeTab === 'measurements' && (
              <form onSubmit={handleSaveMeasurements}>
                <h3 className="content-title">
                  <FiScissors /> Bespoke Fitting Measurements
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Bust (Inches)</label>
                    <input
                      type="text"
                      value={bust}
                      onChange={(e) => setBust(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Waist (Inches)</label>
                    <input
                      type="text"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Hips (Inches)</label>
                    <input
                      type="text"
                      value={hips}
                      onChange={(e) => setHips(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Shoulder (Inches)</label>
                    <input
                      type="text"
                      value={shoulder}
                      onChange={(e) => setShoulder(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Sleeve Length</label>
                    <input
                      type="text"
                      value={sleeve}
                      onChange={(e) => setSleeve(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cccccc', display: 'block', marginBottom: '4px' }}>Full Dress Length</label>
                    <input
                      type="text"
                      value={fullLength}
                      onChange={(e) => setFullLength(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', color: '#ffffff' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 100%)',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '30px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Save Fitting Profile to Device
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}

