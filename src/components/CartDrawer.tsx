'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTag, FiTruck, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const DrawerOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 2000;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const DrawerContent = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 460px;
  background: #ffffff;
  border-left: 1px solid #c9a227;
  z-index: 2001;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
`;

const DrawerHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.35rem;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .close-btn {
    background: none;
    border: none;
    color: #c9a227;
    font-size: 1.4rem;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(90deg);
    }
  }
`;

const FreeShippingBar = styled.div<{ $percent: number }>`
  background: #faf8f5;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.2);
  font-size: 0.8rem;
  color: #1a1a1a;
  font-weight: 500;

  .bar-container {
    height: 6px;
    background: #efebe4;
    border-radius: 3px;
    margin-top: 6px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    width: ${({ $percent }) => Math.min($percent, 100)}%;
    background: linear-gradient(90deg, #c9a227 0%, #b8860b 100%);
    transition: width 0.4s ease;
  }
`;

const ItemList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItemRow = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.15);

  img {
    width: 80px;
    height: 100px;
    object-fit: cover;
    border: 1px solid rgba(201, 162, 39, 0.3);
    border-radius: 4px;
  }

  .item-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1rem;
      color: #1a1a1a;
      margin-bottom: 4px;
    }

    .meta {
      font-size: 0.75rem;
      color: #1a1a1a;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .price {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #90293e;
    }
  }

  .qty-controls {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.4);
      color: #1a1a1a;
      width: 26px;
      height: 26px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: #c9a227;
        color: #ffffff;
      }
    }

    span {
      font-size: 0.85rem;
      color: #1a1a1a;
      font-weight: 600;
      min-width: 18px;
      text-align: center;
    }
  }
`;

const DrawerFooter = styled.div`
  padding: 20px 24px;
  background: #ffffff;
  border-top: 1px solid rgba(201, 162, 39, 0.25);
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.04);

  .coupon-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;

    input {
      flex-grow: 1;
      background: #faf8f5;
      border: 1px solid rgba(201, 162, 39, 0.3);
      border-radius: 4px;
      color: #1a1a1a;
      padding: 8px 12px;
      font-size: 0.8rem;
      text-transform: uppercase;

      &:focus {
        outline: none;
        border-color: #b8860b;
      }
    }

    button {
      background: #d4af37;
      color: #0a0a0a;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0 16px;
      border: none;
      cursor: pointer;

      &:hover {
        background: #f4e798;
      }
    }
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #1a1a1a;
    font-weight: 500;
    margin-bottom: 8px;

    &.total {
      font-size: 1.15rem;
      font-weight: 700;
      color: #1a1a1a;
      border-top: 1px dashed rgba(201, 162, 39, 0.4);
      padding-top: 10px;
      margin-top: 8px;

      span.total-price {
        color: #b8860b;
        font-family: 'Playfair Display', Georgia, serif;
      }
    }
  }

  .checkout-btn {
    width: 100%;
    margin-top: 16px;
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

    &:hover {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }
  }
`;

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    formatPrice,
    cartSubtotalNGN,
    appliedCoupon,
    applyCoupon,
    couponDiscountNGN,
    deliveryState,
    setDeliveryState,
    deliveryCostNGN,
    cartTotalNGN,
    setIsCheckoutOpen,
    currentUser,
    setIsUserDashboardOpen
  } = useShop();

  const safeClose = useSafeCloseModal();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const freeShippingThreshold = 250000;
  const percentToFree = (cartSubtotalNGN / freeShippingThreshold) * 100;

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponMsg({ text: '10% VIP Coupon Applied!', success: true });
    } else {
      setCouponMsg({ text: 'Invalid Promo Code. Try RICHEEKAY10', success: false });
    }
  };

  return (
    <>
      <DrawerOverlay $open={isCartDrawerOpen} onClick={() => safeClose(() => setIsCartDrawerOpen(false))} />

      <DrawerContent $open={isCartDrawerOpen}>
        <DrawerHeader>
          <h3>
            <FiShoppingBag style={{ color: '#D4AF37' }} /> Your Shopping Bag ({cart.length})
          </h3>
          <button className="close-btn" onClick={() => safeClose(() => setIsCartDrawerOpen(false))}>
            <FiX />
          </button>
        </DrawerHeader>

        <FreeShippingBar $percent={percentToFree}>
          {cartSubtotalNGN >= freeShippingThreshold ? (
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>
              <FiTruck style={{ marginRight: '6px' }} /> Congratulations! You qualify for FREE Express Shipping.
            </span>
          ) : (
            <span>
              Add <strong>{formatPrice(freeShippingThreshold - cartSubtotalNGN)}</strong> more to unlock FREE Express Shipping!
            </span>
          )}
          <div className="bar-container">
            <div className="progress-fill" />
          </div>
        </FreeShippingBar>

        <ItemList>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#1a1a1a' }}>
              <FiShoppingBag style={{ fontSize: '3rem', color: '#D4AF37', marginBottom: '14px' }} />
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#1a1a1a', fontWeight: 600 }}>Your bag is empty.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '6px', color: '#1a1a1a', fontWeight: 500 }}>Explore our luxury collection and add your favorite outfits.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <CartItemRow key={idx}>
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="item-info">
                  <h4>{item.product.name}</h4>
                  <div className="meta">
                    Color: <strong>{item.selectedColor}</strong> | Size: <strong>{item.selectedSize}</strong>
                  </div>
                  <span className="price">{formatPrice(item.product.priceNGN)}</span>

                  <div className="qty-controls" style={{ marginTop: 'auto' }}>
                    <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}>
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}>
                      <FiPlus />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#ff4d4d', cursor: 'pointer' }}
                      title="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </CartItemRow>
            ))
          )}
        </ItemList>

        {cart.length > 0 && (
          <DrawerFooter>
            <div className="coupon-row">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. RICHEEKAY10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>APPLY</button>
            </div>

            {couponMsg && (
              <p style={{ fontSize: '0.75rem', color: couponMsg.success ? '#D4AF37' : '#FF4D4D', marginBottom: '10px' }}>
                {couponMsg.text}
              </p>
            )}

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 600 }}>Delivery Destination</label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                style={{
                  width: '100%',
                  background: '#1F1F1F',
                  color: '#FFF',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  padding: '6px 10px',
                  fontSize: '0.8rem',
                  marginTop: '4px'
                }}
              >
                <option value="Lagos State (Express 24h)">Lagos State (Express 24h) - ₦3,500</option>
                <option value="Oyo State (Ibadan & Environs 48h)">Oyo State (Ibadan & Environs 48h) - ₦4,500</option>
                <option value="Osogbo, Osun State (48h)">Osogbo, Osun State (48h) - ₦4,500</option>
                <option value="International DHL (UK/US/EU)">International DHL (UK/US/EU) - ₦25,000</option>
              </select>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotalNGN)}</span>
            </div>

            {appliedCoupon && (
              <div className="summary-row" style={{ color: '#D4AF37' }}>
                <span>Discount ({appliedCoupon})</span>
                <span>-{formatPrice(couponDiscountNGN)}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{formatPrice(deliveryCostNGN)}</span>
            </div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span className="total-price">{formatPrice(cartTotalNGN)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                setIsCartDrawerOpen(false);
                if (!currentUser) {
                  setIsUserDashboardOpen(true);
                } else {
                  setIsCheckoutOpen(true);
                }
              }}
            >
              Proceed to Checkout <FiArrowRight />
            </button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </>
  );
};
