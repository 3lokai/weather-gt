'use client';

import { useEffect, useState } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { getWeatherCondition } from '@/lib/api/open-meteo';

/**
 * Hook to manage theme switching and apply appropriate classes to the document
 */
export function useTheme(weatherCode?: number, isDay?: boolean) {
  const { themeMode } = useWeatherStore();
  

  useEffect(() => {
    const root = document.documentElement;
    
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on mode
    switch (themeMode) {
      case 'light':
        // Base theme is light, no class needed
        break;
      case 'dark':
        root.classList.add('dark');
        break;
      case 'auto':
        // Smart auto mode: combines time-based and weather-based logic
        let shouldUseDark = false;
        
        // First, check time of day (6 AM to 6 PM = light, otherwise dark)
        const hour = new Date().getHours();
        const isDayTime = hour >= 6 && hour < 18;
        
        if (!isDayTime) {
          // It's night time, use dark theme
          shouldUseDark = true;
        } else if (weatherCode !== undefined && isDay !== undefined) {
          // It's day time, but check weather conditions
          const { themeGroup } = getWeatherCondition(weatherCode, isDay);
          
          // Some weather conditions work better with dark themes even during day
          const darkWeatherThemes = ['thunder']; // Stormy weather
          shouldUseDark = darkWeatherThemes.includes(themeGroup);
        }
        
        if (shouldUseDark) {
          root.classList.add('dark');
        } else {
          // Base theme is light, no class needed
        }
        break;
    }
  }, [themeMode, weatherCode, isDay]);

  // Set up auto mode switching (time-based updates)
  useEffect(() => {
    if (themeMode !== 'auto') return;

    const updateAutoTheme = () => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      
      // Re-run the auto logic
      let shouldUseDark = false;
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 18;
      
      if (!isDayTime) {
        shouldUseDark = true;
      } else if (weatherCode !== undefined && isDay !== undefined) {
        const { themeGroup } = getWeatherCondition(weatherCode, isDay);
        const darkWeatherThemes = ['thunder'];
        shouldUseDark = darkWeatherThemes.includes(themeGroup);
      }
      
      if (shouldUseDark) {
        root.classList.add('dark');
      } else {
        // Base theme is light, no class needed
      }
    };

    // Set up interval to check every minute for time changes
    const interval = setInterval(updateAutoTheme, 60000);

    return () => clearInterval(interval);
  }, [themeMode, weatherCode, isDay]);

  return { themeMode };
}
