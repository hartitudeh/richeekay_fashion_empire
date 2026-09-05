'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../../components/ProductCard';
import { SkeletonProductGrid } from '../../components/Skeletons';
import { CATEGORIES_DATA } from '../../data/productsData';
import { FiFilter, FiSliders, FiGrid, FiList } from 'react-icons/fi';
import styled from 'styled-components';

const PageHeader = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #faf8f5 100%);
  border-bottom: 1px solid rgba(201, 162, 39, 0.25);
  padding: 60px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3rem;
    color: #1a1a1a;
    margin-bottom: 10px;

    span {
      color: #b8860b;
    }
  }

  p {
    font-size: 1rem;
    color: #1a1a1a;
    font-weight: 500;
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
  background: #ffffff;
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);

  .widget-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.2rem;
    color: #b8860b;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(201, 162, 39, 0.2);
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
      color: #1a1a1a;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      transition: color 0.2s ease;

      &.active, &:hover {
        color: #b8860b;
        font-weight: 600;
      }
    }
  }

  .size-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .chip {
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.3);
      color: #1a1a1a;
      font-size: 0.75rem;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        background: #c9a227;
        color: #ffffff;
        font-weight: bold;
      }
    }
  }
`;

const MainContent = styled.main`
  .sort-bar {
    background: #ffffff;
    border: 1px solid rgba(201, 162, 39, 0.25);
    border-radius: 8px;
    padding: 14px 20px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

    .results-count {
      font-size: 0.85rem;
      color: #1a1a1a;
      font-weight: 600;
    }

    select {
      background: #faf8f5;
      color: #1a1a1a;
      border: 1px solid rgba(201, 162, 39, 0.4);
      padding: 6px 14px;
      font-size: 0.85rem;
      border-radius: 4px;
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
        <p>Explore bespoke Gentlemen suits, Royal Agbada sets, Senator tunics, handcrafted Italian shoes & sneakers, luxury timepieces, authentic Ankara & Ofi woven fabrics, and haute couture gowns.</p>
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
              <span style={{ fontSize: '0.8rem', color: '#1a1a1a', fontWeight: 600 }}>Sort By:</span>
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
