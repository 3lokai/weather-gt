import * as SunCalc from 'suncalc';

export interface Location {
  latitude: number;
  longitude: number;
  timezone: string;
}

/**
 * Determines if it's currently day or night at the given location
 * @param location - Location with lat/lng and timezone
 * @returns 'light' if it's day, 'dark' if it's night
 */
export function getTimeBasedTheme(location: Location): 'light' | 'dark' {
  try {
    // Get current time in the location's timezone
    const now = new Date();
    
    // Calculate sunrise and sunset times for today at this location
    const sunTimes = SunCalc.getTimes(now, location.latitude, location.longitude);
    
    // Check if current time is between sunrise and sunset
    const isDay = now >= sunTimes.sunrise && now <= sunTimes.sunset;
    
    return isDay ? 'light' : 'dark';
  } catch (error) {
    console.warn('Failed to calculate time-based theme:', error);
    // Fallback to system preference if calculation fails
    return 'light';
  }
}

/**
 * Gets the appropriate theme based on location and time
 * Falls back to system preference if location is not available
 * @param location - Optional location data
 * @param systemTheme - System theme preference
 * @returns Recommended theme
 */
export function getRecommendedTheme(
  location: Location | null, 
  systemTheme: 'light' | 'dark' | undefined
): 'light' | 'dark' {
  if (location) {
    return getTimeBasedTheme(location);
  }
  
  // Fallback to system theme if no location
  return systemTheme || 'light';
}
