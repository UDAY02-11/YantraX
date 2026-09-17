import { cn } from '@/lib/utils';

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border bg-card',
        className
      )}
    >
      <div className="aspect-square animate-shimmer rounded-t-lg" />
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="h-2.5 w-16 animate-shimmer rounded" />
        <div className="h-3.5 w-full animate-shimmer rounded" />
        <div className="h-3 w-3/4 animate-shimmer rounded" />
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 animate-shimmer rounded" />
          <div className="h-2.5 w-10 animate-shimmer rounded" />
        </div>
        <div className="mt-auto flex items-end justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-14 animate-shimmer rounded" />
            <div className="h-3 w-10 animate-shimmer rounded" />
          </div>
          <div className="h-8 w-8 animate-shimmer rounded-md" />
        </div>
      </div>
    </div>
  );
}
