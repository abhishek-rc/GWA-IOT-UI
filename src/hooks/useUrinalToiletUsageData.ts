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
        // Return initial values instead of throwing
        return getInitialUrinalToiletData();
      }

      try {
        const response = await fetch(`/api/urinal-toilet-usage?facilityId=${facilityId}&weekInterval=${weekInterval}`);
        
        if (!response.ok) {
          console.error(`Urinal vs toilet API request failed with status ${response.status}`);
          return getInitialUrinalToiletData();
        }
        
        const data: UrinalToiletUsageResponse = await response.json();
        
        // Check if data is valid
        if (!data || typeof data.target !== 'number' || typeof data.actual !== 'number') {
          console.warn('Invalid data format received from urinal vs toilet API');
          return getInitialUrinalToiletData();
        }
        
        // Process the data for UI display
        return {
          ...data,
          percentageOfTarget: data.target > 0 ? (data.actual / data.target) * 100 : 0
        };
      } catch (error) {
        console.error('Error fetching urinal vs toilet usage data:', error);
        // Return initial data instead of throwing
        return getInitialUrinalToiletData();
      }
    },
    enabled: true, // Always enabled, will return initial data if facilityId is null
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Get initial urinal vs toilet usage data with zero values
 */
function getInitialUrinalToiletData(): UrinalToiletUsageData {
  return {
    target: 0,
    actual: 0,
    toiletUsage: 0,
    urinalUsage: 0,
    percentageOfTarget: 0
  };
}
