'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTotalWaterSavings } from '@/hooks/useDashboardSummary';
import DashboardSummaryDetails from './dashboard-summary-detail';
import BuildingSearchWrapper from '../building/BuildingSearchWrapper';
import { Building } from '@/types/building';

export type MetricType = 
  | 'waterSavings' 
  | 'ecoValves' 
  | 'maintenance' 
  | 'hygieneIndex' 
  | 'fixtureHealth' 
  | 'carbonImpact' 
  | 'dolphinSystem' 


const DashboardSummary: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('waterSavings');
  const [selectedFacility, setSelectedFacility] = useState<string>("31c03a25-3e33-11e9-82bc-86be77476276");
  const [buildingName, setBuildingName] = useState<string>("1 Martin Place - G2");
  
  const { totalSavings, isLoading } = useTotalWaterSavings(selectedFacility);

  useEffect(() => {
    const savedBuilding = localStorage.getItem('selectedBuilding');
    if (savedBuilding) {
      try {
        const building = JSON.parse(savedBuilding);
        setSelectedFacility(building.id);
        setBuildingName(building.name);
      } catch (error) {
        console.error('Error parsing saved building:', error);
      }
    }
  }, []);

  const handleTileClick = (metricId: MetricType) => {
    setSelectedMetric(metricId);
  };

  const handleBuildingSelect = (building: Building) => {
    setSelectedFacility(building.id);
    setBuildingName(building.name);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <BuildingSearchWrapper onBuildingSelect={handleBuildingSelect} />
      </div>
      
      <div className="grid grid-cols-12 rounded-2xl border border-gray-200 bg-white">
        <div className="col-span-12 bg-[#001f38] rounded-tl-2xl rounded-tr-2xl">
          <h2 className="text-lg font-semibold text-white py-3 px-5">
            Summary - {buildingName}</h2>
        </div>
        <div className="col-span-12 xl:col-span-6 p-5">
          <div className="grid grid-cols-3 gap-4">
            {/* Water Savings Tile (from API data) */}
            <div 
              className={`bg-emerald-100 text-emerald-900 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'waterSavings' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('waterSavings')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">
                  {!isLoading && totalSavings.toFixed(2)}
                  <span className="text-sm ml-1">kL</span>
                </div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/water-drop-icon.svg" 
                    alt="Est. Water Savings so far" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Est. Water Savings so far</div>
              </div>
            </div>
            
            {/* Eco Valves Tile */}
            <div 
              className={`bg-amber-100 text-amber-900 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'ecoValves' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('ecoValves')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">17</div>
                <div className="text-sm mt-1 text-center">Warning(s)</div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/valve-icon.svg" 
                    alt="Eco Valves" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Eco Valves</div>
              </div>
            </div>
            
            {/* Maintenance Tile */}
            <div 
              className={`bg-emerald-100 text-emerald-900 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'maintenance' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('maintenance')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-lg font-medium text-center">Maintenance</div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/maintenance-icon.svg" 
                    alt="Maintenance" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Maintenance</div>
              </div>
            </div>
            
            {/* Hygiene Index Tile */}
            <div 
              className={`bg-emerald-100 text-emerald-900 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'hygieneIndex' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('hygieneIndex')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-lg font-medium text-center">Hygiene Index</div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/hygiene-icon.svg" 
                    alt="Hygiene Index" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Hygiene Index</div>
              </div>
            </div>
            
            {/* Fixture Health Tile */}
            <div 
              className={`bg-red-200 text-red-900 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'fixtureHealth' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('fixtureHealth')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">01</div>
                <div className="text-sm mt-1 text-center">29</div>
                <div className="text-sm mt-1 text-center">Warning(s)</div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/fixture-icon.svg" 
                    alt="Fixture Health" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Fixture Health</div>
              </div>
            </div>
            
            {/* Carbon Impact Tile */}
            <div 
              className={`bg-emerald-100 text-emerald-900 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'carbonImpact' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('carbonImpact')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">
                  631.90
                  <span className="text-sm ml-1">kg</span>
                </div>
                <div className="text-sm mt-1 text-center">Carbon Impact</div>
                <div className="text-sm mt-1 text-center">$12.64</div>
                <div className="text-sm mt-1 text-center">Carbon Offset</div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/carbon-icon.svg" 
                    alt="Carbon Impact/Offset" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Carbon Impact/Offset</div>
              </div>
            </div>
            
            {/* Dolphin System Tile */}
            <div 
              className={`bg-gray-300 text-gray-700 h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'dolphinSystem' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('dolphinSystem')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">Not Supported</div>
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/dolphin-icon.svg" 
                    alt="Dolphin System" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Dolphin System</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 xl:col-span-6 p-5">
          <DashboardSummaryDetails 
            selectedMetric={selectedMetric} 
            facilityId={selectedFacility}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
