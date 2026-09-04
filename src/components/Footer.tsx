'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp, FaYoutube, FaPinterestP } from 'react-icons/fa6';
import { FiMail, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #faf8f5;
  color: #1a1a1a;
  border-top: 1px solid rgba(201, 162, 39, 0.35);
  box-shadow: 0 -12px 35px rgba(0, 0, 0, 0.08), 0 -4px 15px rgba(201, 162, 39, 0.1);
  position: relative;
  z-index: 10;
  padding: 80px 24px 30px;

  .footer-container {
    max-width: 1350px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 40px;
    margin-bottom: 60px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .brand-col {
    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #b8860b;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }

    .sub {
      font-size: 0.65rem;
      letter-spacing: 3px;
      color: #555555;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    p {
      font-size: 0.9rem;
      color: #555555;
      line-height: 1.6;
      max-width: 380px;
      margin-bottom: 24px;
    }

    .social-icons {
      display: flex;
      gap: 12px;

      a {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #ffffff;
        border: 1px solid rgba(201, 162, 39, 0.35);
        color: #b8860b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

        &:hover {
          background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
          color: #ffffff;
          transform: translateY(-3px);
          border-color: #c9a227;
        }
      }
    }
  }

  .link-col {
    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.2rem;
      color: #1a1a1a;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 8px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30px;
        height: 2px;
        background: #c9a227;
      }
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;

      a {
        color: #555555;
        text-decoration: none;
        font-size: 0.85rem;
        transition: color 0.3s ease;

        &:hover {
          color: #b8860b;
          padding-left: 4px;
        }
      }
    }
  }

  .newsletter-col {
    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.2rem;
      color: #1a1a1a;
      margin-bottom: 12px;
    }

    p {
      font-size: 0.85rem;
      color: #555555;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .form-box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input {
        background: #ffffff;
        border: 1px solid rgba(201, 162, 39, 0.4);
        border-radius: 4px;
        color: #1a1a1a;
        padding: 12px 14px;
        font-size: 0.85rem;

        &:focus {
          outline: none;
          border-color: #b8860b;
          box-shadow: 0 0 10px rgba(201, 162, 39, 0.15);
        }

        &::placeholder {
          color: #888888;
        }
      }

      button {
        background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
        color: #ffffff;
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 12px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        }
      }
    }
  }

  .bottom-bar {
    max-width: 1350px;
    margin: 0 auto;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #666666;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .payment-badges {
      display: flex;
      gap: 10px;

      span {
        background: #ffffff;
        border: 1px solid rgba(201, 162, 39, 0.3);
        color: #b8860b;
        padding: 4px 10px;
        font-size: 0.7rem;
        font-weight: 600;
        border-radius: 3px;
      }
    }
  }
`;

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <FooterWrapper id="contact">
      <div className="footer-container">
        <div className="brand-col">
          <Link href="/" title="RICHEEKAY FASHION EMPIRE">
            <img
              src="/modallogo.png"
              alt="RICHEEKAY FASHION EMPIRE Official Logo"
              style={{
                height: '75px',
                width: 'auto',
                marginBottom: '16px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Link>
          <p>
            Premium luxury ladies' fashion boutique specializing in bespoke haute couture gowns, native Aso-Ebi wear, Senator materials, 100% virgin wigs, heels & designer handbags.
          </p>

          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok">
              <FaTiktok />
            </a>
            <a href="https://wa.me/2348084278440" target="_blank" rel="noreferrer" title="WhatsApp VIP">
              <FaWhatsapp />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
              <FaYoutube />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" title="Pinterest">
              <FaPinterestP />
            </a>
          </div>
        </div>

        <div className="link-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop Catalog</Link></li>
            <li><Link href="/collections">Empire Lookbooks</Link></li>
            <li><Link href="/tailoring">Bespoke Tailoring</Link></li>
            <li><Link href="/gallery">Couture Gallery</Link></li>
            <li><Link href="/about">Brand Heritage</Link></li>
            <li><Link href="/blog">Editorial Journal</Link></li>
            <li><Link href="/contact">Contact & Stores</Link></li>
          </ul>
        </div>

        <div className="link-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link href="/richeekay-loyalty-program" style={{ color: '#b8860b', fontWeight: 600 }}>👑 RICHEEKAY Royalty Program</Link></li>
            <li><Link href="/#faq">Frequently Asked Questions (FAQ)</Link></li>
            <li><Link href="/order-tracking">Track Order Status</Link></li>
            <li><Link href="/dashboard">VIP Account Hub</Link></li>
            <li><Link href="/cart">Shopping Bag</Link></li>
            <li><Link href="/checkout">Express Checkout</Link></li>
            <li><Link href="/admin">Executive Admin Portal</Link></li>
          </ul>
        </div>

        <div className="newsletter-col">
          <h4>VIP Club Newsletter</h4>
          <p>Subscribe for private sample sales, new arrival notifications, and fashion styling tips.</p>

          <form onSubmit={handleSubscribe} className="form-box">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">JOIN VIP CLUB</button>

            {subscribed && (
              <p style={{ color: '#b8860b', fontSize: '0.8rem', marginTop: '6px' }}>
                <FiCheckCircle style={{ marginRight: '4px' }} /> Welcome! Use coupon code <strong>WELCOME15</strong> for 15% off your first order.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="bottom-bar">
        <div>&copy; 2026 RICHEEKAY FASHION EMPIRE. All Rights Reserved.</div>

        <div className="payment-badges">
          <span>PAYSTACK</span>
          <span>FLUTTERWAVE</span>
          <span>VISA</span>
          <span>MASTERCARD</span>
          <span>BANK TRANSFER</span>
        </div>
      </div>
    </FooterWrapper>
  );
};
