// Hook for fetching and managing pollen data
import { useQuery } from '@tanstack/react-query';
import { getPollenData } from '@/lib/api/open-meteo';
import { transformPollenData } from '@/lib/utils/pollen-transform';
import { useWeatherStore } from '@/lib/store/weather-store';

export function usePollen() {
  const { selectedLocation, setPollenData } = useWeatherStore();

  const query = useQuery({
    queryKey: ['pollen', selectedLocation?.latitude, selectedLocation?.longitude],
    queryFn: async () => {
      if (!selectedLocation) {
        throw new Error('No location selected');
      }
      
      const rawData = await getPollenData(selectedLocation.latitude, selectedLocation.longitude);
      
      // Transform the raw API data to our internal format
      const transformedData = transformPollenData(rawData);
      
      // Store in Zustand store for global access
      setPollenData(transformedData);
      
      return transformedData;
    },
    enabled: !!selectedLocation,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true, // Background refetch on focus
    refetchOnMount: true, // Refetch when component mounts
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    pollen: query.data,
    isLoading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
}
