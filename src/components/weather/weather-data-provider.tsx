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

  // Always render children, but pass null weather when no location is selected
  return (
    <>
      {children({
        weather: selectedLocation ? weather : null,
        airQuality: selectedLocation ? airQuality : null,
        pollen: selectedLocation ? pollen : null,
        isLoading: selectedLocation ? isLoading : false,
        isError: selectedLocation ? isError : false,
        error: selectedLocation ? error : null,
        selectedDayIndex,
      })}
    </>
  );
}
