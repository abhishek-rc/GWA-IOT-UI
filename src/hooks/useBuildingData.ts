import { useQuery } from '@tanstack/react-query';
import { Building } from '@/types/building';

// Custom hook to fetch building data
export const useBuildingData = () => {
  return useQuery({
    queryKey: ['buildingDetails'],
    queryFn: async (): Promise<Building[]> => {
      const response = await fetch('/api/buildings');
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      
      const data = await response.json();
      
      // Transform API response to match Building interface
      if (!data || !Array.isArray(data)) return [];
      
      return data.map((item: any) => ({
        id: item.buildingId || item.id || '',
        name: item.buildingName || item.name || '',
        address: item.address || '',
        totalArea: parseFloat(item.totalArea) || 0,
        floors: parseInt(item.floors) || 0,
        energyUsage: parseFloat(item.energyUsage) || 0,
        waterUsage: parseFloat(item.waterUsage) || 0,
        occupancy: parseFloat(item.occupancy) || 0,
        lastUpdated: item.lastUpdated ? new Date(item.lastUpdated) : new Date()
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
