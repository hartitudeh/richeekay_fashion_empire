'use client';

import React from 'react';
import { UserDashboardModal } from '../../components/UserDashboardModal';
import { useShop } from '../../context/ShopContext';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { setIsUserDashboardOpen } = useShop();

  useEffect(() => {
    setIsUserDashboardOpen(true);
  }, [setIsUserDashboardOpen]);

  return (
    <div style={{ minHeight: '70vh', background: '#0a0a0a', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <UserDashboardModal />
    </div>
  );
}
