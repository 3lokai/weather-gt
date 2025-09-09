'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SettingsDropdown } from './settings-dropdown';
import { useWeatherStore } from '@/lib/store/weather-store';
import { AnimatedTemperature, AnimatedWindSpeed, AnimatedPrecipitation, AnimatedPressure } from '@/components/common/animated-number';

export function UnitsSheetDemo() {
  const { units } = useWeatherStore();

  // Demo data
  const demoData = {
    temperature: 22,
    windSpeed: 15,
    precipitation: 2.5,
    pressure: 1013.25,
    humidity: 65
  };

  const isMetric = units.temperature === 'celsius' && 
                   units.windSpeed === 'kmh' && 
                   units.precipitation === 'mm' && 
                   units.pressure === 'hPa';

  return (
    <div className="space-y-6">
      {/* Units Settings Demo */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="text-h2 font-display">Units Settings Dropdown</CardTitle>
          <CardDescription>
            Click the settings button to open the dropdown with toggles for time format and units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <SettingsDropdown variant="button" size="lg" />
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="text-h2 font-display">Live Preview</CardTitle>
          <CardDescription>
            See how values change when you modify the settings in the sheet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Temperature */}
            <Card className="glass-hover glass-subtle">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl" aria-hidden="true">🌡️</div>
                  <div className="text-3xl font-bold text-foreground">
                    <AnimatedTemperature
                      value={demoData.temperature}
                      unit={units.temperature}
                      duration={180}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
              </CardContent>
            </Card>

            {/* Wind Speed */}
            <Card className="glass-hover glass-subtle">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl" aria-hidden="true">💨</div>
                  <div className="text-3xl font-bold text-foreground">
                    <AnimatedWindSpeed
                      value={demoData.windSpeed}
                      unit={units.windSpeed}
                      duration={180}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">Wind Speed</div>
                </div>
              </CardContent>
            </Card>

            {/* Precipitation */}
            <Card className="glass-hover glass-subtle">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl" aria-hidden="true">🌧️</div>
                  <div className="text-3xl font-bold text-foreground">
                    <AnimatedPrecipitation
                      value={demoData.precipitation}
                      unit={units.precipitation}
                      duration={180}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">Precipitation</div>
                </div>
              </CardContent>
            </Card>

            {/* Pressure */}
            <Card className="glass-hover glass-subtle">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl" aria-hidden="true">📊</div>
                  <div className="text-3xl font-bold text-foreground">
                    <AnimatedPressure
                      value={demoData.pressure}
                      unit={units.pressure}
                      duration={180}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">Pressure</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Display */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="text-h2 font-display">Current Settings</CardTitle>
          <CardDescription>
            Current unit preferences and system status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">System Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>System:</span>
                  <span className="font-medium">{isMetric ? 'Metric' : 'Imperial'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Format:</span>
                  <span className="font-medium">{units.timeFormat === '24h' ? '24-hour' : '12-hour'}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Unit Details</h4>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(units, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
