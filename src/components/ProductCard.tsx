'use client';

import React, { useState } from 'react';
import { Product } from '../data/productsData';
import { useShop } from '../context/ShopContext';
import { FiHeart, FiEye, FiShoppingBag, FiStar, FiScissors } from 'react-icons/fi';
import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: #c9a227;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);

    .image-overlay {
      opacity: 1;
    }

    .product-img {
      transform: scale(1.06);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  background: #f4efe6;

  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .badge-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
    color: #ffffff;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 4px 10px;
    text-transform: uppercase;
    border-radius: 20px;
    z-index: 3;
  }

  .wishlist-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(201, 162, 39, 0.4);
    color: #1a1a1a;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 3;
    transition: all 0.3s ease;

    &.active, &:hover {
      background: #c9a227;
      color: #ffffff;
      border-color: #c9a227;
    }
  }
`;

const QuickActionOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(250, 248, 245, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;

  .action-btn {
    background: #ffffff;
    color: #1a1a1a;
    border: 1px solid #c9a227;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: #c9a227;
      color: #ffffff;
      transform: scale(1.1);
    }
  }
`;

const ContentContainer = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .category-name {
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: #b8860b;
    text-transform: uppercase;
    font-weight: 600;
  }

  .title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.1rem;
    color: #1a1a1a;
    margin: 4px 0 8px;
    font-weight: 600;
    line-height: 1.3;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #c9a227;
    margin-bottom: 10px;

    span {
      color: #1a1a1a;
      font-weight: 600;
    }
  }

  .swatch-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;

    .swatch {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      cursor: pointer;

      &.selected {
        outline: 2px solid #c9a227;
        outline-offset: 1px;
      }
    }
  }

  .price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid rgba(201, 162, 39, 0.18);

    .price {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #90293e;
    }

    .original-price {
      font-size: 0.85rem;
      color: #555555;
      text-decoration: line-through;
      margin-left: 6px;
      font-weight: 500;
    }
  }

  .add-cart-btn {
    width: 100%;
    margin-top: 14px;
    background: linear-gradient(135deg, #c9a227 0%, #b8860b 100%);
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 0;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      box-shadow: 0 4px 15px rgba(201, 162, 39, 0.35);
    }
  }
    }
  }
`;

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { formatPrice, addToCart, toggleWishlist, isInWishlist, openQuickView, setIsTailoringStudioOpen } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const isWished = isInWishlist(product.id);

  return (
    <CardWrapper className="shine-wrapper hover-elevate">
      <ImageContainer>
        {product.isFlashSale && <span className="badge-tag">FLASH SALE</span>}
        {product.isNewArrival && !product.isFlashSale && <span className="badge-tag">NEW</span>}
        {product.isBestSeller && !product.isFlashSale && !product.isNewArrival && (
          <span className="badge-tag">BEST SELLER</span>
        )}

        <button
          className={`wishlist-btn ${isWished ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          title="Wishlist"
        >
          <FiHeart />
        </button>

        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          className="product-img"
        />

        <QuickActionOverlay className="image-overlay">
          <button className="action-btn" onClick={() => openQuickView(product)} title="Quick View">
            <FiEye />
          </button>
          <button
            className="action-btn"
            onClick={() => addToCart(product, selectedColor, product.sizes[0] || 'Standard')}
            title="Add to Cart"
          >
            <FiShoppingBag />
          </button>
          {product.customTailoringAvailable && (
            <button
              className="action-btn"
              onClick={() => setIsTailoringStudioOpen(true)}
              title="Custom Tailoring Fit"
            >
              <FiScissors />
            </button>
          )}
        </QuickActionOverlay>
      </ImageContainer>

      <ContentContainer>
        <span className="category-name">{product.category.replace('-', ' ')}</span>
        <h4 className="title">{product.name}</h4>

        <div className="rating-row">
          <FiStar style={{ fill: '#F4E798', color: '#F4E798' }} />
          <strong>{product.rating}</strong>
          <span>({product.reviewCount} reviews)</span>
        </div>

        <div className="swatch-row">
          {product.colors.map((col, idx) => (
            <span
              key={idx}
              className={`swatch ${selectedColor === col.name ? 'selected' : ''}`}
              style={{ backgroundColor: col.hex }}
              onClick={() => {
                setSelectedColor(col.name);
                if (product.images[idx]) setCurrentImgIndex(idx);
              }}
              title={col.name}
            />
          ))}
        </div>

        <div className="price-row">
          <div>
            <span className="price">{formatPrice(product.priceNGN)}</span>
            {product.originalPriceNGN && (
              <span className="original-price">{formatPrice(product.originalPriceNGN)}</span>
            )}
          </div>
        </div>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product, selectedColor, product.sizes[0] || 'Standard')}
        >
          <FiShoppingBag /> Add to Cart
        </button>
      </ContentContainer>
    </CardWrapper>
  );
};
