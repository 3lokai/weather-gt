'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { DailyForecastChip, type DailyForecastData } from './daily-forecast-chip';
import { useWeatherStore } from '@/lib/store/weather-store';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icons/phosphor-icon';
import { Button } from '@/components/ui/button';

export interface SevenDayForecastRailProps {
  /** Daily forecast data array (7 days) */
  dailyData: DailyForecastData[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to show scroll indicators */
  showScrollIndicators?: boolean;
  /** Whether to show navigation arrows */
  showNavigationArrows?: boolean;
}

export function SevenDayForecastRail({
  dailyData,
  className,
  showScrollIndicators = true,
  showNavigationArrows = true
}: SevenDayForecastRailProps) {
  const { selectedDayIndex, setSelectedDayIndex } = useWeatherStore();
  
  // Map the selectedDayIndex to the API data structure
  // API returns: 2 past days + 7 future days = 9 total days
  // Index 0-1: Past days (historical data)
  // Index 2: Today (current day) 
  // Index 3-8: Future days (forecast data)
  const getMappedSelectedIndex = () => {
    // If selectedDayIndex is 0 (today), map to today's position (index 2)
    if (selectedDayIndex === 0) return 2;
    // For future days, add 2 to account for past days
    return selectedDayIndex + 2;
  };
  
  const mappedSelectedIndex = getMappedSelectedIndex();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Process daily data - now includes real historical data from API
  const processedDailyData = useMemo(() => {
    // The API now returns: 2 past days + 7 future days = 9 total days
    // Index 0-1: Past days (real historical data)
    // Index 2: Today (current day)
    // Index 3-8: Future days (forecast data)
    
    return dailyData.map((dayData, index) => ({
      ...dayData,
      is_day: true // All daily forecasts are shown as day conditions
    }));
  }, [dailyData]);

  // Check if today is in the forecast data
  const isToday = (dateString: string) => {
    const today = new Date();
    const forecastDate = new Date(dateString);
    return today.toDateString() === forecastDate.toDateString();
  };

  // Update scroll button states
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 140; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 140; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  // Update scroll buttons on mount and scroll
  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [processedDailyData]);

  // Auto-scroll to today's position on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const todayIndex = processedDailyData.findIndex(day => isToday(day.time));
      if (todayIndex >= 0) {
        const cardWidth = 140; // Approximate card width + gap
        const scrollPosition = todayIndex * cardWidth - (scrollContainerRef.current.clientWidth / 2) + (cardWidth / 2);
        scrollContainerRef.current.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
      }
    }
  }, [processedDailyData]);

  return (
    <div className={cn("w-full", className)}>
      {/* Navigation arrows and scrollable container */}
      <div className="relative">
        {/* Left navigation arrow */}
        {showNavigationArrows && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-16 w-16 p-0",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "hover:bg-background/90 hover:border-border",
              "transition-all duration-200",
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left to see previous days"
          >
            <Icon name="CaretLeft" size={48} color="foreground" />
          </Button>
        )}

        {/* Right navigation arrow */}
        {showNavigationArrows && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-16 w-16 p-0",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "hover:bg-background/90 hover:border-border",
              "transition-all duration-200",
              !canScrollRight && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right to see more days"
          >
            <Icon name="CaretRight" size={48} color="foreground" />
          </Button>
        )}

        {/* Scrollable container with padding for arrows */}
        <div 
          ref={scrollContainerRef}
          className={cn(
            "flex gap-3 overflow-x-auto py-3",
            showNavigationArrows ? "px-12" : "px-0"
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          role="tablist"
          aria-label="7-day weather forecast with past and future days"
          aria-orientation="horizontal"
        >
          {processedDailyData.map((dayData, index) => (
            <DailyForecastChip
              key={dayData.time}
              data={dayData}
              dayIndex={index}
              isSelected={mappedSelectedIndex === index}
              isToday={isToday(dayData.time)}
              onSelect={(newIndex) => {
                // Map the API data index to selectedDayIndex
                // Index 0-1: Past days (historical data) - default to today
                // Index 2: Today (selectedDayIndex: 0)
                // Index 3: Tomorrow (selectedDayIndex: 1) 
                // Index 4: Day after tomorrow (selectedDayIndex: 2)
                // etc.
                if (newIndex === 2) {
                  setSelectedDayIndex(0); // Today
                } else if (newIndex > 2) {
                  const dayIndex = newIndex - 2;
                  setSelectedDayIndex(dayIndex); // Future days
                } else {
                  setSelectedDayIndex(0); // Past days default to today
                }
              }}
              className={cn(
                "flex-shrink-0",
                isToday(dayData.time) && "ring-2 ring-primary/30 shadow-lg shadow-primary/10"
              )}
            />
          ))}
        </div>

        {/* Scroll indicators */}
        {showScrollIndicators && (
          <>
            {/* Left gradient fade */}
            <div className="absolute left-0 top-3 bottom-3 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            
            {/* Right gradient fade */}
            <div className="absolute right-0 top-3 bottom-3 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </>
        )}
      </div>

      {/* Scroll hint for mobile */}
      <div className="text-caption text-muted-foreground text-center mt-3 md:hidden">
        ← Swipe or use arrows to see more days →
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
  // For now, return demo data for 5 future days (past days are generated in component)
  if (!location) return [];

  const today = new Date();
  const demoData: DailyForecastData[] = [];

  // Generate 5 days of future forecast data
  for (let i = 0; i < 5; i++) {
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
