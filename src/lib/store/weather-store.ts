import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AirQualityData } from '@/lib/types/air-quality';
import { PollenData } from '@/lib/types/pollen';

export interface Location {
  id: string;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface Units {
  temperature: 'celsius' | 'fahrenheit';
  windSpeed: 'kmh' | 'mph';
  precipitation: 'mm' | 'in';
  pressure: 'hPa' | 'inHg';
  timeFormat: '12h' | '24h';
}

// ThemeColors interface removed - themes now managed by next-themes

export interface RecentSearch {
  id: string;
  location: Location;
  timestamp: number;
}

export interface WeatherState {
  // Core state
  selectedLocation: Location | null;
  selectedDayIndex: number;
  favorites: Location[];
  recentSearches: RecentSearch[];
  
  // Air quality data
  airQualityData: AirQualityData | null;
  
  // Pollen data
  pollenData: PollenData | null;
  
  // Settings
  units: Units;
  
  // Actions
  setSelectedLocation: (location: Location | null) => void;
  setSelectedDayIndex: (index: number) => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (locationId: string) => void;
  reorderFavorites: (fromIndex: number, toIndex: number) => void;
  addRecentSearch: (location: Location) => void;
  clearRecentSearches: () => void;
  setUnits: (units: Partial<Units>) => void;
  setAirQualityData: (data: AirQualityData | null) => void;
  setPollenData: (data: PollenData | null) => void;
  
  // Cache invalidation callbacks
  onUnitsChange?: () => void;
  onLocationChange?: () => void;
  setOnUnitsChange: (callback: (() => void) | undefined) => void;
  setOnLocationChange: (callback: (() => void) | undefined) => void;
}

const defaultUnits: Units = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  precipitation: 'mm',
  pressure: 'hPa',
  timeFormat: '12h',
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedLocation: null,
      selectedDayIndex: 0,
      favorites: [],
      recentSearches: [],
      airQualityData: null,
      pollenData: null,
      units: defaultUnits,
      onUnitsChange: undefined,
      onLocationChange: undefined,

      // Actions
      setSelectedLocation: (location) => {
        set({ selectedLocation: location });
        // Add to recent searches when location changes
        if (location) {
          const { addRecentSearch } = get();
          addRecentSearch(location);
        }
        // Trigger cache invalidation callback
        const { onLocationChange } = get();
        onLocationChange?.();
      },
      setSelectedDayIndex: (index) => set({ selectedDayIndex: index }),
      
      addFavorite: (location) => {
        const { favorites } = get();
        if (!favorites.find(fav => fav.id === location.id)) {
          set({ favorites: [...favorites, location] });
        }
      },
      
      removeFavorite: (locationId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.id !== locationId) });
      },

      reorderFavorites: (fromIndex, toIndex) => {
        const { favorites } = get();
        const newFavorites = [...favorites];
        const [movedItem] = newFavorites.splice(fromIndex, 1);
        newFavorites.splice(toIndex, 0, movedItem);
        set({ favorites: newFavorites });
      },

      addRecentSearch: (location) => {
        const { recentSearches } = get();
        const now = Date.now();
        const newSearch: RecentSearch = {
          id: `${location.id}-${now}`,
          location,
          timestamp: now
        };
        
        // Remove existing entry for this location and add new one at the beginning
        const filteredSearches = recentSearches.filter(search => search.location.id !== location.id);
        const updatedSearches = [newSearch, ...filteredSearches].slice(0, 10); // Keep only last 10
        
        set({ recentSearches: updatedSearches });
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
      
      setUnits: (newUnits) => {
        const { units } = get();
        set({ units: { ...units, ...newUnits } });
        // Trigger cache invalidation callback
        const { onUnitsChange } = get();
        onUnitsChange?.();
      },
      
      setAirQualityData: (data) => set({ airQualityData: data }),
      setPollenData: (data) => set({ pollenData: data }),
      
      // Cache invalidation callbacks
      setOnUnitsChange: (callback) => set({ onUnitsChange: callback }),
      setOnLocationChange: (callback) => set({ onLocationChange: callback }),
    }),
    {
      name: 'weather-store',
      partialize: (state) => ({
        favorites: state.favorites,
        recentSearches: state.recentSearches,
        units: state.units,
        selectedLocation: state.selectedLocation,
      }),
      migrate: (persistedState: any, version: number) => {
        // Migration for precipitation unit fix (E4-00 hotfix)
        if (persistedState?.units?.precipitation === 'in') {
          persistedState.units.precipitation = 'inch';
        }
        // Migration for E4-02: Add recentSearches if not present
        if (version < 2 && !persistedState?.recentSearches) {
          persistedState.recentSearches = [];
        }
        return persistedState;
      },
      version: 2,
    }
  )
);
