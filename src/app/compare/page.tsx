'use client';

import { useState, useEffect } from 'react';
import { CompareGrid, type ComparisonLocation } from '@/components/compare';
import { InlineSearch } from '@/components/search/inline-search';
import { useWeatherStore, type Location } from '@/lib/store/weather-store';
import { getWeatherForecast } from '@/lib/api/open-meteo';
import WeatherLiquidEther from '@/components/background/weather-liquid-ether';

export default function ComparePage() {
  const { units, favorites, addFavorite, removeFavorite } = useWeatherStore();
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial locations from favorites (up to 4)
  useEffect(() => {
    if (favorites.length > 0 && selectedLocations.length === 0) {
      const initialLocations = favorites.slice(0, 4);
      setSelectedLocations(initialLocations);
    }
  }, [favorites, selectedLocations.length]);

  // Fetch weather data for selected locations
  useEffect(() => {
    if (selectedLocations.length === 0) {
      setComparisonData([]);
      return;
    }

    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const promises = selectedLocations.map(async (location) => {
          try {
            const weather = await getWeatherForecast(
              location.latitude,
              location.longitude,
              units
            );
            return {
              location,
              currentWeather: weather.current,
              dailyWeather: weather.daily,
              isLoading: false,
              error: null,
            };
          } catch (error) {
            return {
              location,
              currentWeather: null,
              dailyWeather: null,
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to fetch weather data',
            };
          }
        });

        const results = await Promise.all(promises);
        setComparisonData(results);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedLocations, units]);

  const handleAddLocation = (location: Location) => {
    if (selectedLocations.length >= 4) {
      return; // Maximum 4 locations
    }
    
    // Check if location is already selected
    if (selectedLocations.some(loc => loc.id === location.id)) {
      return;
    }
    
    setSelectedLocations(prev => [...prev, location]);
  };

  const handleRemoveLocation = (locationId: string) => {
    setSelectedLocations(prev => prev.filter(loc => loc.id !== locationId));
  };

  const handleAddToFavorites = (location: Location) => {
    addFavorite(location);
  };

  const handleRemoveFromFavorites = (locationId: string) => {
    removeFavorite(locationId);
  };

  return (
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
        <div className="container mx-auto px-4 pt-20 pb-8 pointer-events-auto">
          {/* Hero Section with Centered Heading */}
          <section className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-display font-display text-foreground mb-8">
              Weather Comparison
            </h1>
            <p className="text-body-md text-muted-foreground mb-12">
              Compare weather conditions across multiple locations to make informed decisions.
            </p>
          </section>

          <div className="space-y-12">
            {/* Location Search */}
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-h3 font-semibold text-foreground mb-3">
                  Search to Add Locations
                </h2>
              </div>
              <InlineSearch
                placeholder="Search for a location to compare..."
                showCompareButton={true}
                onCompareLocation={handleAddLocation}
              />
            </div>

            {/* Comparison Grid */}
            {selectedLocations.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-h3 font-semibold text-foreground">
                    Which one do you prefer?
                  </h2>
                </div>
                <CompareGrid
                  locations={comparisonData}
                  onRemoveLocation={handleRemoveLocation}
                  onAddToFavorites={handleAddToFavorites}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                />
              </div>
            )}

            {/* Empty State */}
            {selectedLocations.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-6" aria-hidden="true">🌍</div>
                <h2 className="text-h2 font-semibold text-foreground mb-4">
                  Start Comparing Weather
                </h2>
                <p className="text-body-md text-muted-foreground mb-8">
                  Add locations from your favorites or recent searches to compare weather conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}