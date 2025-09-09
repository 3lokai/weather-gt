// components/ui/lottie-weather-icon.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { getIconKey, getIconId, type WmoCode } from '@/lib/icons/iconMap';

interface LottieWeatherIconProps {
  code: WmoCode;
  isDay: boolean;
  size?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  variant?: 'fill' | 'line';
  speed?: number; // Animation speed multiplier (1 = normal, 2 = 2x faster, 0.5 = 2x slower)
  /** Apply weather-aware styling enhancements */
  enhancedStyling?: boolean;
  /** Custom filter effects for better background integration */
  customFilter?: string;
}

export function LottieWeatherIcon({ 
  code, 
  isDay, 
  size = 24, 
  className = '',
  loop = true,
  autoplay = true,
  variant = 'fill',
  speed = 1,
  enhancedStyling = false,
  customFilter
}: LottieWeatherIconProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lottieRef = useRef<any>(null);

  const iconKey = getIconKey(code, isDay);
  const iconId = getIconId(code, isDay, 'bas');
  
  // Enhanced styling for better background integration
  const getEnhancedStyles = () => {
    if (!enhancedStyling) return {};
    
    const timeOfDay = (() => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 7) return 'dawn';
      if (hour >= 7 && hour < 17) return 'day';
      if (hour >= 17 && hour < 20) return 'dusk';
      return 'night';
    })();
    
    const baseStyles: React.CSSProperties = {
      filter: customFilter || 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
    };
    
    // Add time-of-day specific styling
    if (timeOfDay === 'dawn') {
      baseStyles.filter += ' brightness(1.1) saturate(1.2) hue-rotate(5deg)';
    } else if (timeOfDay === 'dusk') {
      baseStyles.filter += ' brightness(1.05) saturate(1.3) hue-rotate(-5deg)';
    } else if (timeOfDay === 'night') {
      baseStyles.filter += ' brightness(0.9) saturate(0.8) contrast(1.1)';
    }
    
    return baseStyles;
  };
  
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Construct the Lottie file path
        const lottieFilename = `${iconId}.json`;
        const lottiePath = `/icons/meteocons/${variant}/lottie/${lottieFilename}`;
        
        const response = await fetch(lottiePath);
        if (!response.ok) {
          throw new Error(`Failed to load Lottie animation: ${lottieFilename}`);
        }
        
        const animationData = await response.json();
        setAnimationData(animationData);
      } catch (err) {
        console.warn(`Failed to load Lottie animation: ${iconId}`, err);
        setError(err instanceof Error ? err.message : 'Failed to load animation');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimation();
  }, [iconId, variant]);

  // Set animation speed when lottieRef is available
  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed, animationData]);

  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-muted rounded-md ${className}`}
        style={{ width: size, height: size }}
        aria-label={`Loading ${iconKey} animation`}
      />
    );
  }

  if (error || !animationData) {
    // Fallback to a simple weather emoji
    const fallbackEmoji = getFallbackEmoji(iconKey);
    return (
      <span 
        className={className}
        style={{ fontSize: size }}
        aria-label={`Weather condition: ${iconKey} (fallback)`}
      >
        {fallbackEmoji}
      </span>
    );
  }

  const enhancedStyles = getEnhancedStyles();

  return (
    <div
      className={className}
      style={{ 
        width: size, 
        height: size,
        ...enhancedStyles
      }}
      aria-label={`Weather condition: ${iconKey}`}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

// Fallback emojis for when animations fail to load
function getFallbackEmoji(iconKey: string): string {
  const emojiMap: Record<string, string> = {
    'clear-day': '☀️',
    'clear-night': '🌙',
    'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '☁️',
    'cloudy': '☁️',
    'overcast': '☁️',
    'overcast-day': '☁️',
    'overcast-night': '☁️',
    'fog': '🌫️',
    'fog-day': '🌫️',
    'fog-night': '🌫️',
    'haze': '🌫️',
    'haze-day': '🌫️',
    'haze-night': '🌫️',
    'smoke': '💨',
    'drizzle': '🌦️',
    'rain': '🌧️',
    'sleet': '🌨️',
    'snow': '❄️',
    'hail': '🧊',
    'showers': '🌦️',
    'wind': '💨',
    'tornado': '🌪️',
    'hurricane': '🌀',
    'thunderstorms': '⛈️',
    'thunderstorms-day': '⛈️',
    'thunderstorms-night': '⛈️',
    'thunderstorms-rain': '⛈️',
    'thunderstorms-day-rain': '⛈️',
    'thunderstorms-night-rain': '⛈️'
  };
  
  return emojiMap[iconKey] || '🌤️';
}
