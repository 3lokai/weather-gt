// src/components/common/Icon.tsx
import { IconProps, IconWeight } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr';
import { CSSProperties } from 'react';

export type IconName = keyof typeof PhosphorIcons;

// Common icon names for better type safety in components
export type CommonIconName = 
  | 'Info' 
  | 'Thermometer' 
  | 'Drop' 
  | 'Wind' 
  | 'Gauge' 
  | 'Eye' 
  | 'Sun'
  | 'Moon'
  | 'Cloud'
  | 'Star'
  | 'Heart'
  | 'Share'
  | 'Settings'
  | 'MagnifyingGlass'  // Search icon
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'Plus'
  | 'X'
  | 'MapPin'
  | 'Keyboard';

interface CustomIconProps {
  name: string;
  size?: IconProps['size'];
  className?: string;
  weight?: IconWeight;
  color?: 'primary' | 'muted' | 'accent' | 'destructive' | 'glass';
  withDuotone?: boolean;
}

export const Icon = ({ 
  name, 
  size = 20, 
  className = 'inline-block', 
  weight = 'duotone',
  color = 'primary',
  withDuotone = true 
}: CustomIconProps) => {
  const IconComponent = PhosphorIcons[name as keyof typeof PhosphorIcons] as React.FC<IconProps>;

  // Add this debug log
  if (!IconComponent) {
    console.error(`Icon "${String(name)}" not found in PhosphorIcons. Available icons:`, Object.keys(PhosphorIcons).slice(0, 10));
    return <span>❌</span>; // Fallback
  }
  
  // Map color prop to your design token variables
  const colorMap = {
    primary: {
      primary: 'var(--primary)',
      secondary: 'var(--primary-foreground)'
    },
    muted: {
      primary: 'var(--muted-foreground)',
      secondary: 'var(--muted)'
    },
    accent: {
      primary: 'var(--accent)',
      secondary: 'var(--accent-foreground)'
    },
    destructive: {
      primary: 'var(--destructive)',
      secondary: 'var(--destructive-foreground, var(--primary-foreground))'
    },
    glass: {
      primary: 'var(--foreground)',
      secondary: 'var(--foreground)/60'
    }
  };

  // Duotone color variables from your tokens
  const style = withDuotone
    ? {
        '--ph-primary': colorMap[color].primary,
        '--ph-secondary': colorMap[color].secondary,
      } as CSSProperties 
    : undefined;

  return (
    <IconComponent 
      size={size} 
      className={className} 
      weight={weight}
      style={style}
    />
  );
};
