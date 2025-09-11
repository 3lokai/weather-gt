// src/components/icons/phosphor-icon.tsx
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
  | 'Keyboard'
  // Weather-specific icons
  | 'CloudRain'
  | 'CloudSnow'
  | 'CloudLightning'
  | 'CloudFog'
  | 'SunHorizon'
  | 'MoonStars'
  | 'Umbrella'
  | 'Snowflake'
  | 'Lightning'
  | 'EyeSlash'
  | 'ThermometerHot'
  | 'ThermometerCold';

interface CustomIconProps {
  name: string;
  size?: IconProps['size'];
  className?: string;
  weight?: IconWeight;
  /** 
   * Color variant that maps to your OKLCH design system:
   * - primary/secondary: Main brand colors (blue/purple)
   * - accent: Weather-themed orange (changes with weather conditions)
   * - muted/subtle: Neutral variants for secondary content
   * - success/warning/destructive/info: Semantic colors
   * - foreground: High contrast text color
   * - glass: Optimized for glassmorphism effects
   */
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'subtle' | 'success' | 'warning' | 'destructive' | 'info' | 'glass' | 'foreground';
  withDuotone?: boolean;
}

export const Icon = ({ 
  name, 
  size = 20, 
  className = 'inline-block', 
  weight = 'regular',
  color = 'primary',
  withDuotone = false 
}: CustomIconProps) => {
  const IconComponent = PhosphorIcons[name as keyof typeof PhosphorIcons] as React.FC<IconProps>;

  // Add this debug log
  if (!IconComponent) {
    console.error(`Icon "${String(name)}" not found in PhosphorIcons. Available icons:`, Object.keys(PhosphorIcons).slice(0, 10));
    return <span>❌</span>; // Fallback
  }
  
  // Map color prop to your comprehensive OKLCH design token variables
  // Note: 'accent' color automatically adapts to weather conditions via CSS theme classes
  // (.theme--clear-day, .theme--rain, .theme--snow, etc.) defined in globals.css
  const colorMap = {
    primary: {
      primary: 'var(--primary)',
      secondary: 'var(--primary-foreground)'
    },
    secondary: {
      primary: 'var(--secondary)',
      secondary: 'var(--secondary-foreground)'
    },
    accent: {
      primary: 'var(--accent)',
      secondary: 'var(--accent-foreground)'
    },
    muted: {
      primary: 'var(--muted-foreground)',
      secondary: 'var(--muted)'
    },
    subtle: {
      primary: 'var(--subtle-foreground)',
      secondary: 'var(--subtle)'
    },
    success: {
      primary: 'var(--success)',
      secondary: 'var(--success-foreground)'
    },
    warning: {
      primary: 'var(--warning)',
      secondary: 'var(--warning-foreground)'
    },
    destructive: {
      primary: 'var(--destructive)',
      secondary: 'var(--destructive-foreground)'
    },
    info: {
      primary: 'var(--info)',
      secondary: 'var(--info-foreground)'
    },
    foreground: {
      primary: 'var(--foreground)',
      secondary: 'var(--muted-foreground)'
    },
    glass: {
      primary: 'var(--foreground)',
      secondary: 'oklch(from var(--foreground) l c h / 0.6)'
    }
  };

  // Apply colors based on duotone setting
  const style = withDuotone
    ? {
        '--ph-primary': colorMap[color].primary,
        '--ph-secondary': colorMap[color].secondary,
      } as CSSProperties 
    : {
        color: colorMap[color].primary,
      } as CSSProperties;

  return (
    <IconComponent 
      size={size} 
      className={`ph-icon ${className || ''}`}
      weight={weight}
      style={style}
    />
  );
};
