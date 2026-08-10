'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { BLOG_POSTS_DATA } from '../../../data/productsData';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiShare2 } from 'react-icons/fi';
import styled from 'styled-components';

const ArticleContainer = styled.article`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 24px;
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
    margin-bottom: 24px;

    &:hover {
      color: #f4e798;
    }
  }

  .meta {
    font-size: 0.8rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.8rem;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 20px;

    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }

  .hero-img {
    width: 100%;
    height: 440px;
    object-fit: cover;
    border: 1px solid rgba(212, 175, 55, 0.4);
    margin-bottom: 32px;
  }

  .content-body {
    font-size: 1.05rem;
    color: #dddddd;
    line-height: 1.8;

    p {
      margin-bottom: 24px;
    }
  }
`;

export default function ArticlePage() {
  const params = useParams();
  const blogId = params?.id as string;

  const article = BLOG_POSTS_DATA.find((b) => b.id === blogId) || BLOG_POSTS_DATA[0];

  return (
    <ArticleContainer>
      <Link href="/blog" className="back-link">
        <FiArrowLeft /> Back to Editorial Journal
      </Link>

      <div className="meta">
        {article.category} | {article.date} | {article.readTime}
      </div>

      <h1>{article.title}</h1>

      <img src={article.image} alt={article.title} className="hero-img" />

      <div className="content-body">
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </ArticleContainer>
  );
}
