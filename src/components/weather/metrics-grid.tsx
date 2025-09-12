'use client';

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LottieTemperature, LottieWindSpeed, LottiePrecipitation, LottiePressure, LottieCloudCover, LottiePrecipitationProbability, LottieHumidity, LottieUVIndex, LottieVisibility } from "@/components/common/lottie-metric";
import { useWeatherStore } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";
import { CurrentWeather, HourlyWeather, DailyWeather } from "@/lib/api/open-meteo";
import { calculatePressureTrend, formatTrendDisplay, getTrendColorClass } from "@/lib/utils/trend-calculator";
import { mapSelectedDayToApiIndex, createCurrentWeatherFromDaily } from "@/lib/utils/weather-data-mapping";
import { CaretDown } from "@phosphor-icons/react";

export interface MetricsGridProps {
  /** Current weather data containing all metrics */
  weather: CurrentWeather | null;
  /** Hourly weather data for trend calculations */
  hourlyWeather?: HourlyWeather | null;
  /** Daily weather data for selected day metrics */
  dailyWeather?: DailyWeather | null;
  /** Selected day index (0 = today, 1+ = future days) */
  selectedDayIndex?: number;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the grid */
  size?: 'sm' | 'lg';
  /** Show tooltips for metrics */
  showTooltips?: boolean;
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Show extended metrics (v2 features) */
  showExtendedMetrics?: boolean;
}

interface MetricConfig {
  key: keyof CurrentWeather;
  label: string;
  tooltip: string;
  formatter: (value: number, units: any) => string;
  animatedComponent?: React.ComponentType<any>;
  isExtended?: boolean;
  conditionalDisplay?: (weather: CurrentWeather, units: any) => boolean;
  trendDisplay?: (weather: CurrentWeather, hourlyWeather?: HourlyWeather | null, units?: any) => string | null;
}

const metricConfigs: MetricConfig[] = [
  {
    key: 'apparent_temperature',
    label: 'Feels like',
    tooltip: 'How the temperature actually feels to the human body, accounting for wind and humidity',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const symbol = units.temperature === 'fahrenheit' ? '°F' : '°C';
      return `${rounded}${symbol}`;
    },
    animatedComponent: LottieTemperature
  },
  {
    key: 'relative_humidity_2m',
    label: 'Humidity',
    tooltip: 'Amount of water vapor in the air relative to the maximum possible at current temperature',
    formatter: (value) => `${Math.round(value)}%`,
    animatedComponent: LottieHumidity
  },
  {
    key: 'wind_speed_10m',
    label: 'Wind',
    tooltip: 'Wind speed measured at 10 meters above ground level',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const unit = units.windSpeed === 'mph' ? 'mph' : 'km/h';
      return `${rounded} ${unit}`;
    },
    animatedComponent: LottieWindSpeed
  },
  {
    key: 'precipitation',
    label: 'Precipitation',
    tooltip: 'Amount of precipitation (rain, snow, etc.) in the last hour',
    formatter: (value, units) => {
      const rounded = Math.round(value * 10) / 10;
      const unit = units.precipitation === 'inch' ? 'in' : 'mm';
      return `${rounded} ${unit}`;
    },
    animatedComponent: LottiePrecipitation
  },
  {
    key: 'precipitation_probability',
    label: 'Rain Chance',
    tooltip: 'Probability of precipitation occurring in the next hour',
    formatter: (value) => `${Math.round(value)}%`,
    animatedComponent: LottiePrecipitationProbability,
    conditionalDisplay: (weather) => weather.precipitation_probability > 0
  },
  {
    key: 'surface_pressure',
    label: 'Pressure',
    tooltip: 'Atmospheric pressure at ground level, indicating weather patterns',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const unit = units.pressure === 'inHg' ? 'inHg' : 'hPa';
      return `${rounded} ${unit}`;
    },
    animatedComponent: LottiePressure,
    trendDisplay: (weather, hourlyWeather, units) => {
      if (!hourlyWeather?.surface_pressure || hourlyWeather.surface_pressure.length < 2) {
        return null;
      }
      const trend = calculatePressureTrend(
        weather.surface_pressure,
        hourlyWeather.surface_pressure.slice(1, 5) // Use 3-4 hours ago
      );
      return formatTrendDisplay(trend, units.pressure);
    }
  },
  // Extended metrics (v2)
  {
    key: 'cloud_cover',
    label: 'Clouds',
    tooltip: 'Percentage of sky covered by clouds',
    formatter: (value) => `${Math.round(value)}%`,
    animatedComponent: LottieCloudCover,
    isExtended: true
  },
  {
    key: 'uv_index',
    label: 'UV Index',
    tooltip: 'Ultraviolet radiation index indicating sunburn risk and sun protection needs',
    formatter: (value) => `${Math.round(value)}`,
    animatedComponent: LottieUVIndex,
    isExtended: true
  },
  {
    key: 'visibility',
    label: 'Visibility',
    tooltip: 'Horizontal visibility distance, indicating atmospheric clarity and fog conditions',
    formatter: (value, units) => {
      const rounded = Math.round(value);
      const unit = units.visibility === 'miles' ? 'mi' : 'km';
      return `${rounded} ${unit}`;
    },
    animatedComponent: LottieVisibility,
    isExtended: true
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
      return units.pressure;
    case 'cloud_cover':
    case 'relative_humidity_2m':
    case 'precipitation_probability':
    case 'uv_index':
      return null; // Percentage values and UV index don't need unit conversion
    case 'visibility':
      return units.visibility;
    default:
      return null;
  }
}

export function MetricsGrid({
  weather,
  hourlyWeather = null,
  dailyWeather = null,
  selectedDayIndex = 0,
  isLoading = false,
  error = null,
  className,
  size = 'lg',
  showTooltips = true,
  layout = 'grid',
  showExtendedMetrics = false
}: MetricsGridProps) {
  const { units } = useWeatherStore();
  const [isExtendedVisible, setIsExtendedVisible] = useState(showExtendedMetrics);

  // Get weather data for the selected day
  const selectedDayWeather = useMemo(() => {
    if (selectedDayIndex === 0) {
      // Use current weather for today
      return weather;
    } else {
      // Use daily forecast data for future days
      const apiDayIndex = mapSelectedDayToApiIndex(selectedDayIndex);
      
      if (dailyWeather && apiDayIndex < dailyWeather.time.length) {
        // Create a CurrentWeather-like object from daily data
        return createCurrentWeatherFromDaily(dailyWeather, apiDayIndex);
      }
      // Fallback to current weather if day index is out of bounds
      return weather;
    }
  }, [weather, dailyWeather, selectedDayIndex]);

  // Size-based styling using consistent typography and spacing classes
  const sizeStyles = {
    sm: {
      card: "p-4", // 16px - consistent with design system
      icon: "text-lg",
      label: "text-caption", // 14px line-height: 18px
      value: "text-body-s font-semibold", // 16px line-height: 22px
      gap: "gap-3" // 12px - consistent spacing
    },
    lg: {
      card: "p-6", // 24px - consistent with design system
      icon: "text-2xl",
      label: "text-body-s", // 16px line-height: 22px
      value: "text-body-m font-semibold", // 18px line-height: 26px
      gap: "gap-3" // 12px - consistent spacing
    }
  };

  const styles = sizeStyles[size];

  // Filter metrics based on extended metrics setting and conditional display
  const visibleMetrics = metricConfigs.filter(metric => {
    // Always show core metrics
    if (!metric.isExtended) return true;
    
    // Show extended metrics only if enabled
    if (!isExtendedVisible) return false;
    
    // Check conditional display for metrics like wind gusts
    if (metric.conditionalDisplay && selectedDayWeather) {
      return metric.conditionalDisplay(selectedDayWeather, units);
    }
    
    return true;
  });

  // Dynamic grid columns based on number of visible metrics
  const getGridCols = (count: number) => {
    if (count <= 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    if (count <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    if (count <= 9) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3';
  };

  // Layout classes
  const layoutClasses = layout === 'grid' 
    ? `grid ${getGridCols(visibleMetrics.length)} ${styles.gap}`
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
        {/* Loading placeholder for Lottie */}
        <div className="flex-shrink-0">
          <div 
            className="animate-pulse bg-muted rounded-md"
            style={{ width: 40, height: 40 }}
          />
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
        <div className="text-body-s text-muted-foreground font-medium">
          Unable to load weather metrics
        </div>
        <div className="text-caption text-muted-foreground">
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
  if (isLoading || !selectedDayWeather) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Weather metrics - Loading"
      >
        {visibleMetrics.map((metric) => (
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
      {visibleMetrics.map((metric) => {
        const value = selectedDayWeather[metric.key] as number;
        const formattedValue = metric.formatter(value, units);
        const AnimatedComponent = metric.animatedComponent;
        const trendDisplay = metric.trendDisplay?.(selectedDayWeather, hourlyWeather, units);
        
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
              {/* Lottie Animation as Icon */}
              <div className="flex-shrink-0">
                {AnimatedComponent && (
                  <AnimatedComponent
                    value={value}
                    unit={getUnitForMetric(metric.key, units)}
                    duration={180}
                    className="inline-block"
                    showLottie={true}
                    lottieSize={60}
                    showText={false}
                  />
                )}
              </div>
              {/* Value and label */}
              <div className="flex flex-col items-end text-right flex-1">
                {/* Value */}
                <div 
                  className={cn(
                    "text-foreground font-semibold",
                    styles.value
                  )}
                  aria-label={`Value: ${formattedValue}`}
                >
                  {formattedValue}
                </div>

                {/* Trend display (for pressure) */}
                {trendDisplay && (
                  <div 
                    className={cn(
                      "text-caption font-medium",
                      getTrendColorClass(
                        trendDisplay.includes('↑') ? 'up' as const : 
                        trendDisplay.includes('↓') ? 'down' as const : 
                        'stable' as const
                      )
                    )}
                    aria-label={`Trend: ${trendDisplay}`}
                  >
                    {trendDisplay}
                  </div>
                )}

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
      
      {/* Toggle button for extended metrics */}
      {metricConfigs.some(metric => metric.isExtended) && (
        <div className="col-span-full flex justify-end mt-2">
          <button
            onClick={() => setIsExtendedVisible(!isExtendedVisible)}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 text-body-s text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            aria-label={isExtendedVisible ? "Hide additional metrics" : "Show additional metrics"}
          >
            <span className="text-caption">
              {isExtendedVisible ? "Show less" : "Show more"}
            </span>
            <CaretDown 
              size={12} 
              className={cn(
                "transition-transform duration-200",
                isExtendedVisible ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>
      )}
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
    // Core metrics (v1)
    apparent_temperature: weather.apparent_temperature,
    relative_humidity_2m: weather.relative_humidity_2m,
    wind_speed_10m: weather.wind_speed_10m,
    precipitation: weather.precipitation,
    precipitation_probability: weather.precipitation_probability,
    surface_pressure: weather.surface_pressure,
    // Extended metrics (v2)
    wind_gusts_10m: weather.wind_gusts_10m,
    cloud_cover: weather.cloud_cover,
    dew_point_2m: weather.dew_point_2m
  };
}
