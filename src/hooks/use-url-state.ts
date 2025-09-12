'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWeatherStore, type Location, type Units } from '@/lib/store/weather-store';
import { 
  encodeWeatherState, 
  decodeWeatherState, 
  createLocationFromURLState,
  type URLState 
} from '@/lib/utils/url-state';
import { getSelectedDayDateString, mapDateToDayIndex } from '@/lib/utils/weather-data-mapping';

/**
 * Hook for synchronizing weather state with URL parameters
 * This hook is designed to be non-intrusive and only handle URL state on page load and sharing
 */
export function useURLState(weather?: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);
  
  const {
    selectedLocation,
    selectedDayIndex,
    units,
    setSelectedLocation,
    setSelectedDayIndex,
    setUnits,
  } = useWeatherStore();

  /**
   * Creates a shareable URL with current state
   */
  const createShareableURL = useCallback((customState?: Partial<URLState>) => {
    const state: URLState = {
      lat: selectedLocation?.latitude,
      lon: selectedLocation?.longitude,
      name: selectedLocation?.name,
      units: {
        temperature: units.temperature,
        windSpeed: units.windSpeed,
        precipitation: units.precipitation,
        pressure: units.pressure,
      },
      timeFormat: units.timeFormat,
      dayIndex: selectedDayIndex,
      // Include the actual date for the selected day
      date: weather ? getSelectedDayDateString(weather, selectedDayIndex) : undefined,
      ...customState,
    };

    const params = encodeWeatherState(state);
    const queryString = params.toString();
    return queryString ? `${window.location.origin}?${queryString}` : window.location.origin;
  }, [selectedLocation, selectedDayIndex, units, weather]);

  /**
   * Updates URL with current weather state - only called manually for sharing
   */
  const updateURL = useCallback((state?: Partial<URLState>) => {
    const currentState: URLState = {
      lat: selectedLocation?.latitude,
      lon: selectedLocation?.longitude,
      name: selectedLocation?.name,
      units: {
        temperature: units.temperature,
        windSpeed: units.windSpeed,
        precipitation: units.precipitation,
        pressure: units.pressure,
      },
      timeFormat: units.timeFormat,
      dayIndex: selectedDayIndex,
      // Include the actual date for the selected day
      date: weather ? getSelectedDayDateString(weather, selectedDayIndex) : undefined,
      ...state,
    };

    const params = encodeWeatherState(currentState);
    const queryString = params.toString();
    
    // Use replace to avoid adding to browser history
    const newUrl = queryString ? `?${queryString}` : '';
    router.replace(newUrl, { scroll: false });
  }, [selectedLocation, selectedDayIndex, units, weather, router]);

  // Only restore state from URL on initial page load
  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    
    const urlState = decodeWeatherState(searchParams);
    
    // Restore location if valid and we don't already have a location
    if (urlState.lat !== undefined && urlState.lon !== undefined && urlState.name && !selectedLocation) {
      const location = createLocationFromURLState(urlState);
      if (location) {
        setSelectedLocation(location);
      }
    }
    
    // Restore day index - prioritize date over dayIndex if both are present
    if (urlState.date && weather) {
      // If we have a specific date and weather data, try to map it to a day index
      const dayIndexFromDate = mapDateToDayIndex(weather, urlState.date);
      if (dayIndexFromDate !== null) {
        setSelectedDayIndex(dayIndexFromDate);
      } else if (urlState.dayIndex !== undefined) {
        // Fallback to dayIndex if date mapping fails
        setSelectedDayIndex(urlState.dayIndex);
      }
    } else if (urlState.dayIndex !== undefined) {
      // Use dayIndex if no date is provided
      setSelectedDayIndex(urlState.dayIndex);
    }
    
    // Restore units only on initial load
    if (urlState.units) {
      const newUnits: Partial<Units> = {};
      if (urlState.units.temperature) newUnits.temperature = urlState.units.temperature;
      if (urlState.units.windSpeed) newUnits.windSpeed = urlState.units.windSpeed;
      if (urlState.units.precipitation) newUnits.precipitation = urlState.units.precipitation;
      if (urlState.units.pressure) newUnits.pressure = urlState.units.pressure;
      if (urlState.timeFormat) newUnits.timeFormat = urlState.timeFormat;
      
      setUnits(newUnits);
    }
    
    hasInitialized.current = true;
  }, [searchParams, selectedLocation, setSelectedLocation, setSelectedDayIndex, setUnits, weather]);

  return {
    updateURL,
    createShareableURL,
  };
}
