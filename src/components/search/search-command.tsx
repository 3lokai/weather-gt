'use client';

import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useGeocodingSearch, geocodingResultToLocation } from '@/hooks/use-geocoding-search';
import { usePrefetchWeatherForecast } from '@/hooks/use-weather-forecast';
import { useOptimisticWeather } from '@/hooks/use-optimistic-weather';
import { Icon } from '@/components/icons/phosphor-icon';
import { cn } from '@/lib/utils';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const { setSelectedLocation, favorites, addFavorite, removeFavorite } = useWeatherStore();
  const { prefetchWeather } = usePrefetchWeatherForecast();
  const { setOptimisticWeather } = useOptimisticWeather();
  
  const { results, isLoading, isEmpty } = useGeocodingSearch({ 
    query,
    enabled: open 
  });

  // Handle location selection
  const handleLocationSelect = useCallback(async (result: any) => {
    const location = geocodingResultToLocation(result);
    
    // Set optimistic weather data for immediate UI feedback
    setOptimisticWeather(location);
    
    // Update selected location (this will trigger cache invalidation)
    setSelectedLocation(location);
    
    // Prefetch weather data for selected location using TanStack Query
    try {
      await prefetchWeather(result.latitude, result.longitude);
    } catch (error) {
      console.warn('Failed to prefetch weather data:', error);
    }
    
    onOpenChange(false);
    setQuery('');
  }, [setSelectedLocation, prefetchWeather, setOptimisticWeather, onOpenChange]);

  // Handle favorite toggle
  const handleFavoriteToggle = useCallback((result: any, event: React.MouseEvent) => {
    event.stopPropagation();
    const location = geocodingResultToLocation(result);
    const isFavorited = favorites.some(fav => fav.id === location.id);
    
    if (isFavorited) {
      removeFavorite(location.id);
    } else {
      addFavorite(location);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Clear query when dialog closes and manage focus
  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  // Auto-focus the input when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure dialog is rendered
      const timeout = setTimeout(() => {
        const input = document.querySelector('[data-slot="command-input"]') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange}
      title="Search Locations"
      description="Search for a city or location to get weather data"
      className="glass-strong backdrop-blur-xl"
    >
      <CommandInput
        placeholder="Search for a city..."
        value={query}
        onValueChange={setQuery}
        className="text-foreground placeholder:text-muted-foreground"
        aria-label="Search for a city or location"
        aria-describedby="search-description"
        role="searchbox"
        aria-autocomplete="list"
        aria-activedescendant={results.length > 0 ? `location-${results[0]?.id}` : undefined}
      />
      <div id="search-description" className="sr-only">
        Type at least 2 characters to search for locations. Use arrow keys to navigate results and Enter to select.
      </div>
      <CommandList 
        className="max-h-[400px]"
        role="listbox"
        aria-label="Search results"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {isLoading && query.length >= 2 && (
          <CommandEmpty className="py-6 text-center" role="status" aria-live="polite">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" aria-hidden="true" />
              <span className="text-muted-foreground">Searching...</span>
            </div>
          </CommandEmpty>
        )}
        
        {isEmpty && (
          <CommandEmpty className="py-6 text-center" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-2">
              <Icon name="MagnifyingGlass" size={24} color="muted" aria-hidden="true" />
              <span className="text-muted-foreground">No locations found</span>
              <span className="text-xs text-muted-foreground">Try a different search term</span>
            </div>
          </CommandEmpty>
        )}

        {results.length > 0 && (
          <CommandGroup heading="Locations" role="group" aria-label="Search results">
            {results.map((result, index) => {
              const location = geocodingResultToLocation(result);
              const isFavorited = favorites.some(fav => fav.id === location.id);
              
              return (
                <CommandItem
                  key={`${result.id}-${result.latitude}-${result.longitude}`}
                  value={`${result.name} ${result.admin1 || ''} ${result.country}`.toLowerCase()}
                  onSelect={() => handleLocationSelect(result)}
                  className="cursor-pointer glass-hover group"
                  role="option"
                  id={`location-${result.id}`}
                  aria-selected={index === 0}
                  aria-label={`${result.name}, ${[result.admin1, result.country].filter(Boolean).join(', ')}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon name="MapPin" size={16} color="muted" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {result.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {[result.admin1, result.country].filter(Boolean).join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground font-mono" aria-label={`Coordinates: ${result.latitude.toFixed(2)}, ${result.longitude.toFixed(2)}`}>
                        {result.latitude.toFixed(2)}, {result.longitude.toFixed(2)}
                      </div>
                      <button
                        onClick={(e) => handleFavoriteToggle(result, e)}
                        className={cn(
                          "p-1 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100",
                          isFavorited 
                            ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
                            : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                        )}
                        aria-label={isFavorited ? `Remove ${result.name} from favorites` : `Add ${result.name} to favorites`}
                      >
                        <Icon 
                          name="Heart" 
                          size={16} 
                          className={cn(
                            "transition-all duration-200",
                            isFavorited && "fill-current"
                          )} 
                        />
                      </button>
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {query.length < 2 && query.length > 0 && (
          <CommandEmpty className="py-6 text-center" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-2">
              <Icon name="Keyboard" size={24} color="muted" aria-hidden="true" />
              <span className="text-muted-foreground">Keep typing...</span>
              <span className="text-xs text-muted-foreground">Enter at least 2 characters</span>
            </div>
          </CommandEmpty>
        )}

        {query.length === 0 && (
          <CommandEmpty className="py-6 text-center" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-3">
              <Icon name="MagnifyingGlass" size={32} color="muted" aria-hidden="true" />
              <div>
                <div className="text-foreground font-medium mb-1">Search for a location</div>
                <div className="text-xs text-muted-foreground mb-3">
                  Start typing a city name to see suggestions
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground" role="group" aria-label="Keyboard shortcuts">
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100" aria-label="Arrow keys">
                    ↑↓
                  </kbd>
                  navigate
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100" aria-label="Enter key">
                    ↵
                  </kbd>
                  select
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100" aria-label="Escape key">
                    esc
                  </kbd>
                  close
                </div>
              </div>
            </div>
          </CommandEmpty>
        )}
      </CommandList>
    </CommandDialog>
  );
}
