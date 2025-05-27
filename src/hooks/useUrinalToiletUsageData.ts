'use client';

import { useQuery } from '@tanstack/react-query';
import { UrinalToiletUsageResponse, UrinalToiletUsageData } from '@/types/urinalToiletUsage';

/**
 * Custom hook to fetch and process urinal vs toilet usage data
 * @param facilityId - The ID of the facility to fetch data for
 * @param weekInterval - The number of weeks to fetch data for (default: 4)
 * @returns The processed urinal vs toilet usage data with loading and error states
 */
export const useUrinalToiletUsageData = (facilityId: string | null, weekInterval: number = 4) => {
  return useQuery({
    queryKey: ['urinalToiletUsage', facilityId, weekInterval],
    queryFn: async (): Promise<UrinalToiletUsageData> => {
      if (!facilityId) {
        throw new Error('Facility ID is required');
      }

      const response = await fetch(`/api/urinal-toilet-usage?facilityId=${facilityId}&weekInterval=${weekInterval}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: UrinalToiletUsageResponse = await response.json();
      
      // Process the data for UI display
      return {
        ...data,
        percentageOfTarget: data.target > 0 ? (data.actual / data.target) * 100 : 0
      };
    },
    enabled: !!facilityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
