'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { FiX, FiCheckCircle, FiCopy, FiGift } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUpScale = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -44%) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(8px);
  z-index: 2500;
  animation: ${fadeIn} 0.4s ease-out forwards;
`;

const ModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 860px;
  background: #faf8f5;
  color: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.25);
  z-index: 2501;
  animation: ${slideUpScale} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
    overflow-y: auto;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #1a1a1a;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
      background: #1a1a1a;
      color: #ffffff;
      transform: rotate(90deg);
    }
  }

  .img-col {
    position: relative;
    height: 100%;
    min-height: 520px;
    background-image: url('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80');
    background-size: cover;
    background-position: center;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.35) 100%);
    }

    @media (max-width: 768px) {
      min-height: 240px;
      height: 240px;
    }
  }

  .content-col {
    padding: 44px 40px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    position: relative;

    @media (max-width: 768px) {
      padding: 32px 24px;
    }

    .brand-logo {
      height: 60px;
      width: auto;
      object-fit: contain;
      margin-bottom: 20px;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.1rem;
      color: #1a1a1a;
      font-weight: 500;
      line-height: 1.25;
      margin-bottom: 14px;

      span {
        color: #90293e;
      }
    }

    .divider {
      width: 70px;
      height: 1px;
      background: #c9a227;
      margin: 4px 0 18px;
    }

    p.main-desc {
      font-size: 0.92rem;
      color: #4a4a4a;
      line-height: 1.6;
      margin-bottom: 12px;
      max-width: 360px;
    }

    p.sub-desc {
      font-size: 0.82rem;
      color: #666666;
      line-height: 1.5;
      margin-bottom: 24px;
      max-width: 340px;
    }

    form {
      width: 100%;
      max-width: 360px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      input {
        width: 100%;
        padding: 14px 16px;
        background: #ffffff;
        border: 1px solid #dcd6cd;
        border-radius: 2px;
        font-size: 0.9rem;
        color: #1a1a1a;
        outline: none;
        transition: border-color 0.3s ease;
        text-align: center;

        &:focus {
          border-color: #90293e;
        }

        &::placeholder {
          color: #999999;
        }
      }

      button {
        width: 100%;
        padding: 16px 20px;
        background: #4a1525;
        color: #ffffff;
        border: none;
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 2px;

        &:hover {
          background: #6e1f37;
          box-shadow: 0 6px 20px rgba(74, 21, 37, 0.4);
        }
      }
    }

    .success-box {
      width: 100%;
      max-width: 360px;
      background: #ffffff;
      border: 1px solid #d4af37;
      padding: 24px 20px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .icon {
        font-size: 2rem;
        color: #d4af37;
      }

      h4 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.3rem;
        color: #1a1a1a;
      }

      .code-badge {
        background: rgba(212, 175, 55, 0.15);
        border: 1px dashed #d4af37;
        color: #4a1525;
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: 3px;
        padding: 10px 20px;
        border-radius: 4px;
        margin: 4px 0;
      }

      .apply-btn {
        width: 100%;
        padding: 12px 0;
        background: #d4af37;
        color: #0a0a0a;
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: #f4e798;
        }
      }
    }

    .micro-copy {
      font-size: 0.73rem;
      color: #888888;
      margin-top: 16px;
    }
  }
`;

export const VipDiscountModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { applyCoupon, setIsCartDrawerOpen } = useShop();

  useEffect(() => {
    // Check if already dismissed in session
    const isDismissed = sessionStorage.getItem('richeekay_vip_promo_dismissed');
    if (isDismissed) return;

    // Set 3-minute timer (180,000 ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 180000); // 3 minutes

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('richeekay_vip_promo_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
    applyCoupon('RICHEEKAY10');
  };

  const handleCopyAndApply = () => {
    applyCoupon('RICHEEKAY10');
    setCopied(true);
    setTimeout(() => {
      handleClose();
      setIsCartDrawerOpen(true);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={handleClose} />
      <ModalCard>
        <button className="close-btn" onClick={handleClose} aria-label="Close VIP Discount Modal">
          <FiX />
        </button>

        <div className="img-col" />

        <div className="content-col">
          <img src="/rklogo.png" alt="RICHEEKAY FASHION EMPIRE Logo" className="brand-logo" />

          {!isSubmitted ? (
            <>
              <h3>
                Enjoy 10% OFF <br />
                <span>Your First Order</span>
              </h3>

              <div className="divider" />

              <p className="main-desc">
                Become part of the RICHEEKAY EMPIRE community and receive 10% off your first purchase.
              </p>

              <p className="sub-desc">
                Plus early access to new couture collections, exclusive drops and VIP private offers.
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">UNLOCK MY 10% DISCOUNT</button>
              </form>
            </>
          ) : (
            <div className="success-box">
              <FiCheckCircle className="icon" />
              <h4>Welcome to the Empire!</h4>
              <p style={{ fontSize: '0.85rem', color: '#555555' }}>
                Your 10% VIP discount code has been generated:
              </p>
              <div className="code-badge">RICHEEKAY10</div>
              <button className="apply-btn" onClick={handleCopyAndApply}>
                {copied ? (
                  <>
                    <FiCheckCircle /> APPLIED TO CART!
                  </>
                ) : (
                  <>
                    <FiCopy /> COPY & APPLY DISCOUNT
                  </>
                )}
              </button>
            </div>
          )}

          <p className="micro-copy">No spam. Only exclusive collections and private offers.</p>
        </div>
      </ModalCard>
    </>
  );
};
