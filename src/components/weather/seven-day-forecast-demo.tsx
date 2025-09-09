'use client';

import { SevenDayForecastRail, useDailyForecast } from './seven-day-forecast-rail';
import { useWeatherStore } from '@/lib/store/weather-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SevenDayForecastDemo() {
  const { selectedLocation } = useWeatherStore();
  const dailyData = useDailyForecast(selectedLocation);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>7-Day Forecast Rail Demo</CardTitle>
        <p className="text-sm text-muted-foreground">
          Horizontal scrollable daily forecast with selection functionality
        </p>
      </CardHeader>
      <CardContent>
        <SevenDayForecastRail
          dailyData={dailyData}
          showScrollIndicators={true}
          className="mb-4"
        />
        
        {/* Selection info */}
        <div className="text-sm text-muted-foreground">
          <p>Selected day index: {useWeatherStore.getState().selectedDayIndex}</p>
          <p>Click on any day chip to select it and update the hourly panel.</p>
        </div>
      </CardContent>
    </Card>
  );
}
