'use client';

import { useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import { getWeatherCondition } from "@/lib/api/open-meteo";
import { useWeatherStore, type Location } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface CurrentConditionsData {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  is_day: boolean;
}

export interface CurrentConditionsCardProps {
  /** Current weather conditions data */
  conditions: CurrentConditionsData;
  /** Location for display */
  location: Location;
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the card */
  size?: 'sm' | 'md' | 'lg';
  /** Show apparent temperature */
  showApparentTemp?: boolean;
  /** Enable weather hero background */
  showHeroBackground?: boolean;
  /** Hero background opacity (0-1) */
  heroBackgroundOpacity?: number;
}

export function CurrentConditionsCard({
  conditions,
  location,
  className,
  size = 'md',
  showApparentTemp = true,
  showHeroBackground = false,
  heroBackgroundOpacity = 0.4
}: CurrentConditionsCardProps) {
  const { units } = useWeatherStore();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { condition, iconKey, themeGroup } = getWeatherCondition(
    conditions.weather_code,
    conditions.is_day
  );

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

  // Size-based styling
  const sizeStyles = {
    sm: {
      card: "py-4",
      icon: 64,
      tempSize: "text-4xl",
      locationSize: "text-sm",
      conditionSize: "text-xs"
    },
    md: {
      card: "py-6", 
      icon: 96,
      tempSize: "text-6xl",
      locationSize: "text-base",
      conditionSize: "text-sm"
    },
    lg: {
      card: "py-8",
      icon: 128,
      tempSize: "text-8xl",
      locationSize: "text-lg", 
      conditionSize: "text-base"
    }
  };

  const styles = sizeStyles[size];

  return (
    <Card
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        styles.card,
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
      <CardHeader className="relative z-10 text-center space-y-2">
        {/* Location */}
        <div 
          className={cn(
            "font-medium text-muted-foreground",
            styles.locationSize
          )}
          aria-label={`Location: ${formatLocation(location)}`}
        >
          {formatLocation(location)}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 text-center space-y-4">
        {/* Weather Icon */}
        <div className="flex justify-center">
          <LottieWeatherIcon
            code={conditions.weather_code}
            isDay={conditions.is_day}
            size={styles.icon}
            className="drop-shadow-lg"
            enhancedStyling={showHeroBackground}
            customFilter={showHeroBackground ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' : undefined}
            aria-hidden="true"
          />
        </div>

        {/* Current Temperature */}
        <div 
          className={cn(
            "font-bold text-foreground leading-none",
            styles.tempSize
          )}
          aria-label={`Current temperature: ${formatTemperature(conditions.temperature_2m)}`}
        >
          {formatTemperature(conditions.temperature_2m)}
        </div>

        {/* Weather Condition */}
        <div 
          className={cn(
            "font-medium text-muted-foreground capitalize",
            styles.conditionSize
          )}
          aria-label={`Weather condition: ${condition}`}
        >
          {condition}
        </div>

        {/* Apparent Temperature */}
        {showApparentTemp && (
          <div 
            className={cn(
              "text-muted-foreground",
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
            aria-label={`Feels like ${formatTemperature(conditions.apparent_temperature)}`}
          >
            Feels like {formatTemperature(conditions.apparent_temperature)}
          </div>
        )}
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
