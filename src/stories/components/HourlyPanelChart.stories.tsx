import type { Meta, StoryObj } from '@storybook/react';
import { HourlyPanelChart, type HourlyDataPoint } from '@/components/weather/hourly-panel-chart';
import { HourlyWeather } from '@/lib/api/open-meteo';

const meta: Meta<typeof HourlyPanelChart> = {
  title: 'Components/Weather/HourlyPanelChart',
  component: HourlyPanelChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive hourly weather chart with temperature line, comfort bands, and list view mode.',
      },
    },
  },
  argTypes: {
    hourlyData: {
      control: 'object',
      description: 'Hourly weather data',
    },
    selectedDayIndex: {
      control: { type: 'range', min: 0, max: 6, step: 1 },
      description: 'Selected day index from daily forecast rail',
    },
    temperatureUnit: {
      control: 'select',
      options: ['celsius', 'fahrenheit'],
      description: 'Temperature unit for display',
    },
    timeFormat: {
      control: 'select',
      options: ['12h', '24h'],
      description: 'Time format preference',
    },
    viewMode: {
      control: 'select',
      options: ['chart', 'list'],
      description: 'Whether to show in chart or list view mode',
    },
    onViewModeChange: {
      action: 'onViewModeChange',
      description: 'Callback when view mode changes',
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
type Story = StoryObj<typeof HourlyPanelChart>;

// Generate mock hourly weather data
const generateHourlyData = (days: number = 7): HourlyWeather => {
  const time: string[] = [];
  const temperature_2m: number[] = [];
  const precipitation: number[] = [];
  const precipitation_probability: number[] = [];
  const weather_code: number[] = [];
  
  for (let day = 0; day < days; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      date.setHours(hour, 0, 0, 0);
      time.push(date.toISOString());
      
      // Generate realistic temperature curve
      const baseTemp = 20 + Math.sin(day * 0.5) * 5; // Daily variation
      const hourlyTemp = baseTemp + Math.sin(hour * 0.3) * 8; // Hourly variation
      temperature_2m.push(Math.round(hourlyTemp * 10) / 10);
      
      // Generate precipitation data
      const precip = Math.random() > 0.7 ? Math.random() * 5 : 0;
      precipitation.push(Math.round(precip * 10) / 10);
      
      // Generate precipitation probability
      precipitation_probability.push(Math.round(Math.random() * 100));
      
      // Generate weather codes
      const codes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 71, 73, 75, 80, 81, 82, 95, 96, 99];
      weather_code.push(codes[Math.floor(Math.random() * codes.length)]);
    }
  }
  
  return {
    time,
    temperature_2m,
    precipitation,
    precipitation_probability,
    weather_code,
  };
};

// Different weather scenarios
const clearDayData = generateHourlyData(1);
const rainyDayData = generateHourlyData(1);
const mixedWeekData = generateHourlyData(7);

// Modify rainy day data to have more precipitation
for (let i = 0; i < 24; i++) {
  rainyDayData.precipitation[i] = Math.random() * 8;
  rainyDayData.precipitation_probability[i] = 60 + Math.random() * 40;
  rainyDayData.weather_code[i] = [61, 63, 65, 80, 81, 82][Math.floor(Math.random() * 6)];
}

export const Default: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default hourly panel chart showing temperature line with comfort bands.',
      },
    },
  },
};

export const ClearDay: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart for a clear day with pleasant temperatures.',
      },
    },
  },
};

export const RainyDay: Story = {
  args: {
    hourlyData: rainyDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart for a rainy day with precipitation data.',
      },
    },
  },
};

export const ListView: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly forecast in list view mode with weather icons and comfort levels.',
      },
    },
  },
};

export const Fahrenheit: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'fahrenheit',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart with temperature displayed in Fahrenheit.',
      },
    },
  },
};

export const TwentyFourHourFormat: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '24h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart with 24-hour time format.',
      },
    },
  },
};

export const DifferentDay: Story = {
  args: {
    hourlyData: mixedWeekData,
    selectedDayIndex: 2,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart for a different day (day 3) from the weekly forecast.',
      },
    },
  },
};

export const ListViewRainy: Story = {
  args: {
    hourlyData: rainyDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'List view for a rainy day showing weather conditions and precipitation.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const RainCondition: Story = {
  args: {
    hourlyData: rainyDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart with rain condition theme applied.',
      },
    },
    backgrounds: {
      default: 'rain',
    },
  },
};

export const CloudyCondition: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart with cloudy condition theme applied.',
      },
    },
    backgrounds: {
      default: 'cloudy',
    },
  },
};

export const SnowCondition: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart with snow condition theme applied.',
      },
    },
    backgrounds: {
      default: 'snow',
    },
  },
};

export const ThunderCondition: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart with thunder condition theme applied.',
      },
    },
    backgrounds: {
      default: 'thunder',
    },
  },
};

export const Mobile: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    hourlyData: clearDayData,
    selectedDayIndex: 0,
    temperatureUnit: 'celsius',
    timeFormat: '12h',
    viewMode: 'chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hourly chart optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
