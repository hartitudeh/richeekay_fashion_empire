'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useShop } from '../../../context/ShopContext';
import { ProductCard } from '../../../components/ProductCard';
import { CATEGORIES_DATA } from '../../../data/productsData';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  padding: 50px 24px 80px;

  .meta-bar {
    background: #ffffff;
    border: 1px solid rgba(201, 162, 39, 0.25);
    border-radius: 8px;
    padding: 14px 20px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

    .results-count {
      font-size: 0.85rem;
      color: #1a1a1a;
      font-weight: 600;
    }
  }

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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  flex-wrap: wrap;

  .page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid rgba(201, 162, 39, 0.35);
    background: #ffffff;
    color: #1a1a1a;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #c9a227;
      color: #ffffff;
      border-color: #c9a227;
    }

    &.active {
      background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
      color: #ffffff;
      font-weight: 700;
      border-color: #b8860b;
      box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const { products } = useShop();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 18;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  const categoryObj = CATEGORIES_DATA.find((c) => c.id === categoryId) || {
    id: categoryId,
    name: categoryId ? categoryId.replace('-', ' ').toUpperCase() : 'Category',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore our luxury collection items in this category.'
  };

  const filteredProducts = products.filter((p) => p.category === categoryId);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

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
        {totalItems > 0 && (
          <div className="meta-bar">
            <span className="results-count">
              Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} items in {categoryObj.name} {totalPages > 1 && `(Page ${currentPage} of ${totalPages})`}
            </span>
            <Link href="/shop" style={{ color: '#b8860b', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
              View All Categories &rarr;
            </Link>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#1a1a1a', fontWeight: 500 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>No items in this category currently.</h3>
            <p style={{ marginTop: '10px' }}>Check back soon or explore our full shop catalog.</p>
            <Link href="/shop" style={{ color: '#b8860b', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginTop: '16px' }}>
              View Full Shop Catalog &rarr;
            </Link>
          </div>
        ) : (
          <>
            <div className="grid">
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {totalPages > 1 && (
              <PaginationWrapper>
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous Page"
                >
                  <FiChevronLeft /> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next Page"
                >
                  Next <FiChevronRight />
                </button>
              </PaginationWrapper>
            )}
          </>
        )}
      </Container>
    </>
  );
}
