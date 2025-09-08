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
}

export function LottieWeatherIcon({ 
  code, 
  isDay, 
  size = 24, 
  className = '',
  loop = true,
  autoplay = true,
  variant = 'fill',
  speed = 1
}: LottieWeatherIconProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lottieRef = useRef<any>(null);

  const iconKey = getIconKey(code, isDay);
  const iconId = getIconId(code, isDay, 'bas');
  
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

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
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
    'thunderstorms-night-rain': '⛈️',
  };
  
  return emojiMap[iconKey] || '🌤️';
}
