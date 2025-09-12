'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  getCurrentPosition, 
  getGeolocationPermissionStatus,
  setGeolocationPreference,
  getGeolocationPreference,
  clearGeolocationPreference,
  type GeolocationPosition,
  type GeolocationError,
  type GeolocationOptions
} from '@/lib/utils/geolocation';
import { reverseGeocode } from '@/lib/api/open-meteo';
import { useWeatherStore } from '@/lib/store/weather-store';

export interface GeolocationState {
  isLoading: boolean;
  position: GeolocationPosition | null;
  error: GeolocationError | null;
  permissionStatus: 'granted' | 'denied' | 'prompt' | 'unknown';
  hasRequested: boolean;
}

export interface GeolocationActions {
  requestLocation: (options?: GeolocationOptions) => Promise<void>;
  clearError: () => void;
  resetPermission: () => void;
}

export function useGeolocation(): GeolocationState & GeolocationActions {
  const [state, setState] = useState<GeolocationState>({
    isLoading: false,
    position: null,
    error: null,
    permissionStatus: 'unknown',
    hasRequested: false,
  });

  const { setSelectedLocation } = useWeatherStore();

  // Check permission status on mount
  useEffect(() => {
    const checkPermissionStatus = async () => {
      const status = await getGeolocationPermissionStatus();
      const storedPreference = getGeolocationPreference();
      
      setState(prev => ({
        ...prev,
        permissionStatus: status === 'unknown' ? 'prompt' : status,
        hasRequested: storedPreference !== null,
      }));
    };

    checkPermissionStatus();
  }, []);

  const requestLocation = useCallback(async (options?: GeolocationOptions) => {
    console.log('🎯 Starting geolocation request...');
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const position = await getCurrentPosition(options);
      console.log('📍 Position obtained:', position);
      
      setState(prev => ({
        ...prev,
        position,
        isLoading: false,
        permissionStatus: 'granted',
        hasRequested: true,
      }));

      // Store preference
      setGeolocationPreference('granted');

      // Convert coordinates to location object for weather store (with fallback name)
      const location = {
        id: `geo-${position.latitude}-${position.longitude}`,
        name: 'Current Location', // Start with fallback name
        country: '',
        admin1: '',
        latitude: position.latitude,
        longitude: position.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      console.log('💾 Setting location in store:', location);
      setSelectedLocation(location);
      
      console.log('✅ Geolocation hook: Location request completed successfully');

      // Try to get location name via reverse geocoding (async, non-blocking)
      console.log('🔄 Attempting reverse geocoding...');
      try {
        const geocodingResult = await reverseGeocode(position.latitude, position.longitude);
        if (geocodingResult) {
          const updatedLocation = {
            ...location,
            name: geocodingResult.name,
            country: geocodingResult.country,
            admin1: geocodingResult.admin1 || '',
          };
          console.log('🏙️ Reverse geocoding success, updating location:', updatedLocation);
          setSelectedLocation(updatedLocation);
        } else {
          console.log('⚠️ Reverse geocoding returned no results, keeping fallback name');
        }
      } catch (error) {
        console.warn('❌ Reverse geocoding failed, keeping fallback name:', error);
        // Don't update the location - keep the fallback name
      }

    } catch (error) {
      console.error('❌ Geolocation hook: Location request failed:', error);
      const geolocationError = error as GeolocationError;
      
      setState(prev => ({
        ...prev,
        error: geolocationError,
        isLoading: false,
        permissionStatus: geolocationError.code === 1 ? 'denied' : 'prompt',
        hasRequested: true,
      }));

      // Store preference based on error type
      if (geolocationError.code === 1) {
        setGeolocationPreference('denied');
      }
    }
  }, [setSelectedLocation]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const resetPermission = useCallback(() => {
    clearGeolocationPreference();
    setState(prev => ({
      ...prev,
      permissionStatus: 'prompt',
      hasRequested: false,
      error: null,
      position: null,
    }));
  }, []);

  return {
    ...state,
    requestLocation,
    clearError,
    resetPermission,
  };
}
