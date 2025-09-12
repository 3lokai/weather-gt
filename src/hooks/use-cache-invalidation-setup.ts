'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useQueryInvalidation } from './use-query-invalidation';

export function useCacheInvalidationSetup() {
  const { setOnUnitsChange, setOnLocationChange } = useWeatherStore();
  const { invalidateUnitsQueries, invalidateLocationQueries } = useQueryInvalidation();

  // Use refs to store the latest callback functions
  const handleUnitsChangeRef = useRef<(() => void) | undefined>(undefined);
  const handleLocationChangeRef = useRef<(() => void) | undefined>(undefined);

  // Update refs when callbacks change
  handleUnitsChangeRef.current = useCallback(() => {
    invalidateUnitsQueries();
  }, [invalidateUnitsQueries]);

  handleLocationChangeRef.current = useCallback(() => {
    invalidateLocationQueries();
  }, [invalidateLocationQueries]);

  useEffect(() => {
    // Set up cache invalidation callbacks using refs
    setOnUnitsChange(handleUnitsChangeRef.current);
    setOnLocationChange(handleLocationChangeRef.current);

    // Cleanup callbacks on unmount
    return () => {
      setOnUnitsChange(undefined);
      setOnLocationChange(undefined);
    };
  }, [setOnUnitsChange, setOnLocationChange]);
}
