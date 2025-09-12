'use client';

import { Icon } from '@/components/icons/phosphor-icon';
import { useWeatherStore } from '@/lib/store/weather-store';
import { cn } from '@/lib/utils';

export interface SimpleUnitsToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function SimpleUnitsToggle({
  className,
  size = 'sm'
}: SimpleUnitsToggleProps) {
  const { units, setUnits } = useWeatherStore();

  // Size-based styling
  const sizeStyles = {
    sm: {
      container: 'gap-2',
      switch: 'h-6 w-10',
      icon: 'h-4 w-4',
      text: 'text-caption'
    },
    md: {
      container: 'gap-3',
      switch: 'h-7 w-12',
      icon: 'h-5 w-5',
      text: 'text-body-s'
    },
    lg: {
      container: 'gap-4',
      switch: 'h-8 w-14',
      icon: 'h-6 w-6',
      text: 'text-body-m'
    }
  };

  const styles = sizeStyles[size];

  // Toggle time format
  const toggleTimeFormat = () => {
    setUnits({ 
      timeFormat: units.timeFormat === '12h' ? '24h' : '12h' 
    });
  };

  // Toggle metric/imperial
  const toggleMetricImperial = () => {
    const isMetric = units.temperature === 'celsius' && 
                     units.windSpeed === 'kmh' && 
                     units.precipitation === 'mm' && 
                     units.pressure === 'hPa';
    
    if (isMetric) {
      // Switch to Imperial
      setUnits({
        temperature: 'fahrenheit',
        windSpeed: 'mph',
        precipitation: 'in',
        pressure: 'inHg'
      });
    } else {
      // Switch to Metric
      setUnits({
        temperature: 'celsius',
        windSpeed: 'kmh',
        precipitation: 'mm',
        pressure: 'hPa'
      });
    }
  };


  const isMetric = units.temperature === 'celsius' && 
                   units.windSpeed === 'kmh' && 
                   units.precipitation === 'mm' && 
                   units.pressure === 'hPa';

  return (
    <div className={cn("flex flex-col space-y-4", styles.container, className)}>
      {/* Time Format Toggle */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Icon name="Timer" size={18} color="muted" withDuotone={true} />
          <span className={cn("text-foreground font-medium", styles.text)}>
            Time
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-muted-foreground font-medium", styles.text)}>
            {units.timeFormat === '24h' ? '24h' : '12h'}
          </span>
          <button
            onClick={toggleTimeFormat}
            className={cn(
              "relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "hover:scale-105 active:scale-95",
              styles.switch,
              units.timeFormat === '24h' 
                ? 'bg-primary hover:bg-primary/90 active:bg-primary/80' 
                : 'bg-muted-foreground/20 hover:bg-muted-foreground/30 active:bg-muted-foreground/40'
            )}
            aria-label={`Time format: ${units.timeFormat === '24h' ? '24-hour' : '12-hour'}. Click to toggle.`}
          >
            <span
              className={cn(
                "inline-block rounded-full bg-background shadow transform transition-transform",
                styles.icon,
                units.timeFormat === '24h' ? 'translate-x-5' : 'translate-x-0.5'
              )}
            />
          </button>
        </div>
      </div>

      {/* Metric/Imperial Toggle */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Icon name="Gauge" size={18} color="muted" withDuotone={true} />
          <span className={cn("text-foreground font-medium", styles.text)}>
            Units
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-muted-foreground font-medium", styles.text)}>
            {isMetric ? 'Metric' : 'Imperial'}
          </span>
          <button
            onClick={toggleMetricImperial}
            className={cn(
              "relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "hover:scale-105 active:scale-95",
              styles.switch,
              isMetric 
                ? 'bg-primary hover:bg-primary/90 active:bg-primary/80' 
                : 'bg-muted-foreground/20 hover:bg-muted-foreground/30 active:bg-muted-foreground/40'
            )}
            aria-label={`Units: ${isMetric ? 'Metric' : 'Imperial'}. Click to toggle.`}
          >
            <span
              className={cn(
                "inline-block rounded-full bg-background shadow transform transition-transform",
                styles.icon,
                isMetric ? 'translate-x-5' : 'translate-x-0.5'
              )}
            />
          </button>
        </div>
      </div>

    </div>
  );
}
