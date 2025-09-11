'use client';

import { useState, useMemo } from 'react';
import { HourlyPanelChart } from './hourly-panel-chart';
import { type HourlyWeather } from '@/lib/api/open-meteo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/phosphor-icon';

// Demo data generator
function generateDemoHourlyData(): HourlyWeather {
  const now = new Date();
  const time: string[] = [];
  const temperature_2m: number[] = [];
  const precipitation: number[] = [];
  const precipitation_probability: number[] = [];
  const wind_speed_10m: number[] = [];
  const wind_gusts_10m: number[] = [];
  const uv_index: number[] = [];
  const visibility: number[] = [];
  const cloud_cover: number[] = [];
  const dew_point_2m: number[] = [];
  const surface_pressure: number[] = [];
  const weather_code: number[] = [];

  // Generate 7 days of hourly data (168 hours)
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(now);
      date.setDate(now.getDate() + day);
      date.setHours(hour, 0, 0, 0);
      
      time.push(date.toISOString());
      
      // Temperature follows a daily pattern with some randomness
      const baseTemp = 15 + Math.sin((hour - 6) * Math.PI / 12) * 8;
      const randomVariation = (Math.random() - 0.5) * 4;
      temperature_2m.push(Math.round((baseTemp + randomVariation) * 10) / 10);
      
      // Precipitation is more likely in afternoon/evening
      const precipChance = hour > 12 && hour < 20 ? Math.random() * 0.3 : Math.random() * 0.1;
      const precipAmount = Math.random() < precipChance ? Math.random() * 5 : 0;
      precipitation.push(precipAmount);
      precipitation_probability.push(Math.round(precipChance * 100));
      
      // Other metrics with realistic ranges
      wind_speed_10m.push(Math.round((Math.random() * 15 + 2) * 10) / 10);
      wind_gusts_10m.push(Math.round((Math.random() * 10 + 5) * 10) / 10);
      uv_index.push(Math.round(Math.max(0, Math.sin((hour - 6) * Math.PI / 12) * 8 + Math.random() * 2)));
      visibility.push(Math.round((Math.random() * 5 + 8) * 10) / 10);
      const cloudCover = Math.round(Math.random() * 100);
      cloud_cover.push(cloudCover);
      dew_point_2m.push(Math.round((baseTemp - Math.random() * 5) * 10) / 10);
      surface_pressure.push(Math.round((1013 + (Math.random() - 0.5) * 20) * 10) / 10);
      
      // Weather code based on conditions
      let weatherCode = 0; // Clear sky
      if (precipAmount > 0) {
        weatherCode = precipAmount > 2 ? 61 : 51; // Rain or drizzle
      } else if (cloudCover > 80) {
        weatherCode = 3; // Overcast
      } else if (cloudCover > 50) {
        weatherCode = 2; // Partly cloudy
      }
      weather_code.push(weatherCode);
    }
  }

  return {
    time,
    temperature_2m,
    precipitation,
    precipitation_probability,
    wind_speed_10m,
    wind_gusts_10m,
    uv_index,
    visibility,
    cloud_cover,
    dew_point_2m,
    surface_pressure,
    weather_code,
  };
}

export function HourlyPanelChartDemo() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  
  const demoData = useMemo(() => generateDemoHourlyData(), []);
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="ChartLine" size={24} color="accent" />
          <h2 className="text-xl font-semibold">Hourly Panel Chart Demo</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Interactive hourly forecast with temperature line chart and precipitation bars. 
          Features comfort bands, hover tooltips, and keyboard navigation.
        </p>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Day:</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <Button
                  key={day}
                  variant={selectedDayIndex === day ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDayIndex(day)}
                >
                  {day === 0 ? 'Today' : `Day ${day + 1}`}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View:</span>
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'chart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('chart')}
              >
                Chart
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Units:</span>
            <div className="flex gap-1">
              <Button
                variant={temperatureUnit === 'celsius' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTemperatureUnit('celsius')}
              >
                °C
              </Button>
              <Button
                variant={temperatureUnit === 'fahrenheit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTemperatureUnit('fahrenheit')}
              >
                °F
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time:</span>
            <div className="flex gap-1">
              <Button
                variant={timeFormat === '12h' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFormat('12h')}
              >
                12h
              </Button>
              <Button
                variant={timeFormat === '24h' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFormat('24h')}
              >
                24h
              </Button>
            </div>
          </div>
        </div>
        
        {/* Component */}
        <HourlyPanelChart
          hourlyData={demoData}
          selectedDayIndex={selectedDayIndex}
          temperatureUnit={temperatureUnit}
          timeFormat={timeFormat}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </Card>
      
      {/* Features showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="ChartLine" size={16} color="accent" />
            Chart Features
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Temperature line with interactive dots</li>
            <li>• Precipitation bars with probability</li>
            <li>• Comfort bands (cold/pleasant/hot)</li>
            <li>• Hover tooltips with detailed info</li>
            <li>• Keyboard navigation support</li>
          </ul>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="List" size={16} color="accent" />
            List Features
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Weather icons for each hour</li>
            <li>• Temperature with comfort indicators</li>
            <li>• Precipitation amounts and probability</li>
            <li>• Click to select active hour</li>
            <li>• Accessible button interactions</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
