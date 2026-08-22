'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '../../context/ShopContext';
import { FaCrown } from 'react-icons/fa6';
import {
  FiAward,
  FiGift,
  FiShoppingBag,
  FiCheckCircle,
  FiArrowRight,
  FiStar,
  FiShield,
  FiPercent,
  FiTruck,
  FiScissors,
  FiUserCheck,
  FiHelpCircle
} from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.div`
  background: radial-gradient(circle at center, rgba(40, 30, 15, 0.95) 0%, rgba(10, 10, 10, 1) 85%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.35);
  padding: 90px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .crown-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid #d4af37;
    color: #d4af37;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 8px 20px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.6rem;
    color: #ffffff;
    margin-bottom: 16px;
    line-height: 1.2;

    span {
      color: #d4af37;
    }

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }

  p.subtitle {
    font-size: 1.15rem;
    color: #cccccc;
    max-width: 720px;
    margin: 0 auto 36px;
    line-height: 1.6;
  }

  .cta-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    .btn-primary {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 700;
      font-size: 0.88rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 36px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
      text-decoration: none;

      &:hover {
        background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
      }
    }

    .btn-secondary {
      background: transparent;
      border: 1px solid #d4af37;
      color: #d4af37;
      font-weight: 700;
      font-size: 0.88rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 32px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(212, 175, 55, 0.15);
        color: #ffffff;
      }
    }
  }
`;

const SectionWrapper = styled.section`
  max-width: 1350px;
  margin: 0 auto;
  padding: 80px 24px;

  .section-header {
    text-align: center;
    margin-bottom: 56px;

    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 700;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.8rem;
      color: #ffffff;
      margin-top: 8px;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .divider {
      width: 70px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #d4af37 100%);
      margin: 16px auto 0;
    }
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .step-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 8px;
    padding: 36px 28px;
    text-align: center;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d4af37;
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(212, 175, 55, 0.25);
    }

    .step-num {
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      background: #d4af37;
      color: #0a0a0a;
      font-weight: 800;
      font-size: 0.9rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-box {
      font-size: 2.4rem;
      color: #d4af37;
      margin: 12px 0 20px;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      color: #ffffff;
      margin-bottom: 12px;
    }

    p {
      font-size: 0.9rem;
      color: #cccccc;
      line-height: 1.6;
    }
  }
`;

const TiersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }

  .tier-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 8px;
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.3s ease;

    &.featured {
      border: 2px solid #d4af37;
      background: linear-gradient(180deg, #1f1b10 0%, #141414 100%);
      transform: scale(1.03);

      @media (max-width: 968px) {
        transform: scale(1);
      }
    }

    &:hover {
      box-shadow: 0 16px 40px rgba(212, 175, 55, 0.3);
    }

    .tier-badge {
      display: inline-block;
      align-self: flex-start;
      background: rgba(212, 175, 55, 0.2);
      border: 1px solid #d4af37;
      color: #d4af37;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 4px 14px;
      margin-bottom: 20px;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .points-req {
      font-size: 0.9rem;
      color: #d4af37;
      font-weight: 600;
      margin-bottom: 24px;
    }

    ul.benefits {
      list-style: none;
      padding: 0;
      margin: 0 0 32px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex-grow: 1;

      li {
        font-size: 0.9rem;
        color: #dddddd;
        display: flex;
        align-items: center;
        gap: 10px;

        svg {
          color: #d4af37;
          flex-shrink: 0;
          font-size: 1.1rem;
        }
      }
    }
  }
`;

const CalculatorBox = styled.div`
  background: #141414;
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 28px;
  }

  .calc-inputs {
    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #ffffff;
      margin-bottom: 12px;
    }

    p {
      font-size: 0.92rem;
      color: #cccccc;
      margin-bottom: 24px;
    }

    label {
      display: block;
      font-size: 0.8rem;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    input[type='number'] {
      width: 100%;
      padding: 14px 18px;
      background: #0a0a0a;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #ffffff;
      font-size: 1.1rem;
      border-radius: 4px;
      outline: none;
      margin-bottom: 16px;

      &:focus {
        border-color: #d4af37;
      }
    }
  }

  .calc-results {
    background: #0a0a0a;
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    padding: 32px;
    text-align: center;

    .points-val {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 3.2rem;
      font-weight: 800;
      color: #d4af37;
      margin-bottom: 4px;
    }

    .points-lbl {
      font-size: 0.8rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 20px;
    }

    .reward-equivalent {
      background: rgba(212, 175, 55, 0.12);
      border: 1px dashed #d4af37;
      padding: 14px 20px;
      color: #f4e798;
      font-weight: 700;
      font-size: 1.05rem;
      border-radius: 4px;
    }
  }
`;

const WaysToEarnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .earn-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 6px;
    padding: 28px 20px;
    text-align: center;

    .icon {
      font-size: 2rem;
      color: #d4af37;
      margin-bottom: 12px;
    }

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.15rem;
      color: #ffffff;
      margin-bottom: 6px;
    }

    .pts {
      font-size: 0.95rem;
      color: #d4af37;
      font-weight: 700;
    }
  }
`;

const FaqSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;

  .faq-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 6px;
    padding: 24px 28px;

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.2rem;
      color: #d4af37;
      margin-bottom: 8px;
    }

    p {
      font-size: 0.92rem;
      color: #cccccc;
      line-height: 1.6;
    }
  }
`;

export default function RicheekayLoyaltyPage() {
  const { setIsUserDashboardOpen, formatPrice } = useShop();
  const [spendAmount, setSpendAmount] = useState<number>(150000);

  const pointsEarned = Math.floor(spendAmount / 100); // 10 pts per 1,000 spend = 1 pt per 100
  const cashValueNGN = Math.floor(pointsEarned / 10) * 1000;

  return (
    <>
      {/* HERO BANNER */}
      <HeroSection>
        <div className="crown-badge">
          <FaCrown /> Official RICHEEKAY VIP Club
        </div>
        <h1>
          RICHEEKAY <span>ROYALTY PROGRAM</span>
        </h1>
        <p className="subtitle">
          Every purchase brings you closer to royal couture privileges. Earn Gold Royalty Points on luxury ladies' gowns, bespoke Aso-Ebi, Senator tunic sets, heels, and virgin wigs.
        </p>

        <div className="cta-row">
          <button className="btn-primary" onClick={() => setIsUserDashboardOpen(true)}>
            <FaCrown /> Join Royalty Club Now
          </button>
          <button className="btn-secondary" onClick={() => setIsUserDashboardOpen(true)}>
            <FiAward /> Check My Gold Points Balance
          </button>
        </div>
      </HeroSection>

      {/* HOW IT WORKS */}
      <SectionWrapper>
        <div className="section-header">
          <span>MEMBERSHIP ADVANTAGE</span>
          <h2>How The Royalty Program Works</h2>
          <div className="divider" />
        </div>

        <StepsGrid>
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="icon-box">
              <FiShoppingBag />
            </div>
            <h3>Shop & Earn Gold Points</h3>
            <p>
              Earn <strong>10 Gold Royalty Points</strong> for every ₦1,000 spent on any haute couture piece online or in our Lagos, Oyo State, and Osogbo ateliers.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num">2</div>
            <div className="icon-box">
              <FaCrown />
            </div>
            <h3>Elevate Your Royalty Rank</h3>
            <p>
              Unlock higher membership tiers from <em>Crown Member</em> to <em>Royal Sovereign</em> and <em>Empire VIP Dynasty</em> as your cumulative points grow.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num">3</div>
            <div className="icon-box">
              <FiGift />
            </div>
            <h3>Redeem Couture Privileges</h3>
            <p>
              Use points for instant cash checkout discounts, free express nationwide shipping, complimentary custom fitting, and VIP gala invitations.
            </p>
          </div>
        </StepsGrid>
      </SectionWrapper>

      {/* MEMBERSHIP TIERS */}
      <SectionWrapper style={{ background: '#0a0a0a', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="section-header">
          <span>EXCLUSIVE PRIVILEGES</span>
          <h2>Royalty Membership Tiers</h2>
          <div className="divider" />
        </div>

        <TiersGrid>
          {/* TIER 1 */}
          <div className="tier-card">
            <span className="tier-badge">Tier 1</span>
            <h3>Crown Member</h3>
            <div className="points-req">0 – 50,000 Points</div>
            <ul className="benefits">
              <li>
                <FiCheckCircle /> 10 Points per ₦1,000 spent
              </li>
              <li>
                <FiCheckCircle /> 5% Welcome discount code
              </li>
              <li>
                <FiCheckCircle /> ₦10,000 Birthday gift voucher
              </li>
              <li>
                <FiCheckCircle /> Standard customer support
              </li>
            </ul>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsUserDashboardOpen(true)}>
              Join Tier 1
            </button>
          </div>

          {/* TIER 2 */}
          <div className="tier-card featured">
            <span className="tier-badge">Tier 2 &bull; Most Popular</span>
            <h3>Royal Sovereign</h3>
            <div className="points-req">50,001 – 150,000 Points</div>
            <ul className="benefits">
              <li>
                <FiCheckCircle /> <strong>15 Points</strong> per ₦1,000 spent
              </li>
              <li>
                <FiCheckCircle /> Free Nationwide Express Shipping
              </li>
              <li>
                <FiCheckCircle /> ₦25,000 Birthday VIP voucher
              </li>
              <li>
                <FiCheckCircle /> 1-on-1 Bespoke Tailoring Consultation
              </li>
              <li>
                <FiCheckCircle /> Early access to new drops (24h before)
              </li>
            </ul>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsUserDashboardOpen(true)}>
              Join Tier 2
            </button>
          </div>

          {/* TIER 3 */}
          <div className="tier-card">
            <span className="tier-badge">Tier 3 &bull; Ultra Luxury</span>
            <h3>Empire VIP Dynasty</h3>
            <div className="points-req">150,001+ Points</div>
            <ul className="benefits">
              <li>
                <FiCheckCircle /> <strong>25 Points</strong> per ₦1,000 spent
              </li>
              <li>
                <FiCheckCircle /> Free Worldwide & Express Delivery
              </li>
              <li>
                <FiCheckCircle /> Complimentary Custom Fitting Service
              </li>
              <li>
                <FiCheckCircle /> 48h VIP Early Access to New Collections
              </li>
              <li>
                <FiCheckCircle /> Exclusive Invite to Annual Gala Runway
              </li>
            </ul>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsUserDashboardOpen(true)}>
              Join Tier 3
            </button>
          </div>
        </TiersGrid>
      </SectionWrapper>

      {/* POINTS CALCULATOR */}
      <SectionWrapper>
        <div className="section-header">
          <span>POINTS CALCULATOR</span>
          <h2>Calculate Your Gold Points</h2>
          <div className="divider" />
        </div>

        <CalculatorBox>
          <div className="calc-inputs">
            <h3>Estimate Your Earnings</h3>
            <p>Enter your planned purchase amount to calculate how many Royalty Gold Points you will earn instantly.</p>

            <label>Planned Purchase Amount (₦)</label>
            <input
              type="number"
              value={spendAmount}
              onChange={(e) => setSpendAmount(Math.max(0, Number(e.target.value)))}
              step="10000"
            />
          </div>

          <div className="calc-results">
            <div className="points-val">{pointsEarned.toLocaleString()}</div>
            <div className="points-lbl">Royalty Gold Points Earned</div>
            <div className="reward-equivalent">
              Cash Discount Value: {formatPrice(cashValueNGN)} OFF
            </div>
          </div>
        </CalculatorBox>
      </SectionWrapper>

      {/* WAYS TO EARN */}
      <SectionWrapper style={{ background: '#0a0a0a', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="section-header">
          <span>BONUS REWARDS</span>
          <h2>More Ways To Earn Gold Points</h2>
          <div className="divider" />
        </div>

        <WaysToEarnGrid>
          <div className="earn-card">
            <div className="icon">
              <FiUserCheck />
            </div>
            <h4>Create VIP Account</h4>
            <div className="pts">+500 Points Instantly</div>
          </div>

          <div className="earn-card">
            <div className="icon">
              <FiShoppingBag />
            </div>
            <h4>First Couture Order</h4>
            <div className="pts">+1,000 Bonus Points</div>
          </div>

          <div className="earn-card">
            <div className="icon">
              <FiGift />
            </div>
            <h4>Birthday Celebration</h4>
            <div className="pts">+2,500 Gift Points</div>
          </div>

          <div className="earn-card">
            <div className="icon">
              <FiStar />
            </div>
            <h4>Upload Photo in VIP Gallery</h4>
            <div className="pts">+300 Points Per Look</div>
          </div>
        </WaysToEarnGrid>
      </SectionWrapper>

      {/* FAQ SECTION */}
      <SectionWrapper>
        <div className="section-header">
          <span>HAVE QUESTIONS?</span>
          <h2>Frequently Asked Questions</h2>
          <div className="divider" />
        </div>

        <FaqSection>
          <div className="faq-card">
            <h4>How do I join the RICHEEKAY Royalty Program?</h4>
            <p>
              Joining is 100% free! Simply create an account on our website or visit any of our ateliers in Lagos, Oyo State, or Osogbo. You will automatically receive 500 bonus Gold Points upon registration.
            </p>
          </div>

          <div className="faq-card">
            <h4>Do my Royalty Gold Points expire?</h4>
            <p>
              Gold Points remain active as long as you make at least one purchase within 12 months. Unused points gently refresh after 365 days of account inactivity.
            </p>
          </div>

          <div className="faq-card">
            <h4>Can I use my points for bespoke custom tailoring?</h4>
            <p>
              Yes! You can redeem points for cash discounts on both ready-to-wear couture items and bespoke custom fitting sessions with our master atelier tailors.
            </p>
          </div>

          <div className="faq-card">
            <h4>Can I earn points when shopping in physical boutiques?</h4>
            <p>
              Yes! Present your registered email address or phone number to our boutique stylists at checkout in Lagos, Oyo State, or Osogbo to earn and redeem your points seamlessly.
            </p>
          </div>
        </FaqSection>
      </SectionWrapper>
    </>
  );
}
