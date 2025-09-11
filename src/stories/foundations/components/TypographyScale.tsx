import React from 'react';

interface TypographyScaleItem {
  name: string;
  size: string;
  className: string;
  usage: string;
}

const typographyScale: TypographyScaleItem[] = [
  {
    name: '4XL',
    size: '3rem (48px)',
    className: 'text-4xl',
    usage: 'Hero headings, large displays'
  },
  {
    name: '3XL',
    size: '2.25rem (36px)',
    className: 'text-3xl',
    usage: 'Page titles, major headings'
  },
  {
    name: '2XL',
    size: '1.875rem (30px)',
    className: 'text-2xl',
    usage: 'Section headings'
  },
  {
    name: 'XL',
    size: '1.5rem (24px)',
    className: 'text-xl',
    usage: 'Subsection headings'
  },
  {
    name: 'LG',
    size: '1.125rem (18px)',
    className: 'text-lg',
    usage: 'Large body text, important content'
  },
  {
    name: 'Base',
    size: '1rem (16px)',
    className: 'text-base',
    usage: 'Standard body text'
  },
  {
    name: 'SM',
    size: '0.875rem (14px)',
    className: 'text-sm',
    usage: 'Small body text, captions'
  },
  {
    name: 'XS',
    size: '0.75rem (12px)',
    className: 'text-xs',
    usage: 'Fine print, metadata'
  }
];

export const TypographyScale: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Typography Scale</h3>
      <div className="space-y-4">
        {typographyScale.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
            <div className="flex items-center space-x-4">
              <div className="w-16 text-sm font-medium text-muted-foreground">
                {item.name}
              </div>
              <div className="w-24 text-sm text-muted-foreground">
                {item.size}
              </div>
              <div className="flex-1">
                <div className={item.className}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground max-w-xs">
              {item.usage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
