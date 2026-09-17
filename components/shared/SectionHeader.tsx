'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  icon?: React.ReactNode;
  accent?: string;
  className?: string;
}

export function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel = 'View All',
  icon,
  accent,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={accent ? { backgroundColor: `hsl(${accent} / 0.12)` } : undefined}
          >
            {icon}
          </div>
        )}
        <div>
          <h2 className="section-title">{title}</h2>
        </div>
      </div>
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {viewAllLabel}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
