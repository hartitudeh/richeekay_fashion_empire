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
  background: #faf8f5;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet {
    background: rgba(201, 162, 39, 0.4);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #c9a227;
    width: 28px;
    border-radius: 4px;
  }
`;

const SlideContainer = styled.div<{ $bgImage: string }>`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      180deg,
      rgba(250, 248, 245, 0.45) 0%,
      rgba(250, 248, 245, 0.72) 60%,
      rgba(250, 248, 245, 0.95) 100%
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
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(201, 162, 39, 0.6);
    color: #b8860b;
    padding: 6px 18px;
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);
  }

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.8rem;
    font-weight: 800;
    line-height: 1.15;
    color: #1a1a1a;

    span {
      background: linear-gradient(135deg, #b8860b 0%, #c9a227 50%, #9a7b1c 100%);
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
    color: #333333;
    font-weight: 500;
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
  background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
  color: #ffffff;
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
  border-radius: 30px;
  box-shadow: 0 6px 25px rgba(201, 162, 39, 0.35);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(201, 162, 39, 0.5);
  }
`;

const SecondaryBtn = styled.button`
  background: rgba(255, 255, 255, 0.9);
  color: #1a1a1a;
  border: 1px solid #c9a227;
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
  border-radius: 30px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
    color: #ffffff;
    border-color: #1a1a1a;
  }
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
