import React from 'react';

interface DoDontExampleProps {
  title: string;
  doExample: {
    title: string;
    description: string;
    example: React.ReactNode;
  };
  dontExample: {
    title: string;
    description: string;
    example: React.ReactNode;
  };
}

export const DoDontExample: React.FC<DoDontExampleProps> = ({
  title,
  doExample,
  dontExample,
}) => {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold mb-4 text-foreground">{title}</h4>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Do Example */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <h5 className="text-md font-medium text-success">{doExample.title}</h5>
          </div>
          <p className="text-sm text-muted-foreground">{doExample.description}</p>
          <div className="p-4 border border-success/20 rounded-lg bg-success/5">
            {doExample.example}
          </div>
        </div>
        
        {/* Don't Example */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-sm font-bold">
              ✗
            </div>
            <h5 className="text-md font-medium text-destructive">{dontExample.title}</h5>
          </div>
          <p className="text-sm text-muted-foreground">{dontExample.description}</p>
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            {dontExample.example}
          </div>
        </div>
      </div>
    </div>
  );
};
