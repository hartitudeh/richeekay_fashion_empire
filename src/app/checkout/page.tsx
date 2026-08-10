'use client';

import React from 'react';
import { CheckoutModal } from '../../components/CheckoutModal';
import { useShop } from '../../context/ShopContext';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { setIsCheckoutOpen } = useShop();

  useEffect(() => {
    setIsCheckoutOpen(true);
  }, [setIsCheckoutOpen]);

  return (
    <div style={{ minHeight: '70vh', background: '#0a0a0a', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CheckoutModal />
    </div>
  );
}
