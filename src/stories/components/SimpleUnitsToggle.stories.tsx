import type { Meta, StoryObj } from '@storybook/react';
import { SimpleUnitsToggle } from '@/components/settings/simple-units-toggle';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useEffect } from 'react';

const meta: Meta<typeof SimpleUnitsToggle> = {
  title: 'Components/Settings/SimpleUnitsToggle',
  component: SimpleUnitsToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Simple toggle switches for time format (12h/24h) and unit system (Metric/Imperial).',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show labels for toggles',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story, context) => {
      const setUnits = useWeatherStore((state) => state.setUnits);
      useEffect(() => {
        // Reset units to default for consistent story rendering
        setUnits({
          temperature: 'celsius',
          windSpeed: 'kmh',
          precipitation: 'mm',
          pressure: 'hPa',
          timeFormat: '12h',
        });
      }, [setUnits]);
      
      return (
        <div className="min-h-screen relative bg-background transition-colors duration-300">
          {/* Weather-themed liquid ether background simulation */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="atmospheric-blur-bg glass-layer-1"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-50 glass-layer-2"></div>
            <div className="weather-liquid-ether pointer-events-auto glass-layer-3"></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
              <Story {...context} />
            </div>
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SimpleUnitsToggle>;

export const Default: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default units toggle with labels showing current settings.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant of the units toggle.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the units toggle.',
      },
    },
  },
};

export const WithoutLabels: Story = {
  args: {
    size: 'md',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle without labels for compact layouts.',
      },
    },
  },
};

export const MetricSystem: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  decorators: [
    (Story, context) => {
      const setUnits = useWeatherStore((state) => state.setUnits);
      useEffect(() => {
        // Set to metric system
        setUnits({
          temperature: 'celsius',
          windSpeed: 'kmh',
          precipitation: 'mm',
          pressure: 'hPa',
          timeFormat: '24h',
        });
      }, [setUnits]);
      return (
        <div className="w-full max-w-md bg-background p-4">
          <Story {...context} />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with metric system selected.',
      },
    },
  },
};

export const ImperialSystem: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  decorators: [
    (Story, context) => {
      const setUnits = useWeatherStore((state) => state.setUnits);
      useEffect(() => {
        // Set to imperial system
        setUnits({
          temperature: 'fahrenheit',
          windSpeed: 'mph',
          precipitation: 'in',
          pressure: 'inHg',
          timeFormat: '12h',
        });
      }, [setUnits]);
      return (
        <div className="w-full max-w-md bg-background p-4">
          <Story {...context} />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with imperial system selected.',
      },
    },
  },
};

export const TwelveHourFormat: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  decorators: [
    (Story, context) => {
      const setUnits = useWeatherStore((state) => state.setUnits);
      useEffect(() => {
        // Set to 12-hour format
        setUnits({
          temperature: 'celsius',
          windSpeed: 'kmh',
          precipitation: 'mm',
          pressure: 'hPa',
          timeFormat: '12h',
        });
      }, [setUnits]);
      return (
        <div className="w-full max-w-md bg-background p-4">
          <Story {...context} />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with 12-hour time format selected.',
      },
    },
  },
};

export const TwentyFourHourFormat: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  decorators: [
    (Story, context) => {
      const setUnits = useWeatherStore((state) => state.setUnits);
      useEffect(() => {
        // Set to 24-hour format
        setUnits({
          temperature: 'celsius',
          windSpeed: 'kmh',
          precipitation: 'mm',
          pressure: 'hPa',
          timeFormat: '24h',
        });
      }, [setUnits]);
      return (
        <div className="w-full max-w-md bg-background p-4">
          <Story {...context} />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with 24-hour time format selected.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const RainCondition: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with rain condition theme applied.',
      },
    },
    backgrounds: {
      default: 'rain',
    },
  },
};

export const CloudyCondition: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with cloudy condition theme applied.',
      },
    },
    backgrounds: {
      default: 'cloudy',
    },
  },
};

export const SnowCondition: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with snow condition theme applied.',
      },
    },
    backgrounds: {
      default: 'snow',
    },
  },
};

export const ThunderCondition: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle with thunder condition theme applied.',
      },
    },
    backgrounds: {
      default: 'thunder',
    },
  },
};

export const Mobile: Story = {
  args: {
    size: 'sm',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    size: 'md',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    size: 'lg',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Units toggle optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
