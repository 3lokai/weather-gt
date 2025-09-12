'use client';

import WeatherLiquidEther from "@/components/background/weather-liquid-ether";
import { SearchProvider } from "@/components/search";
import { InlineSearch } from "@/components/search/inline-search";
import { GeolocationProvider } from "@/components/geolocation";
import { 
  RealWeatherConditions, 
  MetricsGrid, 
  SevenDayForecastRail, 
  HourlyPanelChart,
  AirQualityPanel,
  PollenPanel,
  WeatherDataProvider
} from "@/components/weather";
import { useWeatherStore } from "@/lib/store/weather-store";
import { useAirQuality } from "@/hooks/use-air-quality";
import { usePollen } from "@/hooks/use-pollen";
import { URLStateProvider } from "@/components/providers/url-state-provider";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function AppPage() {
  // Get selected location from store
  const { selectedLocation } = useWeatherStore();
  
  // Fetch air quality and pollen data
  const { airQuality, isLoading: airQualityLoading, error: airQualityError } = useAirQuality();
  const { pollen, isLoading: pollenLoading, error: pollenError } = usePollen();

  return (
    <SearchProvider>
    <GeolocationProvider>
    <div className="min-h-screen relative bg-background transition-colors duration-300">
      {/* Weather-themed liquid ether background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Atmospheric blur layers for depth */}
        <div className="atmospheric-blur-bg glass-layer-1"></div>
        
        {/* Fallback background for testing theme switching */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-50 glass-layer-2"></div>
        
        <WeatherLiquidEther
          weatherCode={0}
          isDay={true}
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

        {/* Main Content - Responsive Layout */}
        <main className="container mx-auto px-4 pt-20 pb-8 sm:pb-12 pointer-events-auto">
          {/* Hero Section with Search */}
          <section className="text-center mb-12 max-w-4xl mx-auto">
            {/* Hero Headline */}
            <h2 className="text-display sm:text-temp-s font-display text-foreground mb-8 sm:mb-10">
              How&apos;s the <SparklesText>sky</SparklesText> looking today?
            </h2>
            
            {/* Search Interface */}
            <div className="max-w-2xl mx-auto mb-12">
              <InlineSearch placeholder="Search for a place..." />
            </div>
          </section>

          {/* Weather Data Provider - Only renders content when location is selected */}
          <WeatherDataProvider>
            {({ weather, isLoading, isError, error, selectedDayIndex }) => (
              <URLStateProvider weather={weather}>
                {/* Weather Content - Responsive Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
                  {/* Main Content Area - Left Column (Desktop) / Full Width (Mobile) */}
                  <div className="lg:col-span-2 space-y-8 lg:space-y-10">
                    {/* Current Weather Card */}
                    <section>
                      <RealWeatherConditions 
                        weather={weather}
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        selectedDayIndex={selectedDayIndex}
                      />
                    </section>
                    {/* Metrics Grid */}
                    <section>
                      <MetricsGrid 
                        weather={weather?.current} 
                        hourlyWeather={weather?.hourly}
                        isLoading={isLoading}
                        error={error}
                        size="lg"
                        selectedDayIndex={selectedDayIndex}
                        dailyWeather={weather?.daily}
                      />
                    </section>

                     {/* Daily Forecast */}
                     <section className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h2 className="text-h3 font-semibold text-foreground">
                           Daily Forecast
                         </h2>
                       </div>
                       <SevenDayForecastRail 
                         dailyData={weather?.daily ? weather.daily.time.map((time: string, index: number) => ({
                           time,
                           weather_code: weather.daily.weather_code[index],
                           temperature_2m_max: weather.daily.temperature_2m_max[index],
                           temperature_2m_min: weather.daily.temperature_2m_min[index],
                           precipitation_probability_max: weather.daily.precipitation_probability_max[index],
                           is_day: true // Daily forecasts are typically shown as day conditions
                         })) : []}
                       />
                     </section>

                     {/* Air Quality Index */}
                     <section className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h2 className="text-h3 font-semibold text-foreground">
                           Air Quality
                         </h2>
                       </div>
                       <AirQualityPanel 
                         airQuality={airQuality || null}
                         isLoading={airQualityLoading}
                         error={airQualityError}
                         size="sm"
                         layout="grid"
                       />
                     </section>

                     {/* Pollen Information */}
                     <section className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h2 className="text-h3 font-semibold text-foreground">
                           Pollen Count
                         </h2>
                       </div>
                       <PollenPanel 
                         pollen={pollen || null}
                         isLoading={pollenLoading}
                         error={pollenError}
                         size="sm"
                         layout="grid"
                       />
                     </section>
                  </div>

                  {/* Hourly Forecast Sidebar - Right Column (Desktop) / Full Width (Mobile) */}
                  <div className="lg:col-span-1 lg:flex lg:flex-col">
                    <section className="lg:sticky lg:top-8 lg:flex-1 lg:flex lg:flex-col lg:max-h-[600px] space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-h3 font-semibold text-foreground">
                          Hourly Forecast
                        </h2>
                      </div>
                      {weather?.hourly && (
                        <div className="lg:h-full lg:flex lg:flex-col">
                          <HourlyPanelChart 
                            hourlyData={weather.hourly}
                            selectedDayIndex={selectedDayIndex}
                            temperatureUnit="celsius"
                            timeFormat="12h"
                            viewMode="list"
                            currentTime={new Date()}
                            className="lg:flex-1 lg:max-h-[900px]"
                          />
                        </div>
                      )}
                    </section>
                  </div>
                </div>
              </URLStateProvider>
            )}
          </WeatherDataProvider>
        </main>
      </div>
    </div>
    </GeolocationProvider>
    </SearchProvider>
  );
}
