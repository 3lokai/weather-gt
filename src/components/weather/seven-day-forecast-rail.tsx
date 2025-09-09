'use client';

import { useMemo } from 'react';
import { DailyForecastChip, type DailyForecastData } from './daily-forecast-chip';
import { useWeatherStore } from '@/lib/store/weather-store';
import { cn } from '@/lib/utils';

export interface SevenDayForecastRailProps {
  /** Daily forecast data array (7 days) */
  dailyData: DailyForecastData[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to show scroll indicators */
  showScrollIndicators?: boolean;
}

export function SevenDayForecastRail({
  dailyData,
  className,
  showScrollIndicators = true
}: SevenDayForecastRailProps) {
  const { selectedDayIndex, setSelectedDayIndex } = useWeatherStore();

  // Process daily data to include is_day information
  const processedDailyData = useMemo(() => {
    return dailyData.map((day, index) => {
      // For daily forecasts, we assume day conditions for icon display
      // In a real implementation, you might want to determine this based on sunrise/sunset times
      const isDay = index === 0 ? true : true; // Simplified - first day is current day, others are day conditions
      
      return {
        ...day,
        is_day: isDay
      };
    });
  }, [dailyData]);

  // Check if today is in the forecast data
  const isToday = (dateString: string) => {
    const today = new Date();
    const forecastDate = new Date(dateString);
    return today.toDateString() === forecastDate.toDateString();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Scrollable container */}
      <div className="relative">
        <div 
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          role="tablist"
          aria-label="7-day weather forecast"
        >
          {processedDailyData.map((dayData, index) => (
            <DailyForecastChip
              key={dayData.time}
              data={dayData}
              dayIndex={index}
              isSelected={selectedDayIndex === index}
              isToday={isToday(dayData.time)}
              onSelect={setSelectedDayIndex}
              className="flex-shrink-0"
            />
          ))}
        </div>

        {/* Scroll indicators */}
        {showScrollIndicators && (
          <>
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            
            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </>
        )}
      </div>

      {/* Scroll hint for mobile */}
      <div className="text-xs text-muted-foreground text-center mt-2 md:hidden">
        ← Scroll to see more days →
      </div>
    </div>
  );
}

/**
 * Hook to get daily forecast data from weather store
 * This is a placeholder - in the real implementation, this would integrate
 * with TanStack Query to fetch live weather data
 */
export function useDailyForecast(location: any) {
  // TODO: Implement real data fetching with TanStack Query
  // For now, return demo data
  if (!location) return [];

  const today = new Date();
  const demoData: DailyForecastData[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    demoData.push({
      time: date.toISOString().split('T')[0],
      weather_code: i === 0 ? 0 : Math.floor(Math.random() * 10), // Clear sky for today, random for others
      temperature_2m_max: 20 + Math.random() * 15,
      temperature_2m_min: 10 + Math.random() * 10,
      precipitation_probability_max: Math.random() * 100,
      is_day: true
    });
  }

  return demoData;
}
