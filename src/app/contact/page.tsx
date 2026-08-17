'use client';

import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import styled from 'styled-components';

const Header = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 70px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.2rem;
    color: #ffffff;
    margin-bottom: 12px;

    span {
      color: #d4af37;
    }
  }

  p {
    font-size: 1.05rem;
    color: #cccccc;
    max-width: 650px;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding: 60px 24px;

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .boutique-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 24px;
    margin-bottom: 16px;

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      color: #d4af37;
      margin-bottom: 8px;
    }

    p {
      font-size: 0.9rem;
      color: #cccccc;
      line-height: 1.6;
    }
  }

  .form-card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.4);
    padding: 36px;

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #ffffff;
      margin-bottom: 20px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;

      label {
        font-size: 0.75rem;
        color: #d4af37;
        text-transform: uppercase;
        font-weight: 600;
      }

      input, textarea, select {
        background: #0a0a0a;
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: #ffffff;
        padding: 12px 14px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;

        &:focus {
          outline: none;
          border-color: #d4af37;
        }
      }
    }

    .send-btn {
      width: 100%;
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 0;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &:hover {
        background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
      }
    }
  }
`;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header>
        <h1>
          CONTACT & <span>BOUTIQUE LOCATIONS</span>
        </h1>
        <p>Visit our luxury boutiques in Lagos, Oyo State, and Osogbo (Osun State), or get in touch with our VIP customer concierge.</p>
      </Header>

      <Container>
        <div className="grid-2">
          <div>
            <div className="boutique-card">
              <h4>Lagos Flagship Atelier & Boutique</h4>
              <p>
                <FiMapPin style={{ color: '#D4AF37' }} /> Plot 14 Victoria Island, Lagos, Nigeria<br />
                <FiPhone style={{ color: '#D4AF37' }} /> Call: 07048113372 | WhatsApp: 08084278440<br />
                <FiClock style={{ color: '#D4AF37' }} /> Mon - Sat: 9:00 AM - 8:00 PM
              </p>
            </div>

            <div className="boutique-card">
              <h4>Oyo State Showroom & Fitting Hub</h4>
              <p>
                <FiMapPin style={{ color: '#D4AF37' }} /> Executive Bodija District, Ibadan, Oyo State<br />
                <FiPhone style={{ color: '#D4AF37' }} /> Call / WhatsApp: 08139212462
              </p>
            </div>

            <div className="boutique-card">
              <h4>Osun State Atelier (Osogbo)</h4>
              <p>
                <FiMapPin style={{ color: '#D4AF37' }} /> Luxury Fashion Arcade, Osogbo, Osun State<br />
                <FiPhone style={{ color: '#D4AF37' }} /> Call / WhatsApp: 07083777336
              </p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <a
                href="https://wa.me/2348084278440?text=Hello%20RICHEEKAY%20FASHION%20EMPIRE"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: '#FFF',
                  fontWeight: 'bold',
                  padding: '14px 20px',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Direct VIP WhatsApp Line
              </a>
            </div>
          </div>

          <div className="form-card">
            <h3>VIP Concierge Inquiry</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Your Full Name</label>
                <input type="text" required placeholder="e.g. Lady Chief Elizabeth" />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" required placeholder="elizabeth@domain.com" />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <select>
                  <option>Bespoke Custom Tailoring</option>
                  <option>Wholesale Material Order (Senator/Lace)</option>
                  <option>VIP Fitting Appointment</option>
                  <option>Order Status Inquiry</option>
                </select>
              </div>
              <div className="input-group">
                <label>Your Message</label>
                <textarea rows={4} required placeholder="Tell us about your event or fitting requirement..." />
              </div>

              <button type="submit" className="send-btn">
                <FiSend /> Send Message to Concierge
              </button>

              {submitted && (
                <div style={{ marginTop: '16px', color: '#D4AF37', textAlign: 'center', fontSize: '0.9rem' }}>
                  <FiCheckCircle style={{ marginRight: '6px' }} /> Message sent! Our VIP concierge will respond within 2 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
