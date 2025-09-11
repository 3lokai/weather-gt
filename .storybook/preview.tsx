import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import '../src/app/globals.css';
import { ThemeProvider } from '../src/lib/providers/theme-provider';
import { useWeatherStore } from '../src/lib/store/weather-store';

// Ensure CSS variables are available in Storybook
import './storybook.css';

// Ensure a sane default store state per story render
function resetWeatherStore() {
  // Mirror defaults in src/lib/store/weather-store.ts
  useWeatherStore.setState({
    selectedLocation: null,
    selectedDayIndex: 0,
    favorites: [],
    units: {
      temperature: 'celsius',
      windSpeed: 'kmh',
      precipitation: 'mm',
      pressure: 'hPa',
      timeFormat: '12h',
    },
  });
}

// Mock QueryClient for stories
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

// Global decorator for all stories
const withProviders = (Story: React.ComponentType, context: any) => {
  // Reset store to defaults so stories are isolated
  resetWeatherStore();

  // Apply theme classes based on global toolbar controls
  const theme = context.globals?.theme || 'system';
  const conditionTheme = context.globals?.conditionTheme;
  
  // Apply theme classes immediately
  const root = document.documentElement;
  
  // Apply dark mode
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // System theme - use media query
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
  
  // Apply condition theme
  if (conditionTheme) {
    root.classList.add(`theme--${conditionTheme}`);
  } else {
    // Remove all condition theme classes
    root.classList.remove('theme--rain', 'theme--cloudy', 'theme--snow', 'theme--thunder');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Story />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'rain',
          value: '#1e293b',
        },
        {
          name: 'cloudy',
          value: '#64748b',
        },
        {
          name: 'snow',
          value: '#f1f5f9',
        },
        {
          name: 'thunder',
          value: '#0f172a',
        },
      ],
    },
    // Keep docs/controls stable and story ordering consistent
    options: {
      storySort: {
        order: ['Foundations', ['Colors', 'Typography', 'Spacing', 'Playground', 'Guidelines'], 'Components'],
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  decorators: [withProviders],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'computer' },
        ],
        dynamicTitle: true,
      },
    },
    conditionTheme: {
      description: 'Weather condition theme',
      defaultValue: null,
      toolbar: {
        title: 'Condition',
        icon: 'cloud',
        items: [
          { value: null, title: 'None', icon: 'circlehollow' },
          { value: 'rain', title: 'Rain', icon: 'cloudrain' },
          { value: 'cloudy', title: 'Cloudy', icon: 'cloud' },
          { value: 'snow', title: 'Snow', icon: 'snowflake' },
          { value: 'thunder', title: 'Thunder', icon: 'lightning' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
