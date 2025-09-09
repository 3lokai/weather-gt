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
  const { units } = useWeatherStore();

  // Check if current units are metric for display purposes
  const isMetric = units.temperature === 'celsius' && 
                   units.windSpeed === 'kmh' && 
                   units.precipitation === 'mm' && 
                   units.pressure === 'hPa';

  // Default trigger content - gear icon sized to match header components
  const defaultTrigger = variant === 'icon' ? (
    <Button
      variant="outline"
      size="icon"
      className={cn("h-9 w-9", className)}
      aria-label="Open settings"
    >
      <Icon name="Gear" size={18} className="h-4 w-4" />
    </Button>
  ) : (
    <Button
      variant="outline"
      className={cn(
        "flex items-center space-x-2 h-9 px-3 text-body-s",
        className
      )}
      aria-label="Open settings"
    >
      <Icon name="Gear" size={18} className="h-4 w-4" />
      <span>Settings</span>
      <Icon name="CaretDown" size={18} className="h-4 w-4" />
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || defaultTrigger}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-96 max-h-[80vh] overflow-y-auto"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-3 py-2 text-h4 font-display">
          <div className="flex items-center space-x-2">
            <Icon name="Gear" size={20} className="h-5 w-5" />
            <span>Units & Settings</span>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* Simple Units Toggle */}
        <div className="p-4">
          <SimpleUnitsToggle size="md" className="justify-center" />
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Current Settings Summary */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-h3 font-display">Current Settings</DropdownMenuLabel>
          <div className="px-3 py-2 text-body-s text-muted-foreground space-y-1">
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
