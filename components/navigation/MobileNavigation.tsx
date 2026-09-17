'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { NAV_ITEMS, MEGA_MENU_GROUPS } from '@/lib/constants';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavigation({ open, onOpenChange }: MobileNavigationProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] overflow-y-auto sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.label === 'Shop' ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="shop" className="border-b">
                      <AccordionTrigger className="px-3 text-base font-medium">
                        Shop
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 px-3 pb-2">
                          {MEGA_MENU_GROUPS.map((group) => (
                            <div key={group.title}>
                              <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                                {group.title}
                              </p>
                              <ul className="space-y-1">
                                {group.items.slice(0, 4).map((cat) => (
                                  <li key={cat.name}>
                                    <a
                                      href={cat.href}
                                      className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-accent"
                                    >
                                      {cat.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <a
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
