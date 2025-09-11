import React from 'react';
import { ColorSwatch } from './ColorSwatch';

interface Color {
  name: string;
  token: string;
  description?: string;
}

interface ColorPaletteProps {
  title: string;
  colors: Color[];
  columns?: number;
  showDescriptions?: boolean;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  title,
  colors,
  columns = 5,
  showDescriptions = true,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {colors.map((color) => (
          <ColorSwatch
            key={color.token}
            name={color.name}
            token={color.token}
            description={showDescriptions ? color.description : undefined}
            showToken={true}
            showValue={false}
          />
        ))}
      </div>
    </div>
  );
};
