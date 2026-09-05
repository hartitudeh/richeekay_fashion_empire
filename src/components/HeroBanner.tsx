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
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.45) 55%,
      rgba(0, 0, 0, 0.85) 100%
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
    background: rgba(10, 10, 10, 0.7);
    border: 1px solid #d4af37;
    color: #f4e798;
    padding: 6px 20px;
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-radius: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
    font-weight: 500;
    max-width: 700px;
    line-height: 1.6;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);

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
  border-radius: 30px;
  box-shadow: 0 6px 25px rgba(212, 175, 55, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.6);
  }
`;

const SecondaryBtn = styled.button`
  background: rgba(10, 10, 10, 0.65);
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
  border-radius: 30px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: #d4af37;
    color: #0a0a0a;
    border-color: #d4af37;
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
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80',
      badge: 'INTERNATIONAL LUXURY FASHION HOUSE',
      title: 'RICHEEKAY <span>FASHION EMPIRE</span>',
      subtitle: 'Style that Speaks. Quality that Lasts. Premier Bespoke Luxury for Gentlemen & Ladies.'
    },
    {
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1920&q=80',
      badge: 'GENTLEMEN ATELIER & ROYAL AGBADA',
      title: 'BESPOKE SUITS & <span>HANDWOVEN OFI</span>',
      subtitle: 'Handcrafted Double-Breasted Suits, Royal Agbada Sets, Senator Tunics & Italian Oxfords.'
    },
    {
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1920&q=80',
      badge: 'HERITAGE FABRICS & TIMEPIECES',
      title: 'ANKARA, OFI & <span>LUXURY WATCHES</span>',
      subtitle: 'Authentic Woven Fabrics, Gold Chronographs, Designer Sneakers & Couture Gowns.'
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
