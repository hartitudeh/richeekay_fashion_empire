'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS_DATA, Product } from '../../../data/productsData';
import { ProductCard } from '../../../components/ProductCard';
import { FiShoppingBag, FiHeart, FiStar, FiScissors, FiTruck, FiShield, FiShare2, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import styled from 'styled-components';

const DetailContainer = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  padding: 60px 24px;

  .breadcrumbs {
    font-size: 0.8rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 28px;

    a {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        color: #d4af37;
      }
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 48px;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
    }
  }

  .gallery-box {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .main-img-wrap {
      position: relative;
      width: 100%;
      height: 540px;
      border: 1px solid rgba(212, 175, 55, 0.4);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .thumbs {
      display: flex;
      gap: 12px;

      img {
        width: 80px;
        height: 100px;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;

        &.active {
          border-color: #d4af37;
        }
      }
    }
  }

  .product-details {
    .category {
      font-size: 0.8rem;
      color: #d4af37;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 600;
    }

    h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.6rem;
      color: #ffffff;
      margin: 6px 0 12px;
      line-height: 1.2;
    }

    .price-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;

      .price {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 2.4rem;
        font-weight: 700;
        color: #d4af37;
      }

      .original-price {
        font-size: 1.2rem;
        color: #888888;
        text-decoration: line-through;
      }
    }

    p.description {
      font-size: 1rem;
      color: #cccccc;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .swatches {
      display: flex;
      gap: 10px;
      margin-bottom: 24px;

      button {
        padding: 8px 18px;
        background: #0a0a0a;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;

        &.active {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
          font-weight: bold;
        }
      }
    }

    .actions {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;

      .add-bag-btn {
        flex-grow: 1;
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 700;
        font-size: 0.9rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding: 16px 0;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        &:hover {
          background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
        }
      }
    }
  }

  .complete-look {
    margin-top: 60px;
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 32px;

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.6rem;
      color: #d4af37;
      margin-bottom: 16px;
    }

    .look-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { products, formatPrice, addToCart, toggleWishlist, isInWishlist, setIsTailoringStudioOpen } = useShop();

  const product = products.find((p) => p.id === productId) || PRODUCTS_DATA[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');

  const completeLookItems = products.filter((p) => product.completeLookIds?.includes(p.id));

  return (
    <DetailContainer>
      <div className="breadcrumbs">
        <Link href="/">Home</Link> &gt; <Link href="/shop">Shop</Link> &gt; <Link href={`/category/${product.category}`}>{product.category.replace('-', ' ')}</Link> &gt; {product.name}
      </div>

      <div className="grid-layout">
        <div className="gallery-box">
          <div className="main-img-wrap">
            <img src={product.images[activeImgIndex] || product.images[0]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((img, idx) => (
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

        <div className="product-details">
          <span className="category">{product.category.replace('-', ' ')}</span>
          <h1>{product.name}</h1>

          <div className="price-row">
            <span className="price">{formatPrice(product.priceNGN)}</span>
            {product.originalPriceNGN && (
              <span className="original-price">{formatPrice(product.originalPriceNGN)}</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          <div style={{ marginBottom: '16px', fontWeight: 600, color: '#D4AF37', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            Color Variant: {selectedColor}
          </div>
          <div className="swatches">
            {product.colors.map((c, idx) => (
              <button
                key={idx}
                className={selectedColor === c.name ? 'active' : ''}
                onClick={() => {
                  setSelectedColor(c.name);
                  if (product.images[idx]) setActiveImgIndex(idx);
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '16px', fontWeight: 600, color: '#D4AF37', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            Size: {selectedSize}
          </div>
          <div className="swatches">
            {product.sizes.map((s, idx) => (
              <button
                key={idx}
                className={selectedSize === s ? 'active' : ''}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="add-bag-btn" onClick={() => addToCart(product, selectedColor, selectedSize)}>
              <FiShoppingBag /> Add to Shopping Bag
            </button>

            {product.customTailoringAvailable && (
              <Link
                href="/tailoring"
                className="add-bag-btn"
                style={{ background: '#1F1F1F', color: '#D4AF37', border: '1px solid #D4AF37', textDecoration: 'none' }}
              >
                <FiScissors /> Bespoke Fit
              </Link>
            )}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '0.85rem', color: '#aaa' }}>
            <p style={{ marginBottom: '6px' }}><FiCheckCircle style={{ color: '#D4AF37' }} /> 100% Authentic Product Guarantee</p>
            <p style={{ marginBottom: '6px' }}><FiTruck style={{ color: '#D4AF37' }} /> Express 24-48 Hours Nationwide & International Shipping</p>
            <p><FiShield style={{ color: '#D4AF37' }} /> Encrypted Secure Checkout via Paystack & Flutterwave</p>
          </div>
        </div>
      </div>

      {completeLookItems.length > 0 && (
        <div className="complete-look">
          <h3>Complete the Empire Look</h3>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>Pair this item with matching luxury heels, designer bags, and 100% virgin wigs.</p>
          <div className="look-grid">
            {completeLookItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </DetailContainer>
  );
}
