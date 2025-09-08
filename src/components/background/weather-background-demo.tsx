'use client';

import React, { useState } from 'react';
import WeatherLiquidEther from './weather-liquid-ether';
import { useWeatherTheme } from '@/hooks/use-weather-theme';

// Demo weather conditions
const demoConditions = [
  { code: 0, name: 'Clear Day', isDay: true },
  { code: 0, name: 'Clear Night', isDay: false },
  { code: 61, name: 'Rain', isDay: true },
  { code: 71, name: 'Snow', isDay: true },
  { code: 3, name: 'Cloudy', isDay: true },
  { code: 45, name: 'Fog', isDay: true },
  { code: 95, name: 'Thunderstorm', isDay: true },
];

export default function WeatherBackgroundDemo() {
  const [selectedCondition, setSelectedCondition] = useState(demoConditions[0]);

  // Apply weather theme to document
  useWeatherTheme({
    weatherCode: selectedCondition.code,
    isDay: selectedCondition.isDay,
    applyToDocument: true
  });

  return (
    <div className="min-h-screen relative">
      {/* Weather-themed liquid ether background */}
      <WeatherLiquidEther
        weatherCode={selectedCondition.code}
        isDay={selectedCondition.isDay}
        className="weather-liquid-ether"
        mouseForce={25}
        cursorSize={120}
        resolution={0.6}
        autoDemo={true}
        autoSpeed={0.3}
        autoIntensity={1.8}
      />

      {/* Content overlay */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display font-display text-foreground mb-8 text-center">
            Weather-Themed Liquid Ether Background
          </h1>
          
          <div className="bg-card/80 backdrop-blur-sm border border-muted/20 rounded-2xl p-8 mb-8">
            <h2 className="text-h2 font-display text-card-foreground mb-4">
              Current Theme: {selectedCondition.name}
            </h2>
            <p className="text-body-m text-muted-foreground mb-6">
              The background colors and accent colors change based on the weather condition.
              Move your mouse to interact with the liquid ether effect.
            </p>
            
            {/* Theme selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {demoConditions.map((condition) => (
                <button
                  key={`${condition.code}-${condition.isDay}`}
                  onClick={() => setSelectedCondition(condition)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedCondition.code === condition.code && selectedCondition.isDay === condition.isDay
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-card text-card-foreground border-muted hover:border-accent/50'
                  }`}
                >
                  <div className="text-caption font-medium">{condition.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/80 backdrop-blur-sm border border-muted/20 rounded-xl p-6">
              <h3 className="text-h3 font-display text-card-foreground mb-3">
                Dynamic Theming
              </h3>
              <p className="text-body-s text-muted-foreground">
                Background colors automatically change based on weather conditions using your OKLCH color system.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm border border-muted/20 rounded-xl p-6">
              <h3 className="text-h3 font-display text-card-foreground mb-3">
                Reduced Motion Support
              </h3>
              <p className="text-body-s text-muted-foreground">
                Respects user's motion preferences and disables animations when needed for accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
