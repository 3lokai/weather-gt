'use client';

import { useState, useEffect } from 'react';
import { CompareGrid, type ComparisonLocation } from '@/components/compare';
import { InlineSearch } from '@/components/search/inline-search';
import { useWeatherStore, type Location } from '@/lib/store/weather-store';
import { getWeatherForecast } from '@/lib/api/open-meteo';
import WeatherLiquidEther from '@/components/background/weather-liquid-ether';

export default function ComparePage() {
  const { units, favorites, addFavorite, removeFavorite, selectedLocation } = useWeatherStore();
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removedFromStore, setRemovedFromStore] = useState<Set<string>>(new Set());

  // Load initial locations from store (selected location + favorites)
  useEffect(() => {
    if (selectedLocations.length === 0) {
      const initialLocations: Location[] = [];
      
      // Add current selected location if available and not manually removed
      if (selectedLocation && !removedFromStore.has(selectedLocation.id)) {
        initialLocations.push(selectedLocation);
      }
      
      // Add favorites (up to 3 more to keep total at 4)
      const remainingSlots = 4 - initialLocations.length;
      if (remainingSlots > 0 && favorites.length > 0) {
        const favoriteLocations = favorites
          .filter(fav => !initialLocations.some(loc => loc.id === fav.id) && !removedFromStore.has(fav.id)) // Don't duplicate selected location or add removed ones
          .slice(0, remainingSlots);
        initialLocations.push(...favoriteLocations);
      }
      
      if (initialLocations.length > 0) {
        setSelectedLocations(initialLocations);
      }
    }
  }, [selectedLocation, favorites, selectedLocations.length, removedFromStore]);

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
    
    // Track if this location came from the store (selectedLocation or favorites)
    if (selectedLocation?.id === locationId || favorites.some(fav => fav.id === locationId)) {
      setRemovedFromStore(prev => new Set(prev).add(locationId));
    }
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
                  Search to Add Locations (Up to 4)
                </h2>
              </div>
              <InlineSearch
                placeholder="Search for a location to compare..."
                showCompareButton={false}
                onLocationSelect={handleAddLocation}
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
                  Add locations from your favorites, recent searches, or current location to compare weather conditions.
                </p>
                <div className="text-caption text-muted-foreground">
                  {!selectedLocation && favorites.length === 0 && (
                    <span>Select a location on the main page or add favorites to get started.</span>
                  )}
                  {selectedLocation && favorites.length === 0 && (
                    <span>Your current location will appear here automatically.</span>
                  )}
                  {!selectedLocation && favorites.length > 0 && (
                    <span>Your favorite locations will appear here automatically.</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}