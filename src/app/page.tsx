'use client';

import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import WeatherLiquidEther from "@/components/background/weather-liquid-ether";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import { UnitsSheetDemo } from "@/components/settings/units-sheet-demo";
import { SettingsDropdown } from "@/components/settings/settings-dropdown";
import { SearchProvider } from "@/components/search";
import { InlineSearch } from "@/components/search/inline-search";
import { CurrentConditionsCard, CurrentConditionsDemo, MetricsGridDemo, SevenDayForecastDemo, HourlyPanelChartDemo } from "@/components/weather";
import { useWeatherStore } from "@/lib/store/weather-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icon, type CommonIconName } from "@/components/icons/phosphor-icon";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // Demo weather condition - you can replace this with real weather data
  const demoWeatherCode = 0; // Clear day
  const isDay = true;
  
  // Get selected location from store
  const { selectedLocation } = useWeatherStore();
  
  // Note: Theme management now handled by next-themes ThemeProvider
  // Weather-based visual effects remain in WeatherLiquidEther component

  return (
    <SearchProvider>
    <div className="min-h-screen relative bg-background transition-colors duration-300">
      {/* Weather-themed liquid ether background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Atmospheric blur layers for depth */}
        <div className="atmospheric-blur-bg glass-layer-1"></div>
        
        {/* Fallback background for testing theme switching */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-50 glass-layer-2"></div>
        
        <WeatherLiquidEther
          weatherCode={demoWeatherCode}
          isDay={isDay}
          className="weather-liquid-ether pointer-events-auto glass-layer-3"
          mouseForce={40}
          cursorSize={150}
          resolution={0.6}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={2.5}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 bg-transparent pointer-events-none">
      {/* Top Bar - Clean minimal navigation */}
      <header className="glass-nav transition-colors duration-300 pointer-events-auto">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Simplified header with branding and controls */}
          <div className="flex items-center justify-between">
            {/* Left: Logo and Brand */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LottieWeatherIcon code={0} isDay={true} size={28} variant="fill" speed={1.5} className="sm:w-8 sm:h-8" />
              <h1 className="text-h3 sm:text-h1 font-display text-foreground">
                Weather GT
              </h1>
            </div>
            
            {/* Right: Location and Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Current Location Display */}
              {selectedLocation && (
                <div className="text-right hidden sm:block">
                  <div className="text-body-m font-medium text-foreground">
                    {selectedLocation.name}
                  </div>
                  <div className="text-body-s text-muted-foreground">
                    {[selectedLocation.admin1, selectedLocation.country].filter(Boolean).join(', ')}
                  </div>
                </div>
              )}
              <SettingsDropdown variant="icon" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 sm:py-16 pointer-events-auto">
        {/* Hero Section with Search */}
        <section className="text-center mb-16 max-w-4xl mx-auto">
          {/* Hero Headline */}
          <h2 className="text-display sm:text-temp-s font-display text-foreground mb-6 sm:mb-8">
            How&apos;s the sky looking today?
          </h2>
          
          {/* Search Interface */}
          <div className="max-w-2xl mx-auto mb-8">
            <InlineSearch placeholder="Search for a place..." />
          </div>

          {/* Subtitle */}
          <p className="text-h4 text-muted-foreground max-w-2xl mx-auto">
            {selectedLocation ? 
              `Current conditions and forecast for ${selectedLocation.name}` :
              'Get detailed weather information for any city worldwide'
            }
          </p>
        </section>

        {/* Current Conditions Card */}
        {selectedLocation && (
          <section className="mb-12 max-w-sm md:max-w-2xl mx-auto">
            <CurrentConditionsCard
              conditions={{
                temperature_2m: 22,
                apparent_temperature: 24,
                weather_code: demoWeatherCode,
                is_day: isDay
              }}
              location={selectedLocation}
              size="lg"
               className="glass-clear glass-hover"
               showHeroBackground={true}
               heroBackgroundOpacity={0.6}
             />
          </section>
        )}

        {/* Current Conditions Demo */}
        <section className="mb-12">
          <CurrentConditionsDemo />
        </section>

        {/* Metrics Grid Demo */}
        <section className="mb-12">
          <MetricsGridDemo />
        </section>

        {/* Weather Icons Test Section */}
        <section className="mb-12">
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="text-h2 font-display">Weather Icons Test</CardTitle>
              <CardDescription>
                Showcasing animated weather icons with different conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card className="text-center glass-hover glass-subtle">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={0} isDay={true} size={48} variant="fill" />
                    <p className="text-caption text-muted-foreground mt-2">Clear Day</p>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-subtle">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={0} isDay={false} size={48} variant="fill" />
                    <p className="text-caption text-muted-foreground mt-2">Clear Night</p>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-rain">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={61} isDay={true} size={48} variant="fill" />
                    <p className="text-caption text-muted-foreground mt-2">Rain</p>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-snow">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={71} isDay={true} size={48} variant="fill" />
                    <p className="text-caption text-muted-foreground mt-2">Snow</p>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-storm">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={95} isDay={true} size={48} variant="fill" />
                    <p className="text-caption text-muted-foreground mt-2">Thunderstorm</p>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-subtle">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={45} isDay={true} size={48} variant="fill" />
                    <p className="text-caption text-muted-foreground mt-2">Fog</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Theme Toggle Demo Section */}
        <section className="mb-12">
          <Card className="max-w-md mx-auto glass-float glass-hover">
            <CardHeader className="text-center">
              <CardTitle className="text-h2 font-display">Theme Toggle Demo</CardTitle>
              <CardDescription>
                Interactive theme switching demonstration
              </CardDescription>
            </CardHeader>
             <CardContent>
               <div className="text-center space-y-4">
                 <ThemeToggle />
                 <p className="text-body-s text-muted-foreground">
                   Click to toggle: Light ↔ Dark
                 </p>
               </div>
             </CardContent>
          </Card>
        </section>

        {/* Animation Speed Test Section */}
        <section className="mb-12">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-h2 font-display">Animation Speed Test</CardTitle>
              <CardDescription>
                Demonstrating different animation speeds for weather icons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center glass-hover glass-rain">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={61} isDay={true} size={64} variant="fill" speed={0.5} />
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-body-m text-card-foreground">Slow</p>
                        <Badge variant="outline">0.5x</Badge>
                      </div>
                      <p className="text-caption text-muted-foreground">Gentle rain animation</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-rain">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={61} isDay={true} size={64} variant="fill" speed={1} />
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-body-m text-card-foreground">Normal</p>
                        <Badge variant="secondary">1x</Badge>
                      </div>
                      <p className="text-caption text-muted-foreground">Standard rain animation</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="text-center glass-hover glass-rain">
                  <CardContent className="pt-6">
                    <LottieWeatherIcon code={61} isDay={true} size={64} variant="fill" speed={2} />
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-body-m text-card-foreground">Fast</p>
                        <Badge variant="destructive">2x</Badge>
                      </div>
                      <p className="text-caption text-muted-foreground">Heavy rain animation</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Weather Metrics Section */}
        <section className="mb-12">
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="text-h2 font-display">Weather Metrics</CardTitle>
              <CardDescription>
                Key weather measurements and atmospheric conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Temperature', value: '--°', unit: 'C', icon: 'Thermometer' as CommonIconName },
                  { label: 'Humidity', value: '--%', unit: 'RH', icon: 'Drop' as CommonIconName },
                  { label: 'Wind Speed', value: '--', unit: 'km/h', icon: 'Wind' as CommonIconName },
                  { label: 'Pressure', value: '--', unit: 'hPa', icon: 'Gauge' as CommonIconName },
                  { label: 'Visibility', value: '--', unit: 'km', icon: 'Eye' as CommonIconName },
                  { label: 'UV Index', value: '--', unit: 'UVI', icon: 'Sun' as CommonIconName }
                ].map((metric, i) => (
                  <Card key={i} className="glass-hover glass-subtle">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name={metric.icon} size={20} color="muted" />
                          <div>
                            <p className="text-caption text-muted-foreground">{metric.label}</p>
                            <p className="text-body-m text-card-foreground font-semibold">{metric.value}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{metric.unit}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7-Day Forecast Rail Demo */}
        <section className="mb-12">
          <SevenDayForecastDemo />
        </section>

        {/* Hourly Panel Chart Demo */}
        <section className="mb-12">
          <HourlyPanelChartDemo />
        </section>

        {/* Units Sheet Demo */}
        <section className="mb-12">
          <UnitsSheetDemo />
        </section>


      </main>
      </div>
    </div>
    </SearchProvider>
  );
}