'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Dialog, DialogContent } from '@mui/material';
import { FiSearch, FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: #141414;
  color: #ffffff;
  padding: 32px;
  min-height: 480px;

  .search-header {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #0a0a0a;
    border: 1px solid #d4af37;
    padding: 14px 20px;
    margin-bottom: 24px;

    input {
      flex-grow: 1;
      background: none;
      border: none;
      color: #ffffff;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;

      &:focus {
        outline: none;
      }
    }

    .clear-btn {
      background: none;
      border: none;
      color: #d4af37;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  .cat-pills {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 24px;

    .pill {
      background: #1f1f1f;
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #d4af37;
      font-size: 0.75rem;
      padding: 6px 14px;
      cursor: pointer;
      text-transform: uppercase;

      &.active, &:hover {
        background: #d4af37;
        color: #0a0a0a;
        font-weight: bold;
      }
    }
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .result-card {
    background: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d4af37;
      transform: translateY(-2px);
    }

    img {
      width: 60px;
      height: 75px;
      object-fit: cover;
    }

    .info {
      h5 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 0.95rem;
        color: #ffffff;
      }
      span {
        color: #d4af37;
        font-weight: bold;
        font-size: 0.9rem;
      }
    }
  }
`;

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, formatPrice, openQuickView } = useShop();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = products.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    return matchesQuery && matchesCat;
  });

  return (
    <Dialog open={isSearchOpen} onClose={() => setIsSearchOpen(false)} maxWidth="md" fullWidth>
      <DialogContent style={{ background: '#141414', padding: 0 }}>
        <SearchContainer>
          <div className="search-header">
            <FiSearch style={{ color: '#D4AF37', fontSize: '1.6rem' }} />
            <input
              type="text"
              placeholder="Search Evening Gowns, Senator Materials, Wigs, Heels..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button className="clear-btn" onClick={() => setIsSearchOpen(false)}>
              <FiX />
            </button>
          </div>

          <div className="cat-pills">
            <div className={`pill ${selectedCat === 'all' ? 'active' : ''}`} onClick={() => setSelectedCat('all')}>
              All Categories
            </div>
            <div className={`pill ${selectedCat === 'ladies-wear' ? 'active' : ''}`} onClick={() => setSelectedCat('ladies-wear')}>
              Ladies Wear
            </div>
            <div className={`pill ${selectedCat === 'native-wear' ? 'active' : ''}`} onClick={() => setSelectedCat('native-wear')}>
              Native Wear
            </div>
            <div className={`pill ${selectedCat === 'senator-materials' ? 'active' : ''}`} onClick={() => setSelectedCat('senator-materials')}>
              Senator Materials
            </div>
            <div className={`pill ${selectedCat === 'shoes' ? 'active' : ''}`} onClick={() => setSelectedCat('shoes')}>
              Shoes & Heels
            </div>
            <div className={`pill ${selectedCat === 'wigs' ? 'active' : ''}`} onClick={() => setSelectedCat('wigs')}>
              Wigs
            </div>
          </div>

          <div className="results-grid">
            {filtered.length === 0 ? (
              <p style={{ color: '#888', gridColumn: 'span 3', textAlign: 'center', padding: '40px' }}>
                No matching luxury products found for "{query}".
              </p>
            ) : (
              filtered.map((p) => (
                <div
                  key={p.id}
                  className="result-card"
                  onClick={() => {
                    setIsSearchOpen(false);
                    openQuickView(p);
                  }}
                >
                  <img src={p.images[0]} alt={p.name} />
                  <div className="info">
                    <h5>{p.name}</h5>
                    <span>{formatPrice(p.priceNGN)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </SearchContainer>
      </DialogContent>
    </Dialog>
  );
};
