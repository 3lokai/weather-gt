'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWeatherForecast, type WeatherForecast } from '@/lib/api/open-meteo';
import { useWeatherStore } from '@/lib/store/weather-store';

export function useWeatherForecast() {
  const { selectedLocation, units } = useWeatherStore();

  const query = useQuery({
    queryKey: ['weather-forecast', selectedLocation?.latitude, selectedLocation?.longitude, units],
    queryFn: async () => {
      if (!selectedLocation) {
        throw new Error('No location selected');
      }
      
      return await getWeatherForecast(selectedLocation.latitude, selectedLocation.longitude, units);
    },
    enabled: !!selectedLocation,
    staleTime: 10 * 60 * 1000, // 10 minutes - weather data doesn't change frequently
    gcTime: 15 * 60 * 1000, // 15 minutes - keep in cache longer
    refetchOnWindowFocus: true, // Background refetch on focus
    refetchOnMount: true, // Refetch when component mounts
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    weather: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error?.message || null,
    refetch: query.refetch,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isStale: query.isStale,
  };
}

// Hook for prefetching weather data (useful for search results)
export function usePrefetchWeatherForecast() {
  const { units } = useWeatherStore();
  const queryClient = useQueryClient();
  
  return {
    prefetchWeather: async (latitude: number, longitude: number) => {
      return queryClient.prefetchQuery({
        queryKey: ['weather-forecast', latitude, longitude, units],
        queryFn: () => getWeatherForecast(latitude, longitude, units),
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
      });
    }
  };
}
