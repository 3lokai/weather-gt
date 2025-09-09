'use client';

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedTemperature, AnimatedWindSpeed, AnimatedPrecipitation, AnimatedPressure } from "@/components/common/animated-number";
import { useWeatherStore } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";
import { CurrentWeather } from "@/lib/api/open-meteo";

export interface MetricsGridProps {
  /** Current weather data containing all metrics */
  weather: CurrentWeather | null;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the grid */
  size?: 'sm' | 'md' | 'lg';
  /** Show tooltips for metrics */
  showTooltips?: boolean;
  /** Layout variant */
  layout?: 'grid' | 'list';
}

interface MetricConfig {
  key: keyof CurrentWeather;
  label: string;
  icon: string;
  tooltip: string;
  formatter: (value: number, units: any) => string;
  animatedComponent?: React.ComponentType<any>;
}

const metricConfigs: MetricConfig[] = [
  {
    key: 'apparent_temperature',
    label: 'Feels like',
    icon: '🌡️',
    tooltip: 'How the temperature actually feels to the human body, accounting for wind and humidity',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const symbol = units.temperature === 'fahrenheit' ? '°F' : '°C';
      return `${rounded}${symbol}`;
    },
    animatedComponent: AnimatedTemperature
  },
  {
    key: 'relative_humidity_2m',
    label: 'Humidity',
    icon: '💧',
    tooltip: 'Amount of water vapor in the air relative to the maximum possible at current temperature',
    formatter: (value) => `${Math.round(value)}%`
  },
  {
    key: 'wind_speed_10m',
    label: 'Wind',
    icon: '💨',
    tooltip: 'Wind speed measured at 10 meters above ground level',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const unit = units.windSpeed === 'mph' ? 'mph' : 'km/h';
      return `${rounded} ${unit}`;
    },
    animatedComponent: AnimatedWindSpeed
  },
  {
    key: 'precipitation',
    label: 'Precipitation',
    icon: '🌧️',
    tooltip: 'Amount of precipitation (rain, snow, etc.) in the last hour',
    formatter: (value, units) => {
      const rounded = Math.round(value * 10) / 10;
      const unit = units.precipitation === 'in' ? 'in' : 'mm';
      return `${rounded} ${unit}`;
    },
    animatedComponent: AnimatedPrecipitation
  },
  {
    key: 'surface_pressure',
    label: 'Pressure',
    icon: '📊',
    tooltip: 'Atmospheric pressure at ground level, indicating weather patterns',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const unit = units.pressure === 'inHg' ? 'inHg' : 'hPa';
      return `${rounded} ${unit}`;
    },
    animatedComponent: AnimatedPressure
  }
];

// Helper function to get the appropriate unit for a metric
function getUnitForMetric(key: keyof CurrentWeather, units: any) {
  switch (key) {
    case 'apparent_temperature':
      return units.temperature;
    case 'wind_speed_10m':
      return units.windSpeed;
    case 'precipitation':
      return units.precipitation;
    case 'surface_pressure':
      return units.pressure; // Use the selected pressure unit
    default:
      return null;
  }
}

export function MetricsGrid({
  weather,
  isLoading = false,
  error = null,
  className,
  size = 'md',
  showTooltips = true,
  layout = 'grid'
}: MetricsGridProps) {
  const { units } = useWeatherStore();

  // Size-based styling
  const sizeStyles = {
    sm: {
      card: "p-3",
      icon: "text-lg",
      label: "text-xs",
      value: "text-sm font-semibold",
      gap: "gap-2"
    },
    md: {
      card: "p-4",
      icon: "text-xl",
      label: "text-sm",
      value: "text-base font-semibold",
      gap: "gap-3"
    },
    lg: {
      card: "p-6",
      icon: "text-2xl",
      label: "text-base",
      value: "text-lg font-semibold",
      gap: "gap-4"
    }
  };

  const styles = sizeStyles[size];

  // Layout classes
  const layoutClasses = layout === 'grid' 
    ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${styles.gap}`
    : `flex flex-col ${styles.gap}`;

  // Loading skeleton component
  const MetricSkeleton = ({ metric }: { metric: MetricConfig }) => (
    <Card
      className={cn(
        "glass-subtle animate-pulse",
        styles.card
      )}
      role="group"
      aria-label={`Loading ${metric.label}`}
    >
      <CardContent className="flex items-center justify-between space-x-3">
        <div 
          className={cn(styles.icon, "opacity-50 flex-shrink-0")}
          aria-hidden="true"
        >
          {metric.icon}
        </div>
        <div className="flex flex-col items-end text-right flex-1 space-y-1">
          <div 
            className={cn(
              "bg-muted rounded w-12 h-4",
              styles.value
            )}
            aria-hidden="true"
          />
          <div 
            className={cn(
              "text-muted-foreground font-medium",
              styles.label
            )}
          >
            {metric.label}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Error state component
  const ErrorState = () => (
    <Card className="glass-subtle col-span-full">
      <CardContent className="flex flex-col items-center text-center space-y-2 p-6">
        <div className="text-2xl" aria-hidden="true">⚠️</div>
        <div className="text-muted-foreground font-medium">
          Unable to load weather metrics
        </div>
        <div className="text-sm text-muted-foreground">
          {error || 'Please try again later'}
        </div>
      </CardContent>
    </Card>
  );

  // Handle error state
  if (error) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Weather metrics - Error"
      >
        <ErrorState />
      </div>
    );
  }

  // Handle loading state
  if (isLoading || !weather) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Weather metrics - Loading"
      >
        {metricConfigs.map((metric) => (
          <MetricSkeleton key={metric.key} metric={metric} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={cn(layoutClasses, className)}
      role="region"
      aria-label="Weather metrics"
    >
      {metricConfigs.map((metric) => {
        const value = weather[metric.key] as number;
        const formattedValue = metric.formatter(value, units);
        const AnimatedComponent = metric.animatedComponent;
        
        return (
          <Card
            key={metric.key}
            className={cn(
              "glass-subtle transition-all duration-200 hover:glass-hover",
              styles.card
            )}
            role="group"
            aria-label={`${metric.label}: ${formattedValue}`}
            tabIndex={0}
          >
            <CardContent className="flex items-center justify-between space-x-3">
              {/* Icon on the left */}
              <div 
                className={cn(styles.icon, "flex-shrink-0")}
                aria-hidden="true"
              >
                {metric.icon}
              </div>

              {/* Value and label on the right */}
              <div className="flex flex-col items-end text-right flex-1">
                {/* Value */}
                <div 
                  className={cn(
                    "text-foreground font-semibold",
                    styles.value
                  )}
                  aria-label={`Value: ${formattedValue}`}
                >
                  {AnimatedComponent ? (
                    <AnimatedComponent
                      value={value}
                      unit={getUnitForMetric(metric.key, units)}
                      duration={180}
                      className="inline-block"
                    />
                  ) : (
                    formattedValue
                  )}
                </div>

                {/* Label below the value */}
                <div 
                  className={cn(
                    "text-muted-foreground font-medium",
                    styles.label
                  )}
                  aria-label={`Metric: ${metric.label}`}
                >
                  {metric.label}
                </div>
              </div>

              {/* Tooltip */}
              {showTooltips && (
                <div 
                  className="sr-only"
                  role="tooltip"
                  aria-describedby={`${metric.key}-tooltip`}
                >
                  {metric.tooltip}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

/**
 * Hook to get formatted metrics data
 * This is a placeholder - in the real implementation, this would integrate
 * with TanStack Query to fetch live weather data
 */
export function useMetricsData(weather: CurrentWeather | null) {
  if (!weather) return null;

  return {
    apparent_temperature: weather.apparent_temperature,
    relative_humidity_2m: weather.relative_humidity_2m,
    wind_speed_10m: weather.wind_speed_10m,
    precipitation: weather.precipitation,
    surface_pressure: weather.surface_pressure
  };
}
