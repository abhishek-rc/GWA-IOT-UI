import { useQuery } from '@tanstack/react-query';
import { WaterConsumptionData, ApiWaterConsumptionData } from '@/types/waterConsumption';

/**
 * Custom hook to fetch water consumption data for a specific facility
 */
export const useWaterConsumptionData = (facilityId: string | null, weekInterval: number = 4) => {
  return useQuery({
    queryKey: ['waterConsumption', facilityId, weekInterval],
    queryFn: async (): Promise<WaterConsumptionData[]> => {
      if (!facilityId) return [];
      
      try {
        const response = await fetch(`/api/consumption/water?facilityId=${facilityId}&weekInterval=${weekInterval}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // API returns an array with two arrays: current period and previous period
        if (!data || !Array.isArray(data) || data.length !== 2) {
          return [];
        }
        
        const currentPeriodData = data[0] as ApiWaterConsumptionData[];
        const previousPeriodData = data[1] as ApiWaterConsumptionData[];
        
        // Transform API response to match our interface
        return currentPeriodData.map((item, index) => {
          // Format date from DD-MM-YYYY to YYYY-MM-DD for consistency
          const dateParts = item.intervalPeriod.split('-');
          const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          
          return {
            date: formattedDate,
            consumption: item.avgWaterConsumption,
            // Add previous period data if available for this date index
            previousConsumption: previousPeriodData[index] ? previousPeriodData[index].avgWaterConsumption : undefined
          };
        });
      } catch (error) {
        console.error('Error fetching water consumption data:', error);
        throw error;
      }
    },
    enabled: !!facilityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
