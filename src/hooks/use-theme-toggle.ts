'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { getRecommendedTheme } from '@/lib/utils/time-based-theme';

/**
 * Hook for theme toggling with next-themes
 * Provides clean interface for light/dark/system theme management
 * Automatically sets time-based theme on first render if no theme is set
 */
export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasSetInitialTheme, setHasSetInitialTheme] = useState(false);
  const { selectedLocation } = useWeatherStore();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set time-based theme on first render if no theme preference exists
  useEffect(() => {
    if (!mounted || hasSetInitialTheme) return;
    
    // Only set time-based theme if user hasn't explicitly set a theme preference
    // Check if theme is 'system' (default) and we have location data
    if (theme === 'system' && selectedLocation) {
      const recommendedTheme = getRecommendedTheme(selectedLocation, systemTheme);
      setTheme(recommendedTheme);
    }
    
    setHasSetInitialTheme(true);
  }, [mounted, theme, selectedLocation, systemTheme, setTheme, hasSetInitialTheme]);

  if (!mounted) {
    return {
      theme: 'system',
      setTheme: () => {},
      resolvedTheme: 'light',
      systemTheme: 'light',
      isDark: false,
      isLight: true,
      isSystem: true,
      mounted: false,
    };
  }

  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';
  const isSystem = theme === 'system';

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    isDark,
    isLight,
    isSystem,
    mounted,
  };
}

/**
 * Cycle through theme options: light -> dark -> system -> light...
 */
export function useCycleTheme() {
  const { theme, setTheme } = useThemeToggle();

  const cycleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('system');
        break;
      case 'system':
      default:
        setTheme('light');
        break;
    }
  };

  return { cycleTheme, currentTheme: theme };
}

