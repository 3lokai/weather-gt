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
  precipitation: 'mm' | 'inch';
  pressure: 'hPa' | 'inHg';
  timeFormat: '12h' | '24h';
}

// ThemeColors interface removed - themes now managed by next-themes

export interface WeatherState {
  // Core state
  selectedLocation: Location | null;
  selectedDayIndex: number;
  favorites: Location[];
  
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
      airQualityData: null,
      pollenData: null,
      units: defaultUnits,
      onUnitsChange: undefined,
      onLocationChange: undefined,

      // Actions
      setSelectedLocation: (location) => {
        set({ selectedLocation: location });
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
        units: state.units,
        selectedLocation: state.selectedLocation,
      }),
      migrate: (persistedState: any, version: number) => {
        // Migration for precipitation unit fix (E4-00 hotfix)
        if (persistedState?.units?.precipitation === 'in') {
          persistedState.units.precipitation = 'inch';
        }
        return persistedState;
      },
      version: 1,
    }
  )
);
