'use client';

import { useThemeToggle } from '@/hooks/use-theme-toggle';
import { cn } from '@/lib/utils/cn';
import './theme-toggle.css';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, mounted } = useThemeToggle();

  const handleToggle = () => {
    // Simple 2-state logic: toggle between light and dark
    const nextMode = theme === 'light' ? 'dark' : 'light';
    setTheme(nextMode);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <label 
        className={cn("theme-toggle-container", className)}
        data-mode="light"
      >
        <input 
          type="checkbox" 
          id="theme-toggle"
          checked={false}
          disabled
          onChange={() => {}}
          aria-label="Theme toggle loading..."
        />
        <span className="theme-toggle-slider round">
          <div className="theme-toggle-background"></div>
          <div className="theme-toggle-star"></div>
          <div className="theme-toggle-star"></div>
        </span>
      </label>
    );
  }

  return (
    <label 
      className={cn("theme-toggle-container", className)}
      data-mode={theme}
    >
      <input 
        type="checkbox" 
        id="theme-toggle"
        checked={theme === 'dark'}
        onChange={handleToggle}
        aria-label={`Current mode: ${theme}. Click to toggle between light and dark modes.`}
      />
      <span className="theme-toggle-slider round">
        <div className="theme-toggle-background"></div>
        <div className="theme-toggle-star"></div>
        <div className="theme-toggle-star"></div>
      </span>
    </label>
  );
}
