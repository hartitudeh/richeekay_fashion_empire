'use client';

import React, { useState, useEffect } from 'react';
import { BLOG_POSTS_DATA } from '../../data/productsData';
import { BlogCardSkeleton } from '../../components/Skeletons';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi';
import styled from 'styled-components';

const Header = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 70px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.2rem;
    color: #ffffff;
    margin-bottom: 12px;

    span {
      color: #d4af37;
    }
  }

  p {
    font-size: 1.05rem;
    color: #cccccc;
    max-width: 650px;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  padding: 60px 24px;

  .grid {
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
`;

const BlogCard = styled(Link)`
  background: #141414;
  border: 1px solid rgba(212, 175, 55, 0.3);
  overflow: hidden;
  text-decoration: none;

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .content {
    padding: 28px;

    .meta {
      display: flex;
      gap: 16px;
      font-size: 0.75rem;
      color: #d4af37;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.6rem;
      color: #ffffff;
      margin-bottom: 12px;
      line-height: 1.3;
    }

    p {
      font-size: 0.9rem;
      color: #aaaaaa;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .read-btn {
      font-size: 0.8rem;
      font-weight: bold;
      color: #d4af37;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header>
        <h1>
          THE EDITORIAL <span>JOURNAL</span>
        </h1>
        <p>Styling advice, African native couture trends, wig care, and executive wardrobe inspiration.</p>
      </Header>

      <Container>
        {isLoading ? (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <BlogCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid">
            {BLOG_POSTS_DATA.map((post) => (
              <BlogCard key={post.id} href={`/blog/${post.id}`}>
                <img src={post.image} alt={post.title} />
                <div className="content">
                  <div className="meta">
                    <span>{post.category}</span> | <span>{post.readTime}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="read-btn">
                    Read Full Article <FiArrowRight />
                  </div>
                </div>
              </BlogCard>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
