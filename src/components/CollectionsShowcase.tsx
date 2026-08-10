'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { COLLECTIONS_DATA } from '../data/productsData';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 80px 24px;
  background: #141414;
  border-top: 1px solid rgba(201, 162, 39, 0.2);
  border-bottom: 1px solid rgba(201, 162, 39, 0.2);

  .inner-container {
    max-width: 1350px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;

    span {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
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

const CollectionCard = styled.div<{ $bgImage: string }>`
  position: relative;
  height: 480px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.2) 0%,
        rgba(10, 10, 10, 0.9) 100%
      ),
      url('${({ $bgImage }) => $bgImage}');
    background-size: cover;
    background-position: center;
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: scale(1.06);
  }

  .content {
    position: relative;
    z-index: 2;

    .tag {
      display: inline-block;
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 2px;
      padding: 4px 12px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2rem;
      color: #ffffff;
      margin-bottom: 6px;
    }

    p {
      font-size: 0.95rem;
      color: #d0d0d0;
      margin-bottom: 20px;
    }

    .cta-link {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #d4af37;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: gap 0.3s ease;

      &:hover {
        gap: 14px;
        color: #f4e798;
      }
    }
  }
`;

export const CollectionsShowcase: React.FC = () => {
  return (
    <SectionWrapper id="collections">
      <div className="inner-container">
        <div className="header">
          <span>Seasonal & Couture Lookbooks</span>
          <h2>The Empire Collections</h2>
          <div className="divider" />
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }
          }}
        >
          {COLLECTIONS_DATA.map((col) => (
            <SwiperSlide key={col.id}>
              <CollectionCard $bgImage={col.image}>
                <div className="content">
                  <span className="tag">{col.tag}</span>
                  <h3>{col.title}</h3>
                  <p>{col.subtitle}</p>
                  <div
                    className="cta-link"
                    onClick={() => {
                      const el = document.getElementById('featured');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Lookbook <FiArrowRight />
                  </div>
                </div>
              </CollectionCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  );
};
