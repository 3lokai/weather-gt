'use client';

import React from 'react';
import LiquidEther from './liquid-ether';
import { getWeatherCondition } from '@/lib/api/open-meteo';

export interface WeatherLiquidEtherProps {
  weatherCode: number;
  isDay: boolean;
  className?: string;
  style?: React.CSSProperties;
  // LiquidEther props
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

// Weather-specific color palettes using CSS variables (resolved in LiquidEther)
const getWeatherColorPalettes = () => ({
  'clear-day': [
    'var(--accent)',
    'var(--primary)',
    'var(--secondary)'
  ],
  'clear-night': [
    'var(--accent)',
    'var(--secondary)',
    'var(--secondary-foreground)'
  ],
  'rain': [
    'var(--accent)',
    'var(--primary)',
    'var(--ring)'
  ],
  'snow': [
    'var(--accent)',
    'var(--primary-foreground)',
    'var(--secondary)'
  ],
  'cloudy': [
    'var(--accent)',
    'var(--muted-foreground)',
    'var(--foreground)'
  ],
  'fog': [
    'var(--accent)',
    'var(--muted)',
    'var(--muted-foreground)'
  ],
  'thunder': [
    'var(--accent)',
    'var(--secondary)',
    'var(--secondary-foreground)'
  ],
  'default': [
    'var(--primary)',
    'var(--secondary)',
    'var(--accent)'
  ]
});

// Convert any CSS color (including oklch(), rgb(), hsl()) to hex using canvas
function colorToHex(colorString: string): string {
  if (!colorString || colorString === '') return '#000000';
  if (colorString.startsWith('#')) return colorString;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1; canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '#000000';
    ctx.fillStyle = colorString;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch {
    return '#000000';
  }
}

// Resolve CSS variables like var(--primary) and convert to hex
function resolveColorToHex(input: string): string {
  if (typeof window === 'undefined') return '#000000';
  const varMatch = input?.match(/^var\((--[\w-]+)\)$/);
  if (varMatch) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim();
    return colorToHex(raw || '#000000');
  }
  return colorToHex(input);
}

export default function WeatherLiquidEther({
  weatherCode,
  isDay,
  className = '',
  style = {},
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6
}: WeatherLiquidEtherProps): React.ReactElement {
  // Get weather condition and theme group
  const { themeGroup } = getWeatherCondition(weatherCode, isDay);
  
  // Get color palette based on weather and theme
  const weatherColorPalettes = getWeatherColorPalettes();
  const rawColors = weatherColorPalettes[themeGroup as keyof typeof weatherColorPalettes] || weatherColorPalettes.default;
  
  // Convert CSS custom properties to hex values for Three.js
  const colors = rawColors.map(resolveColorToHex);
  

  return (
    <div 
      className={`weather-liquid-ether ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...style
      }}
      >
        <LiquidEther
        colors={colors}
        mouseForce={mouseForce}
        cursorSize={cursorSize}
        isViscous={isViscous}
        viscous={viscous}
        iterationsViscous={iterationsViscous}
        iterationsPoisson={iterationsPoisson}
        dt={dt}
        BFECC={BFECC}
        resolution={resolution}
        isBounce={isBounce}
        autoDemo={autoDemo}
        autoSpeed={autoSpeed}
        autoIntensity={autoIntensity}
        takeoverDuration={takeoverDuration}
        autoResumeDelay={autoResumeDelay}
        autoRampDuration={autoRampDuration}
      />
    </div>
  );
}
