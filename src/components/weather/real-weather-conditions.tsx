'use client';

import { CurrentConditionsCard } from './current-conditions-card';
import { useWeatherStore } from '@/lib/store/weather-store';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icons/phosphor-icon';
import { Button } from '@/components/ui/button';
import { type WeatherForecast } from '@/lib/api/open-meteo';
import { getSelectedDayWeather, getSelectedDayDate } from '@/lib/utils/weather-data-mapping';


interface RealWeatherConditionsProps {
  weather: WeatherForecast | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  selectedDayIndex: number;
}

export function RealWeatherConditions({ 
  weather, 
  isLoading, 
  isError, 
  error, 
  selectedDayIndex 
}: RealWeatherConditionsProps) {
  const { selectedLocation } = useWeatherStore();

  if (!selectedLocation) {
    return (
      <Card className="glass-clear glass-hover max-w-sm md:max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
              <Icon name="MapPin" size={24} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a Location
              </h3>
              <p className="text-muted-foreground text-sm">
                Choose a location to see current weather conditions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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

  // Get weather data for the selected day
  const selectedDayWeather = getSelectedDayWeather(weather, selectedDayIndex);
  const selectedDayDate = getSelectedDayDate(weather, selectedDayIndex);
  
  console.log('🌡️ RealWeatherConditions - selectedDayIndex:', selectedDayIndex);
  console.log('🌡️ RealWeatherConditions - selectedDayWeather:', selectedDayWeather);
  console.log('🌡️ RealWeatherConditions - selectedDayDate:', selectedDayDate);

  if (!selectedDayWeather) {
    return null;
  }

  return (
    <CurrentConditionsCard
      conditions={selectedDayWeather}
      location={selectedLocation}
      displayDate={selectedDayDate}
      className="glass-clear glass-hover"
      showHeroBackground={true}
      heroBackgroundOpacity={0.6}
    />
  );
}
