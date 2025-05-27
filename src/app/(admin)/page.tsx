'use client';

import { useState, useEffect } from 'react';
// import BuildingSearchWrapper from "@/components/building/BuildingSearchWrapper";
import WaterConsumptionChart from '@/components/building/WaterConsumptionChart';
import UrinalToiletUsageChart from '@/components/building/UrinalToiletUsageChart';
import { useBuildingData } from '@/hooks/useBuildingData';
import DashboardSummary from '@/components/dashboard-summary/dashboard-summary';

// Interface for stored building data
interface StoredBuilding {
  id: string;
  name: string;
}

export default function Ecommerce() {
  const [selectedBuilding, setSelectedBuilding] = useState<StoredBuilding | null>(null);

  // Import the hook to get building data
  const { data: buildings, isLoading } = useBuildingData();

  // Load selected building from localStorage or set default on initial load
  useEffect(() => {
    // Try to get from localStorage first
    const storedBuildingJson = localStorage.getItem('selectedBuilding');
    
    if (storedBuildingJson) {
      try {
        const storedBuilding = JSON.parse(storedBuildingJson);
        setSelectedBuilding(storedBuilding);
      } catch (error) {
        console.error('Error parsing stored building:', error);
      }
    } else if (!isLoading && buildings && buildings.length > 0) {
      // If no stored building but we have buildings data, set first one as default
      const defaultBuilding = {
        id: buildings[0].id,
        name: buildings[0].name
      };
      setSelectedBuilding(defaultBuilding);
      localStorage.setItem('selectedBuilding', JSON.stringify(defaultBuilding));
    }
  }, [buildings, isLoading]);

  // const handleBuildingSelect = (building: any) => {
  //   const newSelectedBuilding = {
  //     id: building.id,
  //     name: building.name
  //   };
  //   setSelectedBuilding(newSelectedBuilding);
  //   localStorage.setItem('selectedBuilding', JSON.stringify(newSelectedBuilding));
  // };

  return (
    <div className="container mx-auto px-4">
      {/* Building Search Section
      <div className="mb-6">
        <BuildingSearchWrapper onBuildingSelect={handleBuildingSelect} />
      </div> */}

      <div className="col-span-12 space-y-6">
          <DashboardSummary />
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Water Consumption Chart */}
        <div className="col-span-12 lg:col-span-8">
          {selectedBuilding ? (
            <WaterConsumptionChart facilityId={selectedBuilding.id} buildingName={selectedBuilding.name} weekInterval={4} />
          ) : (
            <div className="p-6 text-center text-gray-500 border border-gray-200 rounded-lg">
              <p>Select a building to view water consumption data</p>
            </div>
          )}
        </div>
        
        {/* Right side panel with Urinal vs Toilet Usage Chart */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {selectedBuilding ? (
            <>
              <UrinalToiletUsageChart 
                facilityId={selectedBuilding.id}
                buildingName={selectedBuilding.name}
                weekInterval={4}
              />
            </>
          ) : (
            <div className="p-6 text-center text-gray-500 border border-gray-200 rounded-lg">
              <p>Select a building to view usage data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
