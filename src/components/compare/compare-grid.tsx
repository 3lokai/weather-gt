'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/phosphor-icon';
import { LottieWeatherIcon } from '@/components/icons/lottie-weather-icon';
import { LottieTemperature, LottieWindSpeed, LottieHumidity, LottiePressure } from '@/components/common/lottie-metric';
import { MetricsGrid } from '@/components/weather/metrics-grid';
import { useWeatherStore, type Location } from '@/lib/store/weather-store';
import { getWeatherCondition } from '@/lib/api/open-meteo';
import { CurrentWeather, DailyWeather } from '@/lib/api/open-meteo';
import { useWeatherShare } from '@/hooks/use-weather-share';
import { cn } from '@/lib/utils';

export interface ComparisonLocation {
  location: Location;
  currentWeather: CurrentWeather | null;
  dailyWeather: DailyWeather | null;
  isLoading: boolean;
  error: string | null;
}

export interface CompareGridProps {
  /** Array of locations to compare (max 4) */
  locations: ComparisonLocation[];
  /** Callback when a location is removed from comparison */
  onRemoveLocation: (locationId: string) => void;
  /** Callback when a location is added to favorites */
  onAddToFavorites: (location: Location) => void;
  /** Callback when a location is removed from favorites */
  onRemoveFromFavorites: (locationId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export function CompareGrid({
  locations,
  onRemoveLocation,
  onAddToFavorites,
  onRemoveFromFavorites,
  className
}: CompareGridProps) {
  const { units, favorites } = useWeatherStore();
  const { shareWeather } = useWeatherShare();
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);

  // Format temperature based on units
  const formatTemperature = (temp: number) => {
    const rounded = Math.round(temp);
    const symbol = units.temperature === 'fahrenheit' ? '°F' : '°C';
    return `${rounded}${symbol}`;
  };

  // Format location name
  const formatLocation = (loc: Location) => {
    if (loc.admin1 && loc.admin1 !== loc.name) {
      return `${loc.name}, ${loc.admin1}`;
    }
    return `${loc.name}, ${loc.country}`;
  };

  // Check if location is favorited
  const isFavorited = (locationId: string) => {
    return favorites.some(fav => fav.id === locationId);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (location: Location) => {
    if (isFavorited(location.id)) {
      onRemoveFromFavorites(location.id);
    } else {
      onAddToFavorites(location);
    }
  };

  // Handle share
  const handleShare = async () => {
    try {
      await shareWeather();
    } catch (error) {
      console.error('Failed to share weather:', error);
    }
  };

  // Grid responsive classes
  const getGridClasses = () => {
    const count = locations.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  if (locations.length === 0) {
    return null;
  }

  return (
    <div 
      className={cn(
        "grid gap-3 transition-all duration-300",
        getGridClasses(),
        className
      )}
      role="region"
      aria-label="Weather comparison grid"
    >
      {locations.map((comparisonLocation) => {
        const { location, currentWeather, dailyWeather, isLoading, error } = comparisonLocation;
        
        if (isLoading) {
          return (
            <Card key={location.id} className="glass-subtle animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-32 bg-muted rounded" />
                  <div className="h-20 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          );
        }

        if (error) {
          return (
            <Card key={location.id} className="glass-subtle border-destructive/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2" aria-hidden="true">⚠️</div>
                <div className="text-body-s text-muted-foreground font-medium mb-3">
                  Unable to load weather data
                </div>
                <div className="text-caption text-muted-foreground">
                  {error}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveLocation(location.id)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          );
        }

        if (!currentWeather || !dailyWeather) {
          return null;
        }

        const { condition, iconKey } = getWeatherCondition(
          currentWeather.weather_code,
          currentWeather.is_day
        );

        const isLocationFavorited = isFavorited(location.id);

        return (
          <Card
            key={location.id}
            className={cn(
              "glass-subtle transition-all duration-200 hover:glass-hover",
              "relative overflow-hidden"
            )}
            role="group"
            aria-label={`Weather conditions for ${formatLocation(location)}`}
          >
            {/* Action Buttons - Top Right */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "h-16 w-16 transition-all duration-200",
                  isLocationFavorited 
                    ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
                    : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                )}
                aria-label={isLocationFavorited ? "Remove from favorites" : "Add to favorites"}
                onClick={() => handleFavoriteToggle(location)}
              >
                <Icon 
                  name="Heart" 
                  size={32} 
                  weight={isLocationFavorited ? "fill" : "regular"}
                  withDuotone={false}
                  className={cn(
                    "size-8 transition-all duration-200",
                    isLocationFavorited ? "text-red-500" : "text-muted-foreground"
                  )}
                />
              </Button>
              <Button
                variant="ghost"
                className="h-16 w-16 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 active:text-blue-600 active:bg-blue-100 dark:active:bg-blue-900/30 transition-all duration-200"
                aria-label="Share weather"
                onClick={handleShare}
              >
                <Icon 
                  name="Share" 
                  size={32} 
                  withDuotone={true}
                  color="muted"
                  className="size-8 transition-all duration-200"
                />
              </Button>
              <Button
                variant="ghost"
                className="h-16 w-16 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 active:text-red-600 active:bg-red-100 dark:active:bg-red-900/30 transition-all duration-200"
                aria-label="Remove from comparison"
                onClick={() => onRemoveLocation(location.id)}
              >
                <Icon 
                  name="X" 
                  size={32} 
                  withDuotone={true}
                  color="muted"
                  className="size-8 transition-all duration-200"
                />
              </Button>
            </div>

            <CardContent className="p-6 space-y-3">
              {/* Location Header */}
              <div className="space-y-3">
                <h3 className="text-h3 font-bold text-foreground leading-tight">
                  {location.name}
                </h3>
                <p className="text-body-s text-muted-foreground">
                  {[location.admin1, location.country].filter(Boolean).join(', ')}
                </p>
              </div>

              {/* Current Conditions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LottieWeatherIcon
                    code={currentWeather.weather_code}
                    isDay={currentWeather.is_day}
                    size={48}
                    className="drop-shadow-sm"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-h2 font-bold text-foreground">
                      {formatTemperature(currentWeather.temperature_2m)}
                    </div>
                    <div className="text-body-s text-muted-foreground capitalize">
                      {condition}
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Metrics - Using existing MetricsGrid component */}
              <div className="space-y-3">
                <MetricsGrid
                  weather={currentWeather}
                  size="sm"
                  showTooltips={false}
                  layout="list"
                  showExtendedMetrics={false}
                  className="grid-cols-2 gap-3"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
