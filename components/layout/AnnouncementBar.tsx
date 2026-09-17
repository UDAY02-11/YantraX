'use client';

import { Sparkles, Truck, Package } from 'lucide-react';

const messages = [
  { icon: Sparkles, text: 'Special Deals Today' },
  { icon: Truck, text: 'Free Shipping on Eligible Orders' },
  { icon: Package, text: 'New Products Added Weekly' },
];

export function AnnouncementBar() {
  const duplicated = [...messages, ...messages];
  return (
    <div className="relative overflow-hidden bg-foreground py-2 text-background">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicated.map((msg, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-6 text-xs font-medium"
          >
            <msg.icon className="h-3.5 w-3.5 shrink-0" />
            <span>{msg.text}</span>
            <span className="ml-6 text-background/30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
