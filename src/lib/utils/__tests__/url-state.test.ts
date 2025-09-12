import { describe, it, expect } from 'vitest';
import { 
  encodeWeatherState, 
  decodeWeatherState, 
  createShareableURL,
  isValidLocationState,
  createLocationFromURLState,
  type URLState 
} from '../url-state';

describe('URL State Utilities', () => {
  describe('encodeWeatherState', () => {
    it('should encode basic location data', () => {
      const state: URLState = {
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York',
      };

      const params = encodeWeatherState(state);
      
      expect(params.get('lat')).toBe('40.7128');
      expect(params.get('lon')).toBe('-74.0060');
      expect(params.get('name')).toBe('New York');
    });

    it('should encode units data', () => {
      const state: URLState = {
        units: {
          temperature: 'fahrenheit',
          windSpeed: 'mph',
          precipitation: 'in',
          pressure: 'inHg',
        },
      };

      const params = encodeWeatherState(state);
      
      expect(params.get('temp')).toBe('fahrenheit');
      expect(params.get('wind')).toBe('mph');
      expect(params.get('precip')).toBe('in');
      expect(params.get('pressure')).toBe('inHg');
    });

    it('should encode time format and day index', () => {
      const state: URLState = {
        timeFormat: '24h',
        dayIndex: 3,
      };

      const params = encodeWeatherState(state);
      
      expect(params.get('time')).toBe('24h');
      expect(params.get('day')).toBe('3');
    });

    it('should handle empty state', () => {
      const params = encodeWeatherState({});
      expect(params.toString()).toBe('');
    });
  });

  describe('decodeWeatherState', () => {
    it('should decode basic location data', () => {
      const params = new URLSearchParams({
        lat: '40.7128',
        lon: '-74.0060',
        name: 'New York',
      });

      const state = decodeWeatherState(params);
      
      expect(state.lat).toBe(40.7128);
      expect(state.lon).toBe(-74.0060);
      expect(state.name).toBe('New York');
    });

    it('should decode units data', () => {
      const params = new URLSearchParams({
        temp: 'fahrenheit',
        wind: 'mph',
        precip: 'in',
        pressure: 'inHg',
      });

      const state = decodeWeatherState(params);
      
      expect(state.units?.temperature).toBe('fahrenheit');
      expect(state.units?.windSpeed).toBe('mph');
      expect(state.units?.precipitation).toBe('in');
      expect(state.units?.pressure).toBe('inHg');
    });

    it('should decode time format and day index', () => {
      const params = new URLSearchParams({
        time: '24h',
        day: '3',
      });

      const state = decodeWeatherState(params);
      
      expect(state.timeFormat).toBe('24h');
      expect(state.dayIndex).toBe(3);
    });

    it('should handle invalid data gracefully', () => {
      const params = new URLSearchParams({
        lat: 'invalid',
        lon: '999',
        day: '10',
        temp: 'invalid',
      });

      const state = decodeWeatherState(params);
      
      expect(state.lat).toBeUndefined();
      expect(state.lon).toBeUndefined();
      expect(state.dayIndex).toBeUndefined();
      expect(state.units?.temperature).toBeUndefined();
    });

    it('should handle empty params', () => {
      const params = new URLSearchParams();
      const state = decodeWeatherState(params);
      
      expect(state).toEqual({});
    });
  });

  describe('createShareableURL', () => {
    it('should create URL with query parameters', () => {
      const state: URLState = {
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York',
      };

      const url = createShareableURL('https://example.com', state);
      
      expect(url).toBe('https://example.com?lat=40.7128&lon=-74.0060&name=New+York');
    });

    it('should return base URL for empty state', () => {
      const url = createShareableURL('https://example.com', {});
      expect(url).toBe('https://example.com');
    });
  });

  describe('isValidLocationState', () => {
    it('should validate complete location state', () => {
      const state: URLState = {
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York',
      };

      expect(isValidLocationState(state)).toBe(true);
    });

    it('should reject incomplete location state', () => {
      expect(isValidLocationState({ lat: 40.7128 })).toBe(false);
      expect(isValidLocationState({ lon: -74.0060 })).toBe(false);
      expect(isValidLocationState({ name: 'New York' })).toBe(false);
    });

    it('should reject invalid coordinates', () => {
      const state: URLState = {
        lat: 91, // Invalid latitude
        lon: -74.0060,
        name: 'New York',
      };

      expect(isValidLocationState(state)).toBe(false);
    });
  });

  describe('createLocationFromURLState', () => {
    it('should create location from valid state', () => {
      const state: URLState = {
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York',
      };

      const location = createLocationFromURLState(state);
      
      expect(location).toEqual({
        id: '40.7128,-74.0060',
        name: 'New York',
        country: '',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'UTC',
      });
    });

    it('should return null for invalid state', () => {
      const location = createLocationFromURLState({});
      expect(location).toBeNull();
    });
  });
});
