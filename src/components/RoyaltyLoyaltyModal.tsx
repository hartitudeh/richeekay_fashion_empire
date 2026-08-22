'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import { FiX, FiGift, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa6';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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

const pulseCrown = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.6)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.9)); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2600;
  animation: ${fadeIn} 0.4s ease-out forwards;
`;

const ModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 560px;
  background: #141414;
  border: 1px solid #d4af37;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.3);
  z-index: 2601;
  animation: ${slideUpScale} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  flex-direction: column;

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    color: #d4af37;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
      color: #ffffff;
      transform: scale(1.1);
    }
  }

  .modal-header {
    background: radial-gradient(circle at center, rgba(40, 30, 15, 0.95) 0%, rgba(20, 20, 20, 1) 100%);
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    padding: 32px 24px 24px;
    text-align: center;

    .crown-icon {
      font-size: 2.8rem;
      color: #d4af37;
      margin-bottom: 10px;
      animation: ${pulseCrown} 3s ease-in-out infinite;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.9rem;
      color: #ffffff;
      margin-bottom: 6px;

      span {
        color: #d4af37;
      }
    }

    p.subtitle {
      font-size: 0.88rem;
      color: #cccccc;
      max-width: 420px;
      margin: 0 auto;
      line-height: 1.5;
    }
  }

  .modal-body {
    padding: 24px 28px;

    .perks-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;

      .perk-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.88rem;
        color: #dddddd;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(212, 175, 55, 0.15);
        padding: 10px 14px;
        border-radius: 4px;

        svg {
          color: #d4af37;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        strong {
          color: #d4af37;
        }
      }
    }

    .join-btn {
      width: 100%;
      padding: 14px 0;
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
      }
    }
  }

  .modal-footer {
    background: #0a0a0a;
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    padding: 18px 24px;
    text-align: center;

    .explore-link {
      color: #d4af37;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        color: #ffffff;
        transform: translateX(4px);
      }
    }
  }
`;

export const RoyaltyLoyaltyModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsUserDashboardOpen } = useShop();

  useEffect(() => {
    // Check if dismissed in session
    const isDismissed = sessionStorage.getItem('richeekay_royalty_popup_dismissed');
    if (isDismissed) return;

    // Set 5-minute timer (300,000 ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300000); // 5 minutes = 300,000 ms

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('richeekay_royalty_popup_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={handleClose} />
      <ModalCard>
        <button className="close-btn" onClick={handleClose} title="Close Popup">
          <FiX />
        </button>

        <div className="modal-header">
          <FaCrown className="crown-icon" />
          <h3>
            RICHEEKAY <span>ROYALTY CLUB</span>
          </h3>
          <p className="subtitle">
            You've been exploring African luxury couture! Join our official VIP Royalty Program today and claim <strong>500 Gold Points</strong> instantly.
          </p>
        </div>

        <div className="modal-body">
          <div className="perks-list">
            <div className="perk-item">
              <FiCheckCircle />
              <span>Earn <strong>10 Gold Points</strong> for every ₦1,000 spent online & in-store</span>
            </div>
            <div className="perk-item">
              <FiGift />
              <span>Unlock <strong>₦25,000 Birthday Voucher</strong> & Free Express Shipping</span>
            </div>
            <div className="perk-item">
              <FaCrown />
              <span>Get <strong>48h VIP Early Access</strong> to new Haute Couture drops</span>
            </div>
          </div>

          <button
            className="join-btn"
            onClick={() => {
              handleClose();
              setIsUserDashboardOpen(true);
            }}
          >
            <FaCrown /> Claim 500 Bonus Points & Join
          </button>
        </div>

        {/* FOOTER OF THE POPUP: DIRECT LINK TO /richeekay-loyalty-program */}
        <div className="modal-footer">
          <Link
            href="/richeekay-loyalty-program"
            className="explore-link"
            onClick={handleClose}
          >
            Explore RICHEEKAY Royalty Program Details <FiArrowRight />
          </Link>
        </div>
      </ModalCard>
    </>
  );
};
