import React from 'react';

interface SpacingItem {
  name: string;
  value: string;
  pixels: string;
  usage: string;
}

const spacingScale: SpacingItem[] = [
  { name: '0', value: '0', pixels: '0px', usage: 'No spacing' },
  { name: '1', value: '0.125rem', pixels: '2px', usage: 'Minimal spacing' },
  { name: '2', value: '0.25rem', pixels: '4px', usage: 'Tight spacing' },
  { name: '3', value: '0.375rem', pixels: '6px', usage: 'Small spacing' },
  { name: '4', value: '0.5rem', pixels: '8px', usage: 'Base spacing' },
  { name: '5', value: '0.625rem', pixels: '10px', usage: 'Medium spacing' },
  { name: '6', value: '0.75rem', pixels: '12px', usage: 'Comfortable spacing' },
  { name: '8', value: '1rem', pixels: '16px', usage: 'Standard spacing' },
  { name: '10', value: '1.25rem', pixels: '20px', usage: 'Large spacing' },
  { name: '12', value: '1.5rem', pixels: '24px', usage: 'Section spacing' },
  { name: '16', value: '2rem', pixels: '32px', usage: 'Major spacing' },
  { name: '20', value: '2.5rem', pixels: '40px', usage: 'Hero spacing' },
  { name: '24', value: '3rem', pixels: '48px', usage: 'Page spacing' },
  { name: '32', value: '4rem', pixels: '64px', usage: 'Layout spacing' },
];

export const SpacingExample: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Spacing Scale</h3>
      <div className="space-y-4">
        {spacingScale.map((item) => (
          <div key={item.name} className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-card">
            <div className="w-8 text-sm font-medium text-muted-foreground">
              {item.name}
            </div>
            <div className="w-20 text-sm text-muted-foreground">
              {item.value}
            </div>
            <div className="w-16 text-sm text-muted-foreground">
              {item.pixels}
            </div>
            <div className="flex-1 flex items-center">
              <div 
                className="bg-primary rounded"
                style={{ 
                  width: item.name === '0' ? '1px' : `var(--spacing-${item.name})`,
                  height: '20px',
                  minWidth: item.name === '0' ? '1px' : '4px'
                }}
              />
            </div>
            <div className="text-sm text-muted-foreground max-w-xs">
              {item.usage}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h4 className="text-md font-medium mb-4 text-foreground">Spacing Examples</h4>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-card">
            <h5 className="text-sm font-medium mb-2">Card Spacing</h5>
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-primary-foreground p-4 rounded">
                Card Content
              </div>
              <div className="text-sm text-muted-foreground">
                padding: var(--spacing-4) • 16px
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-card">
            <h5 className="text-sm font-medium mb-2">Button Spacing</h5>
            <div className="flex items-center space-x-4">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded">
                Button
              </button>
              <div className="text-sm text-muted-foreground">
                padding: var(--spacing-3) var(--spacing-6) • 12px 24px
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-card">
            <h5 className="text-sm font-medium mb-2">Grid Spacing</h5>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded text-center">
                Item 1
              </div>
              <div className="bg-primary text-primary-foreground p-4 rounded text-center">
                Item 2
              </div>
              <div className="bg-primary text-primary-foreground p-4 rounded text-center">
                Item 3
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              gap: var(--spacing-4) • 16px
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
