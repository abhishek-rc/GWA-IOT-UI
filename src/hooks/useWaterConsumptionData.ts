import { useQuery } from '@tanstack/react-query';
import { WaterConsumptionData, ApiWaterConsumptionData } from '@/types/waterConsumption';

/**
 * Custom hook to fetch water consumption data for a specific facility
 */
export const useWaterConsumptionData = (facilityId: string | null, weekInterval: number = 4) => {
  return useQuery({
    queryKey: ['waterConsumption', facilityId, weekInterval],
    queryFn: async (): Promise<WaterConsumptionData[]> => {
      if (!facilityId) return getInitialWaterData(weekInterval);
      
      try {
        const response = await fetch(`/api/consumption/water?facilityId=${facilityId}&weekInterval=${weekInterval}`);
        
        if (!response.ok) {
          console.error(`API request failed with status ${response.status}`);
          return getInitialWaterData(weekInterval);
        }
        
        const data = await response.json();
        
        // API returns an array with two arrays: current period and previous period
        if (!data || !Array.isArray(data) || data.length !== 2) {
          console.warn('Invalid data format received from water consumption API');
          return getInitialWaterData(weekInterval);
        }
        
        const currentPeriodData = data[0] as ApiWaterConsumptionData[];
        const previousPeriodData = data[1] as ApiWaterConsumptionData[];
        
        // If arrays are empty, return initial data
        if (!currentPeriodData.length || !previousPeriodData.length) {
          return getInitialWaterData(weekInterval);
        }
        
        // Transform API response to match our interface
        return currentPeriodData.map((item, index) => {
          try {
            // Format date from DD-MM-YYYY to YYYY-MM-DD for consistency
            const dateParts = item.intervalPeriod.split('-');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            
            return {
              date: formattedDate,
              consumption: item.avgWaterConsumption || 0,
              // Add previous period data if available for this date index
              previousConsumption: previousPeriodData[index] ? previousPeriodData[index].avgWaterConsumption || 0 : 0
            };
          } catch (err) {
            // If there's an error processing an item, use a default value
            console.error('Error processing water consumption data item:', err);
            const date = new Date();
            date.setDate(date.getDate() - (weekInterval - index));
            return {
              date: date.toISOString().split('T')[0],
              consumption: 0,
              previousConsumption: 0
            };
          }
        });
      } catch (error) {
        console.error('Error fetching water consumption data:', error);
        // Return initial data instead of throwing
        return getInitialWaterData(weekInterval);
      }
    },
    enabled: true, // Always enabled, will return initial data if facilityId is null
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Increase retry attempts
    refetchOnWindowFocus: false,
  });
};

/**
 * Get initial water consumption data with zero values
 */
function getInitialWaterData(weekInterval: number): WaterConsumptionData[] {
  const result: WaterConsumptionData[] = [];
  const today = new Date();
  
  for (let i = 0; i < weekInterval; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    result.push({
      date: formattedDate,
      consumption: 0,
      previousConsumption: 0
    });
  }
  
  // Sort by date ascending
  return result.sort((a, b) => a.date.localeCompare(b.date));
}
