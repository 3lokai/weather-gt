'use client';

import { useWeatherStore } from '@/lib/store/weather-store';
import { cn } from '@/lib/utils/cn';
import './theme-toggle.css';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { themeMode, previousThemeMode, setThemeMode } = useWeatherStore();

  const handleToggle = () => {
    // Simple logic: if light or dark, go to auto; if auto, go to opposite of previous
    const nextMode = (() => {
      if (themeMode === 'light' || themeMode === 'dark') {
        return 'auto';
      } else {
        // We're in auto mode, go to opposite of previous mode
        if (previousThemeMode === 'light') {
          return 'dark';
        } else if (previousThemeMode === 'dark') {
          return 'light';
        } else {
          // No previous mode, default to light
          return 'light';
        }
      }
    })();
    
    setThemeMode(nextMode);
  };

  return (
    <label 
      className={cn("theme-toggle-container", className)}
      data-mode={themeMode}
    >
      <input 
        type="checkbox" 
        id="theme-toggle"
        onChange={handleToggle}
        aria-label={`Current mode: ${themeMode}. Click to cycle through light, dark, and auto modes.`}
      />
      <span className="theme-toggle-slider round">
        {/* Mode indicators */}
        <div className="theme-toggle-mode-indicators">
          <div className="theme-toggle-mode-indicator">☀️</div>
          <div className="theme-toggle-mode-indicator">⚙️</div>
          <div className="theme-toggle-mode-indicator">🌙</div>
        </div>
        <div className="theme-toggle-background"></div>
        <div className="theme-toggle-star"></div>
        <div className="theme-toggle-star"></div>
      </span>
    </label>
  );
}
