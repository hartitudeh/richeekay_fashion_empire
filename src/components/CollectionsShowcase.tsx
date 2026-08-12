'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { COLLECTIONS_DATA } from '../data/productsData';
import { FiArrowRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
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

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  .custom-swiper-prev,
  .custom-swiper-next {
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid #d4af37;
    color: #d4af37;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.45rem;
    cursor: pointer;
    z-index: 10;
    flex-shrink: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);

    &:hover {
      background: #d4af37;
      color: #0a0a0a;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.85);
      transform: scale(1.12);
    }
  }

  .custom-swiper-prev {
    margin-right: 10px;
  }

  .custom-swiper-next {
    margin-left: 10px;
  }

  .col-swiper {
    flex-grow: 1;
    width: calc(100% - 116px);
  }

  @media (max-width: 640px) {
    .custom-swiper-prev,
    .custom-swiper-next {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .custom-swiper-prev {
      margin-right: 10px;
    }

    .custom-swiper-next {
      margin-left: 10px;
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

        <CarouselWrapper>
          <button className="custom-swiper-prev" id="col-prev-btn" aria-label="Previous Collection">
            <FiChevronsLeft />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '#col-prev-btn',
              nextEl: '#col-next-btn'
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 }
            }}
            className="col-swiper"
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

          <button className="custom-swiper-next" id="col-next-btn" aria-label="Next Collection">
            <FiChevronsRight />
          </button>
        </CarouselWrapper>
      </div>
    </SectionWrapper>
  );
};
