import type { Meta, StoryObj } from '@storybook/react';
import { InlineSearch } from '@/components/search/inline-search';
import { mockSearchResults } from '../fixtures/weather-data';

const meta: Meta<typeof InlineSearch> = {
  title: 'Components/Search/InlineSearch',
  component: InlineSearch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Inline search component with dropdown results, debounced search, and location selection.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
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
type Story = StoryObj<typeof InlineSearch>;

export const Default: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default inline search with placeholder text and empty state.',
      },
    },
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Enter city name...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search with custom placeholder text.',
      },
    },
  },
};

export const WithResults: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search showing mock search results in dropdown.',
      },
    },
    mockData: {
      searchResults: mockSearchResults,
    },
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search showing loading state while fetching results.',
      },
    },
    mockData: {
      isLoading: true,
    },
  },
};

export const EmptyResults: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search showing empty state when no results are found.',
      },
    },
    mockData: {
      searchResults: [],
    },
  },
};

export const LightTheme: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search in light theme with clear visibility.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search in dark theme with proper contrast.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const RainCondition: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search with rain condition theme applied.',
      },
    },
    backgrounds: {
      default: 'rain',
    },
  },
};

export const CloudyCondition: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search with cloudy condition theme applied.',
      },
    },
    backgrounds: {
      default: 'cloudy',
    },
  },
};

export const SnowCondition: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search with snow condition theme applied.',
      },
    },
    backgrounds: {
      default: 'snow',
    },
  },
};

export const ThunderCondition: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search with thunder condition theme applied.',
      },
    },
    backgrounds: {
      default: 'thunder',
    },
  },
};

export const Mobile: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search optimized for mobile viewport.',
      },
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline search optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
