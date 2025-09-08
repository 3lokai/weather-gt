'use client';

import { useWeatherStore } from '@/lib/store/weather-store';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';

export function ThemeToggleDemo() {
  const { themeMode, previousThemeMode, setThemeMode } = useWeatherStore();
  
  // Debug button for direct testing
  const testDirectToggle = () => {
    console.log('🧪 Direct toggle test - current mode:', themeMode);
    const nextMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'auto' : 'light';
    console.log('🧪 Setting directly to:', nextMode);
    setThemeMode(nextMode);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-h4 font-display text-card-foreground mb-4">
        Theme Toggle Demo
      </h3>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-body-m text-card-foreground">Current Mode:</p>
          <p className="text-body-s text-muted-foreground capitalize">
            {themeMode === 'auto' ? '🤖 Auto' : themeMode}
          </p>
          <p className="text-caption text-muted-foreground">
            Previous: {previousThemeMode || 'none'}
          </p>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <button 
            onClick={testDirectToggle}
            className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded glass-subtle hover:bg-accent/80"
          >
            Test Direct
          </button>
        </div>
      </div>
      <div className="text-caption text-muted-foreground">
        <p>Click the toggle to cycle through theme modes:</p>
        <p className="mt-2 font-medium">Cycle: Light → Auto → Dark → Auto → Light</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Light:</strong> Always light mode</li>
          <li><strong>Auto:</strong> 🤖 Smart mode - light during day, dark at night, with weather-aware adjustments</li>
          <li><strong>Dark:</strong> Always dark mode</li>
        </ul>
      </div>
    </div>
  );
}
