'use client';

import { useCacheInvalidationSetup } from '@/hooks/use-cache-invalidation-setup';

interface CacheInvalidationProviderProps {
  children: React.ReactNode;
}

export function CacheInvalidationProvider({ children }: CacheInvalidationProviderProps) {
  useCacheInvalidationSetup();
  
  return <>{children}</>;
}
