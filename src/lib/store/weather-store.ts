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

export interface ThemeColors {
  accent: string;
  accent100: string;
  accent500: string;
  primary: string;
  primary100: string;
  primary200: string;
  primary600: string;
  secondary: string;
  secondary600: string;
  gray500: string;
  gray800: string;
  muted: string;
  subtle: string;
}

export interface WeatherState {
  // Core state
  selectedLocation: Location | null;
  selectedDayIndex: number;
  favorites: Location[];
  
  // Settings
  units: Units;
  themeMode: 'light' | 'dark' | 'auto';
  previousThemeMode: 'light' | 'dark' | null; // Track previous mode for auto cycling
  
  // Theme colors (computed from CSS variables)
  themeColors: ThemeColors | null;
  
  // Actions
  setSelectedLocation: (location: Location | null) => void;
  setSelectedDayIndex: (index: number) => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (locationId: string) => void;
  setUnits: (units: Partial<Units>) => void;
  setThemeMode: (mode: 'light' | 'dark' | 'auto') => void;
  setThemeColors: (colors: ThemeColors) => void;
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
      themeMode: 'auto',
      previousThemeMode: null,
      themeColors: null,

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
      
      setThemeMode: (mode) => {
        const { themeMode } = get();
        set({ 
          themeMode: mode,
          previousThemeMode: themeMode !== 'auto' ? themeMode : get().previousThemeMode
        });
      },
      
      setThemeColors: (colors) => set({ themeColors: colors }),
    }),
    {
      name: 'weather-store',
      partialize: (state) => ({
        favorites: state.favorites,
        units: state.units,
        themeMode: state.themeMode,
        previousThemeMode: state.previousThemeMode,
        selectedLocation: state.selectedLocation,
      }),
    }
  )
);
