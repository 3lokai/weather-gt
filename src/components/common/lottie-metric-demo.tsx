'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  LottieTemperature,
  LottieWindSpeed,
  LottiePrecipitation,
  LottiePressure,
  LottieHumidity,
  LottieUVIndex,
  LottiePollen,
  LottieAirQuality
} from './lottie-metric';

export function LottieMetricDemo() {
  const [showLottie, setShowLottie] = useState(true);
  const [temperature, setTemperature] = useState(22);
  const [windSpeed, setWindSpeed] = useState(15);
  const [precipitation, setPrecipitation] = useState(5.2);
  const [pressure, setPressure] = useState(1013);
  const [humidity, setHumidity] = useState(65);
  const [uvIndex, setUVIndex] = useState(6);
  const [pollen, setPollen] = useState(3);
  const [airQuality, setAirQuality] = useState(45);

  const randomizeValues = () => {
    setTemperature(Math.floor(Math.random() * 40) - 5); // -5 to 35°C
    setWindSpeed(Math.floor(Math.random() * 50)); // 0-50 km/h
    setPrecipitation(Math.random() * 20); // 0-20 mm
    setPressure(980 + Math.random() * 60); // 980-1040 hPa
    setHumidity(Math.floor(Math.random() * 100)); // 0-100%
    setUVIndex(Math.floor(Math.random() * 11) + 1); // 1-11
    setPollen(Math.floor(Math.random() * 5)); // 0-4
    setAirQuality(Math.floor(Math.random() * 200)); // 0-200
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Lottie Metric Components Demo</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-lottie"
              checked={showLottie}
              onCheckedChange={setShowLottie}
            />
            <Label htmlFor="show-lottie">Show Lottie Animations</Label>
          </div>
          <Button onClick={randomizeValues} variant="outline">
            Randomize Values
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Temperature Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Temperature</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Cold Temperature</Label>
                <LottieTemperature
                  value={-5}
                  unit="celsius"
                  showLottie={showLottie}
                  className="text-2xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label>Moderate Temperature</Label>
                <LottieTemperature
                  value={temperature}
                  unit="celsius"
                  showLottie={showLottie}
                  className="text-2xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label>Hot Temperature</Label>
                <LottieTemperature
                  value={35}
                  unit="celsius"
                  showLottie={showLottie}
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </div>

          {/* Wind Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Wind Speed</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Light Wind</Label>
                <LottieWindSpeed
                  value={5}
                  unit="kmh"
                  showLottie={showLottie}
                  className="text-xl font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label>Moderate Wind</Label>
                <LottieWindSpeed
                  value={windSpeed}
                  unit="kmh"
                  showLottie={showLottie}
                  className="text-xl font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label>Strong Wind</Label>
                <LottieWindSpeed
                  value={45}
                  unit="kmh"
                  showLottie={showLottie}
                  className="text-xl font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Precipitation Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Precipitation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Light Rain</Label>
                <LottiePrecipitation
                  value={2.1}
                  unit="mm"
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Moderate Rain</Label>
                <LottiePrecipitation
                  value={precipitation}
                  unit="mm"
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Heavy Rain</Label>
                <LottiePrecipitation
                  value={15.8}
                  unit="mm"
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
            </div>
          </div>

          {/* Pressure Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pressure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Low Pressure</Label>
                <LottiePressure
                  value={990}
                  unit="hPa"
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Normal Pressure</Label>
                <LottiePressure
                  value={pressure}
                  unit="hPa"
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>High Pressure</Label>
                <LottiePressure
                  value={1030}
                  unit="hPa"
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
            </div>
          </div>

          {/* Other Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Other Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Humidity</Label>
                <LottieHumidity
                  value={humidity}
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>UV Index</Label>
                <LottieUVIndex
                  value={uvIndex}
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Pollen</Label>
                <LottiePollen
                  value={pollen}
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Air Quality</Label>
                <LottieAirQuality
                  value={airQuality}
                  showLottie={showLottie}
                  className="text-lg font-medium"
                />
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Usage Examples</h3>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
{`// Basic usage
<LottieTemperature value={22} unit="celsius" />

// With custom styling
<LottieWindSpeed 
  value={15} 
  unit="kmh" 
  className="text-2xl font-bold"
  lottieSize={32}
/>

// Without Lottie animation (fallback to text only)
<LottiePrecipitation 
  value={5.2} 
  unit="mm" 
  showLottie={false}
/>

// Custom animation speed
<LottiePressure 
  value={1013} 
  unit="hPa" 
  lottieSpeed={0.5}
/>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
