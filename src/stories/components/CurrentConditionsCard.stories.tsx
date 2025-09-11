import type { Meta, StoryObj } from '@storybook/react';
import { CurrentConditionsCard, type CurrentConditionsData } from '@/components/weather/current-conditions-card';
import { mockWeatherData } from '../fixtures/weather-data';

const meta: Meta<typeof CurrentConditionsCard> = {
  title: 'Components/Weather/CurrentConditionsCard',
  component: CurrentConditionsCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Current weather conditions card displaying temperature, condition, location, and optional precipitation probability.',
      },
    },
  },
  argTypes: {
    conditions: {
      control: 'object',
      description: 'Current weather conditions data',
    },
    location: {
      control: 'object',
      description: 'Location information for display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for the card',
    },
    showApparentTemp: {
      control: 'boolean',
      description: 'Show apparent temperature (feels like)',
    },
    showHeroBackground: {
      control: 'boolean',
      description: 'Enable weather hero background',
    },
    heroBackgroundOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Hero background opacity (0-1)',
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
          <div className="max-w-2xl mx-auto">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CurrentConditionsCard>;

// Mock data for different weather conditions
const clearConditions: CurrentConditionsData = {
  temperature_2m: 28,
  apparent_temperature: 30,
  weather_code: 0, // Clear sky
  is_day: true,
  precipitation_probability: 0,
};

const rainConditions: CurrentConditionsData = {
  temperature_2m: 15,
  apparent_temperature: 13,
  weather_code: 61, // Rain
  is_day: true,
  precipitation_probability: 85,
};

const snowConditions: CurrentConditionsData = {
  temperature_2m: -2,
  apparent_temperature: -5,
  weather_code: 71, // Snow
  is_day: true,
  precipitation_probability: 60,
};

const thunderConditions: CurrentConditionsData = {
  temperature_2m: 32,
  apparent_temperature: 35,
  weather_code: 95, // Thunderstorm
  is_day: false,
  precipitation_probability: 90,
};

const cloudyConditions: CurrentConditionsData = {
  temperature_2m: 20,
  apparent_temperature: 19,
  weather_code: 3, // Partly cloudy
  is_day: true,
  precipitation_probability: 25,
};

export const Default: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default current conditions card with clear weather and apparent temperature.',
      },
    },
  },
};

export const ClearWeather: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card showing clear weather conditions.',
      },
    },
  },
};

export const RainWeather: Story = {
  args: {
    conditions: rainConditions,
    location: mockWeatherData.london.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card showing rainy weather with precipitation probability.',
      },
    },
  },
};

export const SnowWeather: Story = {
  args: {
    conditions: snowConditions,
    location: mockWeatherData.reykjavik.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card showing snowy weather conditions.',
      },
    },
  },
};

export const ThunderWeather: Story = {
  args: {
    conditions: thunderConditions,
    location: mockWeatherData.miami.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card showing thunderstorm weather at night.',
      },
    },
  },
};

export const CloudyWeather: Story = {
  args: {
    conditions: cloudyConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card showing cloudy weather conditions.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'sm',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant of the current conditions card.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'lg',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the current conditions card.',
      },
    },
  },
};

export const WithoutApparentTemp: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: false,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card without apparent temperature display.',
      },
    },
  },
};

export const WithHeroBackground: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: true,
    heroBackgroundOpacity: 0.4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card with weather hero background enabled.',
      },
    },
  },
};

export const HeroBackgroundRain: Story = {
  args: {
    conditions: rainConditions,
    location: mockWeatherData.london.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: true,
    heroBackgroundOpacity: 0.6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card with hero background for rainy weather.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Mobile: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    conditions: clearConditions,
    location: mockWeatherData.bangalore.location,
    size: 'md',
    showApparentTemp: true,
    showHeroBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Current conditions card optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
