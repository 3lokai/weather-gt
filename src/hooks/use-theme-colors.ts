'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';

// Function to convert any color format to hex using canvas
function colorToHex(colorString: string): string {
  if (!colorString || colorString === '') return '#000000';
  
  // If it's already a hex color, return it
  if (colorString.startsWith('#')) return colorString;
  
  try {
    // Create a temporary canvas to convert the color
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '#000000';
    
    // Set the color and fill a pixel
    ctx.fillStyle = colorString;
    ctx.fillRect(0, 0, 1, 1);
    
    // Get the pixel data
    const imageData = ctx.getImageData(0, 0, 1, 1);
    const [r, g, b] = imageData.data;
    
    // Convert to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch (error) {
    console.error(`Error converting color ${colorString}:`, error);
    return '#000000';
  }
}

// Function to get computed CSS variable values
function getCSSVariableValue(variableName: string): string {
  if (typeof window === 'undefined') return '#000000'; // SSR fallback
  
  try {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    
    if (!value) return '#000000';
    
    // Convert the color to hex format for Three.js
    return colorToHex(value);
  } catch (error) {
    console.error(`Error getting CSS variable ${variableName}:`, error);
    return '#000000';
  }
}

export function useThemeColors() {
  const { themeColors, setThemeColors } = useWeatherStore();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const updateThemeColors = () => {
      const colors = {
        accent: getCSSVariableValue('--accent'),
        accent100: getCSSVariableValue('--accent-100'),
        accent500: getCSSVariableValue('--accent-500'),
        primary: getCSSVariableValue('--primary'),
        primary100: getCSSVariableValue('--primary-100'),
        primary200: getCSSVariableValue('--primary-200'),
        primary600: getCSSVariableValue('--primary-600'),
        secondary: getCSSVariableValue('--secondary'),
        secondary600: getCSSVariableValue('--secondary-600'),
        gray500: getCSSVariableValue('--gray-500'),
        gray800: getCSSVariableValue('--gray-800'),
        muted: getCSSVariableValue('--muted'),
        subtle: getCSSVariableValue('--subtle'),
      };

      setThemeColors(colors);
    };

    // Initial update
    const timer = setTimeout(updateThemeColors, 100);

    // Watch for theme changes
    const observer = new MutationObserver(updateThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [setThemeColors]);

  return themeColors;
}
