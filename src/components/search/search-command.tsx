'use client';

import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useGeocodingSearch, geocodingResultToLocation } from '@/hooks/use-geocoding-search';
import { getWeatherForecast } from '@/lib/api/open-meteo';
import { Icon } from '@/components/icons/phosphor-icon';
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
  const { setSelectedLocation, units } = useWeatherStore();
  
  const { results, isLoading, isEmpty } = useGeocodingSearch({ 
    query,
    enabled: open 
  });

  // Handle location selection
  const handleLocationSelect = useCallback(async (result: any) => {
    const location = geocodingResultToLocation(result);
    setSelectedLocation(location);
    
    // Prefetch weather data for selected location
    try {
      await getWeatherForecast(result.latitude, result.longitude, units);
    } catch (error) {
      console.warn('Failed to prefetch weather data:', error);
    }
    
    onOpenChange(false);
    setQuery('');
  }, [setSelectedLocation, units, onOpenChange]);

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
      />
      <CommandList className="max-h-[400px]">
        {isLoading && query.length >= 2 && (
          <CommandEmpty className="py-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span className="text-muted-foreground">Searching...</span>
            </div>
          </CommandEmpty>
        )}
        
        {isEmpty && (
          <CommandEmpty className="py-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Icon name="MagnifyingGlass" size={24} color="muted" />
              <span className="text-muted-foreground">No locations found</span>
              <span className="text-xs text-muted-foreground">Try a different search term</span>
            </div>
          </CommandEmpty>
        )}

        {results.length > 0 && (
          <CommandGroup heading="Locations">
            {results.map((result) => (
              <CommandItem
                key={`${result.id}-${result.latitude}-${result.longitude}`}
                value={`${result.name} ${result.admin1 || ''} ${result.country}`.toLowerCase()}
                onSelect={() => handleLocationSelect(result)}
                className="cursor-pointer glass-hover"
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon name="MapPin" size={16} color="muted" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {result.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {[result.admin1, result.country].filter(Boolean).join(', ')}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {result.latitude.toFixed(2)}, {result.longitude.toFixed(2)}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {query.length < 2 && query.length > 0 && (
          <CommandEmpty className="py-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Icon name="Keyboard" size={24} color="muted" />
              <span className="text-muted-foreground">Keep typing...</span>
              <span className="text-xs text-muted-foreground">Enter at least 2 characters</span>
            </div>
          </CommandEmpty>
        )}

        {query.length === 0 && (
          <CommandEmpty className="py-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <Icon name="MagnifyingGlass" size={32} color="muted" />
              <div>
                <div className="text-foreground font-medium mb-1">Search for a location</div>
                <div className="text-xs text-muted-foreground mb-3">
                  Start typing a city name to see suggestions
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    ↑↓
                  </kbd>
                  navigate
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    ↵
                  </kbd>
                  select
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
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
