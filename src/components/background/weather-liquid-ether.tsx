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
  const colors = weatherColorPalettes[themeGroup as keyof typeof weatherColorPalettes] || weatherColorPalettes.default;
  

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
