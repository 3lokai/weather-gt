'use client';

import { CurrentConditionsCard, type CurrentConditionsData } from './current-conditions-card';
import { useWeatherStore } from '@/lib/store/weather-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Demo weather conditions for different scenarios
const demoConditions: Record<string, CurrentConditionsData> = {
  clear: {
    temperature_2m: 24,
    apparent_temperature: 26,
    weather_code: 0, // Clear sky
    is_day: true
  },
  'clear-night': {
    temperature_2m: 16,
    apparent_temperature: 14,
    weather_code: 0, // Clear sky
    is_day: false
  },
  cloudy: {
    temperature_2m: 18,
    apparent_temperature: 19,
    weather_code: 3, // Overcast
    is_day: true
  },
  rain: {
    temperature_2m: 15,
    apparent_temperature: 13,
    weather_code: 61, // Slight rain
    is_day: true
  },
  thunderstorm: {
    temperature_2m: 20,
    apparent_temperature: 23,
    weather_code: 95, // Thunderstorm
    is_day: true
  },
  snow: {
    temperature_2m: -2,
    apparent_temperature: -5,
    weather_code: 71, // Slight snow
    is_day: true
  }
};

// Demo locations
const demoLocations = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    admin1: 'England',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo'
  },
  {
    id: 'nyc',
    name: 'New York',
    country: 'United States',
    admin1: 'New York',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York'
  }
];

export function CurrentConditionsDemo() {
  const { selectedLocation, setSelectedLocation } = useWeatherStore();
  const [selectedCondition, setSelectedCondition] = useState<string>('clear');
  const [showHeroBackground, setShowHeroBackground] = useState<boolean>(false);

  // Use first demo location if no location selected
  const displayLocation = selectedLocation || demoLocations[0];
  const displayConditions = demoConditions[selectedCondition];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Current Conditions Card Demo
            <Badge variant="outline">E1-02</Badge>
          </CardTitle>
          <CardDescription>
            Interactive demo of the Current Conditions Card component with different weather scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Demo Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Weather Condition:</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(demoConditions).map((condition) => (
                  <Button
                    key={condition}
                    variant={selectedCondition === condition ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCondition(condition)}
                    className="capitalize"
                  >
                    {condition.replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location:</label>
              <div className="flex flex-wrap gap-2">
                {demoLocations.map((location) => (
                  <Button
                    key={location.id}
                    variant={displayLocation.id === location.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Hero Background:</label>
              <div className="flex gap-2">
                <Button
                  variant={!showHeroBackground ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowHeroBackground(false)}
                >
                  Off
                </Button>
                <Button
                  variant={showHeroBackground ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowHeroBackground(true)}
                >
                  On
                </Button>
              </div>
              {showHeroBackground && (
                <p className="text-xs text-muted-foreground mt-2">
                  Hero backgrounds adapt to weather conditions and time of day for enhanced atmospheric theming.
                </p>
              )}
            </div>
          </div>

          {/* Size Variants Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Size Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Small</h4>
                <CurrentConditionsCard
                  conditions={displayConditions}
                  location={displayLocation}
                  size="sm"
                  showHeroBackground={showHeroBackground}
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Medium (Default)</h4>
                <CurrentConditionsCard
                  conditions={displayConditions}
                  location={displayLocation}
                  size="md"
                  showHeroBackground={showHeroBackground}
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Large</h4>
                <CurrentConditionsCard
                  conditions={displayConditions}
                  location={displayLocation}
                  size="lg"
                  showHeroBackground={showHeroBackground}
                />
              </div>
            </div>
          </div>

          {/* Options Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Without Apparent Temperature</h4>
                <CurrentConditionsCard
                  conditions={displayConditions}
                  location={displayLocation}
                  size="md"
                  showApparentTemp={false}
                  showHeroBackground={showHeroBackground}
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">With Custom Styling</h4>
                <CurrentConditionsCard
                  conditions={displayConditions}
                  location={displayLocation}
                  size="md"
                  className="border-primary shadow-primary/20"
                  showHeroBackground={showHeroBackground}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
