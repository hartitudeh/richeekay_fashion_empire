'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiShield, FiTruck } from 'react-icons/fi';
import styled from 'styled-components';

const Header = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 60px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3rem;
    color: #ffffff;

    span {
      color: #d4af37;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 36px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .cart-table {
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 24px;

    .row {
      display: grid;
      grid-template-columns: 80px 1fr 120px 100px 40px;
      gap: 16px;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      @media (max-width: 600px) {
        grid-template-columns: 60px 1fr 80px;
      }

      img {
        width: 70px;
        height: 90px;
        object-fit: cover;
      }

      .info {
        h4 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.05rem;
          color: #ffffff;
        }
        span {
          font-size: 0.8rem;
          color: #aaa;
        }
      }

      .price {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.1rem;
        color: #d4af37;
        font-weight: bold;
      }

      .qty-btn {
        display: flex;
        align-items: center;
        gap: 6px;

        button {
          background: #0a0a0a;
          border: 1px solid #d4af37;
          color: #d4af37;
          width: 26px;
          height: 26px;
          cursor: pointer;
        }
      }
    }
  }

  .summary-box {
    background: #141414;
    border: 1px solid #d4af37;
    padding: 24px;
    height: fit-content;

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      color: #ffffff;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      padding-bottom: 10px;
    }

    .sum-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 0.9rem;
      color: #ccc;

      &.total {
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        border-top: 1px dashed rgba(212, 175, 55, 0.4);
        padding-top: 12px;
        margin-top: 12px;

        span.price {
          color: #d4af37;
          font-family: 'Playfair Display', serif;
        }
      }
    }

    .checkout-btn {
      width: 100%;
      margin-top: 20px;
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 0;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-decoration: none;

      &:hover {
        background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
      }
    }
  }
`;

export default function FullCartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    formatPrice,
    cartSubtotalNGN,
    couponDiscountNGN,
    deliveryCostNGN,
    cartTotalNGN,
    appliedCoupon
  } = useShop();

  return (
    <>
      <Header>
        <h1>
          YOUR SHOPPING <span>BAG</span>
        </h1>
      </Header>

      <Container>
        <div className="cart-table">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
              <FiShoppingBag style={{ fontSize: '3rem', color: '#D4AF37', marginBottom: '14px' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#FFF' }}>Your bag is empty</h3>
              <p style={{ marginTop: '8px' }}>Explore our luxury collection and add your favorite outfits.</p>
              <Link href="/shop" style={{ color: '#D4AF37', fontWeight: 'bold', display: 'inline-block', marginTop: '16px', textDecoration: 'none' }}>
                Go to Shop Catalog
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="row">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="info">
                  <h4>{item.product.name}</h4>
                  <span>Color: {item.selectedColor} | Size: {item.selectedSize}</span>
                </div>
                <div className="qty-btn">
                  <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}>
                    <FiMinus />
                  </button>
                  <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}>
                    <FiPlus />
                  </button>
                </div>
                <div className="price">{formatPrice(item.product.priceNGN * item.quantity)}</div>
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                  style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="summary-box">
            <h3>Order Summary</h3>
            <div className="sum-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotalNGN)}</span>
            </div>
            {appliedCoupon && (
              <div className="sum-row" style={{ color: '#D4AF37' }}>
                <span>Discount ({appliedCoupon})</span>
                <span>-{formatPrice(couponDiscountNGN)}</span>
              </div>
            )}
            <div className="sum-row">
              <span>Estimated Delivery</span>
              <span>{formatPrice(deliveryCostNGN)}</span>
            </div>
            <div className="sum-row total">
              <span>Total Payable</span>
              <span className="price">{formatPrice(cartTotalNGN)}</span>
            </div>

            <Link href="/checkout" className="checkout-btn">
              Proceed to Checkout <FiArrowRight />
            </Link>
          </div>
        )}
      </Container>
    </>
  );
}
