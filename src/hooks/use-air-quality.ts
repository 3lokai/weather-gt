// Hook for fetching and managing air quality data
import { useQuery } from '@tanstack/react-query';
import { getAirQuality } from '@/lib/api/open-meteo';
import { transformAirQualityData } from '@/lib/utils/air-quality-transform';
import { useWeatherStore } from '@/lib/store/weather-store';

export function useAirQuality() {
  const { selectedLocation, setAirQualityData } = useWeatherStore();

  const query = useQuery({
    queryKey: ['air-quality', selectedLocation?.latitude, selectedLocation?.longitude],
    queryFn: async () => {
      if (!selectedLocation) {
        throw new Error('No location selected');
      }
      
      const rawData = await getAirQuality(selectedLocation.latitude, selectedLocation.longitude);
      
      // Transform the raw API data to our internal format
      const transformedData = transformAirQualityData(rawData);
      
      // Store in Zustand store for global access
      setAirQualityData(transformedData);
      
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
    airQuality: query.data,
    isLoading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
}
