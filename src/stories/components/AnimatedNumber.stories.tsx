import type { Meta, StoryObj } from '@storybook/react';
import { 
  AnimatedNumber, 
  AnimatedTemperature, 
  AnimatedWindSpeed, 
  AnimatedPrecipitation, 
  AnimatedPressure, 
  AnimatedWindGusts, 
  AnimatedCloudCover, 
  AnimatedDewPoint, 
  AnimatedPrecipitationProbability 
} from '@/components/common/animated-number';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof AnimatedNumber> = {
  title: 'Components/Common/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated number components with smooth transitions and unit formatting for weather data.',
      },
    },
  },
  argTypes: {
    value: { control: 'number' },
    duration: { control: { type: 'range', min: 100, max: 1000, step: 50 } },
    precision: { control: { type: 'range', min: 0, max: 3, step: 1 } },
    easing: { control: 'select', options: ['ease-out', 'ease-in', 'ease-in-out', 'linear'] },
    animateOnMount: { control: 'boolean' },
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
type Story = StoryObj<typeof AnimatedNumber>;

export const Default: Story = {
  args: {
    value: 25,
    duration: 180,
    precision: 0,
    easing: 'ease-out',
    animateOnMount: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic animated number with default settings.',
      },
    },
  },
};

export const WithAnimation: Story = {
  args: {
    value: 0,
    duration: 500,
    precision: 0,
    easing: 'ease-out',
    animateOnMount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated number that animates from 0 to target value on mount.',
      },
    },
  },
};

export const WithPrecision: Story = {
  args: {
    value: 25.678,
    duration: 300,
    precision: 2,
    easing: 'ease-in-out',
    animateOnMount: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated number with 2 decimal places precision.',
      },
    },
  },
};

export const CustomFormatter: Story = {
  args: {
    value: 75,
    duration: 400,
    precision: 0,
    easing: 'ease-out',
    animateOnMount: false,
    formatter: (val) => `${Math.round(val)}%`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated number with custom percentage formatter.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    
    return (
      <div className="space-y-4">
        <div className="text-2xl font-bold">
          <AnimatedNumber value={value} duration={300} />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setValue(Math.floor(Math.random() * 100))} size="sm">
            Random Value
          </Button>
          <Button onClick={() => setValue(value + 10)} size="sm">
            +10
          </Button>
          <Button onClick={() => setValue(value - 10)} size="sm">
            -10
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive animated number that responds to button clicks.',
      },
    },
  },
};

// Specialized Animated Components
export const Temperature: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-2xl font-bold">
        <AnimatedTemperature value={22} unit="celsius" />
      </div>
      <div className="text-lg">
        <AnimatedTemperature value={72} unit="fahrenheit" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated temperature components with Celsius and Fahrenheit units.',
      },
    },
  },
};

export const WindSpeed: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedWindSpeed value={15} unit="kmh" />
      </div>
      <div className="text-lg">
        <AnimatedWindSpeed value={9} unit="mph" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated wind speed components with km/h and mph units.',
      },
    },
  },
};

export const Precipitation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedPrecipitation value={2.5} unit="mm" />
      </div>
      <div className="text-lg">
        <AnimatedPrecipitation value={0.1} unit="in" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated precipitation components with mm and inches units.',
      },
    },
  },
};

export const Pressure: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedPressure value={1013} unit="hPa" />
      </div>
      <div className="text-lg">
        <AnimatedPressure value={29.92} unit="inHg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated pressure components with hPa and inHg units.',
      },
    },
  },
};

export const WindGusts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedWindGusts value={25} unit="kmh" />
      </div>
      <div className="text-lg">
        <AnimatedWindGusts value={15} unit="mph" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated wind gusts components with km/h and mph units.',
      },
    },
  },
};

export const CloudCover: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedCloudCover value={75} />
      </div>
      <div className="text-lg">
        <AnimatedCloudCover value={30} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated cloud cover components showing percentage values.',
      },
    },
  },
};

export const DewPoint: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedDewPoint value={15} unit="celsius" />
      </div>
      <div className="text-lg">
        <AnimatedDewPoint value={59} unit="fahrenheit" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated dew point components with Celsius and Fahrenheit units.',
      },
    },
  },
};

export const PrecipitationProbability: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
        <AnimatedPrecipitationProbability value={75} />
      </div>
      <div className="text-lg text-blue-500 dark:text-blue-300">
        <AnimatedPrecipitationProbability value={30} />
      </div>
      <div className="text-base text-blue-400 dark:text-blue-200">
        <AnimatedPrecipitationProbability value={0} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated precipitation probability components with blue color scheme.',
      },
    },
  },
};

export const InteractivePrecipitationProbability: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="space-y-4">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          <AnimatedPrecipitationProbability value={value} duration={400} />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setValue(Math.floor(Math.random() * 101))} size="sm">
            Random %
          </Button>
          <Button onClick={() => setValue(Math.min(100, value + 10))} size="sm">
            +10%
          </Button>
          <Button onClick={() => setValue(Math.max(0, value - 10))} size="sm">
            -10%
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Current value: {value}%
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive precipitation probability component for testing animations.',
      },
    },
  },
};

export const AllComponents: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="space-y-2">
        <div><strong>Temperature:</strong> <AnimatedTemperature value={22} unit="celsius" /></div>
        <div><strong>Wind Speed:</strong> <AnimatedWindSpeed value={15} unit="kmh" /></div>
        <div><strong>Precipitation:</strong> <AnimatedPrecipitation value={2.5} unit="mm" /></div>
        <div><strong>Pressure:</strong> <AnimatedPressure value={1013} unit="hPa" /></div>
      </div>
      <div className="space-y-2">
        <div><strong>Wind Gusts:</strong> <AnimatedWindGusts value={25} unit="kmh" /></div>
        <div><strong>Cloud Cover:</strong> <AnimatedCloudCover value={75} /></div>
        <div><strong>Dew Point:</strong> <AnimatedDewPoint value={15} unit="celsius" /></div>
        <div><strong>Rain Chance:</strong> <AnimatedPrecipitationProbability value={60} /></div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All animated weather components displayed together.',
      },
    },
  },
};

export const LightTheme: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedTemperature value={25} unit="celsius" />
      </div>
      <div className="text-lg text-blue-600">
        <AnimatedPrecipitationProbability value={80} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated components in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedTemperature value={25} unit="celsius" />
      </div>
      <div className="text-lg text-blue-400">
        <AnimatedPrecipitationProbability value={80} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated components in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Mobile: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-lg font-semibold">
        <AnimatedTemperature value={22} unit="celsius" />
      </div>
      <div className="text-base text-blue-600 dark:text-blue-400">
        <AnimatedPrecipitationProbability value={65} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated components optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        <AnimatedTemperature value={22} unit="celsius" />
      </div>
      <div className="text-lg text-blue-600 dark:text-blue-400">
        <AnimatedPrecipitationProbability value={65} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated components optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">
        <AnimatedTemperature value={22} unit="celsius" />
      </div>
      <div className="text-xl text-blue-600 dark:text-blue-400">
        <AnimatedPrecipitationProbability value={65} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animated components optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
