'use client';

import { useQuery } from '@tanstack/react-query';
// import { UrinalToiletUsageResponse, UrinalToiletUsageData } from '@/types/urinalToiletUsage';

/**
 * Custom hook to fetch and process urinal vs toilet usage data
 * @param facilityId - The ID of the facility to fetch data for
 * @param weekInterval - The number of weeks to fetch data for (default: 4)
 * @returns The processed urinal vs toilet usage data with loading and error states
 */
export const useAnomoliesData = (facilityId: string | null, userId: string | null) => {
    return useQuery({
        queryKey: ['anomolies', facilityId, userId],
        queryFn: async (): Promise<any> => {
            if (!facilityId || !userId) {
                throw new Error('Facility ID and User ID are required');
            }

            const response = await fetch(`/api/anomolies?UserId=${userId}&FacilityId=${facilityId}`);

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data: any = await response.json();

            // Process the data for UI display
            return {
                ...data,
            };
        },
        enabled: !!facilityId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        refetchOnWindowFocus: false,
    });
};
