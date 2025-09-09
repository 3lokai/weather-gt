import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  timeFormat: '12h' | '24h';
}

// ThemeColors interface removed - themes now managed by next-themes

export interface WeatherState {
  // Core state
  selectedLocation: Location | null;
  selectedDayIndex: number;
  favorites: Location[];
  
  // Settings
  units: Units;
  
  // Actions
  setSelectedLocation: (location: Location | null) => void;
  setSelectedDayIndex: (index: number) => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (locationId: string) => void;
  setUnits: (units: Partial<Units>) => void;
}

const defaultUnits: Units = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  precipitation: 'mm',
  timeFormat: '12h',
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedLocation: null,
      selectedDayIndex: 0,
      favorites: [],
      units: defaultUnits,

      // Actions
      setSelectedLocation: (location) => set({ selectedLocation: location }),
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
      },
    }),
    {
      name: 'weather-store',
      partialize: (state) => ({
        favorites: state.favorites,
        units: state.units,
        selectedLocation: state.selectedLocation,
      }),
    }
  )
);
