'use client';

import * as React from 'react';
import { Menu, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { useAuth } from '@/store/authStore';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { SearchBar } from '@/components/navigation/SearchBar';
import { SITE_NAME } from '@/lib/constants';
import { Cpu } from 'lucide-react';

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [quickSearch, setQuickSearch] = React.useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    window.location.href = `/shop?q=${encodeURIComponent(quickSearch.trim())}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center gap-3 lg:h-18">
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <a href="/" className="flex shrink-0 items-center gap-2 font-bold" aria-label={SITE_NAME}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="hidden text-xl font-extrabold tracking-tight sm:block" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {SITE_NAME}
          </span>
        </a>

        {/* Inline search — hidden on mobile, shown on tablet+ */}
        <form
          onSubmit={handleQuickSearch}
          className="relative mx-2 hidden flex-1 items-center md:flex lg:mx-4"
        >
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="h-10 border-muted bg-muted/40 pl-9 pr-4 focus-visible:bg-background"
            aria-label="Search products"
          />
        </form>

        <MainNavigation />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          <a href="/wishlist" className="relative hidden sm:block">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </a>

          <a href={user ? '/account' : '/login'}>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className="relative"
            aria-label="Cart"
          >
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <MobileNavigation open={mobileOpen} onOpenChange={setMobileOpen} />
      <SearchBar open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
