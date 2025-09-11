'use client';

import { CurrentConditionsCard } from './current-conditions-card';
import { WeatherDataProvider } from './weather-data-provider';
import { useWeatherStore } from '@/lib/store/weather-store';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icons/phosphor-icon';
import { Button } from '@/components/ui/button';

export function RealWeatherConditions() {
  const { selectedLocation } = useWeatherStore();

  if (!selectedLocation) {
    return null;
  }

  return (
    <WeatherDataProvider>
      {({ weather, isLoading, isError, error }) => {
        if (isLoading) {
          return (
            <Card className="glass-clear glass-hover max-w-sm md:max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                  <span className="text-muted-foreground">Loading weather data...</span>
                </div>
              </CardContent>
            </Card>
          );
        }

        if (isError) {
          return (
            <Card className="glass-clear glass-hover max-w-sm md:max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 text-destructive">
                  <Icon name="Warning" size={20} />
                  <span>Failed to load weather data</span>
                </div>
                {error && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {error}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        }

        if (!weather) {
          return null;
        }

        return (
          <CurrentConditionsCard
            conditions={{
              temperature_2m: weather.current.temperature_2m,
              apparent_temperature: weather.current.apparent_temperature,
              weather_code: weather.current.weather_code,
              is_day: weather.current.is_day,
              precipitation_probability: weather.current.precipitation_probability,
            }}
            location={selectedLocation}
            size="lg"
            className="glass-clear glass-hover"
            showHeroBackground={true}
            heroBackgroundOpacity={0.6}
          />
        );
      }}
    </WeatherDataProvider>
  );
}
