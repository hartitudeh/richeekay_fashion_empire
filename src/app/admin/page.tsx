'use client';

import React from 'react';
import { AdminPortalModal } from '../../components/AdminPortalModal';
import { useShop } from '../../context/ShopContext';
import { useEffect } from 'react';

export default function AdminPage() {
  const { setIsAdminPortalOpen } = useShop();

  useEffect(() => {
    setIsAdminPortalOpen(true);
  }, [setIsAdminPortalOpen]);

  return (
    <div style={{ minHeight: '70vh', background: '#0a0a0a', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AdminPortalModal />
    </div>
  );
}
