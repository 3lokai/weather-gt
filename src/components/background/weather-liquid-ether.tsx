'use client';

import React from 'react';
import LiquidEther from './liquid-ether';
import { getWeatherCondition } from '@/lib/api/open-meteo';
import { useThemeColors } from '@/hooks/use-theme-colors';

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

// Weather-specific color palettes using theme colors from Zustand store
const getWeatherColorPalettes = (themeColors: any) => ({
  'clear-day': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.accent100 || '#000000',        // Lighter accent variant
    themeColors?.accent500 || '#000000'         // Base accent color
  ],
  'clear-night': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.secondary || '#000000',        // Secondary color (adapts to light/dark)
    themeColors?.secondary600 || '#000000'      // Darker secondary variant
  ],
  'rain': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.primary || '#000000',          // Primary color (adapts to light/dark)
    themeColors?.primary600 || '#000000'        // Darker primary variant
  ],
  'snow': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.primary100 || '#000000',       // Lightest primary variant
    themeColors?.primary200 || '#000000'        // Light primary variant
  ],
  'cloudy': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.gray500 || '#000000',          // Gray-500 (adapts to light/dark)
    themeColors?.gray800 || '#000000'           // Gray-800 (adapts to light/dark)
  ],
  'fog': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.muted || '#000000',            // Muted color (adapts to light/dark)
    themeColors?.subtle || '#000000'            // Subtle color (adapts to light/dark)
  ],
  'thunder': [
    themeColors?.accent || '#000000',           // Uses your theme's accent color (adapts to light/dark)
    themeColors?.secondary || '#000000',        // Secondary color (adapts to light/dark)
    themeColors?.secondary600 || '#000000'      // Darker secondary variant
  ],
  'default': [
    themeColors?.primary || '#000000',          // Primary color (adapts to light/dark)
    themeColors?.secondary || '#000000',        // Secondary color (adapts to light/dark)
    themeColors?.accent || '#000000'            // Accent color (adapts to light/dark)
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
  // Get theme colors from Zustand store
  const themeColors = useThemeColors();
  
  // Get weather condition and theme group
  const { themeGroup } = getWeatherCondition(weatherCode, isDay);
  
  // Get color palette based on weather and theme
  const weatherColorPalettes = getWeatherColorPalettes(themeColors);
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
