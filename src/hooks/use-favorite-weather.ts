'use client';

import { useQuery } from '@tanstack/react-query';
import { getWeatherForecast, type WeatherForecast } from '@/lib/api/open-meteo';
import { useWeatherStore } from '@/lib/store/weather-store';
import { type Location } from '@/lib/store/weather-store';

/**
 * Hook to fetch weather data for a specific favorite location
 * Used in the favorites dropdown to show current weather for each location
 */
export function useFavoriteWeather(location: Location | null) {
  const { units } = useWeatherStore();

  const query = useQuery({
    queryKey: ['favorite-weather', location?.id, location?.latitude, location?.longitude, units],
    queryFn: async () => {
      if (!location) {
        throw new Error('No location provided');
      }
      
      return await getWeatherForecast(location.latitude, location.longitude, units);
    },
    enabled: !!location,
    staleTime: 5 * 60 * 1000, // 5 minutes - shorter than main weather for favorites
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on focus for favorites
    refetchOnMount: false, // Don't refetch on mount for favorites
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2; // Fewer retries for favorites
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Shorter delay
  });

  return {
    weather: query.data,
    isLoading: query.isLoading,
    error: query.error?.message || null,
    isError: query.isError,
  };
}

/**
 * Hook to get weather data for multiple favorite locations
 * Returns a map of location ID to weather data
 */
export function useFavoritesWeather(locations: Location[]) {
  const { units } = useWeatherStore();

  // Use a single query for all favorites to avoid hooks rule violations
  const query = useQuery({
    queryKey: ['favorites-weather', locations.map(l => l.id).join(','), units],
    queryFn: async () => {
      const promises = locations.map(location => 
        getWeatherForecast(location.latitude, location.longitude, units)
      );
      const results = await Promise.allSettled(promises);
      
      const weatherMap = new Map<string, WeatherForecast>();
      const errorMap = new Map<string, string | null>();
      
      results.forEach((result, index) => {
        const location = locations[index];
        if (result.status === 'fulfilled') {
          weatherMap.set(location.id, result.value);
        } else {
          errorMap.set(location.id, result.reason?.message || 'Unknown error');
        }
      });
      
      return { weatherMap, errorMap };
    },
    enabled: locations.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  // Create individual loading maps for compatibility
  const weatherMap = query.data?.weatherMap || new Map();
  const errorMap = query.data?.errorMap || new Map();
  const isLoadingMap = new Map<string, boolean>();
  
  // Set loading state for all locations when query is loading
  locations.forEach(location => {
    isLoadingMap.set(location.id, query.isLoading);
  });

  return {
    weatherMap,
    isLoadingMap,
    errorMap,
    isLoading: query.isLoading,
    hasErrors: query.isError,
  };
}
