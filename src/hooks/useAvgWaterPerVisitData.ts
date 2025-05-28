'use client';

import { useQuery } from '@tanstack/react-query';
import { AvgWaterPerVisitResponse, AvgWaterPerVisitData, AvgWaterPerVisitDailyData } from '@/types/avgWaterPerVisit';

/**
 * Custom hook to fetch and process average water consumption per visit data
 * @param facilityId - The ID of the facility to fetch data for
 * @param weekInterval - The number of weeks to fetch data for (default: 4)
 * @returns The processed average water consumption per visit data with loading and error states
 */
export const useAvgWaterPerVisitData = (facilityId: string | null, weekInterval: number = 4) => {
  return useQuery({
    queryKey: ['avgWaterPerVisit', facilityId, weekInterval],
    queryFn: async (): Promise<AvgWaterPerVisitData> => {
      if (!facilityId) return getInitialData();
      
      try {
        const response = await fetch(`/api/consumption/avgWaterPerVisit?facilityId=${facilityId}&weekInterval=${weekInterval}`);
        
        if (!response.ok) {
          console.error(`API request failed with status ${response.status}`);
          return getInitialData();
        }
        
        const data: AvgWaterPerVisitResponse[] = await response.json();
        
        // Check if data is valid
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.warn('Invalid data format received from avgWaterPerVisit API');
          return getInitialData();
        }
        
        // Process the data for UI display
        const dailyData: AvgWaterPerVisitDailyData[] = data.map(item => ({
          date: formatDate(item.date),
          currentConsumption: item.currentConsumption || 0,
          previousConsumption: item.previousConsumption || 0
        }));
        
        // Calculate averages
        const currentAverage = calculateAverage(dailyData.map(item => item.currentConsumption));
        const previousAverage = calculateAverage(dailyData.map(item => item.previousConsumption));
        
        // Calculate percentage change
        const percentageChange = previousAverage > 0 
          ? ((currentAverage - previousAverage) / previousAverage) * 100
          : 0;
        
        return {
          dailyData,
          currentAverage,
          previousAverage,
          percentageChange
        };
      } catch (error) {
        console.error('Error fetching average water consumption per visit data:', error);
        return getInitialData();
      }
    },
    enabled: true, // Always enabled, will return initial data if facilityId is null
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Format date string to YYYY-MM-DD format
 */
function formatDate(dateStr: string): string {
  try {
    // Check if date is already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    // Check if date is in DD-MM-YYYY format
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    // Try to parse as Date object
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    
    // Return original if parsing fails
    return dateStr;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
}

/**
 * Calculate average of an array of numbers
 */
function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

/**
 * Get initial data with zero values
 */
function getInitialData(): AvgWaterPerVisitData {
  const dailyData: AvgWaterPerVisitDailyData[] = [];
  const today = new Date();
  
  // Generate 28 days of empty data
  for (let i = 0; i < 28; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    
    dailyData.push({
      date: formattedDate,
      currentConsumption: 0,
      previousConsumption: 0
    });
  }
  
  // Sort by date ascending
  dailyData.sort((a, b) => a.date.localeCompare(b.date));
  
  return {
    dailyData,
    currentAverage: 0,
    previousAverage: 0,
    percentageChange: 0
  };
}
