'use client';

import React, { useState } from 'react';
import { useShop, TailoringProfile } from '../context/ShopContext';
import { FiScissors, FiCheckCircle, FiCalendar, FiAward } from 'react-icons/fi';
import styled from 'styled-components';

const StudioWrapper = styled.section`
  padding: 80px 24px;
  background: linear-gradient(180deg, #0a0a0a 0%, #171717 100%);
  border-top: 1px solid rgba(212, 175, 55, 0.3);

  .inner-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
    align-items: center;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StudioInfo = styled.div`
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid #d4af37;
    color: #d4af37;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 2.5px;
    padding: 6px 16px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.8rem;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 18px;

    span {
      color: #d4af37;
    }
  }

  p {
    font-size: 1rem;
    color: #cccccc;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;

      .icon {
        color: #d4af37;
        font-size: 1.3rem;
        margin-top: 2px;
      }

      h4 {
        font-size: 1.05rem;
        color: #ffffff;
        margin-bottom: 2px;
      }

      span {
        font-size: 0.85rem;
        color: #a0a0a0;
      }
    }
  }
`;

const StudioFormCard = styled.div`
  background: #1f1f1f;
  border: 1px solid rgba(212, 175, 55, 0.4);
  padding: 36px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.6rem;
    color: #ffffff;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    padding-bottom: 12px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;

    label {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1px;
      color: #d4af37;
      text-transform: uppercase;
    }

    input, select, textarea {
      background: #0a0a0a;
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #ffffff;
      padding: 10px 14px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      border-radius: 0;

      &:focus {
        outline: none;
        border-color: #d4af37;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
      }
    }
  }

  .submit-btn {
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
    gap: 10px;
    margin-top: 10px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }
  }

  .success-banner {
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid #d4af37;
    color: #f4e798;
    padding: 14px;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 14px;
  }
`;

export const CustomTailoringStudio: React.FC = () => {
  const { userMeasurements, saveUserMeasurements } = useShop();
  const [formData, setFormData] = useState<TailoringProfile>(userMeasurements);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserMeasurements(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <StudioWrapper id="tailoring">
      <div className="inner-container">
        <StudioInfo>
          <div className="badge">
            <FiScissors /> Bespoke Haute Couture
          </div>
          <h2>
            Custom Tailoring & <span>Fabric Studio</span>
          </h2>
          <p>
            Experience perfect fitting tailored specifically to your body measurements. From custom Senator tunic sets to handcrafted Aso-Ebi gowns, our master tailors craft garments to fit you flawlessly.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <FiScissors className="icon" />
              <div>
                <h4>Precision Measurement Profiler</h4>
                <span>Save your personal body dimensions for seamless future orders.</span>
              </div>
            </div>
            <div className="feature-item">
              <FiAward className="icon" />
              <div>
                <h4>Premium Fabric Selection</h4>
                <span>Request pre-order bolts of French lace, Italian silk, or Cashmere Senator fabrics.</span>
              </div>
            </div>
            <div className="feature-item">
              <FiCalendar className="icon" />
              <div>
                <h4>Personal VIP Fitting Appointments</h4>
                <span>Schedule a 1-on-1 personal fitting session at our flagship Lagos store or virtually.</span>
              </div>
            </div>
          </div>
        </StudioInfo>

        <StudioFormCard>
          <h3>Body Measurements & Fitting Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="input-group">
                <label>Bust / Chest (Inches)</label>
                <input type="text" name="bust" value={formData.bust} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Waist (Inches)</label>
                <input type="text" name="waist" value={formData.waist} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label>Hips (Inches)</label>
                <input type="text" name="hips" value={formData.hips} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Shoulder Width (Inches)</label>
                <input type="text" name="shoulder" value={formData.shoulder} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label>Sleeve Length (Inches)</label>
                <input type="text" name="sleeve" value={formData.sleeve} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Full Length (Inches)</label>
                <input type="text" name="fullLength" value={formData.fullLength} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Preferred Fabric Type</label>
              <select name="fabricType" value={formData.fabricType} onChange={handleChange}>
                <option value="Senator Cashmere Wool">Senator Cashmere Wool (Heavy Weight)</option>
                <option value="Italian Silk Satin">Italian Silk Satin (Flowing Gala Gown)</option>
                <option value="French Hand-Beaded Lace">French Hand-Beaded Lace (Aso-Ebi)</option>
                <option value="Emerald Heavy Velvet">Emerald Heavy Velvet (African Royal)</option>
                <option value="Polish Cotton Senator">Polish Cotton Senator (Breathable)</option>
              </select>
            </div>

            <div className="input-group">
              <label>Special Instructions / Fitting Notes</label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Mention specific neckline styles, corsetry preferences, or wedding date..."
              />
            </div>

            <button type="submit" className="submit-btn">
              <FiScissors /> Save Measurements & Book Fitting
            </button>

            {submitted && (
              <div className="success-banner">
                <FiCheckCircle style={{ marginRight: '6px' }} /> Measurements Saved! Your personal tailor profile is active.
              </div>
            )}
          </form>
        </StudioFormCard>
      </div>
    </StudioWrapper>
  );
};
