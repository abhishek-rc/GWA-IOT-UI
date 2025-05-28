import { useQuery } from '@tanstack/react-query';
import { fetchWaterSavingsData, WaterSavingsData, calculateTotalWaterSavings } from '@/services/dashboardApi';

/**
 * Hook to fetch water savings data for a specific facility
 * @param facilityId - The ID of the facility to fetch data for
 * @param options - Optional configuration for the query
 * @returns Query result with water savings data
 */
export const useWaterSavingsData = (facilityId: string | null, options?: { enabled?: boolean }) => {
  return useQuery<WaterSavingsData, Error>({
    queryKey: ['waterSavings', facilityId],
    queryFn: () => fetchWaterSavingsData(facilityId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: facilityId !== '' && (options?.enabled !== false),
  });
};

/**
 * Hook to calculate total water savings for a facility
 * @param facilityId - The ID of the facility to calculate savings for
 * @returns Object containing total savings, loading state, error, and prefetch function
 */
export const useTotalWaterSavings = (facilityId: string | null) => {
  const { data, isLoading, error } = useWaterSavingsData(facilityId);
  const totalSavings = data ? calculateTotalWaterSavings(data) : 0;
  
  return {
    totalSavings,
    isLoading,
    error,
  };
};
