'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../../components/ProductCard';
import { SkeletonProductGrid } from '../../components/Skeletons';
import { CATEGORIES_DATA } from '../../data/productsData';
import { FiFilter, FiSliders, FiGrid, FiList } from 'react-icons/fi';
import styled from 'styled-components';

const PageHeader = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 60px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3rem;
    color: #ffffff;
    margin-bottom: 10px;

    span {
      color: #d4af37;
    }
  }

  p {
    font-size: 1rem;
    color: #cccccc;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ShopLayout = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  padding: 50px 24px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 36px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: #141414;
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 24px;

  .widget-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.2rem;
    color: #d4af37;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    padding-bottom: 8px;
  }

  .cat-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;

    li {
      font-size: 0.9rem;
      color: #bbbbbb;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      transition: color 0.2s ease;

      &.active, &:hover {
        color: #d4af37;
        font-weight: 600;
      }
    }
  }

  .size-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .chip {
      background: #0a0a0a;
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #ffffff;
      font-size: 0.75rem;
      padding: 6px 12px;
      cursor: pointer;

      &.active {
        background: #d4af37;
        color: #0a0a0a;
        font-weight: bold;
      }
    }
  }
`;

const MainContent = styled.main`
  .sort-bar {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 14px 20px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .results-count {
      font-size: 0.85rem;
      color: #aaaaaa;
    }

    select {
      background: #0a0a0a;
      color: #d4af37;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 6px 14px;
      font-size: 0.85rem;
      cursor: pointer;
    }
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;

export default function ShopPage() {
  const { products } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSize, sortBy]);

  let filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || p.sizes.includes(selectedSize);
    return matchesCat && matchesSize;
  });

  if (sortBy === 'low-high') {
    filtered = [...filtered].sort((a, b) => a.priceNGN - b.priceNGN);
  } else if (sortBy === 'high-low') {
    filtered = [...filtered].sort((a, b) => b.priceNGN - a.priceNGN);
  } else if (sortBy === 'newest') {
    filtered = [...filtered].filter((a) => a.isNewArrival);
  }

  return (
    <>
      <PageHeader>
        <h1>
          THE LUXURY <span>SHOP CATALOG</span>
        </h1>
        <p>Explore haute couture gowns, bespoke Aso-Ebi native sets, Cashmere Senator fabrics, 100% virgin wigs & heels.</p>
      </PageHeader>

      <ShopLayout>
        <Sidebar>
          <div className="widget-title">Categories</div>
          <ul className="cat-list">
            <li className={selectedCategory === 'all' ? 'active' : ''} onClick={() => setSelectedCategory('all')}>
              <span>All Categories</span>
              <span>({products.length})</span>
            </li>
            {CATEGORIES_DATA.map((cat) => (
              <li
                key={cat.id}
                className={selectedCategory === cat.id ? 'active' : ''}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span>({cat.itemCount})</span>
              </li>
            ))}
          </ul>

          <div className="widget-title">Filter by Size</div>
          <div className="size-chips">
            {['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Fit'].map((sz) => (
              <span
                key={sz}
                className={`chip ${selectedSize === sz ? 'active' : ''}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz.toUpperCase()}
              </span>
            ))}
          </div>
        </Sidebar>

        <MainContent>
          <div className="sort-bar">
            <span className="results-count">Showing {filtered.length} luxury items</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: '#FFF' }}>Sort By:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured Collection</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {isLoading ? (
              <SkeletonProductGrid count={8} cols={3} />
            ) : (
              filtered.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))
            )}
          </div>
        </MainContent>
      </ShopLayout>
    </>
  );
}
