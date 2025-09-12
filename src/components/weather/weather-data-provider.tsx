'use client';

import { useWeatherForecast } from '@/hooks/use-weather-forecast';
import { useAirQuality } from '@/hooks/use-air-quality';
import { usePollen } from '@/hooks/use-pollen';
import { useWeatherStore } from '@/lib/store/weather-store';
import { ReactNode } from 'react';

interface WeatherDataProviderProps {
  children: (data: {
    weather: any;
    airQuality: any;
    pollen: any;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
    selectedDayIndex: number;
  }) => ReactNode;
}

export function WeatherDataProvider({ children }: WeatherDataProviderProps) {
  const { selectedLocation, selectedDayIndex } = useWeatherStore();
  
  const {
    weather,
    isLoading: weatherLoading,
    isError: weatherError,
    error: weatherErrorMessage,
  } = useWeatherForecast();
  
  const {
    airQuality,
    isLoading: airQualityLoading,
    isError: airQualityError,
    error: airQualityErrorMessage,
  } = useAirQuality();
  
  const {
    pollen,
    isLoading: pollenLoading,
    isError: pollenError,
    error: pollenErrorMessage,
  } = usePollen();

  const isLoading = weatherLoading || airQualityLoading || pollenLoading;
  const isError = weatherError || airQualityError || pollenError;
  const error = weatherErrorMessage || airQualityErrorMessage || pollenErrorMessage;

  // Only render children if we have a selected location
  if (!selectedLocation) {
    return null;
  }

  return (
    <>
      {children({
        weather,
        airQuality,
        pollen,
        isLoading,
        isError,
        error,
        selectedDayIndex,
      })}
    </>
  );
}
