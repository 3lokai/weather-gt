import type { Meta, StoryObj } from '@storybook/react';
import { PollenPanel } from '@/components/weather/pollen-panel';
import { PollenData } from '@/lib/types/pollen';

// Mock pollen data for stories
const mockPollenData: PollenData = {
  grass: {
    value: 45,
    unit: 'grains/m³',
    severity: 'moderate',
    description: 'Moderate',
    healthImplications: 'People with allergies may experience symptoms.',
  },
  tree: {
    value: 12,
    unit: 'grains/m³',
    severity: 'low',
    description: 'Low',
    healthImplications: 'People with severe allergies may experience mild symptoms.',
  },
  weed: {
    value: 8,
    unit: 'grains/m³',
    severity: 'very-low',
    description: 'Very Low',
    healthImplications: 'Most people will not experience allergy symptoms.',
  },
};

const mockHighPollenData: PollenData = {
  grass: {
    value: 180,
    unit: 'grains/m³',
    severity: 'very-high',
    description: 'Very High',
    healthImplications: 'Most people with allergies will experience significant symptoms.',
  },
  tree: {
    value: 95,
    unit: 'grains/m³',
    severity: 'high',
    description: 'High',
    healthImplications: 'Most people with allergies will experience symptoms.',
  },
  weed: {
    value: 220,
    unit: 'grains/m³',
    severity: 'extreme',
    description: 'Extreme',
    healthImplications: 'Everyone with allergies will experience severe symptoms.',
  },
};

const meta: Meta<typeof PollenPanel> = {
  title: 'Weather/PollenPanel',
  component: PollenPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component that displays pollen levels for grass, tree, and weed pollen with severity-based color coding and chips.',
      },
    },
  },
  argTypes: {
    pollen: {
      description: 'Pollen data containing grass, tree, and weed pollen metrics',
      control: { type: 'object' },
    },
    isLoading: {
      description: 'Loading state for the pollen data',
      control: { type: 'boolean' },
    },
    error: {
      description: 'Error message to display',
      control: { type: 'text' },
    },
    size: {
      description: 'Size variant for the panel',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showTooltips: {
      description: 'Show tooltips for metrics',
      control: { type: 'boolean' },
    },
    layout: {
      description: 'Layout variant',
      control: { type: 'select' },
      options: ['grid', 'list'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PollenPanel>;

// Default story with normal pollen levels
export const Default: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
};

// High pollen levels
export const HighPollenLevels: Story = {
  args: {
    pollen: mockHighPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    pollen: null,
    isLoading: true,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
};

// Error state
export const Error: Story = {
  args: {
    pollen: null,
    isLoading: false,
    error: 'Failed to load pollen data',
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
};

// Empty state (no data)
export const Empty: Story = {
  args: {
    pollen: null,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
};

// Small size
export const Small: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'sm',
    showTooltips: true,
    layout: 'grid',
  },
};

// Large size
export const Large: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'lg',
    showTooltips: true,
    layout: 'grid',
  },
};

// List layout
export const ListLayout: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'list',
  },
};

// Without tooltips
export const WithoutTooltips: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: false,
    layout: 'grid',
  },
};

// Dark theme variant
export const DarkTheme: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// Mobile viewport
export const Mobile: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Desktop viewport
export const Desktop: Story = {
  args: {
    pollen: mockPollenData,
    isLoading: false,
    error: null,
    size: 'md',
    showTooltips: true,
    layout: 'grid',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
