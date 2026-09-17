'use client';

import * as React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
  onQuickView?: (product: Product) => void;
}

const badgeStyles: Record<string, string> = {
  new: 'bg-primary text-primary-foreground',
  bestseller: 'bg-accent text-accent-foreground',
  trending: 'bg-flash text-flash-foreground',
  exclusive: 'bg-foreground text-background',
  limited: 'bg-warning text-warning-foreground',
};

export function ProductCard({ product, className, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();
  const isWishlisted = hasWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.isOutOfStock) return;
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-md',
        product.isOutOfStock && 'opacity-60',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <a href={`/product/${product.slug}`} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.badge && (
            <Badge
              className={cn(
                'border-0 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide',
                badgeStyles[product.badge]
              )}
            >
              {product.badge}
            </Badge>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <Badge className="border-0 bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">
              -{product.discountPercent}%
            </Badge>
          )}
        </div>

        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm transition-all hover:bg-background"
        >
          <Heart
            className={cn(
              'h-3.5 w-3.5 transition-colors',
              isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
            )}
          />
        </button>

        {product.isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40">
            <span className="rounded bg-background px-3 py-1 text-xs font-semibold text-foreground shadow">
              Out of Stock
            </span>
          </div>
        )}

        {onQuickView && !product.isOutOfStock && (
          <button
            onClick={handleQuickView}
            aria-label="Quick view"
            className="absolute bottom-2 right-2 flex h-7 w-7 translate-y-2 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-background group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="font-medium text-foreground/60">{product.brand}</span>
          <span>·</span>
          <span className="truncate">{product.category}</span>
        </div>

        <a
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-primary"
        >
          {product.name}
        </a>

        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs font-semibold">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {product.isLowStock && !product.isOutOfStock && (
          <span className="text-[11px] font-medium text-warning">
            Only {product.stock} left
          </span>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.isOutOfStock}
            className="h-8 w-8 shrink-0 p-0"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
