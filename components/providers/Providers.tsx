'use client';

import * as React from 'react';
import { CartProvider } from '@/store/cartStore';
import { WishlistProvider } from '@/store/wishlistStore';
import { AuthProvider } from '@/store/authStore';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
