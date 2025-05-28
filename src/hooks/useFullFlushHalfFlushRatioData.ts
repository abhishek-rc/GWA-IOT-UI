'use client';

import { useQuery } from '@tanstack/react-query';
import { FullFlushHalfFlushRatioData } from '@/types/fullFlushHalfFlushRatio';

/**
 * Custom hook to fetch and process Full Flush Half Flush Ratio data
 * @param facilityId - The ID of the facility to fetch data for
 * @returns The processed Full Flush Half Flush Ratio data with loading and error states
 */
export const useFullFlushHalfFlushRatioData = (facilityId: string | null) => {
  return useQuery({
    queryKey: ['fullFlushHalfFlushRatio', facilityId],
    queryFn: async (): Promise<FullFlushHalfFlushRatioData> => {
      if (!facilityId) {
        return getInitialData();
      }

      try {
        const response = await fetch(`/api/FullFlushHalfFlushRatio?FacilityId=${facilityId}`, {
          cache: 'no-store'
        });

        if (!response.ok) {
          console.error(`API request failed with status ${response.status}`);
          return getInitialData();
        }

        const data = await response.json();
        
        // Check if the response is an error object
        if (data && data.error) {
          console.warn(`API returned error: ${data.error}`);
          return getInitialData();
        }

        // Check if data is valid
        if (!data || !Array.isArray(data) || data.length < 2) {
          console.warn('Invalid data format received from FullFlushHalfFlushRatio API');
          return getInitialData();
        }

        // Extract target and actual values
        let targetValue = data[0][0]?.TargetFullFlushHalfFlushRatio ?? 0;
        const actualValue = data[1][0]?.FullFlushHalfFlushRatio ?? 0;

        // If API returns zero values, we'll use them but set a minimum target
        // This ensures the chart still displays something meaningful
        if (targetValue === 0) {
          console.log('API returned zero target value, using default target');
          targetValue = 70; // Default target if API returns 0
        }

        // Calculate full flush ratios (complement of half flush ratios)
        const halfFlushRatio = actualValue;
        const targetHalfFlushRatio = targetValue;
        const fullFlushRatio = 100 - actualValue;
        const targetFullFlushRatio = 100 - targetValue;

        // We'll show the chart even if the actual value is 0
        // This allows us to display the target value as a reference
        const isEmptyData = false;

        return {
          halfFlushRatio,
          targetHalfFlushRatio,
          fullFlushRatio,
          targetFullFlushRatio,
          isEmptyData
        };
      } catch (error) {
        console.error('Error fetching Full Flush Half Flush Ratio data:', error);
        return getInitialData();
      }
    },
    enabled: !!facilityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Get initial data with zero values
 */
function getInitialData(): FullFlushHalfFlushRatioData {
  return {
    halfFlushRatio: 0,
    targetHalfFlushRatio: 0,
    fullFlushRatio: 0,
    targetFullFlushRatio: 0,
    isEmptyData: true
  };
}
