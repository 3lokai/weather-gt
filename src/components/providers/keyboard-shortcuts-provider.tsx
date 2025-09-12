'use client';

import React, { useCallback } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useThemeToggle } from '@/hooks/use-theme-toggle';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const { accessibility, units, setUnits } = useWeatherStore();
  const { setTheme, theme } = useThemeToggle();
  const router = useRouter();

  const shortcutsEnabled = accessibility.keyboardShortcuts;

  // Helper to trigger click on an element by data attribute
  const triggerElementClick = useCallback((dataAttribute: string, message: string) => {
    if (!shortcutsEnabled) return;
    const element = document.querySelector(`[${dataAttribute}="true"]`) as HTMLElement;
    if (element) {
      element.click();
      toast.info(message);
    } else {
      console.warn(`Element with data attribute ${dataAttribute} not found.`);
    }
  }, [shortcutsEnabled]);

  // ⌘K (Cmd/Ctrl+K): Open search command palette
  useKeyboardShortcut(
    { key: 'k', metaKey: true, enabled: shortcutsEnabled },
    () => triggerElementClick('data-search-trigger', 'Opening search command palette')
  );
  useKeyboardShortcut(
    { key: 'k', ctrlKey: true, enabled: shortcutsEnabled },
    () => triggerElementClick('data-search-trigger', 'Opening search command palette')
  );

  // U: Toggle units
  useKeyboardShortcut(
    { key: 'u', enabled: shortcutsEnabled },
    () => {
      const isMetric = units.temperature === 'celsius' && 
                       units.windSpeed === 'kmh' && 
                       units.precipitation === 'mm' && 
                       units.pressure === 'hPa';
      
      if (isMetric) {
        setUnits({
          temperature: 'fahrenheit',
          windSpeed: 'mph',
          precipitation: 'in',
          pressure: 'inHg',
        });
        toast.info('Switched to Imperial units');
      } else {
        setUnits({
          temperature: 'celsius',
          windSpeed: 'kmh',
          precipitation: 'mm',
          pressure: 'hPa',
        });
        toast.info('Switched to Metric units');
      }
    }
  );

  // T: Toggle theme
  useKeyboardShortcut(
    { key: 't', enabled: shortcutsEnabled },
    () => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
      toast.info(`Toggled theme to ${nextTheme}`);
    }
  );

  // F: Toggle favorites dropdown
  useKeyboardShortcut(
    { key: 'f', enabled: shortcutsEnabled },
    () => triggerElementClick('data-favorites-trigger', 'Toggling favorites dropdown')
  );

  // C: Navigate to compare view
  useKeyboardShortcut(
    { key: 'c', enabled: shortcutsEnabled },
    () => {
      router.push('/compare');
      toast.info('Navigating to compare view');
    }
  );

  // ?: Open keyboard shortcuts cheat sheet
  useKeyboardShortcut(
    { key: '?', enabled: shortcutsEnabled },
    () => triggerElementClick('data-cheat-sheet-trigger', 'Opening keyboard shortcuts cheat sheet')
  );

  return <>{children}</>;
}
