'use client';

import { useURLState } from '@/hooks/use-url-state';

interface URLStateProviderProps {
  weather: any;
  children: React.ReactNode;
}

/**
 * Provider component that handles URL state management
 * This separates the hook call from the render function to avoid React hooks rules violations
 */
export function URLStateProvider({ weather, children }: URLStateProviderProps) {
  // Initialize URL state management with weather data
  useURLState(weather);
  
  return <>{children}</>;
}
