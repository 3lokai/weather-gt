import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchCommand } from '@/components/search/search-command';
import { Button } from '@/components/ui/button';
import { mockSearchResults } from '../fixtures/weather-data';

const meta: Meta<typeof SearchCommand> = {
  title: 'Components/Search/SearchCommand',
  component: SearchCommand,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal search command component with debounced geocoding search, keyboard navigation, and location selection.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the search dialog is open',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when dialog open state changes',
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
type Story = StoryObj<typeof SearchCommand>;

// Interactive wrapper component for stories
const SearchCommandWrapper = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>
        Open Search (Cmd/Ctrl+K)
      </Button>
      <SearchCommand 
        {...args} 
        open={open} 
        onOpenChange={setOpen} 
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Default search command dialog with empty state and keyboard shortcuts.',
      },
    },
  },
};

export const WithResults: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command with mock search results showing location suggestions.',
      },
    },
    mockData: {
      searchResults: mockSearchResults,
    },
  },
};

export const Loading: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command showing loading state while fetching results.',
      },
    },
    mockData: {
      isLoading: true,
    },
  },
};

export const EmptyResults: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command showing empty state when no results are found.',
      },
    },
    mockData: {
      searchResults: [],
    },
  },
};

export const LightTheme: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command in light theme with clear visibility.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command in dark theme with proper contrast.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const RainCondition: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command with rain condition theme applied.',
      },
    },
    backgrounds: {
      default: 'rain',
    },
  },
};

export const Mobile: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  render: (args) => <SearchCommandWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Search command optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
