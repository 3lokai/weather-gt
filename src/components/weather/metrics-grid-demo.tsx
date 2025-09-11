'use client';

import { useState } from 'react';
import { MetricsGrid } from './metrics-grid';
import { CurrentWeather, HourlyWeather } from '@/lib/api/open-meteo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Demo weather data
const demoWeatherData: CurrentWeather = {
  temperature_2m: 22,
  apparent_temperature: 24,
  weather_code: 0,
  is_day: true,
  wind_speed_10m: 15,
  wind_gusts_10m: 25, // Higher gusts to trigger display
  relative_humidity_2m: 65,
  precipitation: 0.5,
  precipitation_probability: 30,
  surface_pressure: 1013,
  uv_index: 6,
  visibility: 10,
  cloud_cover: 25,
  dew_point_2m: 15,
  time: '2024-01-15T14:00'
};

// Demo hourly data for trend calculations
const demoHourlyData: HourlyWeather = {
  time: ['2024-01-15T10:00', '2024-01-15T11:00', '2024-01-15T12:00', '2024-01-15T13:00', '2024-01-15T14:00'],
  temperature_2m: [20, 21, 22, 23, 22],
  precipitation: [0, 0, 0.2, 0.3, 0.5],
  precipitation_probability: [10, 15, 20, 25, 30],
  wind_speed_10m: [12, 13, 14, 15, 15],
  wind_gusts_10m: [18, 20, 22, 24, 25],
  uv_index: [4, 5, 6, 6, 6],
  visibility: [10, 10, 10, 10, 10],
  cloud_cover: [30, 28, 26, 25, 25],
  dew_point_2m: [14, 14, 15, 15, 15],
  surface_pressure: [1015, 1014, 1013, 1012, 1013] // Slight pressure trend
};

export function MetricsGridDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(demoWeatherData);
  const [showExtendedMetrics, setShowExtendedMetrics] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setHasError(false);
    setCurrentWeather(null);
    
    setTimeout(() => {
      setIsLoading(false);
      setCurrentWeather(demoWeatherData);
    }, 2000);
  };

  const handleErrorDemo = () => {
    setIsLoading(false);
    setHasError(true);
    setCurrentWeather(null);
  };

  const handleReset = () => {
    setIsLoading(false);
    setHasError(false);
    setCurrentWeather(demoWeatherData);
  };

  const toggleExtendedMetrics = () => {
    setShowExtendedMetrics(!showExtendedMetrics);
  };

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle>Metrics Grid Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Demo Controls */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleLoadingDemo}
              variant="outline"
              size="sm"
            >
              Loading Demo
            </Button>
            <Button 
              onClick={handleErrorDemo}
              variant="outline"
              size="sm"
            >
              Error Demo
            </Button>
            <Button 
              onClick={toggleExtendedMetrics}
              variant={showExtendedMetrics ? "default" : "outline"}
              size="sm"
            >
              {showExtendedMetrics ? 'Hide' : 'Show'} Extended Metrics
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              size="sm"
            >
              Reset
            </Button>
          </div>

          {/* Current State Display */}
          <div className="text-sm text-muted-foreground">
            Current state: {isLoading ? 'Loading' : hasError ? 'Error' : 'Loaded'}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid - Default */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">Default Grid Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsGrid
            weather={currentWeather}
            hourlyWeather={demoHourlyData}
            isLoading={isLoading}
            error={hasError ? 'Failed to load weather data' : null}
            size="md"
            showTooltips={true}
            layout="grid"
            showExtendedMetrics={showExtendedMetrics}
          />
        </CardContent>
      </Card>

      {/* Metrics Grid - List Layout */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">List Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsGrid
            weather={currentWeather}
            hourlyWeather={demoHourlyData}
            isLoading={isLoading}
            error={hasError ? 'Failed to load weather data' : null}
            size="md"
            showTooltips={true}
            layout="list"
            showExtendedMetrics={showExtendedMetrics}
          />
        </CardContent>
      </Card>

      {/* Metrics Grid - Small Size */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">Small Size</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsGrid
            weather={currentWeather}
            hourlyWeather={demoHourlyData}
            isLoading={isLoading}
            error={hasError ? 'Failed to load weather data' : null}
            size="sm"
            showTooltips={false}
            layout="grid"
            showExtendedMetrics={showExtendedMetrics}
          />
        </CardContent>
      </Card>

      {/* Metrics Grid - Large Size */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">Large Size</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsGrid
            weather={currentWeather}
            hourlyWeather={demoHourlyData}
            isLoading={isLoading}
            error={hasError ? 'Failed to load weather data' : null}
            size="lg"
            showTooltips={true}
            layout="grid"
            showExtendedMetrics={showExtendedMetrics}
          />
        </CardContent>
      </Card>
    </div>
  );
}
