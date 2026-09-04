'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent } from '@mui/material';
import { FiSearch, FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #c9a227;
  border-radius: 12px;
  position: relative;
  padding: 32px;
  min-height: 480px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);

  .search-header {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #faf8f5;
    border: 1px solid rgba(201, 162, 39, 0.35);
    border-radius: 8px;
    padding: 14px 20px;
    margin-bottom: 24px;

    input {
      flex-grow: 1;
      background: none;
      border: none;
      color: #1a1a1a;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #888888;
      }
    }

    .clear-btn {
      background: none;
      border: none;
      color: #c9a227;
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
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.3);
      border-radius: 20px;
      color: #b8860b;
      font-size: 0.75rem;
      padding: 6px 14px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 600;

      &.active, &:hover {
        background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
        color: #ffffff;
        font-weight: bold;
        border-color: #c9a227;
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
    background: #ffffff;
    border: 1px solid rgba(201, 162, 39, 0.25);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

    &:hover {
      border-color: #c9a227;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15);
    }

    img {
      width: 60px;
      height: 75px;
      object-fit: cover;
      border-radius: 4px;
    }

    .info {
      h5 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 0.95rem;
        color: #1a1a1a;
      }
      span {
        color: #b8860b;
        font-weight: bold;
        font-size: 0.9rem;
      }
    }
  }
`;

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, formatPrice, openQuickView } = useShop();
  const safeClose = useSafeCloseModal();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = products.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    return matchesQuery && matchesCat;
  });

  return (
    <Dialog
      open={isSearchOpen}
      onClose={() => safeClose(() => setIsSearchOpen(false))}
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
      <DialogContent style={{ padding: 0 }}>
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
            <button className="clear-btn" onClick={() => safeClose(() => setIsSearchOpen(false))}>
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
