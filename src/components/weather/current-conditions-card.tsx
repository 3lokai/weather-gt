'use client';

import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import { LottieTemperature, LottiePrecipitationProbability } from "@/components/common/lottie-metric";
import { Icon } from "@/components/icons/phosphor-icon";
import { getWeatherCondition } from "@/lib/api/open-meteo";
import { useWeatherStore, type Location } from "@/lib/store/weather-store";
import { formatDateTime } from "@/lib/utils/units";
import { cn } from "@/lib/utils";
import { useWeatherShare } from "@/hooks/use-weather-share";
import Image from "next/image";

export interface CurrentConditionsData {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  is_day: boolean;
  precipitation_probability?: number;
}

export interface CurrentConditionsCardProps {
  /** Current weather conditions data */
  conditions: CurrentConditionsData;
  /** Location for display */
  location: Location;
  /** Date to display (defaults to current date) */
  displayDate?: Date;
  /** Additional CSS classes */
  className?: string;
  /** Enable weather hero background */
  showHeroBackground?: boolean;
  /** Hero background opacity (0-1) */
  heroBackgroundOpacity?: number;
}

export function CurrentConditionsCard({
  conditions,
  location,
  displayDate,
  className,
  showHeroBackground = false,
  heroBackgroundOpacity = 0.4
}: CurrentConditionsCardProps) {
  const { units, favorites, addFavorite, removeFavorite } = useWeatherStore();
  const { shareWeather } = useWeatherShare();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { condition, iconKey, themeGroup } = getWeatherCondition(
    conditions.weather_code,
    conditions.is_day
  );

  // Format temperature based on units (for accessibility labels)
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

  // Get date and time to display (use provided date or current date)
  const dateToDisplay = displayDate || new Date();
  const formattedDateTime = formatDateTime(dateToDisplay, units.timeFormat);

  // Check if location is favorited
  const isFavorited = favorites.some(fav => fav.id === location.id);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(location.id);
    } else {
      addFavorite(location);
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

  return (
    <Card
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        "p-6 min-h-[200px] md:min-h-[240px]",
        className
      )}
      role="region"
      aria-label={`Current weather conditions for ${formatLocation(location)}`}
    >
      {/* Weather Hero Background */}
      {showHeroBackground && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Desktop Background */}
          <Image
            src="/Desktop - Hero bg.svg"
            alt=""
            width={800}
            height={286}
            className="hidden md:block w-full h-full object-cover"
            style={{ opacity: heroBackgroundOpacity }}
            priority
          />
          {/* Mobile Background */}
          <Image
            src="/Mobile - Hero bg.svg"
            alt=""
            width={343}
            height={286}
            className="block md:hidden w-full h-full object-cover"
            style={{ opacity: heroBackgroundOpacity }}
            priority
          />
        </div>
      )}

      {/* Action Buttons - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          variant="ghost"
          className={cn(
            "h-16 w-16 transition-all duration-200",
            isFavorited 
              ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
              : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20"
          )}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavoriteToggle}
        >
          <Icon 
            name="Heart" 
            size={32} 
            weight={isFavorited ? "fill" : "regular"}
            withDuotone={false}
            className={cn(
              "size-8 transition-all duration-200",
              isFavorited ? "text-red-500" : "text-muted-foreground"
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
      </div>

      <CardContent className="relative z-10 h-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
        {/* Left Side - Location and Time Information */}
        <div className="flex-1 space-y-2">
          {/* Location Name */}
          <h2 className="text-h2 md:text-h1 font-bold text-foreground leading-tight">
            {location.name}
          </h2>
          
          {/* Country/Admin */}
          <p className="text-body-m text-muted-foreground">
            {[location.admin1, location.country].filter(Boolean).join(', ')}
          </p>
          
          {/* Date and Time */}
          <p className="text-body-s text-muted-foreground">
            {formattedDateTime}
          </p>
        </div>

        {/* Right Side - Weather Visual and Temperature */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          {/* Weather Icon */}
          <div className="flex justify-center">
            <LottieWeatherIcon
              code={conditions.weather_code}
              isDay={conditions.is_day}
              size={150}
              className="drop-shadow-lg"
              enhancedStyling={showHeroBackground}
              customFilter={showHeroBackground ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' : undefined}
              aria-hidden="true"
            />
          </div>

          {/* Temperature */}
          <div 
            className="flex justify-center md:justify-end"
            aria-label={`Current temperature: ${formatTemperature(conditions.temperature_2m)}`}
          >
            <LottieTemperature
              value={conditions.temperature_2m}
              unit={units.temperature}
              duration={180}
              className="text-4xl md:text-5xl font-bold text-foreground leading-none"
              showLottie={true}
              lottieSize={24}
            />
          </div>

          {/* Weather Condition */}
          <p 
            className="text-body-m font-medium text-muted-foreground capitalize text-center md:text-right"
            aria-label={`Weather condition: ${condition}`}
          >
            {condition}
          </p>

          {/* Chance of Rain */}
          {conditions.precipitation_probability !== undefined && conditions.precipitation_probability > 0 && (
            <div 
              className="flex justify-center md:justify-end text-blue-600 dark:text-blue-400 font-medium"
              aria-label={`${Math.round(conditions.precipitation_probability)}% chance of precipitation`}
            >
              <LottiePrecipitationProbability
                value={conditions.precipitation_probability}
                duration={180}
                className="text-body-s"
                showLottie={true}
                lottieSize={20}
              />
              <span className="ml-2">chance of rain</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Hook to get current conditions from weather store
 * This is a placeholder - in the real implementation, this would integrate
 * with TanStack Query to fetch live weather data
 */
export function useCurrentConditions(location: Location | null) {
  // TODO: Implement real data fetching with TanStack Query
  // For now, return demo data
  if (!location) return null;

  return {
    temperature_2m: 22,
    apparent_temperature: 24,
    weather_code: 0, // Clear sky
    is_day: true
  } as CurrentConditionsData;
}
