import type { Meta, StoryObj } from '@storybook/react';
import { MetricsGrid } from '@/components/weather/metrics-grid';
import { mockWeatherData } from '../fixtures/weather-data';
import { CurrentWeather, HourlyWeather } from '@/lib/api/open-meteo';

const meta: Meta<typeof MetricsGrid> = {
  title: 'Components/Weather/MetricsGrid',
  component: MetricsGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Weather metrics grid displaying core weather parameters like temperature, humidity, wind, precipitation, and pressure.',
      },
    },
  },
  argTypes: {
    weather: {
      control: 'object',
      description: 'Current weather data containing all metrics',
    },
    hourlyWeather: {
      control: 'object',
      description: 'Hourly weather data for trend calculations',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for the grid',
    },
    showTooltips: {
      control: 'boolean',
      description: 'Show tooltips for metrics',
    },
    layout: {
      control: 'select',
      options: ['grid', 'list'],
      description: 'Layout variant',
    },
    showExtendedMetrics: {
      control: 'boolean',
      description: 'Show extended metrics (v2 features)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen relative bg-background transition-colors duration-300">
        {/* Weather-themed liquid ether background simulation */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="atmospheric-blur-bg glass-layer-1"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-50 glass-layer-2"></div>
          <div className="weather-liquid-ether pointer-events-auto glass-layer-3"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetricsGrid>;

// Mock weather data for different scenarios
const clearWeather: CurrentWeather = {
  temperature_2m: 28,
  apparent_temperature: 30,
  weather_code: 0,
  is_day: true,
  relative_humidity_2m: 65,
  wind_speed_10m: 12,
  wind_gusts_10m: 15,
  precipitation: 0,
  precipitation_probability: 0,
  surface_pressure: 1013,
  cloud_cover: 20,
  dew_point_2m: 18,
};

const rainWeather: CurrentWeather = {
  temperature_2m: 15,
  apparent_temperature: 13,
  weather_code: 61,
  is_day: true,
  relative_humidity_2m: 85,
  wind_speed_10m: 18,
  wind_gusts_10m: 25,
  precipitation: 2.5,
  precipitation_probability: 85,
  surface_pressure: 1005,
  cloud_cover: 90,
  dew_point_2m: 12,
};

const snowWeather: CurrentWeather = {
  temperature_2m: -2,
  apparent_temperature: -5,
  weather_code: 71,
  is_day: true,
  relative_humidity_2m: 90,
  wind_speed_10m: 15,
  wind_gusts_10m: 20,
  precipitation: 1.2,
  precipitation_probability: 60,
  surface_pressure: 1020,
  cloud_cover: 95,
  dew_point_2m: -4,
};

const thunderWeather: CurrentWeather = {
  temperature_2m: 32,
  apparent_temperature: 35,
  weather_code: 95,
  is_day: false,
  relative_humidity_2m: 75,
  wind_speed_10m: 25,
  wind_gusts_10m: 40,
  precipitation: 8.5,
  precipitation_probability: 90,
  surface_pressure: 1008,
  cloud_cover: 100,
  dew_point_2m: 26,
};

// Mock hourly weather for trend calculations
const mockHourlyWeather: HourlyWeather = {
  time: Array.from({ length: 24 }, (_, i) => new Date(Date.now() + i * 60 * 60 * 1000).toISOString()),
  temperature_2m: Array.from({ length: 24 }, (_, i) => 20 + Math.sin(i * 0.3) * 5),
  surface_pressure: Array.from({ length: 24 }, (_, i) => 1010 + Math.sin(i * 0.2) * 10),
  precipitation: Array.from({ length: 24 }, (_, i) => i > 12 ? Math.random() * 5 : 0),
  precipitation_probability: Array.from({ length: 24 }, (_, i) => i > 12 ? Math.random() * 100 : 0),
};

export const Default: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default metrics grid showing core weather metrics in grid layout.',
      },
    },
  },
};

export const ClearWeather: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid showing clear weather conditions with low precipitation probability.',
      },
    },
  },
};

export const RainWeather: Story = {
  args: {
    weather: rainWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid showing rainy weather with high precipitation probability.',
      },
    },
  },
};

export const SnowWeather: Story = {
  args: {
    weather: snowWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid showing snowy weather conditions.',
      },
    },
  },
};

export const ThunderWeather: Story = {
  args: {
    weather: thunderWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid showing thunderstorm weather with high wind gusts.',
      },
    },
  },
};

export const WithExtendedMetrics: Story = {
  args: {
    weather: rainWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid with extended metrics (v2) including wind gusts, cloud cover, and dew point.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'sm',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant of the metrics grid.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'lg',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the metrics grid.',
      },
    },
  },
};

export const ListLayout: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'list',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid in list layout instead of grid.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    weather: null,
    hourlyWeather: null,
    isLoading: true,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid showing loading state with skeleton cards.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    weather: null,
    hourlyWeather: null,
    isLoading: false,
    error: 'Failed to load weather data',
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid showing error state when data fails to load.',
      },
    },
  },
};

export const WithoutTooltips: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: false,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid without tooltips for cleaner appearance.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Mobile: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    weather: clearWeather,
    hourlyWeather: mockHourlyWeather,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
    showExtendedMetrics: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// Extended Metrics Stories (E1-07)
export const ExtendedMetricsDefault: Story = {
  args: {
    weather: {
      ...clearWeather,
      wind_gusts_10m: 25, // Higher gusts to trigger display
      cloud_cover: 75,
      dew_point_2m: 12,
      surface_pressure: 1013,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      wind_gusts_10m: Array.from({ length: 24 * 7 }, (_, i) => 20 + Math.sin(i * 0.1) * 5),
      cloud_cover: Array.from({ length: 24 * 7 }, (_, i) => 50 + Math.sin(i * 0.15) * 30),
      dew_point_2m: Array.from({ length: 24 * 7 }, (_, i) => 10 + Math.sin(i * 0.2) * 3),
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1010 + Math.sin(i * 0.1) * 8),
    },
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics grid with extended metrics enabled showing wind gusts, cloud cover, dew point, and pressure trend.',
      },
    },
  },
};

export const ExtendedMetricsWithGusts: Story = {
  args: {
    weather: {
      ...clearWeather,
      wind_speed_10m: 10,
      wind_gusts_10m: 20, // Significant difference to show gusts
      cloud_cover: 60,
      dew_point_2m: 8,
      surface_pressure: 1015,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      wind_speed_10m: Array.from({ length: 24 * 7 }, (_, i) => 8 + Math.sin(i * 0.1) * 3),
      wind_gusts_10m: Array.from({ length: 24 * 7 }, (_, i) => 15 + Math.sin(i * 0.1) * 5),
      cloud_cover: Array.from({ length: 24 * 7 }, (_, i) => 40 + Math.sin(i * 0.15) * 20),
      dew_point_2m: Array.from({ length: 24 * 7 }, (_, i) => 6 + Math.sin(i * 0.2) * 2),
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1012 + Math.sin(i * 0.1) * 6),
    },
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics with significant wind gusts (≥5 units difference from base wind speed).',
      },
    },
  },
};

export const ExtendedMetricsHighCloudCover: Story = {
  args: {
    weather: {
      ...clearWeather,
      cloud_cover: 95,
      dew_point_2m: 18,
      surface_pressure: 1008,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      cloud_cover: Array.from({ length: 24 * 7 }, (_, i) => 80 + Math.sin(i * 0.1) * 15),
      dew_point_2m: Array.from({ length: 24 * 7 }, (_, i) => 15 + Math.sin(i * 0.2) * 3),
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1005 + Math.sin(i * 0.1) * 6),
    },
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics with high cloud cover percentage and elevated dew point.',
      },
    },
  },
};

export const ExtendedMetricsPressureTrend: Story = {
  args: {
    weather: {
      ...clearWeather,
      surface_pressure: 1018,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1015 + i * 0.5), // Rising trend
    },
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics showing pressure trend with rising pressure over time.',
      },
    },
  },
};

export const ExtendedMetricsFallingPressure: Story = {
  args: {
    weather: {
      ...clearWeather,
      surface_pressure: 1005,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1020 - i * 0.3), // Falling trend
    },
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics showing pressure trend with falling pressure over time.',
      },
    },
  },
};

export const ExtendedMetricsStablePressure: Story = {
  args: {
    weather: {
      ...clearWeather,
      surface_pressure: 1013,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1013 + Math.sin(i * 0.1) * 1), // Stable trend
    },
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics showing stable pressure trend with minimal variation.',
      },
    },
  },
};

export const ExtendedMetricsListLayout: Story = {
  args: {
    weather: {
      ...clearWeather,
      wind_gusts_10m: 22,
      cloud_cover: 45,
      dew_point_2m: 14,
      surface_pressure: 1012,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      wind_gusts_10m: Array.from({ length: 24 * 7 }, (_, i) => 18 + Math.sin(i * 0.1) * 4),
      cloud_cover: Array.from({ length: 24 * 7 }, (_, i) => 30 + Math.sin(i * 0.15) * 15),
      dew_point_2m: Array.from({ length: 24 * 7 }, (_, i) => 12 + Math.sin(i * 0.2) * 2),
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1010 + Math.sin(i * 0.1) * 4),
    },
    layout: 'list',
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics in list layout format.',
      },
    },
  },
};

export const ExtendedMetricsSmall: Story = {
  args: {
    weather: {
      ...clearWeather,
      wind_gusts_10m: 20,
      cloud_cover: 30,
      dew_point_2m: 10,
      surface_pressure: 1014,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      wind_gusts_10m: Array.from({ length: 24 * 7 }, (_, i) => 16 + Math.sin(i * 0.1) * 4),
      cloud_cover: Array.from({ length: 24 * 7 }, (_, i) => 20 + Math.sin(i * 0.15) * 10),
      dew_point_2m: Array.from({ length: 24 * 7 }, (_, i) => 8 + Math.sin(i * 0.2) * 2),
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1012 + Math.sin(i * 0.1) * 4),
    },
    size: 'sm',
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics in small size variant.',
      },
    },
  },
};

export const ExtendedMetricsLarge: Story = {
  args: {
    weather: {
      ...clearWeather,
      wind_gusts_10m: 28,
      cloud_cover: 85,
      dew_point_2m: 16,
      surface_pressure: 1009,
    },
    hourlyWeather: {
      ...mockHourlyWeather,
      wind_gusts_10m: Array.from({ length: 24 * 7 }, (_, i) => 22 + Math.sin(i * 0.1) * 6),
      cloud_cover: Array.from({ length: 24 * 7 }, (_, i) => 70 + Math.sin(i * 0.15) * 15),
      dew_point_2m: Array.from({ length: 24 * 7 }, (_, i) => 14 + Math.sin(i * 0.2) * 2),
      surface_pressure: Array.from({ length: 24 * 7 }, (_, i) => 1007 + Math.sin(i * 0.1) * 4),
    },
    size: 'lg',
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics in large size variant.',
      },
    },
  },
};

export const ExtendedMetricsLoading: Story = {
  args: {
    weather: null,
    hourlyWeather: mockHourlyWeather,
    isLoading: true,
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics in loading state showing skeleton placeholders.',
      },
    },
  },
};

export const ExtendedMetricsError: Story = {
  args: {
    weather: null,
    hourlyWeather: mockHourlyWeather,
    error: 'Failed to fetch extended weather data.',
    showExtendedMetrics: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended metrics in error state.',
      },
    },
  },
};
