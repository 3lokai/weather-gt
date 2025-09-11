import type { Meta, StoryObj } from '@storybook/react';
import { AirQualityPanel } from '@/components/weather/air-quality-panel';
import { mockAirQualityData } from '@/stories/fixtures/weather-data';

const meta: Meta<typeof AirQualityPanel> = {
  title: 'Components/Weather/AirQualityPanel',
  component: AirQualityPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Air quality panel displaying PM2.5, PM10, O₃, NO₂, SO₂, CO metrics with severity-based color coding and AQI support.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for the panel',
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'list'],
      description: 'Layout variant',
    },
    showTooltips: { control: 'boolean', description: 'Show tooltips for metrics' },
    showAQI: { control: 'boolean', description: 'Show AQI when available' },
    isLoading: { control: 'boolean', description: 'Loading state' },
    error: { control: 'text', description: 'Error message' },
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
          <div className="max-w-6xl mx-auto">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    airQuality: mockAirQualityData.good,
    size: 'md',
    layout: 'grid',
    showTooltips: true,
    showAQI: true,
    isLoading: false,
    error: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default air quality panel with good air quality conditions.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant of the air quality panel.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the air quality panel.',
      },
    },
  },
};

export const ListLayout: Story = {
  args: {
    ...Default.args,
    layout: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel in list layout format.',
      },
    },
  },
};

export const GoodAirQuality: Story = {
  args: {
    ...Default.args,
    airQuality: mockAirQualityData.good,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel showing good air quality conditions with low pollutant levels.',
      },
    },
  },
};

export const ModerateAirQuality: Story = {
  args: {
    ...Default.args,
    airQuality: mockAirQualityData.moderate,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel showing moderate air quality conditions with some elevated pollutant levels.',
      },
    },
  },
};

export const UnhealthyAirQuality: Story = {
  args: {
    ...Default.args,
    airQuality: mockAirQualityData.unhealthy,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel showing unhealthy air quality conditions with high pollutant levels.',
      },
    },
  },
};

export const VeryUnhealthyAirQuality: Story = {
  args: {
    ...Default.args,
    airQuality: mockAirQualityData.veryUnhealthy,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel showing very unhealthy air quality conditions with very high pollutant levels.',
      },
    },
  },
};

export const HazardousAirQuality: Story = {
  args: {
    ...Default.args,
    airQuality: mockAirQualityData.hazardous,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel showing hazardous air quality conditions with extremely high pollutant levels.',
      },
    },
  },
};

export const WithoutAQI: Story = {
  args: {
    ...Default.args,
    airQuality: {
      ...mockAirQualityData.good,
      aqi: undefined,
    },
    showAQI: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel without AQI display.',
      },
    },
  },
};

export const WithoutTooltips: Story = {
  args: {
    ...Default.args,
    showTooltips: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel without tooltips.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    airQuality: null,
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel in loading state showing skeleton placeholders.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    airQuality: null,
    error: 'Failed to fetch air quality data.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel in error state.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel in light theme.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel in dark theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const RainCondition: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel with rain condition theme applied.',
      },
    },
    backgrounds: {
      default: 'rain',
    },
  },
};

export const CloudyCondition: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel with cloudy condition theme applied.',
      },
    },
    backgrounds: {
      default: 'cloudy',
    },
  },
};

export const SnowCondition: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel with snow condition theme applied.',
      },
    },
    backgrounds: {
      default: 'snow',
    },
  },
};

export const ThunderCondition: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel with thunder condition theme applied.',
      },
    },
    backgrounds: {
      default: 'thunder',
    },
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    ...Default.args,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Air quality panel optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const AllSeverityLevels: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Good Air Quality</h3>
        <AirQualityPanel airQuality={mockAirQualityData.good} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Moderate Air Quality</h3>
        <AirQualityPanel airQuality={mockAirQualityData.moderate} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Unhealthy Air Quality</h3>
        <AirQualityPanel airQuality={mockAirQualityData.unhealthy} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Very Unhealthy Air Quality</h3>
        <AirQualityPanel airQuality={mockAirQualityData.veryUnhealthy} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Hazardous Air Quality</h3>
        <AirQualityPanel airQuality={mockAirQualityData.hazardous} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All air quality severity levels displayed together for comparison.',
      },
    },
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <AirQualityPanel airQuality={mockAirQualityData.good} size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size</h3>
        <AirQualityPanel airQuality={mockAirQualityData.good} size="md" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <AirQualityPanel airQuality={mockAirQualityData.good} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variants comparison for the air quality panel.',
      },
    },
  },
};

export const LayoutComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Grid Layout</h3>
        <AirQualityPanel airQuality={mockAirQualityData.good} layout="grid" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">List Layout</h3>
        <AirQualityPanel airQuality={mockAirQualityData.good} layout="list" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout variants comparison for the air quality panel.',
      },
    },
  },
};
