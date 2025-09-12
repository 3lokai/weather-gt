'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';

/**
 * Hook to apply reduced motion preference to the document
 * This adds/removes the 'reduced-motion' class based on user preference
 */
export function useReducedMotion() {
  const { accessibility } = useWeatherStore();

  useEffect(() => {
    const { reducedMotion } = accessibility;
    
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('reduced-motion');
    };
  }, [accessibility.reducedMotion]);
}
