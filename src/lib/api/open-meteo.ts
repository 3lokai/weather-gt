// Open-Meteo API integration utilities
// Based on the PRD specifications for weather data fetching
// Uses the parameter matrix from docs/om-matrix.md

import { getIconKey, wmoLabel } from '../icons/iconMap';

export interface GeocodingResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country_code: string;
  admin1_id?: number;
}

export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  is_day: boolean;
  wind_speed_10m: number;
  wind_gusts_10m: number;
  relative_humidity_2m: number;
  precipitation: number;
  precipitation_probability: number;
  surface_pressure: number;
  uv_index: number;
  visibility: number;
  cloud_cover: number;
  dew_point_2m: number;
  time: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  uv_index: number[];
  visibility: number[];
  cloud_cover: number[];
  dew_point_2m: number[];
  surface_pressure: number[];
  weather_code?: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
  cloud_cover_mean: number[];
}

export interface WeatherForecast {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
  isDay: boolean;
}

export interface AirQualityData {
  time: string[];
  pm2_5: number[];
  pm10: number[];
  ozone: number[];
  nitrogen_dioxide: number[];
  sulphur_dioxide: number[];
  carbon_monoxide: number[];
  european_aqi: number[];
  us_aqi: number[];
}

export interface PollenData {
  time: string[];
  alder_pollen: number[];
  birch_pollen: number[];
  grass_pollen: number[];
  mugwort_pollen: number[];
  olive_pollen: number[];
  ragweed_pollen: number[];
}

// API Base URLs
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1';
const AIR_QUALITY_BASE_URL = 'https://air-quality-api.open-meteo.com/v1';

// Geocoding API
export async function searchLocations(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];
  
  const params = new URLSearchParams({
    name: query,
    count: '10',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_BASE_URL}/search?${params}`);
  
  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.results || [];
}

// Reverse geocoding - get location name from coordinates using Nominatim (OpenStreetMap)
export async function reverseGeocode(latitude: number, longitude: number): Promise<GeocodingResult | null> {
  try {
    console.log('🔄 Reverse geocoding request:', { latitude, longitude });
    
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      format: 'json',
      addressdetails: '1',
      'accept-language': 'en',
    });

    const url = `https://nominatim.openstreetmap.org/reverse?${params}`;
    console.log('🌐 Reverse geocoding URL:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'WeatherApp/1.0'
      }
    });
    
    console.log('📡 Reverse geocoding response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Reverse geocoding API error:', response.status, errorText);
      throw new Error(`Reverse geocoding API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('📄 Reverse geocoding response data:', data);
    
    if (data && data.display_name) {
      // Convert Nominatim response to our GeocodingResult format
      const result: GeocodingResult = {
        id: 0, // Nominatim doesn't provide ID
        name: data.address?.city || data.address?.town || data.address?.village || data.address?.hamlet || 'Unknown',
        country: data.address?.country || '',
        admin1: data.address?.state || data.address?.county || '',
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
        timezone: 'UTC', // Nominatim doesn't provide timezone
        country_code: data.address?.country_code?.toUpperCase() || '',
        admin1_id: undefined
      };
      
      console.log('✅ Reverse geocoding success:', result);
      return result;
    }
    
    console.log('⚠️ Reverse geocoding returned no results');
    return null;
  } catch (error) {
    console.error('❌ Reverse geocoding failed:', error);
    return null;
  }
}

// Weather Forecast API
export async function getWeatherForecast(
  latitude: number,
  longitude: number,
  units: {
    temperature: 'celsius' | 'fahrenheit';
    windSpeed: 'kmh' | 'mph';
    precipitation: 'mm' | 'inch';
    pressure: 'hPa' | 'inHg';
  }
): Promise<WeatherForecast> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'weather_code',
      'is_day',
      'wind_speed_10m',
      'wind_gusts_10m',
      'relative_humidity_2m',
      'precipitation',
      'precipitation_probability',
      'surface_pressure',
      'uv_index',
      'visibility',
      'cloud_cover',
      'dew_point_2m'
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation',
      'precipitation_probability',
      'wind_speed_10m',
      'wind_gusts_10m',
      'uv_index',
      'visibility',
      'cloud_cover',
      'dew_point_2m',
      'surface_pressure'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max',
      'cloud_cover_mean'
    ].join(','),
    temperature_unit: units.temperature,
    wind_speed_unit: units.windSpeed,
    precipitation_unit: units.precipitation,
    timeformat: 'iso8601',
    timezone: 'auto',
    forecast_days: '7',
    past_days: '0',
  });

  const response = await fetch(`${FORECAST_BASE_URL}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Use the is_day field from the API response
  const isDay = data.current.is_day === 1;
  
  // Convert pressure units if needed
  const convertPressure = (value: number) => {
    if (units.pressure === 'inHg') {
      return value * 0.02953; // Convert hPa to inHg
    }
    return value; // Already in hPa
  };
  
  // Convert pressure values in current weather
  const currentWithConvertedPressure = {
    ...data.current,
    surface_pressure: convertPressure(data.current.surface_pressure)
  };
  
  // Convert pressure values in hourly weather
  const hourlyWithConvertedPressure = {
    ...data.hourly,
    surface_pressure: data.hourly.surface_pressure.map(convertPressure)
  };
  
  return {
    current: currentWithConvertedPressure,
    hourly: hourlyWithConvertedPressure,
    daily: data.daily,
    isDay,
  };
}

// Air Quality API
export async function getAirQuality(
  latitude: number,
  longitude: number
): Promise<AirQualityData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: [
      'pm2_5',
      'pm10',
      'ozone',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'carbon_monoxide',
      'european_aqi',
      'us_aqi'
    ].join(','),
    timeformat: 'iso8601',
    timezone: 'auto',
    forecast_days: '1',
  });

  const response = await fetch(`${AIR_QUALITY_BASE_URL}/air-quality?${params}`);
  
  if (!response.ok) {
    throw new Error(`Air Quality API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.hourly;
}

// Pollen API (via Air Quality API)
export async function getPollenData(
  latitude: number,
  longitude: number
): Promise<PollenData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: [
      'alder_pollen',
      'birch_pollen',
      'grass_pollen',
      'mugwort_pollen',
      'olive_pollen',
      'ragweed_pollen'
    ].join(','),
    timeformat: 'iso8601',
    timezone: 'auto',
    forecast_days: '1',
  });

  const response = await fetch(`${AIR_QUALITY_BASE_URL}/air-quality?${params}`);
  
  if (!response.ok) {
    throw new Error(`Pollen API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.hourly;
}

// Weather code to condition mapping using the icon mapping system
export function getWeatherCondition(weatherCode: number, isDay: boolean): {
  condition: string;
  iconKey: string;
  themeGroup: string;
} {
  const iconKey = getIconKey(weatherCode, isDay);
  const condition = wmoLabel(weatherCode);
  
  // Map icon keys to theme groups for CSS theming
  const themeGroupMap: Record<string, string> = {
    'clear-day': 'clear-day',
    'clear-night': 'clear-night',
    'partly-cloudy-day': 'clear-day',
    'partly-cloudy-night': 'clear-night',
    'cloudy': 'cloudy',
    'overcast': 'cloudy',
    'overcast-day': 'cloudy',
    'overcast-night': 'cloudy',
    'fog': 'fog',
    'fog-day': 'fog',
    'fog-night': 'fog',
    'haze': 'fog',
    'haze-day': 'fog',
    'haze-night': 'fog',
    'smoke': 'fog',
    'drizzle': 'rain',
    'rain': 'rain',
    'sleet': 'rain',
    'snow': 'snow',
    'hail': 'rain',
    'showers': 'rain',
    'wind': 'clear-day',
    'tornado': 'thunder',
    'hurricane': 'thunder',
    'thunderstorms': 'thunder',
    'thunderstorms-day': 'thunder',
    'thunderstorms-night': 'thunder',
    'thunderstorms-rain': 'thunder',
    'thunderstorms-day-rain': 'thunder',
    'thunderstorms-night-rain': 'thunder',
  };

  return {
    condition,
    iconKey,
    themeGroup: themeGroupMap[iconKey] || 'cloudy',
  };
}
