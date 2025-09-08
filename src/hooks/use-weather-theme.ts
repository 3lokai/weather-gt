'use client';

import { useEffect } from 'react';
import { getWeatherCondition } from '@/lib/api/open-meteo';

export interface UseWeatherThemeOptions {
  weatherCode: number;
  isDay: boolean;
  applyToDocument?: boolean;
  applyToElement?: HTMLElement | null;
}

/**
 * Hook to apply weather condition themes to the DOM
 * Automatically applies theme classes and handles reduced motion preferences
 */
export function useWeatherTheme({
  weatherCode,
  isDay,
  applyToDocument = true,
  applyToElement = null
}: UseWeatherThemeOptions) {
  useEffect(() => {
    const { themeGroup, condition } = getWeatherCondition(weatherCode, isDay);
    const themeClass = `theme--${themeGroup}`;
    
    // Determine target element
    const targetElement = applyToElement || (applyToDocument ? document.documentElement : null);
    
    if (!targetElement) return;

    // Remove existing weather theme classes
    const existingThemes = Array.from(targetElement.classList).filter(cls => cls.startsWith('theme--'));
    existingThemes.forEach(cls => targetElement.classList.remove(cls));
    
    // Add new theme class with smooth transition
    targetElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    targetElement.classList.add(themeClass);
    
    // Handle reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      targetElement.classList.add('reduced-motion');
      targetElement.style.transition = 'none';
    } else {
      targetElement.classList.remove('reduced-motion');
    }

    // Add theme metadata for debugging/accessibility
    targetElement.setAttribute('data-weather-theme', themeGroup);
    targetElement.setAttribute('data-weather-description', condition);

    // Cleanup function
    return () => {
      targetElement.classList.remove(themeClass);
      targetElement.removeAttribute('data-weather-theme');
      targetElement.removeAttribute('data-weather-description');
      if (prefersReducedMotion) {
        targetElement.classList.remove('reduced-motion');
      }
    };
  }, [weatherCode, isDay, applyToDocument, applyToElement]);
}

/**
 * Hook to get weather theme information without applying it
 */
export function useWeatherThemeInfo(weatherCode: number, isDay: boolean) {
  return getWeatherCondition(weatherCode, isDay);
}
