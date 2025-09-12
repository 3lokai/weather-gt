'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ReducedMotionProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that applies reduced motion preferences to the document
 * This must be a client component to access the weather store
 */
export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  useReducedMotion();
  
  return <>{children}</>;
}
