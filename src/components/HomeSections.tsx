'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA, REVIEWS_DATA, BlogPost } from '../data/productsData';
import { Dialog, DialogContent } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  FiShield,
  FiAward,
  FiTruck,
  FiLock,
  FiHeart,
  FiPackage,
  FiStar,
  FiPlay,
  FiX,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiChevronsLeft,
  FiChevronsRight
} from 'react-icons/fi';
import styled from 'styled-components';

const WhyChooseSection = styled.section`
  padding: 80px 24px;
  background: #faf8f5;

  .inner {
    max-width: 1350px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;

    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #b8860b;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-size: 2.6rem;
      color: #1a1a1a;
      margin-top: 6px;
    }

    .divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #b8860b 100%);
      margin: 14px auto 0;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .feature-card {
    background: #ffffff;
    border: 1px solid rgba(201, 162, 39, 0.25);
    border-radius: 8px;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;

    &:hover {
      border-color: #c9a227;
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(201, 162, 39, 0.18);
    }

    .icon {
      font-size: 2.2rem;
      color: #c9a227;
      margin-bottom: 16px;
    }

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    p {
      font-size: 0.85rem;
      color: #555555;
      line-height: 1.5;
    }
  }
`;

const AboutSection = styled.section`
  padding: 90px 24px;
  background: #f5f0eb;
  border-top: 1px solid rgba(201, 162, 39, 0.25);

  .inner {
    max-width: 1250px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .img-frame {
    position: relative;
    border: 1px solid #c9a227;
    padding: 14px;
    background: #ffffff;
    border-radius: 4px;

    img {
      width: 100%;
      height: 480px;
      object-fit: cover;
    }

    .badge-overlay {
      position: absolute;
      bottom: -20px;
      right: -20px;
      background: #ffffff;
      border: 1px solid #c9a227;
      border-radius: 4px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      padding: 16px 24px;
      text-align: center;

      .num {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 2rem;
        font-weight: 800;
        color: #b8860b;
      }
      .lbl {
        font-size: 0.7rem;
        letter-spacing: 2px;
        color: #1a1a1a;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
  }

  .content {
    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #b8860b;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.8rem;
      color: #1a1a1a;
      margin: 8px 0 20px;
      line-height: 1.2;

      span {
        color: #b8860b;
      }
    }

    p {
      font-size: 0.95rem;
      color: #444444;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .values-row {
      display: flex;
      flex-direction: column;
      gap: 14px;
      border-top: 1px solid rgba(201, 162, 39, 0.2);
      padding-top: 20px;

      .val-item {
        background: #ffffff;
        border-left: 3px solid #c9a227;
        padding: 12px 16px;
        border-radius: 0 4px 4px 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

        h5 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.1rem;
          color: #b8860b;
          margin-bottom: 4px;
        }
        span {
          font-size: 0.88rem;
          color: #555555;
          line-height: 1.5;
          display: block;
        }
      }
    }
  }
`;

const ReviewsSection = styled.section`
  padding: 80px 24px;
  background: #faf8f5;

  .inner {
    max-width: 1350px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;

    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #b8860b;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-size: 2.6rem;
      color: #1a1a1a;
      margin-top: 6px;
    }

    .divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #b8860b 100%);
      margin: 14px auto 0;
    }
  }
`;

const ReviewsCarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  .custom-swiper-prev,
  .custom-swiper-next {
    background: #ffffff;
    border: 1px solid #c9a227;
    color: #1a1a1a;
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
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    &:hover {
      background: #c9a227;
      color: #ffffff;
      box-shadow: 0 0 20px rgba(201, 162, 39, 0.4);
      transform: scale(1.12);
    }
  }

  .custom-swiper-prev {
    margin-right: 10px;
  }

  .custom-swiper-next {
    margin-left: 10px;
  }

  .reviews-swiper {
    flex-grow: 1;
    width: calc(100% - 116px);
    padding-bottom: 52px;

    .swiper-pagination-bullet {
      background: rgba(201, 162, 39, 0.4);
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: #c9a227;
      width: 28px;
      border-radius: 4px;
    }
  }

  @media (max-width: 768px) {
    .custom-swiper-prev,
    .custom-swiper-next {
      display: none !important;
    }

    .reviews-swiper {
      width: 100% !important;
    }
  }

  .review-card {
    background: #ffffff;
    border: 1px solid rgba(201, 162, 39, 0.25);
    padding: 32px 28px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 250px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;

    &:hover {
      border-color: #c9a227;
      box-shadow: 0 12px 35px rgba(201, 162, 39, 0.18);
    }

    .stars {
      color: #c9a227;
      font-size: 1.1rem;
      margin-bottom: 14px;
    }

    p.comment {
      font-size: 0.92rem;
      color: #333333;
      line-height: 1.65;
      font-style: italic;
      margin-bottom: 24px;
      flex-grow: 1;
    }

    .author-row {
      display: flex;
      align-items: center;
      gap: 14px;
      border-top: 1px solid rgba(201, 162, 39, 0.18);
      padding-top: 16px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #c9a227;
      }

      .info {
        h5 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.05rem;
          color: #1a1a1a;
          margin: 0 0 2px 0;
        }
        span {
          font-size: 0.75rem;
          color: #b8860b;
          font-weight: 600;
        }
      }
    }
  }
`;

const BlogSection = styled.section`
  padding: 80px 24px;
  background: #f5f0eb;

  .inner {
    max-width: 1350px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;

    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #b8860b;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-size: 2.6rem;
      color: #1a1a1a;
      margin-top: 6px;
    }

    .divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #b8860b 100%);
      margin: 14px auto 0;
    }
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .blog-card {
    background: #ffffff;
    border: 1px solid rgba(201, 162, 39, 0.25);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

    img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .content {
      padding: 24px;

      .meta {
        display: flex;
        gap: 14px;
        font-size: 0.75rem;
        color: #b8860b;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      h3 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.4rem;
        color: #1a1a1a;
        margin-bottom: 10px;
        line-height: 1.3;
      }

      p {
        font-size: 0.88rem;
        color: #444444;
        line-height: 1.5;
        margin-bottom: 16px;
      }

      .read-more {
        font-size: 0.8rem;
        font-weight: bold;
        color: #b8860b;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    }
  }
`;

export const HomeSections: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <>
      {/* Why Choose Us */}
      <WhyChooseSection>
        <div className="inner">
          <div className="header">
            <span>The RICHEEKAY Difference</span>
            <h2>Why Luxury Women Choose Us</h2>
            <div className="divider" />
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <FiAward className="icon" />
              <h4>Bespoke Luxury Quality</h4>
              <p>Hand-crafted finishing with internal boning, French laces, and Italian silks.</p>
            </div>
            <div className="feature-card">
              <FiShield className="icon" />
              <h4>100% Guaranteed Original</h4>
              <p>Authentic 100% Virgin Cambodian human hair wigs & certified designer leather.</p>
            </div>
            <div className="feature-card">
              <FiTruck className="icon" />
              <h4>24-48h Express Shipping</h4>
              <p>Lightning fast doorstep delivery across Nigeria, UK, US, and worldwide.</p>
            </div>
            <div className="feature-card">
              <FiPackage className="icon" />
              <h4>Gold Box VIP Packaging</h4>
              <p>Every outfit arrives encased in our signature metallic gold luxury presentation box.</p>
            </div>
          </div>
        </div>
      </WhyChooseSection>

      {/* About Us & Brand Story */}
      <AboutSection id="about">
        <div className="inner">
          <div className="img-frame">
            <img
              src="/ceo-adegoke-rachael.jpg"
              alt="Adegoke Rachael - CEO, RicheeKay Fashion Empire"
            />
            <div className="badge-overlay">
              <div className="num">CEO</div>
              <div className="lbl">Adegoke Rachael</div>
            </div>
          </div>

          <div className="content">
            <span>Brand Heritage</span>
            <h2>
              The Story Behind <span>RICHEEKAY</span>
            </h2>
            <p>
              Founded with a passion for royal African heritage and international haute couture, RICHEEKAY FASHION EMPIRE was created to empower women to feel elegant, confident, and unforgettable.
            </p>
            <p>
              From custom Senator tunic sets for executive women to hand-beaded Aso-Ebi wedding gowns, every piece is designed to tell a story of sophistication and lasting quality.
            </p>

            <div className="values-row">
              <div className="val-item">
                <h5>Our Mission</h5>
                <span>Deliver luxury fashion that speaks elegance & class.</span>
              </div>
              <div className="val-item">
                <h5>Our Vision</h5>
                <span>The world’s premier African-inspired luxury fashion house.</span>
              </div>
              <div className="val-item">
                <h5>Our Values</h5>
                <span>Trust, Bespoke Craftsmanship & Uncompromising Quality.</span>
              </div>
            </div>
          </div>
        </div>
      </AboutSection>

      {/* Customer Reviews */}
      <ReviewsSection>
        <div className="inner">
          <div className="header">
            <span>Real Customer Experiences</span>
            <h2>Loved by Fashion Royalty</h2>
            <div className="divider" />
          </div>

          <ReviewsCarouselWrapper>
            <button className="custom-swiper-prev" id="reviews-prev-btn" aria-label="Previous Testimonial">
              <FiChevronsLeft />
            </button>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '#reviews-prev-btn',
                nextEl: '#reviews-next-btn'
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="reviews-swiper"
            >
              {REVIEWS_DATA.map((rev) => (
                <SwiperSlide key={rev.id}>
                  <div className="review-card">
                    <div className="stars">★★★★★</div>
                    <p className="comment">"{rev.comment}"</p>
                    <div className="author-row">
                      <img src={rev.avatar} alt={rev.author} />
                      <div className="info">
                        <h5>{rev.author}</h5>
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-swiper-next" id="reviews-next-btn" aria-label="Next Testimonial">
              <FiChevronsRight />
            </button>
          </ReviewsCarouselWrapper>
        </div>
      </ReviewsSection>

      {/* Editorial Blog */}
      <BlogSection id="blog">
        <div className="inner">
          <div className="header">
            <span>Fashion Journal</span>
            <h2>Styling Guides & Trends</h2>
            <div className="divider" />
          </div>

          <div className="blog-grid">
            {BLOG_POSTS_DATA.slice(0, 6).map((post) => (
              <div key={post.id} className="blog-card" onClick={() => setActiveArticle(post)}>
                <img src={post.image} alt={post.title} />
                <div className="content">
                  <div className="meta">
                    <span>{post.category}</span> | <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="read-more">
                    Read Article <FiArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              href="/blog"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C9A227 100%)',
                color: '#0A0A0A',
                fontWeight: 'bold',
                padding: '14px 28px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Explore All Journal Articles <FiArrowRight />
            </Link>
          </div>
        </div>
      </BlogSection>

      {/* Blog Article Reader Modal */}
      <Dialog
        open={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            style: {
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
              overflow: 'visible'
            }
          }
        }}
      >
        <DialogContent style={{ background: '#ffffff', border: '1px solid #c9a227', borderRadius: '12px', padding: '36px', color: '#1a1a1a', position: 'relative', boxShadow: '0 15px 50px rgba(0,0,0,0.15)' }}>
          {activeArticle && (
            <div>
              <button
                onClick={() => setActiveArticle(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#c9a227', fontSize: '1.6rem', cursor: 'pointer', zIndex: 10 }}
              >
                <FiX />
              </button>
              <div style={{ color: '#b8860b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginBottom: '8px' }}>
                {activeArticle.category} &bull; {activeArticle.date} &bull; {activeArticle.readTime}
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', margin: '8px 0 20px', color: '#1a1a1a', lineHeight: '1.3' }}>
                {activeArticle.title}
              </h2>
              <img
                src={activeArticle.image}
                alt="blog"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', border: '1px solid rgba(201, 162, 39, 0.3)', borderRadius: '6px', marginBottom: '24px' }}
              />

              <div style={{ background: 'rgba(201, 162, 39, 0.12)', borderLeft: '4px solid #c9a227', padding: '16px 20px', marginBottom: '24px', fontStyle: 'italic', color: '#90293e', fontWeight: 600 }}>
                "{activeArticle.excerpt}"
              </div>

              {activeArticle.content.map((p, idx) => {
                if (p.startsWith('## ')) {
                  return (
                    <h3 key={idx} style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginTop: '28px', marginBottom: '12px', color: '#b8860b' }}>
                      {p.replace('## ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={idx} style={{ fontSize: '0.98rem', color: '#444444', lineHeight: '1.8', marginBottom: '18px' }}>
                    {p}
                  </p>
                );
              })}

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(201, 162, 39, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href={`/blog/${activeArticle.id}`}
                  onClick={() => setActiveArticle(null)}
                  style={{ background: 'linear-gradient(135deg, #c9a227 0%, #b8860b 100%)', color: '#ffffff', fontWeight: 'bold', padding: '12px 24px', borderRadius: '30px', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}
                >
                  Open Full Page Reading View &rarr;
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
