'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent } from '@mui/material';
import { FiX, FiShoppingBag, FiHeart, FiStar, FiScissors, FiTruck, FiShield } from 'react-icons/fi';
import styled from 'styled-components';

const QuickViewContainer = styled.div`
  background: #141414;
  color: #ffffff;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .gallery-col {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .main-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .thumbs-row {
      display: flex;
      gap: 10px;

      img {
        width: 70px;
        height: 85px;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;

        &.active {
          border-color: #d4af37;
        }
      }
    }
  }

  .details-col {
    display: flex;
    flex-direction: column;

    .close-btn {
      align-self: flex-end;
      background: none;
      border: none;
      color: #d4af37;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .category {
      font-size: 0.75rem;
      color: #d4af37;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 600;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #ffffff;
      margin: 4px 0 10px;
    }

    .price-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .price {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: #d4af37;
      }
      .original-price {
        font-size: 1rem;
        color: #888888;
        text-decoration: line-through;
      }
    }

    p.desc {
      font-size: 0.9rem;
      color: #cccccc;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .option-title {
      font-size: 0.8rem;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .swatches {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;

      .swatch-btn {
        padding: 6px 14px;
        background: #0a0a0a;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 0.8rem;
        cursor: pointer;

        &.active {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
        }
      }
    }

    .action-row {
      display: flex;
      gap: 12px;
      margin-top: auto;
      padding-top: 20px;

      .add-btn {
        flex-grow: 1;
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 14px 0;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &:hover {
          background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
        }
      }
    }
  }
`;

export const ProductQuickViewModal: React.FC = () => {
  const {
    isQuickViewOpen,
    setIsQuickViewOpen,
    quickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsTailoringStudioOpen
  } = useShop();

  const safeClose = useSafeCloseModal();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  if (!quickViewProduct) return null;

  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || 'Standard';
  const currentSize = selectedSize || quickViewProduct.sizes[0] || 'Standard';

  return (
    <Dialog open={isQuickViewOpen} onClose={() => safeClose(() => setIsQuickViewOpen(false))} maxWidth="md" fullWidth>
      <DialogContent style={{ background: '#141414', padding: 0 }}>
        <QuickViewContainer>
          <div className="gallery-col">
            <img
              src={quickViewProduct.images[activeImgIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="main-img"
            />
            {quickViewProduct.images.length > 1 && (
              <div className="thumbs-row">
                {quickViewProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="thumb"
                    className={activeImgIndex === idx ? 'active' : ''}
                    onClick={() => setActiveImgIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="details-col">
            <button className="close-btn" onClick={() => safeClose(() => setIsQuickViewOpen(false))}>
              <FiX />
            </button>

            <span className="category">{quickViewProduct.category.replace('-', ' ')}</span>
            <h3>{quickViewProduct.name}</h3>

            <div className="price-row">
              <span className="price">{formatPrice(quickViewProduct.priceNGN)}</span>
              {quickViewProduct.originalPriceNGN && (
                <span className="original-price">{formatPrice(quickViewProduct.originalPriceNGN)}</span>
              )}
            </div>

            <p className="desc">{quickViewProduct.description}</p>

            <div className="option-title">Select Color Variant</div>
            <div className="swatches">
              {quickViewProduct.colors.map((c, idx) => (
                <button
                  key={idx}
                  className={`swatch-btn ${currentColor === c.name ? 'active' : ''}`}
                  onClick={() => setSelectedColor(c.name)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="option-title">Select Size</div>
            <div className="swatches">
              {quickViewProduct.sizes.map((s, idx) => (
                <button
                  key={idx}
                  className={`swatch-btn ${currentSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="action-row">
              <button
                className="add-btn"
                onClick={() => {
                  addToCart(quickViewProduct, currentColor, currentSize);
                  setIsQuickViewOpen(false);
                }}
              >
                <FiShoppingBag /> Add to Bag
              </button>

              {quickViewProduct.customTailoringAvailable && (
                <button
                  className="add-btn"
                  style={{ background: '#1F1F1F', color: '#D4AF37', border: '1px solid #D4AF37' }}
                  onClick={() => {
                    setIsQuickViewOpen(false);
                    setIsTailoringStudioOpen(true);
                  }}
                >
                  <FiScissors /> Custom Fitting
                </button>
              )}
            </div>
          </div>
        </QuickViewContainer>
      </DialogContent>
    </Dialog>
  );
};
