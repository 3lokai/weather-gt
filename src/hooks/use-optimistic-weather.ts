'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useWeatherStore } from '@/lib/store/weather-store';
import { type WeatherForecast } from '@/lib/api/open-meteo';

export function useOptimisticWeather() {
  const queryClient = useQueryClient();
  const { selectedLocation, units } = useWeatherStore();

  const setOptimisticWeather = (location: typeof selectedLocation) => {
    if (!location) return;

    // Create optimistic weather data based on previous location's data
    const previousWeather = queryClient.getQueryData<WeatherForecast>([
      'weather-forecast',
      selectedLocation?.latitude,
      selectedLocation?.longitude,
      units,
    ]);

    if (previousWeather) {
      // Use previous weather data as optimistic update
      queryClient.setQueryData(
        ['weather-forecast', location.latitude, location.longitude, units],
        {
          ...previousWeather,
          // Update location-specific data
          current: {
            ...previousWeather.current,
            // Keep the same weather conditions for optimistic update
          },
        }
      );
    }
  };

  const clearOptimisticWeather = (location: typeof selectedLocation) => {
    if (!location) return;

    // Remove optimistic data to allow fresh fetch
    queryClient.removeQueries({
      queryKey: ['weather-forecast', location.latitude, location.longitude, units],
    });
  };

  return {
    setOptimisticWeather,
    clearOptimisticWeather,
  };
}
