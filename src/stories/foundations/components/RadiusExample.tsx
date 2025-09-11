import React from 'react';

interface RadiusItem {
  name: string;
  value: string;
  pixels: string;
  usage: string;
}

const radiusScale: RadiusItem[] = [
  { name: 'xs', value: '0.5rem', pixels: '8px', usage: 'Small elements, badges' },
  { name: 'sm', value: '0.75rem', pixels: '12px', usage: 'Small components, tags' },
  { name: 'md', value: '1rem', pixels: '16px', usage: 'Default components, buttons' },
  { name: 'lg', value: '1.25rem', pixels: '20px', usage: 'Large components, cards' },
  { name: 'xl', value: '1.5rem', pixels: '24px', usage: 'Hero elements, panels' },
  { name: '2xl', value: '1.75rem', pixels: '28px', usage: 'Large panels, modals' },
  { name: '3xl', value: '2rem', pixels: '32px', usage: 'Extra large elements' },
  { name: 'full', value: '9999px', pixels: '∞', usage: 'Pills, avatars, circles' },
];

export const RadiusExample: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Border Radius Scale</h3>
      <div className="space-y-4">
        {radiusScale.map((item) => (
          <div key={item.name} className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-card">
            <div className="w-12 text-sm font-medium text-muted-foreground">
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
                className="bg-primary text-primary-foreground p-4 text-center min-w-20"
                style={{ 
                  borderRadius: item.name === 'full' ? '50%' : `var(--radius-${item.name})`,
                  width: item.name === 'full' ? '60px' : '80px',
                  height: item.name === 'full' ? '60px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.name === 'full' ? '○' : '□'}
              </div>
            </div>
            <div className="text-sm text-muted-foreground max-w-xs">
              {item.usage}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h4 className="text-md font-medium mb-4 text-foreground">Radius Examples</h4>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-card">
            <h5 className="text-sm font-medium mb-2">Component Radius</h5>
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-sm">
                Small
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Medium
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                Large
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
                Pill
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              radius-sm • radius-md • radius-lg • radius-full
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-card">
            <h5 className="text-sm font-medium mb-2">Card Radius</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded-md">
                <div className="text-sm">Standard Card</div>
                <div className="text-xs opacity-75">radius-md</div>
              </div>
              <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                <div className="text-sm">Hero Card</div>
                <div className="text-xs opacity-75">radius-lg</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-card">
            <h5 className="text-sm font-medium mb-2">Weather App Components</h5>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-md text-center">
                <div className="text-sm">Weather Card</div>
                <div className="text-xs opacity-75">radius-lg</div>
              </div>
              <div className="bg-primary text-primary-foreground p-3 rounded-sm text-center">
                <div className="text-sm">Metric</div>
                <div className="text-xs opacity-75">radius-sm</div>
              </div>
              <div className="bg-primary text-primary-foreground p-3 rounded-full text-center">
                <div className="text-sm">Icon</div>
                <div className="text-xs opacity-75">radius-full</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
