'use client';

import React from 'react';
import { COLLECTIONS_DATA } from '../../data/productsData';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const PageHeader = styled.div`
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
    grid-template-columns: repeat(2, 1fr);
    gap: 36px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Card = styled.div<{ $bgImage: string }>`
  position: relative;
  height: 520px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;

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
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 2px;
      padding: 4px 14px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.3rem;
      color: #ffffff;
      margin-bottom: 8px;
    }

    p {
      font-size: 1rem;
      color: #d0d0d0;
      margin-bottom: 24px;
    }

    .link-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(10, 10, 10, 0.8);
      color: #d4af37;
      border: 1px solid #d4af37;
      font-weight: bold;
      font-size: 0.85rem;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 12px 24px;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        background: #d4af37;
        color: #0a0a0a;
      }
    }
  }
`;

export default function CollectionsPage() {
  return (
    <>
      <PageHeader>
        <h1>
          THE EMPIRE <span>COLLECTIONS</span>
        </h1>
        <p>Explore our seasonal lookbooks and couture collections designed for high-society galas, royal weddings, executive boardrooms & red carpet events.</p>
      </PageHeader>

      <Container>
        <div className="grid">
          {COLLECTIONS_DATA.map((col) => (
            <Card key={col.id} $bgImage={col.image}>
              <div className="content">
                <span className="tag">{col.tag}</span>
                <h2>{col.title}</h2>
                <p>{col.subtitle}</p>
                <Link href={col.link} className="link-btn">
                  Explore Lookbook <FiArrowRight />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
