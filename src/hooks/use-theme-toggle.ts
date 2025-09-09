'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Hook for theme toggling with next-themes
 * Provides clean interface for light/dark/system theme management
 */
export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

