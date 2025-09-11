import type { Meta, StoryObj } from '@storybook/react';
import { SettingsDropdown } from '@/components/settings/settings-dropdown';

const meta: Meta<typeof SettingsDropdown> = {
  title: 'Components/Settings/SettingsDropdown',
  component: SettingsDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Settings dropdown with gear icon trigger containing units and time format toggles.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['icon', 'button'],
      description: 'Show trigger as icon only or with text',
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
          <div className="max-w-md mx-auto">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsDropdown>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default settings dropdown with button variant showing gear icon and text.',
      },
    },
  },
};

export const IconVariant: Story = {
  args: {
    size: 'md',
    variant: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown with icon-only variant for compact header layouts.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant of the settings dropdown.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the settings dropdown.',
      },
    },
  },
};

export const IconSmall: Story = {
  args: {
    size: 'sm',
    variant: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small icon variant for compact spaces.',
      },
    },
  },
};

export const IconLarge: Story = {
  args: {
    size: 'lg',
    variant: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large icon variant for prominent settings access.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    size: 'md',
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown in light theme.',
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
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown in dark theme.',
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
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown with rain condition theme applied.',
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
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown with cloudy condition theme applied.',
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
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown with snow condition theme applied.',
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
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown with thunder condition theme applied.',
      },
    },
    backgrounds: {
      default: 'thunder',
    },
  },
};

export const Mobile: Story = {
  args: {
    size: 'md',
    variant: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown optimized for mobile viewport with icon variant.',
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
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown optimized for tablet viewport.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  args: {
    size: 'md',
    variant: 'button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropdown optimized for desktop viewport.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
