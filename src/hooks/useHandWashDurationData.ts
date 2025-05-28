'use client';

import { useQuery } from '@tanstack/react-query';
import { HandWashDurationResponse, HandWashDurationData } from '@/types/handWashDuration';

/**
 * Custom hook to fetch and process hand wash duration data
 * @param facilityId - The ID of the facility to fetch data for
 * @param dayInterval - The number of days to fetch data for (default: 28)
 * @returns The processed hand wash duration data with loading and error states
 */
export const useHandWashDurationData = (facilityId: string | null, dayInterval: number = 28) => {
  return useQuery({
    queryKey: ['handWashDuration', facilityId, dayInterval],
    queryFn: async (): Promise<HandWashDurationData> => {
      if (!facilityId) {
        throw new Error('Facility ID is required');
      }

      const response = await fetch(`/api/TapHandWashDuration?FacilityId=${facilityId}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: HandWashDurationResponse = await response.json();
      
      // Calculate percentage change
      const percentageChange = data.previousDuration > 0 
        ? ((data.currentDuration - data.previousDuration) / data.previousDuration) * 100 
        : 0;
      
      // Process the data for UI display
      return {
        ...data,
        percentageChange
      };
    },
    enabled: !!facilityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
