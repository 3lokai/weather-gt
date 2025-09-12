/**
 * Weather Data Mapping Utilities
 * 
 * This file contains utility functions to map between the UI's selectedDayIndex
 * and the actual API data structure returned by Open-Meteo.
 * 
 * API Data Structure:
 * - Daily data: 2 past days + 7 future days = 9 total days
 *   - Index 0-1: Past days (historical data)
 *   - Index 2: Today (current day)
 *   - Index 3-8: Future days (forecast data)
 * 
 * - Hourly data: 48 hours of past data + 168 hours of future data = 216 total hours
 *   - Hours 0-47: Past 48 hours
 *   - Hours 48-215: Future 168 hours (7 days × 24 hours)
 * 
 * UI selectedDayIndex:
 * - 0: Today
 * - 1: Tomorrow
 * - 2: Day after tomorrow
 * - etc.
 */

/**
 * Maps UI selectedDayIndex to API daily data index
 * @param selectedDayIndex UI day index (0 = today, 1 = tomorrow, etc.)
 * @returns API daily data index
 */
export function mapSelectedDayToApiIndex(selectedDayIndex: number): number {
  if (selectedDayIndex === 0) {
    return 2; // Today is at index 2 in the API data
  } else {
    return selectedDayIndex + 2; // Future days start at index 3
  }
}

/**
 * Maps UI selectedDayIndex to hourly data start index
 * @param selectedDayIndex UI day index (0 = today, 1 = tomorrow, etc.)
 * @param currentTime Current time for calculating today's hourly data
 * @param hourlyTimeArray Array of hourly time strings from API
 * @returns Object with startIndex and endIndex for hourly data
 */
export function mapSelectedDayToHourlyIndices(
  selectedDayIndex: number,
  currentTime: Date,
  hourlyTimeArray: string[]
): { startIndex: number; endIndex: number } {
  if (selectedDayIndex === 0) {
    // Today: Find current hour and get next 24 hours
    const currentTimeStr = currentTime.toISOString().slice(0, 13) + ':00'; // Format: YYYY-MM-DDTHH:00
    const currentIndex = hourlyTimeArray.findIndex(time => time === currentTimeStr);
    
    if (currentIndex >= 0) {
      return {
        startIndex: currentIndex,
        endIndex: Math.min(currentIndex + 24, hourlyTimeArray.length)
      };
    } else {
      // Fallback: use the first 24 hours of future data (after past data)
      return {
        startIndex: 48, // Skip 48 hours of past data
        endIndex: Math.min(72, hourlyTimeArray.length)
      };
    }
  } else {
    // Future days: Calculate based on selectedDayIndex
    // Day 1 (tomorrow): hours 48-71 (24 hours starting from hour 48)
    // Day 2: hours 72-95, etc.
    const startIndex = 48 + (selectedDayIndex - 1) * 24;
    return {
      startIndex,
      endIndex: Math.min(startIndex + 24, hourlyTimeArray.length)
    };
  }
}

/**
 * Creates a CurrentWeather-like object from daily forecast data
 * @param dailyWeather Daily weather data from API
 * @param apiDayIndex Index in the daily weather array
 * @returns CurrentWeather-like object for the selected day
 */
export function createCurrentWeatherFromDaily(
  dailyWeather: any,
  apiDayIndex: number
): any {
  return {
    temperature_2m: dailyWeather.temperature_2m_max[apiDayIndex],
    apparent_temperature: dailyWeather.temperature_2m_max[apiDayIndex],
    weather_code: dailyWeather.weather_code[apiDayIndex],
    is_day: true,
    wind_speed_10m: dailyWeather.wind_speed_10m_max[apiDayIndex],
    wind_gusts_10m: dailyWeather.wind_speed_10m_max[apiDayIndex], // Use max as approximation
    relative_humidity_2m: 60, // Default value for daily forecasts
    precipitation: dailyWeather.precipitation_sum[apiDayIndex],
    precipitation_probability: dailyWeather.precipitation_probability_max[apiDayIndex],
    surface_pressure: 1013, // Default value for daily forecasts
    uv_index: dailyWeather.uv_index_max[apiDayIndex],
    visibility: 10, // Default value for daily forecasts
    cloud_cover: dailyWeather.cloud_cover_mean[apiDayIndex],
    dew_point_2m: 15, // Default value for daily forecasts
    time: dailyWeather.time[apiDayIndex],
  };
}

/**
 * Gets the date for the selected day
 * @param weather Weather forecast data
 * @param selectedDayIndex UI day index (0 = today, 1 = tomorrow, etc.)
 * @returns Date object for the selected day
 */
export function getSelectedDayDate(weather: any, selectedDayIndex: number): Date {
  if (!weather) return new Date();
  
  if (selectedDayIndex === 0) {
    // Return current date for today
    return new Date();
  } else {
    // Return the date for the selected future day
    const apiDayIndex = mapSelectedDayToApiIndex(selectedDayIndex);
    if (apiDayIndex < weather.daily.time.length) {
      return new Date(weather.daily.time[apiDayIndex]);
    }
    // Fallback to current date if day index is out of bounds
    return new Date();
  }
}

/**
 * Gets the ISO date string (YYYY-MM-DD) for the selected day
 * @param weather Weather forecast data
 * @param selectedDayIndex UI day index (0 = today, 1 = tomorrow, etc.)
 * @returns ISO date string for the selected day
 */
export function getSelectedDayDateString(weather: any, selectedDayIndex: number): string {
  const date = getSelectedDayDate(weather, selectedDayIndex);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

/**
 * Maps a specific date to the corresponding day index
 * @param weather Weather forecast data
 * @param targetDate ISO date string (YYYY-MM-DD) to find
 * @returns UI day index (0 = today, 1 = tomorrow, etc.) or null if not found
 */
export function mapDateToDayIndex(weather: any, targetDate: string): number | null {
  if (!weather || !weather.daily || !weather.daily.time) {
    return null;
  }
  
  // Check if the target date is today
  const today = new Date().toISOString().split('T')[0];
  if (targetDate === today) {
    return 0; // Today
  }
  
  // Look through the daily forecast data
  for (let i = 0; i < weather.daily.time.length; i++) {
    const forecastDate = weather.daily.time[i];
    if (forecastDate === targetDate) {
      // Map API index to UI day index
      if (i === 2) {
        return 0; // Today
      } else if (i > 2) {
        return i - 2; // Future days
      } else {
        return 0; // Past days default to today
      }
    }
  }
  
  return null; // Date not found in forecast
}

/**
 * Gets weather data for the selected day
 * @param weather Weather forecast data
 * @param selectedDayIndex UI day index (0 = today, 1 = tomorrow, etc.)
 * @returns Weather data for the selected day
 */
export function getSelectedDayWeather(weather: any, selectedDayIndex: number): any {
  if (!weather) return null;
  
  if (selectedDayIndex === 0) {
    // Show current weather for today
    return {
      temperature_2m: weather.current.temperature_2m,
      apparent_temperature: weather.current.apparent_temperature,
      weather_code: weather.current.weather_code,
      is_day: weather.current.is_day,
      precipitation_probability: weather.current.precipitation_probability,
    };
  } else {
    // Show daily forecast data for future days
    const apiDayIndex = mapSelectedDayToApiIndex(selectedDayIndex);
    if (apiDayIndex < weather.daily.time.length) {
      return {
        temperature_2m: weather.daily.temperature_2m_max[apiDayIndex],
        apparent_temperature: weather.daily.temperature_2m_max[apiDayIndex],
        weather_code: weather.daily.weather_code[apiDayIndex],
        is_day: true, // Daily forecasts are shown as day conditions
        precipitation_probability: weather.daily.precipitation_probability_max[apiDayIndex],
      };
    }
    // Fallback to current weather if day index is out of bounds
    return {
      temperature_2m: weather.current.temperature_2m,
      apparent_temperature: weather.current.apparent_temperature,
      weather_code: weather.current.weather_code,
      is_day: weather.current.is_day,
      precipitation_probability: weather.current.precipitation_probability,
    };
  }
}
