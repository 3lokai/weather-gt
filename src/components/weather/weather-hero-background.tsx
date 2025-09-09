'use client';

import React from 'react';
import { getWeatherCondition } from '@/lib/api/open-meteo';
import { cn } from '@/lib/utils';

export interface WeatherHeroBackgroundProps {
  weatherCode: number;
  isDay: boolean;
  size?: 'mobile' | 'desktop';
  className?: string;
  opacity?: number;
}

/**
 * Weather-themed hero background component that adapts the base SVG designs
 * to match current weather conditions
 */
export function WeatherHeroBackground({
  weatherCode,
  isDay,
  size = 'desktop',
  className,
  opacity = 0.6
}: WeatherHeroBackgroundProps) {
  const { themeGroup } = getWeatherCondition(weatherCode, isDay);
  
  // Determine SVG dimensions
  const dimensions = size === 'mobile' 
    ? { width: 343, height: 286, viewBox: "0 0 343 286" }
    : { width: 800, height: 286, viewBox: "0 0 800 286" };

  // Get enhanced time-of-day for better gradient selection
  const getTimeOfDay = (): 'dawn' | 'day' | 'dusk' | 'night' => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'night';
  };

  // Weather-specific gradient colors with time-of-day enhancements (OKLCH for modern color space)
  const getWeatherGradients = (themeGroup: string, isDay: boolean, timeOfDay?: string) => {
    // Base gradients
    const gradients = {
      'clear-day': {
        primary: ['oklch(0.85 0.15 85)', 'oklch(0.75 0.18 65)'], // Warm amber to orange
        secondary: ['oklch(0.65 0.12 85)', 'oklch(0.55 0.15 85)'],
        accent: 'oklch(0.95 0.08 85)'
      },
      'clear-night': {
        primary: ['oklch(0.25 0.08 264)', 'oklch(0.15 0.12 280)'], // Deep blue to purple
        secondary: ['oklch(0.35 0.10 264)', 'oklch(0.25 0.12 280)'],
        accent: 'oklch(0.85 0.15 85)' // Warm stars
      },
      'rain': {
        primary: ['oklch(0.35 0.15 250)', 'oklch(0.25 0.18 240)'], // Blue to deeper blue
        secondary: ['oklch(0.45 0.12 250)', 'oklch(0.35 0.15 250)'],
        accent: 'oklch(0.75 0.10 250)'
      },
      'snow': {
        primary: ['oklch(0.75 0.05 250)', 'oklch(0.65 0.08 260)'], // Crisp icy blues
        secondary: ['oklch(0.85 0.03 250)', 'oklch(0.75 0.05 250)'],
        accent: 'oklch(0.95 0.02 250)'
      },
      'cloudy': {
        primary: ['oklch(0.55 0.08 260)', 'oklch(0.45 0.10 280)'], // Neutral grays
        secondary: ['oklch(0.65 0.06 260)', 'oklch(0.55 0.08 260)'],
        accent: 'oklch(0.85 0.04 260)'
      },
      'fog': {
        primary: ['oklch(0.65 0.04 260)', 'oklch(0.55 0.06 270)'], // Muted grays
        secondary: ['oklch(0.75 0.03 260)', 'oklch(0.65 0.04 260)'],
        accent: 'oklch(0.90 0.02 260)'
      },
      'thunder': {
        primary: ['oklch(0.25 0.15 300)', 'oklch(0.15 0.18 280)'], // Purple to dark purple
        secondary: ['oklch(0.35 0.12 300)', 'oklch(0.25 0.15 300)'],
        accent: 'oklch(0.85 0.20 65)' // Bright orange lightning
      },
      'default': {
        primary: ['oklch(0.45 0.18 264)', 'oklch(0.35 0.20 280)'],
        secondary: ['oklch(0.55 0.15 264)', 'oklch(0.45 0.18 264)'],
        accent: 'oklch(0.75 0.18 65)'
      }
    };

    // Time-of-day enhancements
    if (timeOfDay === 'dawn') {
      // Golden hour sunrise - warmer, more saturated
      if (themeGroup === 'clear-day') {
        (gradients as any)['clear-day'] = {
          primary: ['oklch(0.90 0.18 75)', 'oklch(0.80 0.22 60)'], // Golden sunrise
          secondary: ['oklch(0.70 0.15 75)', 'oklch(0.60 0.18 75)'],
          accent: 'oklch(0.95 0.12 75)'
        };
      }
    } else if (timeOfDay === 'dusk') {
      // Golden hour sunset - oranges and purples
      if (themeGroup === 'clear-day') {
        (gradients as any)['clear-day'] = {
          primary: ['oklch(0.80 0.20 50)', 'oklch(0.60 0.25 30)'], // Orange sunset
          secondary: ['oklch(0.70 0.18 50)', 'oklch(0.50 0.20 50)'],
          accent: 'oklch(0.90 0.15 50)'
        };
      }
    } else if (timeOfDay === 'night') {
      // Darker, cooler tones for all conditions
      (Object.keys(gradients) as Array<keyof typeof gradients>).forEach(key => {
        const grad = gradients[key];
        // Reduce lightness by 15% and shift hue cooler
        grad.primary = grad.primary.map(color => {
          const match = color.match(/oklch\(([0-9.]+) ([0-9.]+) ([0-9.]+)\)/);
          if (match) {
            const l = Math.max(0.1, parseFloat(match[1]) * 0.85);
            const c = parseFloat(match[2]);
            const h = parseFloat(match[3]) + 10; // Cooler hue
            return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(4)})`;
          }
          return color;
        });
      });
    }
    
    return gradients[themeGroup as keyof typeof gradients] || gradients.default;
  };

  // Get appropriate star count and positioning based on weather
  const getStarConfig = (themeGroup: string, isDay: boolean) => {
    const baseStars = [
      { x: 57.5, y: 45.3, size: 'large', opacity: 0.2 },
      { x: 363, y: 37.1, size: 'small', opacity: 1 },
      { x: 604.5, y: 235.3, size: 'large', opacity: 0.2 },
      { x: 319.5, y: 226.3, size: 'small', opacity: 1 }
    ];

    if (themeGroup === 'clear-night') {
      return baseStars.map(star => ({ ...star, opacity: star.opacity * 1.5 }));
    } else if (themeGroup === 'clear-day') {
      return baseStars.filter(star => star.size === 'small'); // Fewer, subtle stars
    } else if (['rain', 'snow', 'thunder'].includes(themeGroup)) {
      return []; // No stars during storms
    } else if (['cloudy', 'fog'].includes(themeGroup)) {
      return baseStars.map(star => ({ ...star, opacity: star.opacity * 0.3 })); // Very faint
    }
    
    return baseStars;
  };

  const timeOfDay = getTimeOfDay();
  const colors = getWeatherGradients(themeGroup, isDay, timeOfDay);
  const stars = getStarConfig(themeGroup, isDay);

  return (
    <svg 
      className={cn("weather-hero-background", className)}
      width={dimensions.width} 
      height={dimensions.height} 
      viewBox={dimensions.viewBox} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        {/* Primary gradient */}
        <linearGradient 
          id={`weather-gradient-primary-${themeGroup}`} 
          x1="0%" y1="0%" x2="100%" y2="45%" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors.primary[0]} />
          <stop offset="1" stopColor={colors.primary[1]} />
        </linearGradient>
        
        {/* Secondary gradient for clouds */}
        <linearGradient 
          id={`weather-gradient-secondary-${themeGroup}`} 
          x1="20%" y1="30%" x2="80%" y2="70%" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors.secondary[0]} />
          <stop offset="1" stopColor={colors.secondary[1]} />
        </linearGradient>

        {/* Noise filter for texture (preserved from original) */}
        <filter id={`weather-noise-${themeGroup}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="6859" />
          <feColorMatrix type="luminanceToAlpha" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
          </feComponentTransfer>
          <feFlood floodColor="rgba(255, 255, 255, 0.3)" />
          <feComposite operator="in" />
        </filter>
      </defs>

      {/* Background base */}
      <rect 
        width="100%" 
        height="100%" 
        rx="20" 
        fill={`url(#weather-gradient-primary-${themeGroup})`}
        filter={`url(#weather-noise-${themeGroup})`}
      />

      {/* Cloud formations - adapted from original SVG but simplified */}
      <path
        d={size === 'mobile' ? 
          "M0.2 354.6C3 317.9 35.2 290.4 72 293.2C80 293.8 87.5 295.8 94.4 298.9C95.2 297.9 95.9 297 96.7 296C96.7 295.7 96.7 295.4 96.7 295.1C99.5 258.3 131.7 230.8 168.5 233.6C180.3 234.5 191.2 238.5 200.4 244.6C209 219.7 233.6 202.7 261.1 204.8C278.6 206.1 293.8 214.9 303.7 227.8C316.1 190 353.1 164.1 394.6 167.3Z" :
          "M457.2 330.6C460 293.9 492.2 266.4 529 269.2C537 269.8 544.5 271.8 551.4 274.9C552.2 273.9 552.9 273 553.7 272C553.7 271.7 553.7 271.4 553.7 271.1C556.5 234.3 588.7 206.8 625.5 209.6C637.3 210.5 648.2 214.5 657.4 220.6C666 195.7 690.6 178.7 718.1 180.8C735.6 182.1 750.8 190.9 760.7 203.8C773.1 166 810.1 140.1 851.6 143.3Z"
        }
        fill={`url(#weather-gradient-secondary-${themeGroup})`}
        opacity="0.8"
      />

      {/* Additional cloud layer for depth */}
      <path
        d={size === 'mobile' ?
          "M74.3 222.2C65.6 224.3 57.5 227.7 50.1 232.1C25.3 192.8 -22.7 172 -70.3 183.8C-125.1 197.5 -160.1 249.9 -153.3 304.6Z" :
          "M149.3 224.2C140.6 226.3 132.5 229.7 125.1 234.1C100.3 194.8 52.3 174 4.7 185.8C-50.1 199.5 -85.1 251.9 -78.3 306.6Z"
        }
        fill={`url(#weather-gradient-secondary-${themeGroup})`}
        opacity="0.6"
      />

      {/* Weather-conditional stars */}
      {stars.map((star, index) => (
        <g key={index}>
          <path
            d={star.size === 'large' ? 
              `M${star.x} ${star.y + 12.3}L${star.x + 2.79} ${star.y + 8}L${star.x + 2.72} ${star.y + 12.8}L${star.x + 6.85} ${star.y + 10}L${star.x + 4.44} ${star.y + 14.3}L${star.x + 9.45} ${star.y + 13.6}L${star.x + 5.25} ${star.y + 16.3}L${star.x + 10} ${star.y + 18}L${star.x + 4.97} ${star.y + 18.5}L${star.x + 8.38} ${star.y + 22.1}L${star.x + 3.67} ${star.y + 20.3}L${star.x + 4.95} ${star.y + 25}L${star.x + 1.65} ${star.y + 21.3}L${star.x} ${star.y + 26}L${star.x - 1.35} ${star.y + 21.3}L${star.x - 4.05} ${star.y + 25}L${star.x - 2.67} ${star.y + 20.3}L${star.x - 7.38} ${star.y + 22.1}L${star.x - 3.97} ${star.y + 18.5}L${star.x - 9} ${star.y + 18}L${star.x - 4.25} ${star.y + 16.3}L${star.x - 8.45} ${star.y + 13.6}L${star.x - 3.44} ${star.y + 14.3}L${star.x - 5.85} ${star.y + 10}L${star.x - 1.72} ${star.y + 12.8}L${star.x - 1.79} ${star.y + 8}L${star.x} ${star.y + 12.3}Z` :
              `M${star.x} ${star.y + 10.2}L${star.x + 1.69} ${star.y + 7}L${star.x + 1.64} ${star.y + 10.6}L${star.x + 4.68} ${star.y + 8.5}L${star.x + 2.9} ${star.y + 11.6}L${star.x + 6.59} ${star.y + 11.1}L${star.x + 3.5} ${star.y + 13.1}L${star.x + 7} ${star.y + 14.3}L${star.x + 3.3} ${star.y + 14.7}L${star.x + 5.8} ${star.y + 17.4}L${star.x + 2.34} ${star.y + 16.1}L${star.x + 3.28} ${star.y + 19.5}L${star.x + 0.84} ${star.y + 16.8}L${star.x} ${star.y + 20.3}L${star.x - 0.84} ${star.y + 16.8}L${star.x - 3.28} ${star.y + 19.5}L${star.x - 2.34} ${star.y + 16.1}L${star.x - 5.8} ${star.y + 17.4}L${star.x - 3.3} ${star.y + 14.7}L${star.x - 7} ${star.y + 14.3}L${star.x - 3.5} ${star.y + 13.1}L${star.x - 6.59} ${star.y + 11.1}L${star.x - 2.9} ${star.y + 11.6}L${star.x - 4.68} ${star.y + 8.5}L${star.x - 1.64} ${star.y + 10.6}L${star.x - 1.69} ${star.y + 7}L${star.x} ${star.y + 10.2}Z`
            }
            fill={colors.accent}
            opacity={star.opacity}
          />
        </g>
      ))}
    </svg>
  );
}
