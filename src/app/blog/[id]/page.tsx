'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { BLOG_POSTS_DATA } from '../../../data/productsData';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiArrowRight } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa6';
import styled from 'styled-components';

const ArticleContainer = styled.article`
  max-width: 920px;
  margin: 0 auto;
  padding: 60px 24px 100px;
  color: #ffffff;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #d4af37;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: #f4e798;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.8rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.8rem;
    color: #ffffff;
    line-height: 1.25;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      font-size: 2.1rem;
    }
  }

  .hero-img {
    width: 100%;
    height: 480px;
    object-fit: cover;
    border: 1px solid rgba(212, 175, 55, 0.4);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    margin-bottom: 40px;

    @media (max-width: 600px) {
      height: 280px;
    }
  }

  .excerpt-box {
    background: rgba(212, 175, 55, 0.08);
    border-left: 4px solid #d4af37;
    padding: 24px 28px;
    margin-bottom: 40px;
    font-size: 1.15rem;
    font-style: italic;
    color: #f4e798;
    line-height: 1.7;
    font-family: 'Playfair Display', Georgia, serif;
  }

  .content-body {
    font-size: 1.08rem;
    color: #dddddd;
    line-height: 1.85;

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.75rem;
      color: #ffffff;
      margin: 44px 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
    }

    p {
      margin-bottom: 24px;
    }
  }

  .author-box {
    margin-top: 60px;
    padding: 28px;
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    display: flex;
    align-items: center;
    gap: 20px;

    .icon-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid #d4af37;
      color: #d4af37;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .info {
      h4 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.2rem;
        color: #ffffff;
        margin-bottom: 4px;
      }
      p {
        font-size: 0.85rem;
        color: #aaaaaa;
      }
    }
  }

  .cta-banner {
    margin-top: 50px;
    background: linear-gradient(135deg, #141414 0%, #1a1a1a 100%);
    border: 1px solid #d4af37;
    padding: 36px;
    text-align: center;

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #ffffff;
      margin-bottom: 10px;
    }

    p {
      font-size: 0.95rem;
      color: #cccccc;
      max-width: 550px;
      margin: 0 auto 24px;
    }

    .btn-group {
      display: flex;
      gap: 16px;
      justify-content: center;

      @media (max-width: 600px) {
        flex-direction: column;
      }
    }

    .cta-btn {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: bold;
      padding: 12px 26px;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.85rem;
      display: inline-block;
    }

    .cta-btn-outline {
      background: #0a0a0a;
      color: #d4af37;
      border: 1px solid #d4af37;
      font-weight: bold;
      padding: 12px 26px;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.85rem;
      display: inline-block;
    }
  }
`;

const RelatedSection = styled.div`
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 24px;

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 24px;
    text-align: center;

    span {
      color: #d4af37;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    text-decoration: none;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .info {
      padding: 20px;

      .cat {
        font-size: 0.75rem;
        color: #d4af37;
        text-transform: uppercase;
        margin-bottom: 6px;
      }

      h4 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.2rem;
        color: #ffffff;
        line-height: 1.3;
        margin-bottom: 10px;
      }

      .read-link {
        font-size: 0.8rem;
        color: #d4af37;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    }
  }
`;

export default function ArticlePage() {
  const params = useParams();
  const blogId = params?.id as string;

  const article = BLOG_POSTS_DATA.find((b) => b.id === blogId) || BLOG_POSTS_DATA[0];
  const relatedArticles = BLOG_POSTS_DATA.filter((b) => b.id !== article.id).slice(0, 3);

  return (
    <>
      <ArticleContainer>
        <Link href="/blog" className="back-link">
          <FiArrowLeft /> Back to Editorial Journal
        </Link>

        <div className="meta">
          <span><FaCrown /> {article.category}</span>
          <span>&bull;</span>
          <span><FiCalendar /> {article.date}</span>
          <span>&bull;</span>
          <span><FiClock /> {article.readTime}</span>
        </div>

        <h1>{article.title}</h1>

        <img src={article.image} alt={article.title} className="hero-img" />

        <div className="excerpt-box">
          "{article.excerpt}"
        </div>

        <div className="content-body">
          {article.content.map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx}>{paragraph.replace('## ', '')}</h2>;
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Editorial Signature */}
        <div className="author-box">
          <div className="icon-avatar">
            <FaCrown />
          </div>
          <div className="info">
            <h4>RICHEEKAY Atelier Editorial Board</h4>
            <p>Curated by Chief Creative Stylists at RICHEEKAY FASHION EMPIRE (Lagos &bull; London &bull; Abuja).</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="cta-banner">
          <h3>Experience Bespoke Haute Couture</h3>
          <p>Schedule a personal fitting session with our master tailors or explore our luxury shop catalog.</p>
          <div className="btn-group">
            <Link href="/tailoring" className="cta-btn">Book Fitting Session</Link>
            <Link href="/shop" className="cta-btn-outline">Explore Shop</Link>
          </div>
        </div>
      </ArticleContainer>

      {/* Related Articles */}
      <RelatedSection>
        <h3>More From The <span>Editorial Journal</span></h3>
        <div className="grid">
          {relatedArticles.map((rel) => (
            <Link key={rel.id} href={`/blog/${rel.id}`} className="card">
              <img src={rel.image} alt={rel.title} />
              <div className="info">
                <div className="cat">{rel.category} &bull; {rel.readTime}</div>
                <h4>{rel.title}</h4>
                <div className="read-link">
                  Read Article <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </RelatedSection>
    </>
  );
}
