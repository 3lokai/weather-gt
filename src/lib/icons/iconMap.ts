// lib/icons/iconMap.ts
export type WmoCode = number; // 0..99
export type IconKey =
  | 'clear-day' | 'clear-night'
  | 'partly-cloudy-day' | 'partly-cloudy-night' | 'cloudy' | 'overcast' | 'overcast-day' | 'overcast-night'
  | 'fog' | 'fog-day' | 'fog-night' | 'haze' | 'haze-day' | 'haze-night' | 'smoke'
  | 'drizzle' | 'rain' | 'sleet' | 'snow' | 'hail'
  | 'showers' | 'wind' | 'tornado' | 'hurricane'
  | 'thunderstorms' | 'thunderstorms-day' | 'thunderstorms-night' | 'thunderstorms-rain' | 'thunderstorms-day-rain' | 'thunderstorms-night-rain';

export function getIconKey(code: WmoCode, isDay: boolean): IconKey {
  // WMO groups
  if (code === 0) return isDay ? 'clear-day' : 'clear-night';
  if (code === 1 || code === 2) return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return isDay ? 'fog-day' : 'fog-night';
  if (code === 51 || code === 53 || code === 55) return 'drizzle';
  if (code === 56 || code === 57) return 'sleet'; // freezing drizzle → sleet glyph
  if (code === 61) return 'rain';
  if (code === 63) return 'rain';
  if (code === 65) return 'rain';
  if (code === 66 || code === 67) return 'sleet'; // freezing rain → sleet glyph
  if (code === 71 || code === 73 || code === 75) return 'snow';
  if (code === 77) return 'snow'; // snow grains → snow
  if (code === 80 || code === 81 || code === 82) return 'showers';
  if (code === 85 || code === 86) return 'snow'; // snow showers → snow
  if (code === 95) return isDay ? 'thunderstorms-day' : 'thunderstorms-night';
  if (code === 96 || code === 99) return 'thunderstorms-rain';
  return isDay ? 'overcast-day' : 'overcast-night';
}

// Basmilius (Meteocons) adapter: string IDs from https://basmilius.github.io/weather-icons/index-fill.html
export const basmiliusMap: Record<IconKey, string> = {
  'clear-day': 'clear-day',
  'clear-night': 'clear-night',
  'partly-cloudy-day': 'partly-cloudy-day',
  'partly-cloudy-night': 'partly-cloudy-night',
  cloudy: 'cloudy',
  overcast: 'overcast',
  'overcast-day': 'overcast-day',
  'overcast-night': 'overcast-night',
  fog: 'fog',
  'fog-day': 'fog-day',
  'fog-night': 'fog-night',
  haze: 'haze',
  'haze-day': 'haze-day',
  'haze-night': 'haze-night',
  smoke: 'smoke',
  drizzle: 'drizzle',
  rain: 'rain',
  sleet: 'sleet',
  snow: 'snow',
  hail: 'hail',
  showers: 'rain', // no explicit *showers* icon → use rain
  wind: 'wind',
  tornado: 'tornado',
  hurricane: 'hurricane',
  thunderstorms: 'thunderstorms',
  'thunderstorms-day': 'thunderstorms-day',
  'thunderstorms-night': 'thunderstorms-night',
  'thunderstorms-rain': 'thunderstorms-rain',
  'thunderstorms-day-rain': 'thunderstorms-day-rain',
  'thunderstorms-night-rain': 'thunderstorms-night-rain',
};

// Phosphor fallback (import names)
export const phosphorMap: Record<IconKey, string> = {
  'clear-day': 'Sun',
  'clear-night': 'Moon',
  'partly-cloudy-day': 'CloudSun',
  'partly-cloudy-night': 'CloudMoon',
  cloudy: 'Cloud',
  overcast: 'Cloud',
  'overcast-day': 'Cloud',
  'overcast-night': 'Cloud',
  fog: 'CloudFog', 'fog-day': 'CloudFog', 'fog-night': 'CloudFog',
  haze: 'CloudFog', 'haze-day': 'CloudFog', 'haze-night': 'CloudFog',
  smoke: 'Smiley', // fallback glyph if you prefer custom
  drizzle: 'CloudRain', rain: 'CloudRain', sleet: 'CloudSnow', snow: 'CloudSnow', hail: 'CloudHail',
  showers: 'CloudRain', wind: 'Wind', tornado: 'Tornado', hurricane: 'Wind',
  thunderstorms: 'CloudLightning', 'thunderstorms-day': 'CloudLightning', 'thunderstorms-night': 'CloudLightning',
  'thunderstorms-rain': 'CloudLightning', 'thunderstorms-day-rain': 'CloudLightning', 'thunderstorms-night-rain': 'CloudLightning',
};

export function getIconId(code: WmoCode, isDay: boolean, pack: 'bas'|'phosphor' = 'bas') {
  const key = getIconKey(code, isDay);
  return pack === 'bas' ? basmiliusMap[key] : phosphorMap[key];
}

export function wmoLabel(code: number): string {
  const map: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain', 71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    77: 'Snow grains', 80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
  };
  return map[code] ?? 'Unknown weather';
}
