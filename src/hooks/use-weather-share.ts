'use client';

import { useCallback } from 'react';
import { useWeatherStore, type Location } from '@/lib/store/weather-store';
import { useURLState } from '@/hooks/use-url-state';
import { shareContent, createWeatherShareData } from '@/lib/utils/share';

/**
 * Hook for sharing weather information
 */
export function useWeatherShare() {
  const { selectedLocation } = useWeatherStore();
  const { createShareableURL } = useURLState();

  /**
   * Shares current weather state
   */
  const shareWeather = useCallback(async (customText?: string) => {
    if (!selectedLocation) {
      throw new Error('No location selected');
    }

    const shareableURL = createShareableURL();
    const shareData = createWeatherShareData(
      selectedLocation,
      shareableURL,
      customText
    );

    return await shareContent(shareData);
  }, [selectedLocation, createShareableURL]);

  /**
   * Shares specific location weather
   */
  const shareLocationWeather = useCallback(async (
    location: Location,
    customText?: string
  ) => {
    const shareableURL = createShareableURL({
      lat: location.latitude,
      lon: location.longitude,
      name: location.name,
    });

    const shareData = createWeatherShareData(
      location,
      shareableURL,
      customText
    );

    return await shareContent(shareData);
  }, [createShareableURL]);

  return {
    shareWeather,
    shareLocationWeather,
    canShare: !!selectedLocation,
  };
}
