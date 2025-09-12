/**
 * Geolocation utility service with error handling and fallback mechanisms
 * Handles browser geolocation API with proper timeout and user-friendly error messages
 */

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

export interface GeolocationError {
  code: number;
  message: string;
  userFriendlyMessage: string;
}

export interface GeolocationOptions {
  timeout?: number;
  enableHighAccuracy?: boolean;
  maximumAge?: number;
}

const DEFAULT_OPTIONS: Required<GeolocationOptions> = {
  timeout: 15000, // 15 seconds
  enableHighAccuracy: true,
  maximumAge: 300000, // 5 minutes
};

/**
 * Check if geolocation is supported by the browser
 */
export function isGeolocationSupported(): boolean {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

/**
 * Get user's current position with error handling
 */
export function getCurrentPosition(
  options: GeolocationOptions = {}
): Promise<GeolocationPosition> {
  if (!isGeolocationSupported()) {
    return Promise.reject({
      code: -1,
      message: 'Geolocation is not supported by this browser',
      userFriendlyMessage: 'Your browser doesn\'t support location services. Please search for your location manually.',
    } as GeolocationError);
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    console.log('🌍 Requesting geolocation with options:', opts);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('✅ Geolocation success:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        console.log('❌ Geolocation error:', {
          code: error.code,
          message: error.message,
        });
        
        const geolocationError: GeolocationError = {
          code: error.code,
          message: error.message,
          userFriendlyMessage: getUserFriendlyErrorMessage(error.code),
        };
        reject(geolocationError);
      },
      opts
    );
  });
}

/**
 * Convert geolocation error codes to user-friendly messages
 */
function getUserFriendlyErrorMessage(code: number): string {
  switch (code) {
    case 1: // PERMISSION_DENIED
      return 'Location access was denied. You can search for your location manually.';
    case 2: // POSITION_UNAVAILABLE
      return 'Unable to determine your location. Please check your device settings or search manually.';
    case 3: // TIMEOUT
      return 'Location request timed out. Please try again or search for your location manually.';
    default:
      return 'Unable to get your location. Please search for your location manually.';
  }
}

/**
 * Check if geolocation permission has been granted, denied, or is unknown
 */
export async function getGeolocationPermissionStatus(): Promise<PermissionState | 'unknown'> {
  if (!isGeolocationSupported()) {
    return 'unknown';
  }

  try {
    // Check if Permissions API is supported
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      return permission.state;
    }
  } catch (error) {
    // Permissions API not supported or failed
    console.warn('Permissions API not supported:', error);
  }

  return 'unknown';
}

/**
 * Store geolocation permission preference in localStorage
 */
export function setGeolocationPreference(preference: 'granted' | 'denied' | 'dismissed'): void {
  try {
    localStorage.setItem('geolocation-preference', preference);
  } catch (error) {
    console.warn('Failed to store geolocation preference:', error);
  }
}

/**
 * Get stored geolocation permission preference
 */
export function getGeolocationPreference(): 'granted' | 'denied' | 'dismissed' | null {
  try {
    const preference = localStorage.getItem('geolocation-preference');
    if (preference === 'granted' || preference === 'denied' || preference === 'dismissed') {
      return preference;
    }
  } catch (error) {
    console.warn('Failed to retrieve geolocation preference:', error);
  }
  return null;
}

/**
 * Clear stored geolocation preference
 */
export function clearGeolocationPreference(): void {
  try {
    localStorage.removeItem('geolocation-preference');
  } catch (error) {
    console.warn('Failed to clear geolocation preference:', error);
  }
}
