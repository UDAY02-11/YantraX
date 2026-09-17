'use client';

import * as React from 'react';
import { MEGA_MENU_GROUPS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

interface ShopMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function ShopMegaMenu({ open, onClose }: ShopMegaMenuProps) {
  if (!open) return null;

  return (
    <div
      className="absolute left-1/2 top-full z-50 w-[min(900px,90vw)] -translate-x-1/2 pt-2"
      role="menu"
      aria-label="Shop categories"
    >
      <div
        className="overflow-hidden rounded-xl border bg-popover shadow-xl"
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={onClose}
      >
        <div className="grid grid-cols-4 gap-0">
          {MEGA_MENU_GROUPS.map((group) => (
            <div key={group.title} className="border-r p-4 last:border-r-0">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                      role="menuitem"
                    >
                      {item.name}
                      <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t bg-muted/50 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            Can&apos;t find what you need?
          </span>
          <a
            href="/shop"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Browse all products →
          </a>
        </div>
      </div>
    </div>
  );
}
