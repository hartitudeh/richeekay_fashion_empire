'use client';

import { useRouter, usePathname } from 'next/navigation';

export function useSafeCloseModal() {
  const router = useRouter();
  const pathname = usePathname();

  return (closeModalStateFn: () => void) => {
    closeModalStateFn();

    const isDedicatedModalRoute = [
      '/cart',
      '/checkout',
      '/order-tracking',
      '/dashboard',
      '/admin'
    ].some((route) => pathname === route || pathname.startsWith(`${route}/`));

    if (isDedicatedModalRoute) {
      if (typeof window !== 'undefined' && window.history.length > 2) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };
}
