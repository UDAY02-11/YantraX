'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endTime: Date;
  className?: string;
  variant?: 'default' | 'flash' | 'deal';
  onExpire?: () => void;
}

function getRemaining(end: number) {
  const now = Date.now();
  const diff = Math.max(0, end - now);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, diff };
}

export function CountdownTimer({
  endTime,
  className,
  variant = 'default',
  onExpire,
}: CountdownTimerProps) {
  const [time, setTime] = React.useState(() => getRemaining(endTime.getTime()));

  React.useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemaining(endTime.getTime());
      setTime(remaining);
      if (remaining.diff <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const bgClass =
    variant === 'flash'
      ? 'bg-flash text-flash-foreground'
      : variant === 'deal'
      ? 'bg-deal text-deal-foreground'
      : 'bg-primary text-primary-foreground';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className="text-xs font-medium text-muted-foreground">Ends in</span>
      <div className="flex items-center gap-1">
        {[
          { label: 'hours', value: time.hours },
          { label: 'minutes', value: time.minutes },
          { label: 'seconds', value: time.seconds },
        ].map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <span
              className={cn(
                'flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 font-mono text-sm font-bold tabular-nums',
                bgClass
              )}
            >
              {pad(unit.value)}
            </span>
            {idx < 2 && <span className="font-bold text-muted-foreground">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
