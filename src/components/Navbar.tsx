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

const TopBanner = styled.div`
  background: linear-gradient(90deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%);
  border-bottom: 1px solid rgba(201, 162, 39, 0.3);
  padding: 8px 24px;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f8f5ef;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
    text-align: center;
    padding: 6px 12px;
  }
`;

const NavHeader = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.85)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid
    ${({ $scrolled }) => ($scrolled ? 'rgba(212, 175, 55, 0.4)' : 'rgba(201, 162, 39, 0.2)')};
  transition: all 0.3s ease;
  box-shadow: ${({ $scrolled }) => ($scrolled ? '0 10px 30px rgba(0,0,0,0.8)' : 'none')};
`;

const NavContainer = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
      font-size: 1.25rem;
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

const NavLinks = styled.nav<{ $mobileOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;

  a {
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
    background: rgba(10, 10, 10, 0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    flex-direction: column;
    padding: 28px 24px;
    gap: 16px;
    border-bottom: 1px solid #d4af37;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95);
    z-index: 999;
    animation: ${slideDown} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

    a {
      width: 100%;
      padding: 10px 14px;
      font-size: 0.95rem;
      border-left: 2px solid transparent;
      opacity: 0;
      animation: ${fadeInRight} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;

      &:nth-child(1) { animation-delay: 0.04s; }
      &:nth-child(2) { animation-delay: 0.08s; }
      &:nth-child(3) { animation-delay: 0.12s; }
      &:nth-child(4) { animation-delay: 0.16s; }
      &:nth-child(5) { animation-delay: 0.20s; }
      &:nth-child(6) { animation-delay: 0.24s; }
      &:nth-child(7) { animation-delay: 0.28s; }
      &:nth-child(8) { animation-delay: 0.32s; }

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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <TopBanner>
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
        <NavContainer>
          <LogoText href="/">
            <h1>RICHEEKAY</h1>
            <span>FASHION EMPIRE</span>
          </LogoText>

          <NavLinks $mobileOpen={mobileMenuOpen}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
            <Link href="/tailoring" onClick={() => setMobileMenuOpen(false)} style={{ color: '#D4AF37' }}>
              <FiScissors style={{ marginRight: '4px' }} /> Custom Fitting
            </Link>
            <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Editorial</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </NavLinks>

          <IconGroup>
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

            {/* Mobile & iPad Hamburger Menu Toggle Button with Animations */}
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
    </>
  );
};
