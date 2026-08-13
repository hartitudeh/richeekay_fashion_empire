'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp, FaYoutube, FaPinterestP } from 'react-icons/fa6';
import { FiMail, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #0a0a0a;
  color: #ffffff;
  border-top: 1px solid rgba(212, 175, 55, 0.4);
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
      color: #d4af37;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }

    .sub {
      font-size: 0.65rem;
      letter-spacing: 3px;
      color: #f8f5ef;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    p {
      font-size: 0.9rem;
      color: #bbbbbb;
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
        background: #1f1f1f;
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: #d4af37;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: all 0.3s ease;

        &:hover {
          background: #d4af37;
          color: #0a0a0a;
          transform: translateY(-3px);
        }
      }
    }
  }

  .link-col {
    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.2rem;
      color: #ffffff;
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
        background: #d4af37;
      }
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;

      a {
        color: #aaaaaa;
        text-decoration: none;
        font-size: 0.85rem;
        transition: color 0.3s ease;

        &:hover {
          color: #d4af37;
          padding-left: 4px;
        }
      }
    }
  }

  .newsletter-col {
    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.2rem;
      color: #ffffff;
      margin-bottom: 12px;
    }

    p {
      font-size: 0.85rem;
      color: #aaaaaa;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .form-box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input {
        background: #1f1f1f;
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: #ffffff;
        padding: 12px 14px;
        font-size: 0.85rem;

        &:focus {
          outline: none;
          border-color: #d4af37;
        }
      }

      button {
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 12px 0;
        border: none;
        cursor: pointer;

        &:hover {
          background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
        }
      }
    }
  }

  .bottom-bar {
    max-width: 1350px;
    margin: 0 auto;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #888888;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .payment-badges {
      display: flex;
      gap: 10px;

      span {
        background: #1f1f1f;
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: #d4af37;
        padding: 4px 10px;
        font-size: 0.7rem;
        font-weight: 600;
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
              src="/logo.png"
              alt="RICHEEKAY FASHION EMPIRE Official Logo"
              style={{
                height: '75px',
                width: 'auto',
                marginBottom: '16px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))',
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
            <a href="https://wa.me/2348007424335" target="_blank" rel="noreferrer" title="WhatsApp VIP">
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
              <p style={{ color: '#D4AF37', fontSize: '0.8rem', marginTop: '6px' }}>
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
