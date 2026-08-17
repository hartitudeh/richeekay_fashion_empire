'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiAward, FiShield, FiScissors, FiCheckCircle, FiClock, FiStar, FiHeart, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { FaCrown, FaGem, FaRibbon } from 'react-icons/fa6';
import styled from 'styled-components';

const HeroHeader = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.4);
  padding: 90px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;

  .badge-top {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid #d4af37;
    color: #d4af37;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 6px 18px;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.6rem;
    color: #ffffff;
    margin-bottom: 16px;
    line-height: 1.15;

    span {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 50%, #c9a227 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.15rem;
    color: #cccccc;
    max-width: 750px;
    margin: 0 auto;
    line-height: 1.7;
  }
`;

const SectionWrapper = styled.section`
  max-width: 1250px;
  margin: 0 auto;
  padding: 80px 24px;

  .section-title {
    text-align: center;
    margin-bottom: 48px;

    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.6rem;
      color: #ffffff;
      margin-top: 6px;
    }

    .divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #d4af37 100%);
      margin: 14px auto 0;
    }
  }
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 50px;
  align-items: center;
  margin-bottom: 90px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .img-frame {
    position: relative;
    border: 1px solid #d4af37;
    padding: 14px;
    background: #0a0a0a;

    img {
      width: 100%;
      height: 520px;
      object-fit: cover;
    }

    .gold-badge {
      position: absolute;
      bottom: -20px;
      right: -20px;
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      padding: 20px 28px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);

      .num {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 2.2rem;
        font-weight: 800;
        line-height: 1;
      }
      .lbl {
        font-size: 0.7rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 700;
        margin-top: 4px;
      }
    }
  }

  .text-content {
    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.2rem;
      color: #ffffff;
      margin-bottom: 18px;
      line-height: 1.3;

      span {
        color: #d4af37;
      }
    }

    p {
      font-size: 1rem;
      color: #cccccc;
      line-height: 1.8;
      margin-bottom: 18px;
    }

    .quote-box {
      border-left: 3px solid #d4af37;
      background: #141414;
      padding: 18px 24px;
      margin: 24px 0;
      font-style: italic;
      color: #f4e798;
      font-size: 1.05rem;

      .author {
        font-style: normal;
        font-size: 0.85rem;
        color: #ffffff;
        font-weight: bold;
        margin-top: 8px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
`;

const TimelineWrapper = styled.div`
  position: relative;
  margin: 60px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(180deg, #c9a227 0%, #d4af37 50%, #9a7b1c 100%);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }

  .timeline-item {
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    position: relative;
    margin-bottom: 50px;
    width: 50%;

    &:nth-child(even) {
      align-self: flex-end;
      justify-content: flex-start;
      padding-left: 50px;
      padding-right: 0;
      margin-left: 50%;
    }

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0 !important;
      padding-left: 50px !important;
      padding-right: 0 !important;
      justify-content: flex-start !important;
    }

    .dot {
      position: absolute;
      top: 0;
      right: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #d4af37;
      border: 4px solid #0a0a0a;
      box-shadow: 0 0 12px #d4af37;

      @media (max-width: 768px) {
        left: 8px;
        right: auto;
      }
    }

    &:nth-child(even) .dot {
      left: -12px;
      right: auto;

      @media (max-width: 768px) {
        left: 8px;
      }
    }

    .card {
      background: #141414;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 24px;
      max-width: 480px;

      .year {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.8rem;
        font-weight: 800;
        color: #d4af37;
        margin-bottom: 6px;
      }

      h4 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.3rem;
        color: #ffffff;
        margin-bottom: 8px;
      }

      p {
        font-size: 0.9rem;
        color: #aaaaaa;
        line-height: 1.6;
      }
    }
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 50px 0 90px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .pillar-card {
    background: linear-gradient(135deg, #141414 0%, #0d0d0d 100%);
    border: 1px solid rgba(212, 175, 55, 0.4);
    border-radius: 8px;
    padding: 38px 28px;
    text-align: center;
    position: relative;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    &:hover {
      border-color: #d4af37;
      transform: translateY(-6px);
      box-shadow: 0 15px 40px rgba(212, 175, 55, 0.25);
    }

    .icon-box {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid #d4af37;
      color: #d4af37;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin: 0 auto 22px;
      transition: all 0.3s ease;
    }

    &:hover .icon-box {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      transform: scale(1.08);
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.6rem;
      color: #ffffff;
      margin-bottom: 14px;
      letter-spacing: 0.5px;

      span {
        color: #d4af37;
      }
    }

    p {
      font-size: 0.95rem;
      color: #cccccc;
      line-height: 1.75;
    }

    ul {
      list-style: none;
      padding: 0;
      margin-top: 14px;
      text-align: left;

      li {
        font-size: 0.88rem;
        color: #dddddd;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;

        svg {
          color: #d4af37;
          flex-shrink: 0;
        }
      }
    }
  }
`;

const CraftsmanshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .craft-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 32px 24px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d4af37;
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.25);
    }

    .icon {
      font-size: 2.4rem;
      color: #d4af37;
      margin-bottom: 16px;
    }

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.3rem;
      color: #ffffff;
      margin-bottom: 8px;
    }

    p {
      font-size: 0.85rem;
      color: #aaaaaa;
      line-height: 1.5;
    }
  }
`;

export default function AboutPage() {
  const timelineMilestones = [
    {
      year: '2016',
      title: 'Foundation of the Flagship Atelier in Lagos',
      desc: 'RICHEEKAY FASHION EMPIRE opened its first bespoke fashion boutique and atelier in Victoria Island, Lagos, specializing in hand-crafted evening gowns for high-society galas.'
    },
    {
      year: '2018',
      title: 'Introduction of Royal Aso-Ebi & Native Couture',
      desc: 'Expanded into African Native Wear, introducing velvet beaded Aso-Ebi dresses and custom tailored lace ensembles for royal weddings across West Africa.'
    },
    {
      year: '2020',
      title: '100% Virgin Hair & Designer Accessories Launch',
      desc: 'Launched our exclusive line of 100% Virgin HD Lace Cambodian Hair Wigs, metallic stiletto pumps, and monogrammed calfskin leather handbags.'
    },
    {
      year: '2022',
      title: 'Expansion to Abuja & London Showrooms',
      desc: 'Opened flagship showrooms in Transcorp Hilton Arcade Abuja and Kensington High Street London to serve international clientele.'
    },
    {
      year: '2024',
      title: 'Paris & Milan Haute Couture Runway Debut',
      desc: 'Showcased African-inspired luxury collections on international runways, earning acclaim for fusing royal West African heritage with Western tailoring.'
    },
    {
      year: '2026',
      title: 'AI Bespoke Fitting & Digital Fashion Empire',
      desc: 'Pioneered digital body measurement profiling, multi-currency global ordering, and AI Style Consultation for discerning women worldwide.'
    }
  ];

  return (
    <>
      <HeroHeader>
        <div className="badge-top">
          <FaCrown /> Established 2016 &bull; A Decade of Elegance
        </div>
        <h1>
          THE HERITAGE OF <span>RICHEEKAY</span>
        </h1>
        <p>
          Crafting timeless luxury ladies' fashion, bespoke Aso-Ebi gowns, Cashmere Senator wears, 100% virgin hair wigs & heels for women of prestige.
        </p>
      </HeroHeader>

      <SectionWrapper>
        {/* Brand Story & Founder Message */}
        <StoryGrid>
          <div className="img-frame">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
              alt="RICHEEKAY Master Atelier"
            />
            <div className="gold-badge">
              <div className="num">10+</div>
              <div className="lbl">Years of Royalty</div>
            </div>
          </div>

          <div className="text-content">
            <h3>
              Redefining <span>African Luxury</span> on the World Stage
            </h3>
            <p>
              RICHEEKAY FASHION EMPIRE was founded in 2016 with a bold vision: to redefine luxury ladies' fashion by fusing royal West African heritage with haute couture tailoring standards inspired by Paris, Milan, and London.
            </p>
            <p>
              Every garment created in our master atelier tells a story of prestige, confidence, and meticulous attention to detail. Whether designing a floor-sweeping gala gown with internal boning corsetry or tailoring Cashmere Senator materials for executive women, we believe luxury should be an unforgettable experience.
            </p>

            <div className="quote-box">
              "True style speaks without saying a word. Quality lasts long after the event is over. At RICHEEKAY, we craft garments for women who rule their world with grace."
              <div className="author">— Chief Executive Creative Officer, RICHEEKAY</div>
            </div>
          </div>
        </StoryGrid>

        {/* STANDALONE VISION, MISSION & VALUES CARDS */}
        <div className="section-title">
          <span>FOUNDATIONAL PILLARS</span>
          <h2>Our Vision, Mission & Values</h2>
          <div className="divider" />
        </div>

        <PillarsGrid>
          {/* OUR VISION CARD */}
          <div className="pillar-card">
            <div className="icon-box">
              <FaCrown />
            </div>
            <h3>Our <span>Vision</span></h3>
            <p>
              To be the world’s most distinguished African luxury fashion house, globally celebrated for setting the gold standard in bespoke haute couture, African heritage elegance, and uncompromised artisanship across Paris, London, New York, and Lagos.
            </p>
          </div>

          {/* OUR MISSION CARD */}
          <div className="pillar-card">
            <div className="icon-box">
              <FiScissors />
            </div>
            <h3>Our <span>Mission</span></h3>
            <p>
              To empower royalty, executive women, and brides with custom-tailored gala dresses, Cashmere Senator suits, 100% Virgin HD Lace Wigs, and designer leather goods—delivering royal precision fitting with express worldwide logistics.
            </p>
          </div>

          {/* OUR CORE VALUES CARD */}
          <div className="pillar-card">
            <div className="icon-box">
              <FaGem />
            </div>
            <h3>Our Core <span>Values</span></h3>
            <ul>
              <li>
                <FaCrown /> <strong>Royalty in Every Stitch</strong>
              </li>
              <li>
                <FiCheckCircle /> <strong>Uncompromised Quality & Originality</strong>
              </li>
              <li>
                <FiScissors /> <strong>Bespoke Precision Fitting</strong>
              </li>
              <li>
                <FiShield /> <strong>Client Discretion & VIP Excellence</strong>
              </li>
              <li>
                <FiClock /> <strong>Rapid Express Fulfillment</strong>
              </li>
            </ul>
          </div>
        </PillarsGrid>

        {/* The 10-Year Journey Timeline (2016 - 2026) */}
        <div className="section-title">
          <span>Our Milestones</span>
          <h2>The Journey So Far (2016 – 2026)</h2>
          <div className="divider" />
        </div>

        <TimelineWrapper>
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="dot" />
              <div className="card">
                <div className="year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </TimelineWrapper>

        {/* Master Craftsmanship & Brand Guarantee */}
        <div className="section-title" style={{ marginTop: '90px' }}>
          <span>Pillars of Excellence</span>
          <h2>Master Craftsmanship & Guarantees</h2>
          <div className="divider" />
        </div>

        <CraftsmanshipGrid>
          <div className="craft-card">
            <FaCrown className="icon" />
            <h4>Royal Bespoke Fitting</h4>
            <p>Tailored specifically to your body dimensions with internal corsetry boning & silk satin linings.</p>
          </div>
          <div className="craft-card">
            <FaGem className="icon" />
            <h4>Authentic French & Italian Fabrics</h4>
            <p>Authentic hand-beaded French lace, Italian silk chiffon, and Cashmere Senator wool bolts.</p>
          </div>
          <div className="craft-card">
            <FiShield className="icon" />
            <h4>100% Raw Virgin Hair</h4>
            <p>100% unprocessed Raw Cambodian & Brazilian HD Swiss lace wigs pre-plucked to perfection.</p>
          </div>
          <div className="craft-card">
            <FiCheckCircle className="icon" />
            <h4>Signature Gold Packaging</h4>
            <p>Delivered in our signature gold embossed presentation box with 24-48h express delivery.</p>
          </div>
        </CraftsmanshipGrid>

        {/* CTA Banner */}
        <div
          style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, #141414 0%, #1f1f1f 100%)',
            border: '1px solid #D4AF37',
            padding: '40px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#FFF', marginBottom: '12px' }}>
            Ready to Experience Bespoke Luxury?
          </h3>
          <p style={{ color: '#CCC', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 24px' }}>
            Book a personal fitting session with our master tailors or explore our luxury shop catalog today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link
              href="/tailoring"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C9A227 100%)',
                color: '#0A0A0A',
                fontWeight: 'bold',
                padding: '14px 28px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.85rem'
              }}
            >
              Book Custom Fitting
            </Link>
            <Link
              href="/gallery"
              style={{
                background: '#0A0A0A',
                color: '#D4AF37',
                border: '1px solid #D4AF37',
                fontWeight: 'bold',
                padding: '14px 28px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.85rem'
              }}
            >
              View Empire Gallery
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
