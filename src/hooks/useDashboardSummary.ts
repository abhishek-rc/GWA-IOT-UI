import { useQuery } from '@tanstack/react-query';
import { getEstimatedWaterSavingsData, WaterSavingsData, getCarbonImpactOffsetData } from '@/services/dashboardApi';

/**
 * Hook to fetch water savings data for a specific facility
 * @param facilityId - The ID of the facility to fetch data for
 * @param options - Optional configuration for the query
 * @returns Query result with water savings data
 */
export const useWaterSavingsData = (facilityId: string | null, options?: { enabled?: boolean }) => {
  // Define the return type of getEstimatedWaterSavingsData
  interface WaterSavingsResponse {
    estimatedWaterSavingsData: { StatValue: string; StatDescription: string }[];
    waterSavingsData: WaterSavingsData;
    cardState: string;
  }

  return useQuery<WaterSavingsResponse, Error>({
    queryKey: ['waterSavings', facilityId],
    queryFn: () => getEstimatedWaterSavingsData(facilityId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: facilityId !== '' && (options?.enabled !== false),
  });
};

/**
 * Hook to get carbon impact data based on water savings data
 * @param waterSavingsData - The water savings data to calculate carbon impact from
 * @param options - Optional configuration for the query
 * @returns Query result with carbon impact data
 */
export const useCarbonImpactData = (
  waterSavingsData: { StatValue: string; StatDescription: string }[] | undefined,
  options?: { enabled?: boolean }
) => {
  interface CarbonImpactResponse {
    carbonImpactData: number;
    carbonOffsetData: number;
    cardState: string;
  }

  return useQuery<CarbonImpactResponse, Error>({
    queryKey: ['carbonImpact', waterSavingsData],
    queryFn: () => getCarbonImpactOffsetData(waterSavingsData || []),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!waterSavingsData && (options?.enabled !== false),
  });
};
