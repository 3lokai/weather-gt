import React from 'react';

interface TypographyExampleItem {
  element: string;
  className: string;
  content: string;
  description: string;
}

interface TypographyExampleProps {
  title: string;
  examples: TypographyExampleItem[];
}

export const TypographyExample: React.FC<TypographyExampleProps> = ({
  title,
  examples,
}) => {
  const renderElement = (item: TypographyExampleItem) => {
    const createElement = (tag: string, props: any, children: React.ReactNode) => {
      return React.createElement(tag, props, children);
    };
    
    return (
      <div key={item.content} className="mb-6 p-4 border border-border rounded-lg bg-card">
        <div className="mb-2">
          {createElement(item.element, { className: item.className }, item.content)}
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="font-mono text-xs bg-muted px-2 py-1 rounded mb-1">
            {item.element} • {item.className}
          </div>
          <div>{item.description}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <div className="space-y-4">
        {examples.map(renderElement)}
      </div>
    </div>
  );
};
