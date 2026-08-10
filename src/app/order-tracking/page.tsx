'use client';

import React from 'react';
import { OrderTrackerModal } from '../../components/OrderTrackerModal';
import { useShop } from '../../context/ShopContext';
import { useEffect } from 'react';

export default function OrderTrackingPage() {
  const { setIsOrderTrackerOpen } = useShop();

  useEffect(() => {
    setIsOrderTrackerOpen(true);
  }, [setIsOrderTrackerOpen]);

  return (
    <div style={{ minHeight: '70vh', background: '#0a0a0a', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OrderTrackerModal />
    </div>
  );
}
