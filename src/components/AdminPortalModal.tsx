'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Product } from '../data/productsData';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';
import { MdAdminPanelSettings, MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FiX, FiCheckCircle, FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp, FiLock, FiLogOut, FiShield, FiAlertTriangle } from 'react-icons/fi';
import styled from 'styled-components';

const LoginContainer = styled.div`
  background: #ffffff;
  border: 1px solid #c9a227;
  border-radius: 12px;
  padding: 44px 32px;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: #1a1a1a;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
  position: relative;

  .close-top {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #555555;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #b8860b;
    }
  }

  .lock-badge {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(201, 162, 39, 0.12);
    border: 1px solid #c9a227;
    color: #b8860b;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 0 20px rgba(201, 162, 39, 0.15);
  }

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2rem;
    color: #1a1a1a;
    margin-bottom: 6px;

    span {
      color: #b8860b;
    }
  }

  p.subtitle {
    font-size: 0.85rem;
    color: #666666;
    margin-bottom: 28px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
    margin-bottom: 18px;

    label {
      font-size: 0.75rem;
      color: #b8860b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
    }

    input {
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.35);
      border-radius: 4px;
      color: #1a1a1a;
      padding: 14px 16px;
      font-size: 0.95rem;

      &:focus {
        outline: none;
        border-color: #b8860b;
        box-shadow: 0 0 10px rgba(201, 162, 39, 0.2);
      }
    }
  }

  .login-btn {
    width: 100%;
    background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #b8860b 0%, #966d09 100%);
      box-shadow: 0 4px 20px rgba(201, 162, 39, 0.3);
    }
  }

  .security-note {
    margin-top: 24px;
    font-size: 0.75rem;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
`;

const AdminContainer = styled.div`
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #c9a227;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
  position: relative;

  .close-top {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: #555555;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #b8860b;
    }
  }

  .admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(201, 162, 39, 0.3);
    padding-bottom: 16px;
    padding-right: 40px;

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        color: #b8860b;
      }
    }

    .logout-btn {
      background: rgba(255, 77, 77, 0.1);
      border: 1px solid #ff4d4d;
      color: #d32f2f;
      font-size: 0.8rem;
      font-weight: bold;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;

      &:hover {
        background: #d32f2f;
        color: #ffffff;
      }
    }
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    .kpi-card {
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.3);
      border-radius: 8px;
      padding: 18px;

      .icon {
        color: #b8860b;
        font-size: 1.4rem;
        margin-bottom: 8px;
      }
      .val {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.6rem;
        font-weight: 700;
        color: #1a1a1a;
      }
      .lbl {
        font-size: 0.75rem;
        color: #666666;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;

    th, td {
      padding: 12px 14px;
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      font-size: 0.85rem;
      color: #1a1a1a;
    }

    th {
      color: #b8860b;
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
      background: #faf8f5;
    }
  }

  .action-btn {
    background: none;
    border: 1px solid rgba(201, 162, 39, 0.4);
    color: #b8860b;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    margin-right: 6px;
    transition: all 0.2s ease;

    &:hover {
      background: #c9a227;
      color: #ffffff;
    }
  }
`;

export const AdminPortalModal: React.FC = () => {
  const {
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    products,
    addProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice
  } = useShop();

  const [activeTab, setActiveTab] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCat, setNewProdCat] = useState('ladies-wear');
  const [newProdImg, setNewProdImg] = useState('');
  const [prodAddedSuccess, setProdAddedSuccess] = useState(false);

  const safeClose = useSafeCloseModal();

  const handleLogoutAndHome = () => {
    adminLogout();
    safeClose(() => setIsAdminPortalOpen(false));
  };

  const handleCloseAndHome = () => {
    safeClose(() => setIsAdminPortalOpen(false));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(emailInput, passInput);
    if (!success) {
      setLoginError('Invalid Executive Admin Email, Password, or PIN.');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const pPrice = parseFloat(newProdPrice);
    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: newProdName,
      priceNGN: pPrice,
      priceUSD: Math.round(pPrice / 1500),
      priceGBP: Math.round(pPrice / 1900),
      category: newProdCat,
      collection: 'Executive CMS Collection',
      rating: 5.0,
      reviewCount: 1,
      stockCount: 15,
      images: [newProdImg || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80'],
      description: 'Handcrafted luxury piece added via Executive CMS.',
      details: ['Handmade in Lagos Atelier', '100% Authentic Material'],
      colors: [{ name: 'Standard Gold', hex: '#D4AF37' }],
      sizes: ['S', 'M', 'L', 'XL']
    };

    addProduct(newProd);
    setProdAddedSuccess(true);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdImg('');
    setTimeout(() => setProdAddedSuccess(false), 3000);
  };

  return (
    <Dialog
      open={isAdminPortalOpen}
      onClose={handleCloseAndHome}
      maxWidth={isAdminLoggedIn ? "lg" : "sm"}
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
      <DialogContent style={{ background: 'transparent', border: 'none', padding: 0, overflow: 'visible' }}>
        {!isAdminLoggedIn ? (
          /* Executive Security Auth Form */
          <LoginContainer>
            <button className="close-top" onClick={handleCloseAndHome} aria-label="Close modal">
              <FiX />
            </button>

            <img src="/modallogo.png" alt="RICHEEKAY Official Logo" style={{ height: '70px', width: 'auto', margin: '0 auto 16px', display: 'block', objectFit: 'contain' }} />
            <div className="lock-badge">
              <FiLock />
            </div>
            <h2>EXECUTIVE <span>ADMIN AUTH</span></h2>
            <p className="subtitle">RICHEEKAY Fashion Empire CMS Control Center</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Executive Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin@richeekay.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password or Master Security PIN</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password or 4-digit PIN"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                />
              </div>

              {loginError && (
                <div style={{ color: '#d32f2f', fontSize: '0.8rem', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <FiAlertTriangle /> {loginError}
                </div>
              )}

              <button type="submit" className="login-btn">
                Unlock Admin Portal
              </button>
            </form>

            <div className="security-note">
              <FiShield style={{ color: '#b8860b' }} /> Authorized personnel only. Encrypted Executive Gateway.
            </div>
          </LoginContainer>
        ) : (
          /* Full Admin Dashboard */
          <AdminContainer>
            <button className="close-top" onClick={handleCloseAndHome} aria-label="Close modal">
              <FiX />
            </button>
            <div className="admin-header">
              <h2>
                <MdAdminPanelSettings /> RICHEEKAY CMS & PORTAL CONTROL
              </h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button className="logout-btn" onClick={handleLogoutAndHome}>
                  <FiLogOut /> Lock / Logout
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <FiDollarSign className="icon" />
                <div className="val">{formatPrice(98500000)}</div>
                <div className="lbl">Total Gross Revenue</div>
              </div>
              <div className="kpi-card">
                <FiShoppingBag className="icon" />
                <div className="val">{orders.length + 142}</div>
                <div className="lbl">Total Orders Processed</div>
              </div>
              <div className="kpi-card">
                <FiUsers className="icon" />
                <div className="val">2,480</div>
                <div className="lbl">VIP Clientele Members</div>
              </div>
              <div className="kpi-card">
                <FiTrendingUp className="icon" />
                <div className="val">{products.length}</div>
                <div className="lbl">Active Catalog Products</div>
              </div>
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'rgba(201, 162, 39, 0.3)', mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                textColor="inherit"
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: '#c9a227' }
                }}
              >
                <Tab label="Products Catalog Manager" style={{ color: activeTab === 0 ? '#b8860b' : '#555555', fontWeight: activeTab === 0 ? 700 : 500 }} />
                <Tab label="Add New Product" style={{ color: activeTab === 1 ? '#b8860b' : '#555555', fontWeight: activeTab === 1 ? 700 : 500 }} />
                <Tab label="Live Customer Orders" style={{ color: activeTab === 2 ? '#b8860b' : '#555555', fontWeight: activeTab === 2 ? 700 : 500 }} />
              </Tabs>
            </Box>

            {/* Tab 0: Product Catalog */}
            {activeTab === 0 && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price (NGN)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{formatPrice(p.priceNGN)}</td>
                      <td style={{ color: p.stockCount > 0 ? '#2e7d32' : '#d32f2f', fontWeight: 600 }}>
                        {p.stockCount > 0 ? `In Stock (${p.stockCount})` : 'Sold Out'}
                      </td>
                      <td>
                        <button className="action-btn" onClick={() => deleteProduct(p.id)}>
                          <MdOutlineDelete /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Tab 1: Add Product Form */}
            {activeTab === 1 && (
              <form onSubmit={handleAddProduct} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#b8860b', fontWeight: 700, marginBottom: '6px' }}>Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Emerald Satin Gala Dress"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    style={{ width: '100%', background: '#faf8f5', border: '1px solid rgba(201, 162, 39, 0.35)', borderRadius: '4px', color: '#1a1a1a', padding: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#b8860b', fontWeight: 700, marginBottom: '6px' }}>Price (NGN ₦)</label>
                  <input
                    type="number"
                    required
                    placeholder="185000"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    style={{ width: '100%', background: '#faf8f5', border: '1px solid rgba(201, 162, 39, 0.35)', borderRadius: '4px', color: '#1a1a1a', padding: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#b8860b', fontWeight: 700, marginBottom: '6px' }}>Category</label>
                  <select
                    value={newProdCat}
                    onChange={(e) => setNewProdCat(e.target.value)}
                    style={{ width: '100%', background: '#faf8f5', border: '1px solid rgba(201, 162, 39, 0.35)', borderRadius: '4px', color: '#1a1a1a', padding: '12px' }}
                  >
                    <option value="men-wear">Gentlemen Wear & Suits</option>
                    <option value="ladies-wear">Ladies Wear & Gowns</option>
                    <option value="native-wear">Royal Native & Agbada</option>
                    <option value="ankara-ofi-materials">Ankara & Ofi Fabrics</option>
                    <option value="senator-materials">Senator Materials</option>
                    <option value="shoes-sneakers">Shoes & Sneakers</option>
                    <option value="wristwatches">Luxury Wristwatches</option>
                    <option value="handbags">Handbags & Leather</option>
                    <option value="wigs">Wigs & Hair</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#b8860b', fontWeight: 700, marginBottom: '6px' }}>Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    style={{ width: '100%', background: '#faf8f5', border: '1px solid rgba(201, 162, 39, 0.35)', borderRadius: '4px', color: '#1a1a1a', padding: '12px' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #c9a227 0%, #b8860b 100%)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '14px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  <MdOutlineAddBox style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Publish Product to Store
                </button>

                {prodAddedSuccess && (
                  <p style={{ color: '#2e7d32', fontSize: '0.85rem', fontWeight: 600 }}>
                    <FiCheckCircle /> Product published successfully to active catalog!
                  </p>
                )}
              </form>
            )}

            {/* Tab 2: Orders */}
            {activeTab === 2 && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Fulfillment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td style={{ color: '#b8860b', fontWeight: 700 }}>{ord.id}</td>
                      <td>{ord.customerName} ({ord.customerPhone})</td>
                      <td>{formatPrice(ord.totalNGN)}</td>
                      <td>
                        <span style={{
                          background: ord.status === 'Delivered' ? 'rgba(46, 125, 50, 0.15)' : 'rgba(201, 162, 39, 0.15)',
                          color: ord.status === 'Delivered' ? '#2e7d32' : '#b8860b',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {ord.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          style={{ background: '#faf8f5', color: '#1a1a1a', border: '1px solid rgba(201, 162, 39, 0.35)', borderRadius: '4px', padding: '6px' }}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Fabric Cut">Fabric Cut</option>
                          <option value="In Tailoring">In Tailoring</option>
                          <option value="Gold Box Packed">Gold Box Packed</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </AdminContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};
