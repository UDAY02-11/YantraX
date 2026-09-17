'use client';

import * as React from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { searchService } from '@/services/searchService';
import type { SearchSuggestion } from '@/services/searchService';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchBar({ open, onOpenChange }: SearchBarProps) {
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const popularSearches = React.useMemo(() => searchService.getPopularSearches(), []);

  React.useEffect(() => {
    if (open) {
      setRecentSearches(searchService.getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setSuggestions([]);
    }
  }, [open]);

  React.useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const result = await searchService.search(query);
      setSuggestions(result.suggestions);
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    searchService.addRecentSearch(query.trim());
    window.location.href = `/shop?q=${encodeURIComponent(query.trim())}`;
  };

  const handleSuggestionClick = (s: SearchSuggestion) => {
    searchService.addRecentSearch(s.label);
    window.location.href = s.href;
  };

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    searchService.addRecentSearch(term);
    window.location.href = `/shop?q=${encodeURIComponent(term)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <form onSubmit={handleSubmit} className="flex items-center border-b px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="border-0 focus-visible:ring-0"
            aria-label="Search query"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="shrink-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </form>

        <div className="max-h-[400px] overflow-y-auto p-4">
          {suggestions.length > 0 ? (
            <div className="space-y-1">
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                Suggestions
              </p>
              {suggestions.map((s) => (
                <button
                  key={`${s.type}-${s.label}`}
                  onClick={() => handleSuggestionClick(s)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{s.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground capitalize">
                    {s.type}
                  </span>
                </button>
              ))}
            </div>
          ) : !query ? (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleQuickSearch(term)}
                        className="rounded-full border bg-muted px-3 py-1.5 text-sm hover:bg-accent"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" /> Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="rounded-full border bg-muted px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Searching...</p>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
