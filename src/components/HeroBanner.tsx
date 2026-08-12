'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useShop } from '../context/ShopContext';
import { FiScissors, FiShoppingBag, FiStar } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 550px;
  background: #0a0a0a;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet {
    background: rgba(212, 175, 55, 0.4);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #d4af37;
    width: 28px;
    border-radius: 4px;
  }
`;

const SlideContainer = styled.div<{ $bgImage: string }>`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.4) 0%,
      rgba(10, 10, 10, 0.75) 60%,
      rgba(10, 10, 10, 0.95) 100%
    ),
    url('${({ $bgImage }) => $bgImage}');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
`;

const HeroContent = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .tagline-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(201, 162, 39, 0.15);
    border: 1px solid rgba(212, 175, 55, 0.5);
    color: #d4af37;
    padding: 6px 18px;
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-radius: 30px;
    backdrop-filter: blur(8px);
  }

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.8rem;
    font-weight: 800;
    line-height: 1.15;
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);

    span {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 50%, #c9a227 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media (max-width: 768px) {
      font-size: 2.3rem;
    }
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.15rem;
    color: #f8f5ef;
    max-width: 700px;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }

  .cta-group {
    display: flex;
    gap: 18px;
    margin-top: 10px;

    @media (max-width: 600px) {
      flex-direction: column;
      width: 100%;
      max-width: 300px;
    }
  }
`;

const PrimaryBtn = styled.a`
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
  color: #0a0a0a;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 16px 36px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 6px 25px rgba(201, 162, 39, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.6);
  }
`;

const SecondaryBtn = styled.button`
  background: rgba(10, 10, 10, 0.6);
  color: #d4af37;
  border: 1px solid #d4af37;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 16px 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.2);
    color: #ffffff;
    border-color: #f4e798;
    transform: translateY(-3px);
  }
`;

export const HeroBanner: React.FC = () => {
  const { setIsTailoringStudioOpen } = useShop();

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1920&q=80',
      badge: 'INTERNATIONAL LUXURY FASHION',
      title: 'RICHEEKAY <span>FASHION EMPIRE</span>',
      subtitle: 'Style that Speaks. Quality that Lasts. Luxury Fashion For Every Woman.'
    },
    {
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1920&q=80',
      badge: 'BESPOKE NATIVE COUTURE',
      title: 'ROYAL ASO-EBI & <span>SENATOR WEAR</span>',
      subtitle: 'Custom Tailored African Luxury for Weddings, Galas & High-Society Events.'
    },
    {
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1920&q=80',
      badge: 'EXECUTIVE & EVENING WEAR',
      title: 'POWER SUITS & <span>100% VIRGIN WIGS</span>',
      subtitle: 'Elevate Your Wardrobe with Designer Handbags, Heels & Haute Couture.'
    }
  ];

  return (
    <HeroSection id="hero">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <SlideContainer $bgImage={slide.image}>
              <HeroContent>
                <div className="tagline-badge">
                  <FiStar /> {slide.badge}
                </div>
                <h2 dangerouslySetInnerHTML={{ __html: slide.title }} />
                <p>{slide.subtitle}</p>

                <div className="cta-group">
                  <PrimaryBtn href="#featured">
                    <FiShoppingBag /> Shop Now
                  </PrimaryBtn>
                  <SecondaryBtn onClick={() => setIsTailoringStudioOpen(true)}>
                    <FiScissors /> Book Custom Fitting
                  </SecondaryBtn>
                </div>
              </HeroContent>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </HeroSection>
  );
};
