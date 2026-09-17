'use client';

import * as React from 'react';
import { NAV_ITEMS } from '@/lib/constants';
import { ShopMegaMenu } from '@/components/navigation/ShopMegaMenu';
import { cn } from '@/lib/utils';

export function MainNavigation() {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleMouseEnter = (label: string) => {
    clearCloseTimer();
    setHoveredItem(label);
    setMegaMenuOpen(label === 'Shop');
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredItem(null);
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleFocus = (label: string) => {
    clearCloseTimer();
    setHoveredItem(label);
    setMegaMenuOpen(label === 'Shop');
  };

  const handleMenuClose = () => {
    clearCloseTimer();
    setMegaMenuOpen(false);
    setHoveredItem(null);
  };

  return (
    <nav
      className="hidden md:block"
      onMouseLeave={handleMouseLeave}
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            onMouseEnter={() => handleMouseEnter(item.label)}
            onFocus={() => handleFocus(item.label)}
            className="relative"
          >
            <a
              href={item.href}
              className={cn(
                'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                hoveredItem === item.label
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
              )}
              aria-current={item.href === '/' ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <ShopMegaMenu open={megaMenuOpen} onClose={handleMenuClose} />
    </nav>
  );
}
