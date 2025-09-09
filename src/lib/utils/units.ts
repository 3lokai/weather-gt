// Unit conversion utilities for weather data
// Provides consistent formatting and conversion across the application

import { Units } from '@/lib/store/weather-store';

/**
 * Convert temperature between Celsius and Fahrenheit
 */
export function convertTemperature(value: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number {
  if (from === to) return value;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9/5) + 32;
  }
  
  if (from === 'fahrenheit' && to === 'celsius') {
    return (value - 32) * 5/9;
  }
  
  return value;
}

/**
 * Convert wind speed between km/h and mph
 */
export function convertWindSpeed(value: number, from: 'kmh' | 'mph', to: 'kmh' | 'mph'): number {
  if (from === to) return value;
  
  if (from === 'kmh' && to === 'mph') {
    return value * 0.621371;
  }
  
  if (from === 'mph' && to === 'kmh') {
    return value * 1.60934;
  }
  
  return value;
}

/**
 * Convert precipitation between mm and inches
 */
export function convertPrecipitation(value: number, from: 'mm' | 'in', to: 'mm' | 'in'): number {
  if (from === to) return value;
  
  if (from === 'mm' && to === 'in') {
    return value * 0.0393701;
  }
  
  if (from === 'in' && to === 'mm') {
    return value * 25.4;
  }
  
  return value;
}

/**
 * Convert pressure between hPa and inHg
 */
export function convertPressure(value: number, from: 'hPa' | 'inHg', to: 'hPa' | 'inHg'): number {
  if (from === to) return value;
  
  if (from === 'hPa' && to === 'inHg') {
    return value * 0.02953;
  }
  
  if (from === 'inHg' && to === 'hPa') {
    return value * 33.8639;
  }
  
  return value;
}

/**
 * Format temperature with proper symbol and precision
 */
export function formatTemperature(value: number, unit: 'celsius' | 'fahrenheit', precision: number = 0): string {
  const rounded = precision === 0 ? Math.round(value) : Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  return `${rounded}${symbol}`;
}

/**
 * Format wind speed with proper unit
 */
export function formatWindSpeed(value: number, unit: 'kmh' | 'mph', precision: number = 0): string {
  const rounded = precision === 0 ? Math.round(value) : Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  const unitLabel = unit === 'mph' ? 'mph' : 'km/h';
  return `${rounded} ${unitLabel}`;
}

/**
 * Format precipitation with proper unit
 */
export function formatPrecipitation(value: number, unit: 'mm' | 'in', precision: number = 1): string {
  const rounded = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  const unitLabel = unit === 'in' ? 'in' : 'mm';
  return `${rounded} ${unitLabel}`;
}

/**
 * Format pressure with proper unit
 */
export function formatPressure(value: number, unit: 'hPa' | 'inHg', precision: number = 0): string {
  const rounded = precision === 0 ? Math.round(value) : Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  const unitLabel = unit === 'inHg' ? 'inHg' : 'hPa';
  return `${rounded} ${unitLabel}`;
}

/**
 * Format time based on 12/24 hour format
 */
export function formatTime(date: Date, format: '12h' | '24h'): string {
  if (format === '24h') {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  return date.toLocaleTimeString('en-US', { 
    hour12: true, 
    hour: 'numeric', 
    minute: '2-digit' 
  });
}

/**
 * Format date and time based on units
 */
export function formatDateTime(date: Date, timeFormat: '12h' | '24h'): string {
  const timeStr = formatTime(date, timeFormat);
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  return `${dateStr} ${timeStr}`;
}

/**
 * Get the appropriate unit symbol for display
 */
export function getUnitSymbol(type: keyof Units, unit: string): string {
  switch (type) {
    case 'temperature':
      return unit === 'fahrenheit' ? '°F' : '°C';
    case 'windSpeed':
      return unit === 'mph' ? 'mph' : 'km/h';
    case 'precipitation':
      return unit === 'in' ? 'in' : 'mm';
    case 'pressure':
      return unit === 'inHg' ? 'inHg' : 'hPa';
    case 'timeFormat':
      return unit === '12h' ? '12h' : '24h';
    default:
      return '';
  }
}

/**
 * Get the display label for a unit
 */
export function getUnitLabel(type: keyof Units, unit: string): string {
  switch (type) {
    case 'temperature':
      return unit === 'fahrenheit' ? 'Fahrenheit' : 'Celsius';
    case 'windSpeed':
      return unit === 'mph' ? 'Miles per hour' : 'Kilometers per hour';
    case 'precipitation':
      return unit === 'in' ? 'Inches' : 'Millimeters';
    case 'pressure':
      return unit === 'inHg' ? 'Inches of Mercury' : 'Hectopascals';
    case 'timeFormat':
      return unit === '12h' ? '12-hour' : '24-hour';
    default:
      return unit;
  }
}

/**
 * Get all available options for a unit type
 */
export function getUnitOptions(type: keyof Units): Array<{ value: string; label: string; symbol: string }> {
  switch (type) {
    case 'temperature':
      return [
        { value: 'celsius', label: 'Celsius', symbol: '°C' },
        { value: 'fahrenheit', label: 'Fahrenheit', symbol: '°F' }
      ];
    case 'windSpeed':
      return [
        { value: 'kmh', label: 'Kilometers per hour', symbol: 'km/h' },
        { value: 'mph', label: 'Miles per hour', symbol: 'mph' }
      ];
    case 'precipitation':
      return [
        { value: 'mm', label: 'Millimeters', symbol: 'mm' },
        { value: 'in', label: 'Inches', symbol: 'in' }
      ];
    case 'pressure':
      return [
        { value: 'hPa', label: 'Hectopascals', symbol: 'hPa' },
        { value: 'inHg', label: 'Inches of Mercury', symbol: 'inHg' }
      ];
    case 'timeFormat':
      return [
        { value: '12h', label: '12-hour', symbol: '12h' },
        { value: '24h', label: '24-hour', symbol: '24h' }
      ];
    default:
      return [];
  }
}
