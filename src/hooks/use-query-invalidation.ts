'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWeatherStore } from '@/lib/store/weather-store';

export function useQueryInvalidation() {
  const queryClient = useQueryClient();
  const { selectedLocation, units } = useWeatherStore();

  const invalidateWeatherQueries = useCallback(() => {
    // Invalidate all weather-related queries
    queryClient.invalidateQueries({
      queryKey: ['weather-forecast'],
    });
    queryClient.invalidateQueries({
      queryKey: ['air-quality'],
    });
    queryClient.invalidateQueries({
      queryKey: ['pollen'],
    });
  }, [queryClient]);

  const invalidateLocationQueries = useCallback((latitude?: number, longitude?: number) => {
    const coords = latitude && longitude ? { latitude, longitude } : selectedLocation;
    
    if (!coords) return;

    // Invalidate queries for specific location
    queryClient.invalidateQueries({
      queryKey: ['weather-forecast', coords.latitude, coords.longitude],
    });
    queryClient.invalidateQueries({
      queryKey: ['air-quality', coords.latitude, coords.longitude],
    });
    queryClient.invalidateQueries({
      queryKey: ['pollen', coords.latitude, coords.longitude],
    });
  }, [queryClient, selectedLocation]);

  const invalidateUnitsQueries = useCallback(() => {
    // Invalidate weather forecast queries when units change
    queryClient.invalidateQueries({
      queryKey: ['weather-forecast'],
    });
  }, [queryClient]);

  const refetchAllWeatherData = useCallback(async () => {
    // Refetch all weather data for current location
    await Promise.all([
      queryClient.refetchQueries({
        queryKey: ['weather-forecast', selectedLocation?.latitude, selectedLocation?.longitude, units],
      }),
      queryClient.refetchQueries({
        queryKey: ['air-quality', selectedLocation?.latitude, selectedLocation?.longitude],
      }),
      queryClient.refetchQueries({
        queryKey: ['pollen', selectedLocation?.latitude, selectedLocation?.longitude],
      }),
    ]);
  }, [queryClient, selectedLocation, units]);

  const clearAllWeatherCache = useCallback(() => {
    // Clear all weather-related cache
    queryClient.removeQueries({
      queryKey: ['weather-forecast'],
    });
    queryClient.removeQueries({
      queryKey: ['air-quality'],
    });
    queryClient.removeQueries({
      queryKey: ['pollen'],
    });
    queryClient.removeQueries({
      queryKey: ['geocoding'],
    });
  }, [queryClient]);

  return {
    invalidateWeatherQueries,
    invalidateLocationQueries,
    invalidateUnitsQueries,
    refetchAllWeatherData,
    clearAllWeatherCache,
  };
}
