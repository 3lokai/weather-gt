'use client';

import { Icon } from '@/components/icons/phosphor-icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { useWeatherStore } from '@/lib/store/weather-store';
import { cn } from '@/lib/utils';
import { SimpleUnitsToggle } from './simple-units-toggle';

export interface SettingsDropdownProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show trigger as icon only or with text */
  variant?: 'icon' | 'button';
  /** Custom trigger content */
  children?: React.ReactNode;
}

export function SettingsDropdown({
  className,
  size = 'md',
  variant = 'button',
  children
}: SettingsDropdownProps) {
  const { units, accessibility, setAccessibility } = useWeatherStore();

  // Check if current units are metric for display purposes
  const isMetric = units.temperature === 'celsius' && 
                   units.windSpeed === 'kmh' && 
                   units.precipitation === 'mm' && 
                   units.pressure === 'hPa';

  // Default trigger content - gear icon sized to match header components
  const defaultTrigger = variant === 'icon' ? (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-16 w-16 transition-all duration-200",
        "text-muted-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
        "active:text-primary/80 active:bg-primary/20 dark:active:bg-primary/30",
        className
      )}
      aria-label="Open settings"
    >
      <Icon 
        name="Gear" 
        size={24} 
        color="primary" 
        withDuotone={true} 
        className="size-10 transition-all duration-200 text-muted-foreground group-hover:text-primary group-active:text-primary/80" 
      />
    </Button>
  ) : (
    <Button
      variant="outline"
      className={cn(
        "flex items-center space-x-2 h-10 px-3 text-body-s transition-all duration-200",
        "text-muted-foreground hover:text-primary hover:border-primary/50",
        "active:text-primary/80 active:border-primary/70",
        className
      )}
      aria-label="Open settings"
    >
      <Icon 
        name="Gear" 
        size={24} 
        color="primary" 
        withDuotone={true} 
        className="size-6 transition-all duration-200 text-muted-foreground group-hover:text-primary group-active:text-primary/80" 
      />
      <span>Settings</span>
      <Icon 
        name="CaretDown" 
        size={18} 
        color="muted" 
        withDuotone={true} 
        className="h-4 w-4 transition-all duration-200 text-muted-foreground group-hover:text-primary group-active:text-primary/80" 
      />
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || defaultTrigger}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-[420px] max-h-[80vh] overflow-y-auto glass-strong bg-background/80 border-border/50"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-6 py-4 text-body-l font-display">
          <div className="flex items-center space-x-2">
            <Icon name="Gear" size={20} color="primary" withDuotone={true} className="h-8 w-8" />
            <span>Settings</span>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* Simple Units Toggle */}
        <div className="p-6">
          <SimpleUnitsToggle size="md" className="justify-center" />
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Current Settings Summary */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-6 py-3 text-body-m font-display">Current Settings</DropdownMenuLabel>
          <div className="px-6 pb-4 text-body-s text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Temperature:</span>
              <span className="font-medium">{units.temperature === 'celsius' ? '°C' : '°F'}</span>
            </div>
            <div className="flex justify-between">
              <span>Wind Speed:</span>
              <span className="font-medium">{units.windSpeed === 'kmh' ? 'km/h' : 'mph'}</span>
            </div>
            <div className="flex justify-between">
              <span>Precipitation:</span>
              <span className="font-medium">{units.precipitation === 'mm' ? 'mm' : 'in'}</span>
            </div>
            <div className="flex justify-between">
              <span>Pressure:</span>
              <span className="font-medium">{units.pressure === 'hPa' ? 'hPa' : 'inHg'}</span>
            </div>
            <div className="flex justify-between">
              <span>Time Format:</span>
              <span className="font-medium">{units.timeFormat === '24h' ? '24h' : '12h'}</span>
            </div>
          </div>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {/* Accessibility Settings */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-6 py-3 text-body-m font-display">Accessibility</DropdownMenuLabel>
          <div className="px-6 pb-4 space-y-4">
            {/* Keyboard Shortcuts Toggle */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Icon name="Keyboard" size={18} color="muted" withDuotone={true} />
                <span className="text-body-s font-medium text-foreground">
                  Keyboard Shortcuts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-body-s font-medium text-muted-foreground">
                  {accessibility.keyboardShortcuts ? 'On' : 'Off'}
                </span>
                <button
                  onClick={() => setAccessibility({ keyboardShortcuts: !accessibility.keyboardShortcuts })}
                  className={cn(
                    "relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    "hover:scale-105 active:scale-95",
                    "h-7 w-12",
                    accessibility.keyboardShortcuts 
                      ? 'bg-primary hover:bg-primary/90 active:bg-primary/80' 
                      : 'bg-muted-foreground/20 hover:bg-muted-foreground/30 active:bg-muted-foreground/40'
                  )}
                  aria-label={`Keyboard shortcuts: ${accessibility.keyboardShortcuts ? 'enabled' : 'disabled'}. Click to toggle.`}
                >
                  <span
                    className={cn(
                      "inline-block rounded-full bg-background shadow transform transition-transform",
                      "h-5 w-5",
                      accessibility.keyboardShortcuts ? 'translate-x-5' : 'translate-x-0.5'
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Icon name="EyeSlash" size={18} color="muted" withDuotone={true} />
                <span className="text-body-s font-medium text-foreground">
                  Reduced Motion
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-body-s font-medium text-muted-foreground">
                  {accessibility.reducedMotion ? 'On' : 'Off'}
                </span>
                <button
                  onClick={() => setAccessibility({ reducedMotion: !accessibility.reducedMotion })}
                  className={cn(
                    "relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    "hover:scale-105 active:scale-95",
                    "h-7 w-12",
                    accessibility.reducedMotion 
                      ? 'bg-primary hover:bg-primary/90 active:bg-primary/80' 
                      : 'bg-muted-foreground/20 hover:bg-muted-foreground/30 active:bg-muted-foreground/40'
                  )}
                  aria-label={`Reduced motion: ${accessibility.reducedMotion ? 'enabled' : 'disabled'}. Click to toggle.`}
                >
                  <span
                    className={cn(
                      "inline-block rounded-full bg-background shadow transform transition-transform",
                      "h-5 w-5",
                      accessibility.reducedMotion ? 'translate-x-5' : 'translate-x-0.5'
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Hook to get current units for easy access
 */
export function useUnits() {
  const { units } = useWeatherStore();
  return units;
}

/**
 * Hook to get unit formatters
 */
export function useUnitFormatters() {
  const units = useUnits();
  
  return {
    formatTemperature: (value: number, precision = 0) => {
      const rounded = precision === 0 ? Math.round(value) : Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      const symbol = units.temperature === 'fahrenheit' ? '°F' : '°C';
      return `${rounded}${symbol}`;
    },
    formatWindSpeed: (value: number, precision = 0) => {
      const rounded = precision === 0 ? Math.round(value) : Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      const unit = units.windSpeed === 'mph' ? 'mph' : 'km/h';
      return `${rounded} ${unit}`;
    },
    formatPrecipitation: (value: number, precision = 1) => {
      const rounded = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      const unit = units.precipitation === 'in' ? 'in' : 'mm';
      return `${rounded} ${unit}`;
    },
    formatPressure: (value: number, precision = 0) => {
      const rounded = precision === 0 ? Math.round(value) : Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      const unit = units.pressure === 'hPa' ? 'hPa' : 'inHg';
      return `${rounded} ${unit}`;
    },
    formatTime: (date: Date) => {
      if (units.timeFormat === '24h') {
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
  };
}
