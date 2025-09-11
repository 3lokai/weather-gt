import type { Meta, StoryObj } from '@storybook/react';
import { SevenDayForecastRail, type DailyForecastData } from '@/components/weather/seven-day-forecast-rail';

const meta: Meta<typeof SevenDayForecastRail> = {
  title: 'Components/Weather/SevenDayForecastRail',
  component: SevenDayForecastRail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '7-day weather forecast rail with selectable daily chips showing temperature range, weather icons, and precipitation probability.',
      },
    },
  },
  argTypes: {
    dailyData: {
      control: 'object',
      description: 'Daily forecast data array (7 days)',
    },
    showScrollIndicators: {
      control: 'boolean',
      description: 'Whether to show scroll indicators',
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
type Story = StoryObj<typeof SevenDayForecastRail>;

// Generate mock daily forecast data
const generateDailyData = (weatherVariations: number[]): DailyForecastData[] => {
  const today = new Date();
  return weatherVariations.map((weatherCode, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    
    return {
      time: date.toISOString().split('T')[0],
      weather_code: weatherCode,
      temperature_2m_max: 20 + Math.random() * 15,
      temperature_2m_min: 10 + Math.random() * 10,
      precipitation_probability_max: Math.random() * 100,
      is_day: true,
    };
  });
};

// Different weather scenarios
const clearWeekData = generateDailyData([0, 0, 1, 0, 2, 0, 1]); // Mostly clear
const rainyWeekData = generateDailyData([61, 63, 65, 61, 80, 61, 63]); // Rainy week
const mixedWeekData = generateDailyData([0, 3, 61, 71, 95, 2, 0]); // Mixed conditions
const snowyWeekData = generateDailyData([71, 73, 75, 71, 77, 71, 73]); // Snowy week
const stormyWeekData = generateDailyData([95, 96, 99, 95, 97, 95, 96]); // Stormy week

export const Default: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default 7-day forecast rail with clear weather conditions.',
      },
    },
  },
};

export const ClearWeek: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail showing a week of mostly clear weather.',
      },
    },
  },
};

export const RainyWeek: Story = {
  args: {
    dailyData: rainyWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail showing a rainy week with high precipitation probability.',
      },
    },
  },
};

export const MixedConditions: Story = {
  args: {
    dailyData: mixedWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail showing mixed weather conditions including clear, cloudy, rain, snow, and thunder.',
      },
    },
  },
};

export const SnowyWeek: Story = {
  args: {
    dailyData: snowyWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail showing a snowy week.',
      },
    },
  },
};

export const StormyWeek: Story = {
  args: {
    dailyData: stormyWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail showing a stormy week with thunderstorms.',
      },
    },
  },
};

export const WithoutScrollIndicators: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: false,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail without scroll indicators for cleaner appearance.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const RainCondition: Story = {
  args: {
    dailyData: rainyWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail with rain condition theme applied.',
      },
    },
    backgrounds: {
      default: 'rain',
    },
  },
};

export const CloudyCondition: Story = {
  args: {
    dailyData: mixedWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail with cloudy condition theme applied.',
      },
    },
    backgrounds: {
      default: 'cloudy',
    },
  },
};

export const SnowCondition: Story = {
  args: {
    dailyData: snowyWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail with snow condition theme applied.',
      },
    },
    backgrounds: {
      default: 'snow',
    },
  },
};

export const ThunderCondition: Story = {
  args: {
    dailyData: stormyWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail with thunder condition theme applied.',
      },
    },
    backgrounds: {
      default: 'thunder',
    },
  },
};

export const Mobile: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail optimized for mobile viewport with horizontal scrolling.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    dailyData: clearWeekData,
    showScrollIndicators: true,
  },
  parameters: {
    docs: {
      description: {
        story: '7-day forecast rail optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
