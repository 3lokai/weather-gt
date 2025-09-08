'use client';

import * as React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useGeocodingSearch, geocodingResultToLocation } from '@/hooks/use-geocoding-search';
import { getWeatherForecast } from '@/lib/api/open-meteo';
import { Icon } from '@/components/icons/phosphor-icon';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

interface InlineSearchProps {
  className?: string;
  placeholder?: string;
}

export function InlineSearch({ className, placeholder = 'Search for a place...' }: InlineSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedLocation, units, selectedLocation } = useWeatherStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { results, isLoading, isEmpty } = useGeocodingSearch({ 
    query,
    enabled: isOpen && query.length >= 2
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
    
    setIsOpen(false);
    setQuery('');
  }, [setSelectedLocation, units]);

  // Handle clicks outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show results when we have query or loading
  const showResults = isOpen && (query.length >= 2 || isLoading);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedLocation ? selectedLocation.name : placeholder}
          className="peer w-full h-14 ps-14 pe-12 glass-clear glass-hover border-2 border-border hover:border-primary/40 focus:border-primary/60 bg-background/60 hover:bg-background/80 focus:bg-background/90 rounded-lg transition-all duration-200 text-body-l font-normal text-foreground placeholder:text-muted-foreground outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          aria-label="Search for a location"
        />
        
        {/* Search/Loading Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-4 pointer-events-none peer-disabled:opacity-50">
          {isLoading ? (
            <div 
              className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" 
              role="status" 
              aria-label="Loading search results..."
            />
          ) : (
            <Icon 
              name="MagnifyingGlass" 
              size={20} 
              className="text-muted-foreground peer-hover:text-primary peer-focus:text-primary transition-colors" 
              aria-hidden="true"
            />
          )}
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-e-lg text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors outline-none"
            aria-label="Clear search"
            type="button"
          >
            <Icon name="X" size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Inline Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[100]">
          <Command className="glass-strong border border-border/20 rounded-lg shadow-xl backdrop-blur-xl isolate">
            <CommandList className="max-h-[300px]">
              {isLoading && query.length >= 2 && (
                <CommandEmpty className="py-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    <span className="text-muted-foreground">Searching...</span>
                  </div>
                </CommandEmpty>
              )}
              
              {isEmpty && query.length >= 2 && !isLoading && (
                <CommandEmpty className="py-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="MagnifyingGlass" size={24} color="muted" />
                    <span className="text-muted-foreground">No locations found</span>
                    <span className="text-xs text-muted-foreground">Try a different search term</span>
                  </div>
                </CommandEmpty>
              )}

              {results.length > 0 && (
                <CommandGroup>
                  {results.slice(0, 5).map((result) => (
                    <CommandItem
                      key={`${result.id}-${result.latitude}-${result.longitude}`}
                      value={`${result.name} ${result.admin1 || ''} ${result.country}`.toLowerCase()}
                      onSelect={() => handleLocationSelect(result)}
                      className="cursor-pointer hover:bg-accent/80 focus:bg-accent/80 data-[selected=true]:bg-accent/80 relative z-10"
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
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
