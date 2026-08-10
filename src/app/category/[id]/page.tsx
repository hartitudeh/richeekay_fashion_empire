'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useShop } from '../../../context/ShopContext';
import { ProductCard } from '../../../components/ProductCard';
import { CATEGORIES_DATA } from '../../../data/productsData';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderBanner = styled.div<{ $bgImage: string }>`
  height: 350px;
  background-image: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.4) 0%,
      rgba(10, 10, 10, 0.9) 100%
    ),
    url('${({ $bgImage }) => $bgImage}');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.4);

  .breadcrumbs {
    font-size: 0.8rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;

    a {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        color: #d4af37;
      }
    }
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.2rem;
    color: #ffffff;
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: #e0e0e0;
    max-width: 600px;
  }
`;

const Container = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  padding: 60px 24px;

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const { products } = useShop();

  const categoryObj = CATEGORIES_DATA.find((c) => c.id === categoryId) || {
    id: categoryId,
    name: categoryId ? categoryId.replace('-', ' ').toUpperCase() : 'Category',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore our luxury collection items in this category.'
  };

  const filteredProducts = products.filter((p) => p.category === categoryId);

  return (
    <>
      <HeaderBanner $bgImage={categoryObj.image}>
        <div className="breadcrumbs">
          <Link href="/">Home</Link> &gt; <Link href="/shop">Shop</Link> &gt; {categoryObj.name}
        </div>
        <h1>{categoryObj.name}</h1>
        <p>{categoryObj.description}</p>
      </HeaderBanner>

      <Container>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#FFF' }}>No items in this category currently.</h3>
            <p style={{ marginTop: '10px' }}>Check back soon or explore our full shop catalog.</p>
            <Link href="/shop" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginTop: '16px' }}>
              View Full Shop
            </Link>
          </div>
        ) : (
          <div className="grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
