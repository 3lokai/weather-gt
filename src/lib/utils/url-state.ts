import { Location, Units } from '@/lib/store/weather-store';

export interface URLState {
  lat?: number;
  lon?: number;
  name?: string;
  units?: Partial<Units>;
  timeFormat?: '12h' | '24h';
  dayIndex?: number;
  date?: string; // ISO date string (YYYY-MM-DD)
}

/**
 * Encodes weather state into URL search parameters
 */
export function encodeWeatherState(state: URLState): URLSearchParams {
  const params = new URLSearchParams();
  
  if (state.lat !== undefined) {
    params.set('lat', state.lat.toString());
  }
  
  if (state.lon !== undefined) {
    params.set('lon', state.lon.toString());
  }
  
  if (state.name) {
    params.set('name', encodeURIComponent(state.name));
  }
  
  if (state.units) {
    if (state.units.temperature) {
      params.set('temp', state.units.temperature);
    }
    if (state.units.windSpeed) {
      params.set('wind', state.units.windSpeed);
    }
    if (state.units.precipitation) {
      params.set('precip', state.units.precipitation);
    }
    if (state.units.pressure) {
      params.set('pressure', state.units.pressure);
    }
  }
  
  if (state.timeFormat) {
    params.set('time', state.timeFormat);
  }
  
  if (state.dayIndex !== undefined) {
    params.set('day', state.dayIndex.toString());
  }
  
  if (state.date) {
    params.set('date', state.date);
  }
  
  return params;
}

/**
 * Decodes URL search parameters into weather state
 */
export function decodeWeatherState(searchParams: URLSearchParams): URLState {
  const state: URLState = {};
  
  const lat = searchParams.get('lat');
  if (lat) {
    const parsedLat = parseFloat(lat);
    if (!isNaN(parsedLat) && parsedLat >= -90 && parsedLat <= 90) {
      state.lat = parsedLat;
    }
  }
  
  const lon = searchParams.get('lon');
  if (lon) {
    const parsedLon = parseFloat(lon);
    if (!isNaN(parsedLon) && parsedLon >= -180 && parsedLon <= 180) {
      state.lon = parsedLon;
    }
  }
  
  const name = searchParams.get('name');
  if (name) {
    state.name = decodeURIComponent(name);
  }
  
  const temp = searchParams.get('temp');
  const wind = searchParams.get('wind');
  const precip = searchParams.get('precip');
  const pressure = searchParams.get('pressure');
  
  if (temp || wind || precip || pressure) {
    state.units = {};
    
    if (temp && (temp === 'celsius' || temp === 'fahrenheit')) {
      state.units.temperature = temp;
    }
    
    if (wind && (wind === 'kmh' || wind === 'mph')) {
      state.units.windSpeed = wind;
    }
    
    if (precip && (precip === 'mm' || precip === 'in')) {
      state.units.precipitation = precip;
    }
    
    if (pressure && (pressure === 'hPa' || pressure === 'inHg')) {
      state.units.pressure = pressure;
    }
  }
  
  const timeFormat = searchParams.get('time');
  if (timeFormat && (timeFormat === '12h' || timeFormat === '24h')) {
    state.timeFormat = timeFormat;
  }
  
  const dayIndex = searchParams.get('day');
  if (dayIndex) {
    const parsedDayIndex = parseInt(dayIndex, 10);
    if (!isNaN(parsedDayIndex) && parsedDayIndex >= 0 && parsedDayIndex <= 6) {
      state.dayIndex = parsedDayIndex;
    }
  }
  
  const date = searchParams.get('date');
  if (date) {
    // Validate that it's a proper ISO date string (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(date) && !isNaN(Date.parse(date))) {
      state.date = date;
    }
  }
  
  return state;
}

/**
 * Creates a shareable URL with current weather state
 */
export function createShareableURL(baseUrl: string, state: URLState): string {
  const params = encodeWeatherState(state);
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Validates if a URL state is complete enough to restore location
 */
export function isValidLocationState(state: URLState): boolean {
  return (
    state.lat !== undefined &&
    state.lon !== undefined &&
    state.name !== undefined &&
    !isNaN(state.lat) &&
    !isNaN(state.lon) &&
    state.lat >= -90 &&
    state.lat <= 90 &&
    state.lon >= -180 &&
    state.lon <= 180
  );
}

/**
 * Creates a Location object from URL state
 */
export function createLocationFromURLState(state: URLState): Location | null {
  if (!isValidLocationState(state)) {
    return null;
  }
  
  return {
    id: `${state.lat},${state.lon}`,
    name: state.name!,
    country: '', // Will be populated by geocoding if needed
    latitude: state.lat!,
    longitude: state.lon!,
    timezone: 'UTC', // Will be populated by weather API
  };
}
