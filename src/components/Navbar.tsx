'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop, Currency } from '../context/ShopContext';
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiScissors,
  FiTruck,
  FiClock,
  FiShield
} from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(25px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(212, 175, 55, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
`;

const FixedNavbarWrapper = styled.div<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1100;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 10px 30px rgba(0, 0, 0, 0.9)' : '0 4px 20px rgba(0,0,0,0.4)'};
`;

const HeaderSpacer = styled.div<{ $scrolled: boolean }>`
  height: 110px;
  transition: height 0.3s ease;

  @media (max-width: 768px) {
    height: 125px;
  }
`;

const TopBanner = styled.div<{ $scrolled: boolean }>`
  background: linear-gradient(90deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%);
  border-bottom: 1px solid rgba(201, 162, 39, 0.3);
  padding: ${({ $scrolled }) => ($scrolled ? '4px 24px' : '8px 24px')};
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f8f5ef;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
    text-align: center;
    padding: ${({ $scrolled }) => ($scrolled ? '4px 12px' : '6px 12px')};

    .hidden-mobile {
      display: none;
    }
  }
`;

const NavHeader = styled.header<{ $scrolled: boolean }>`
  position: relative;
  width: 100%;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(10, 10, 10, 0.96)' : 'rgba(10, 10, 10, 0.90)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid
    ${({ $scrolled }) => ($scrolled ? 'rgba(212, 175, 55, 0.5)' : 'rgba(201, 162, 39, 0.25)')};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div<{ $scrolled: boolean }>`
  max-width: 1350px;
  margin: 0 auto;
  padding: ${({ $scrolled }) => ($scrolled ? '10px 24px' : '16px 24px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: padding 0.3s ease;
`;

const LogoText = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #f4e798 0%, #d4af37 50%, #c9a227 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }

  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 3.5px;
    color: #f8f5ef;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

const MobileQuickActions = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    width: 100%;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);

    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(31, 31, 31, 0.8);
      border: 1px solid rgba(212, 175, 55, 0.3);
      padding: 10px 4px;
      color: #ffffff;
      text-decoration: none;
      font-size: 0.7rem;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;

      &.gold {
        border-color: #d4af37;
        color: #d4af37;
      }

      .icon {
        font-size: 1.2rem;
        margin-bottom: 4px;
        color: #d4af37;
      }

      &:hover, &:active {
        background: #d4af37;
        color: #0a0a0a;

        .icon {
          color: #0a0a0a;
        }
      }
    }
  }
`;

const NavLinks = styled.nav<{ $mobileOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;

  a.nav-item {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 1px;
    color: #ffffff;
    text-decoration: none;
    text-transform: uppercase;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color: #d4af37;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #d4af37;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    display: ${({ $mobileOpen }) => ($mobileOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    flex-direction: column;
    padding: 24px 18px;
    gap: 14px;
    border-bottom: 1px solid #d4af37;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95);
    z-index: 999;
    animation: ${slideDown} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

    a.nav-item {
      width: 100%;
      padding: 10px 14px;
      font-size: 0.95rem;
      border-left: 2px solid transparent;
      opacity: 0;
      animation: ${fadeInRight} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;

      &:nth-of-type(1) { animation-delay: 0.04s; }
      &:nth-of-type(2) { animation-delay: 0.08s; }
      &:nth-of-type(3) { animation-delay: 0.12s; }
      &:nth-of-type(4) { animation-delay: 0.16s; }
      &:nth-of-type(5) { animation-delay: 0.20s; }
      &:nth-of-type(6) { animation-delay: 0.24s; }
      &:nth-of-type(7) { animation-delay: 0.28s; }
      &:nth-of-type(8) { animation-delay: 0.32s; }

      &:hover {
        border-left: 3px solid #d4af37;
        background: rgba(212, 175, 55, 0.12);
        padding-left: 18px;
        color: #d4af37;
      }
    }
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .desktop-icons {
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  .mobile-header-cart {
    display: none;

    @media (max-width: 1024px) {
      display: flex;
    }
  }

  .nav-icon-btn {
    background: rgba(31, 31, 31, 0.8);
    border: 1px solid rgba(212, 175, 55, 0.3);
    color: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d4af37;
      color: #d4af37;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
      transform: translateY(-2px);
    }
  }

  .badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #d4af37;
    color: #0a0a0a;
    font-size: 0.65rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuToggler = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: ${({ $isOpen }) => ($isOpen ? '#D4AF37' : 'rgba(31, 31, 31, 0.9)')};
  border: 1px solid #d4af37;
  color: ${({ $isOpen }) => ($isOpen ? '#0A0A0A' : '#D4AF37')};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg) scale(1.08)' : 'rotate(0deg) scale(1)')};
  animation: ${({ $isOpen }) => ($isOpen ? pulseGlow : 'none')} 1.5s infinite;

  &:hover {
    background: #d4af37;
    color: #0a0a0a;
    box-shadow: 0 0 16px rgba(212, 175, 55, 0.8);
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsOrderTrackerOpen,
    setIsUserDashboardOpen,
    setIsAdminPortalOpen
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <FixedNavbarWrapper $scrolled={scrolled}>
        <TopBanner $scrolled={scrolled}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>
              <FiShield style={{ color: '#D4AF37', marginRight: '4px' }} />
              100% Original Luxury Products
            </span>
            <span className="hidden-mobile">|</span>
            <span>
              <FiTruck style={{ color: '#D4AF37', marginRight: '4px' }} />
              Express 24-48h Delivery
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/order-tracking" style={{ color: '#F8F5EF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiClock style={{ color: '#D4AF37' }} /> Track Order
            </Link>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              style={{
                background: '#1F1F1F',
                color: '#D4AF37',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '2px 8px',
                fontSize: '0.75rem',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </TopBanner>

        <NavHeader $scrolled={scrolled}>
          <NavContainer $scrolled={scrolled}>
            <LogoText href="/">
              <h1>RICHEEKAY</h1>
              <span>FASHION EMPIRE</span>
            </LogoText>

            <NavLinks $mobileOpen={mobileMenuOpen}>
              {/* Mobile Quick Action Toolbar inside expanded drawer */}
              <MobileQuickActions>
                <div className="action-item" onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}>
                  <FiSearch className="icon" />
                  <span>Search</span>
                </div>

                <Link href="/dashboard" className="action-item" onClick={() => setMobileMenuOpen(false)}>
                  <FiHeart className="icon" />
                  <span>Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</span>
                </Link>

                <div className="action-item" onClick={() => { setIsCartDrawerOpen(true); setMobileMenuOpen(false); }}>
                  <FiShoppingBag className="icon" />
                  <span>Bag {cartCount > 0 && `(${cartCount})`}</span>
                </div>

                <Link href="/dashboard" className="action-item" onClick={() => setMobileMenuOpen(false)}>
                  <FiUser className="icon" />
                  <span>Account</span>
                </Link>

                <Link href="/admin" className="action-item gold" onClick={() => setMobileMenuOpen(false)}>
                  <MdAdminPanelSettings className="icon" />
                  <span>Admin</span>
                </Link>
              </MobileQuickActions>

              <Link href="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/shop" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link href="/collections" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
              <Link href="/tailoring" className="nav-item" onClick={() => setMobileMenuOpen(false)} style={{ color: '#D4AF37' }}>
                <FiScissors style={{ marginRight: '4px' }} /> Custom Fitting
              </Link>
              <Link href="/gallery" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
              <Link href="/about" className="nav-item" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/blog" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Editorial</Link>
              <Link href="/contact" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </NavLinks>

            <IconGroup>
              {/* Desktop Action Icons (>1024px) */}
              <div className="desktop-icons">
                <button className="nav-icon-btn" onClick={() => setIsSearchOpen(true)} title="Live Search">
                  <FiSearch />
                </button>

                <Link href="/dashboard" className="nav-icon-btn" title="Wishlist & Account">
                  <FiHeart />
                  {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                </Link>

                <button className="nav-icon-btn" onClick={() => setIsCartDrawerOpen(true)} title="Shopping Bag">
                  <FiShoppingBag />
                  {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>

                <Link href="/dashboard" className="nav-icon-btn" title="VIP Account">
                  <FiUser />
                </Link>

                <Link href="/admin" className="nav-icon-btn" title="Executive Admin Portal" style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                  <MdAdminPanelSettings />
                </Link>
              </div>

              {/* Mobile Bar Quick Cart Icon (<=1024px) */}
              <div className="mobile-header-cart">
                <button className="nav-icon-btn" onClick={() => setIsCartDrawerOpen(true)} title="Shopping Bag">
                  <FiShoppingBag />
                  {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>
              </div>

              {/* Mobile & iPad Hamburger Menu Toggle Button */}
              <MobileMenuToggler
                $isOpen={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </MobileMenuToggler>
            </IconGroup>
          </NavContainer>
        </NavHeader>
      </FixedNavbarWrapper>

      {/* Spacer to prevent page content overlap beneath fixed header */}
      <HeaderSpacer $scrolled={scrolled} />
    </>
  );
};
