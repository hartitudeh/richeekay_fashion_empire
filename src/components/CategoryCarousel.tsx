'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { CATEGORIES_DATA } from '../data/productsData';
import { FiArrowRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import styled from 'styled-components';

const CategorySection = styled.section`
  padding: 80px 24px;
  max-width: 1350px;
  margin: 0 auto;

  .section-header {
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
      margin-top: 6px;
      color: #ffffff;
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

  .cat-swiper {
    flex-grow: 1;
    width: calc(100% - 116px);
  }

  @media (max-width: 768px) {
    .custom-swiper-prev,
    .custom-swiper-next {
      display: none !important;
    }

    .cat-swiper {
      width: 100% !important;
    }
  }
`;

const CategoryCard = styled.div<{ $bgImage: string }>`
  position: relative;
  height: 380px;
  border: 1px solid rgba(201, 162, 39, 0.25);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.1) 0%,
        rgba(10, 10, 10, 0.85) 100%
      ),
      url('${({ $bgImage }) => $bgImage}');
    background-size: cover;
    background-position: center;
    transition: transform 0.6s ease;
    z-index: 1;
  }

  &:hover {
    border-color: #d4af37;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.25);

    &::before {
      transform: scale(1.08);
    }

    .arrow-icon {
      transform: translateX(6px);
      color: #d4af37;
    }
  }

  .card-content {
    position: relative;
    z-index: 2;

    .item-count {
      display: inline-block;
      background: rgba(212, 175, 55, 0.2);
      border: 1px solid rgba(212, 175, 55, 0.5);
      color: #d4af37;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 3px 10px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      color: #ffffff;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.82rem;
      color: #e0e0e0;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .explore-btn {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.3s ease;
    }
  }
`;

export const CategoryCarousel: React.FC = () => {
  return (
    <CategorySection id="categories">
      <div className="section-header">
        <span>Curated Collections</span>
        <h2>Explore Luxury Categories</h2>
        <div className="divider" />
      </div>

      <CarouselWrapper>
        <button className="custom-swiper-prev" id="cat-prev-btn" aria-label="Previous Category">
          <FiChevronsLeft />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '#cat-prev-btn',
            nextEl: '#cat-next-btn'
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
          className="cat-swiper"
        >
          {CATEGORIES_DATA.map((cat) => (
            <SwiperSlide key={cat.id}>
              <CategoryCard
                $bgImage={cat.image}
                onClick={() => {
                  const target = document.getElementById('featured');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="card-content">
                  <span className="item-count">{cat.itemCount} Items</span>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                  <div className="explore-btn">
                    Shop Category <FiArrowRight className="arrow-icon" />
                  </div>
                </div>
              </CategoryCard>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-swiper-next" id="cat-next-btn" aria-label="Next Category">
          <FiChevronsRight />
        </button>
      </CarouselWrapper>
    </CategorySection>
  );
};
