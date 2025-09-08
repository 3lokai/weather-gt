'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useEffect, useState } from 'react';
import { searchLocations, type GeocodingResult } from '@/lib/api/open-meteo';

interface UseGeocodingSearchOptions {
  query: string;
  enabled?: boolean;
  debounceMs?: number;
}

export function useGeocodingSearch({ 
  query, 
  enabled = true,
  debounceMs = 300 
}: UseGeocodingSearchOptions) {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the query to avoid too many API calls
  useEffect(() => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery || trimmedQuery.length < 2) {
      setDebouncedQuery('');
      return;
    }

    const timeoutId = setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]);

  const { 
    data: results = [], 
    isLoading, 
    error,
    isFetching 
  } = useQuery({
    queryKey: ['geocoding', debouncedQuery],
    queryFn: () => searchLocations(debouncedQuery),
    enabled: enabled && debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return {
    results,
    isLoading,
    isFetching,
    error,
    hasResults: results.length > 0,
    isEmpty: !isLoading && !isFetching && results.length === 0 && debouncedQuery.length >= 2,
  };
}

// Transform GeocodingResult to Location format for the store
export function geocodingResultToLocation(result: GeocodingResult) {
  return {
    id: result.id.toString(),
    name: result.name,
    country: result.country,
    admin1: result.admin1,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  };
}
