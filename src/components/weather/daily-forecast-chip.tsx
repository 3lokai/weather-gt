'use client';

import { Card } from "@/components/ui/card";
import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import { getWeatherCondition } from "@/lib/api/open-meteo";
import { useWeatherStore } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";

export interface DailyForecastData {
  time: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_probability_max: number;
  is_day: boolean;
}

export interface DailyForecastChipProps {
  /** Daily forecast data */
  data: DailyForecastData;
  /** Day index (0-6) */
  dayIndex: number;
  /** Whether this chip is currently selected */
  isSelected: boolean;
  /** Whether this is today */
  isToday: boolean;
  /** Click handler for selection */
  onSelect: (dayIndex: number) => void;
  /** Additional CSS classes */
  className?: string;
}

export function DailyForecastChip({
  data,
  dayIndex,
  isSelected,
  isToday,
  onSelect,
  className
}: DailyForecastChipProps) {
  const { units } = useWeatherStore();
  
  const { condition, iconKey } = getWeatherCondition(
    data.weather_code,
    data.is_day
  );

  // Format temperature based on units (for accessibility labels)
  const formatTemperature = (temp: number) => {
    const rounded = Math.round(temp);
    const symbol = units.temperature === 'fahrenheit' ? '°F' : '°C';
    return `${rounded}${symbol}`;
  };

  // Format day name with date
  const formatDayName = (dateString: string, isToday: boolean) => {
    if (isToday) return 'Today';
    
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${dayName} (${monthDay})`;
  };

  // Format precipitation probability
  const formatPrecipitationProbability = (probability: number) => {
    return `${Math.round(probability)}%`;
  };

  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "min-w-[120px] flex-shrink-0",
        "border-2",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-border hover:border-primary/50",
        isToday && !isSelected && "border-primary/40 bg-primary/3",
        className
      )}
      onClick={() => onSelect(dayIndex)}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      aria-selected={isSelected}
      aria-controls={`day-${dayIndex}-panel`}
      id={`day-${dayIndex}-tab`}
      aria-label={`${formatDayName(data.time, isToday)} forecast: ${condition}, high ${formatTemperature(data.temperature_2m_max)}, low ${formatTemperature(data.temperature_2m_min)}, ${formatPrecipitationProbability(data.precipitation_probability_max)} chance of precipitation`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(dayIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          // Handle arrow key navigation
          const direction = e.key === 'ArrowLeft' ? -1 : 1;
          const newIndex = Math.max(0, Math.min(6, dayIndex + direction));
          onSelect(newIndex);
        }
      }}
    >
      <div className="p-4 text-center space-y-3">
        {/* Day Name */}
        <div className={cn(
          "text-body-s font-medium",
          isToday ? "text-primary font-semibold" : "text-muted-foreground"
        )}>
          {formatDayName(data.time, isToday)}
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center">
          <LottieWeatherIcon
            code={data.weather_code}
            isDay={data.is_day}
            size={32}
            className="drop-shadow-sm"
            aria-hidden="true"
          />
        </div>

        {/* Temperature Range */}
        <div className="text-body-s font-semibold text-foreground">
          {formatTemperature(data.temperature_2m_max)} / {formatTemperature(data.temperature_2m_min)}
        </div>

        {/* Precipitation Probability */}
        {data.precipitation_probability_max > 0 && (
          <div className="text-caption text-blue-600 dark:text-blue-400 font-medium">
            {formatPrecipitationProbability(data.precipitation_probability_max)}
          </div>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
      )}
    </Card>
  );
}
