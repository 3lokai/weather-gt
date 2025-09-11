import React from 'react';

interface ColorSwatchProps {
  name: string;
  token: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  showToken?: boolean;
  showValue?: boolean;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  token,
  description,
  size = 'md',
  showToken = true,
  showValue = false,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`${sizeClasses[size]} rounded-lg border-2 border-border shadow-sm`}
        style={{ backgroundColor: `var(${token})` }}
        title={`${name}: var(${token})`}
      />
      <div className="text-center">
        <div className={`font-medium ${textSizeClasses[size]}`}>{name}</div>
        {showToken && (
          <div className={`text-muted-foreground ${textSizeClasses[size]}`}>
            {token}
          </div>
        )}
        {showValue && (
          <div className={`text-muted-foreground ${textSizeClasses[size]}`}>
            {getComputedStyle(document.documentElement).getPropertyValue(token)}
          </div>
        )}
        {description && (
          <div className={`text-foreground ${textSizeClasses[size]} max-w-32`}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
