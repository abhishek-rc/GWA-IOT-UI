'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useWaterSavingsData } from '@/hooks/useDashboardSummary';
import { useCarbonImpactData } from '@/hooks/useDashboardSummary';
import { useMaintenanceData } from '@/hooks/useDashboardSummary';
import DashboardSummaryDetails from './dashboard-summary-detail';

export type MetricType = 
  | 'waterSavings' 
  | 'ecoValves' 
  | 'maintenance' 
  | 'hygieneIndex' 
  | 'fixtureHealth' 
  | 'carbonImpact' 
  | 'dolphinSystem' 

interface DashboardSummaryProps {
  facilityId: string | null;
  weekInterval?: number;
  buildingName?: string;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ facilityId, buildingName }) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('waterSavings');
  
  const { data, isLoading } = useWaterSavingsData(facilityId);
  const { data: carbonData, isLoading: isLoadingCarbon } = useCarbonImpactData(
    data?.estimatedWaterSavingsData
  );
  const { data: maintenanceData, isLoading: isLoadingMaintenance } = useMaintenanceData(facilityId);

  const handleTileClick = (metricId: MetricType) => {
    setSelectedMetric(metricId);
  };

  console.log(">>>>>MaintenanceData", maintenanceData)

  // Helper function to determine background color based on card state
  const getMaintenanceCardBgColor = (cardState?: string) => {
    switch (cardState) {
      case 'red_stats':
        return 'bg-red-100 text-red-900';
      case 'amber_stats':
        return 'bg-amber-100 text-amber-900';
      case 'green_stats':
        return 'bg-emerald-100 text-emerald-900';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6"> 
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
                  {!isLoading && data?.estimatedWaterSavingsData[0].StatValue}
                  <span className="text-sm ml-1">{data?.estimatedWaterSavingsData[0].StatDescription}</span>
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
            
            {/* Maintenance Issues Tile */}
            <div 
              className={`${getMaintenanceCardBgColor(maintenanceData?.cardState)} h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${selectedMetric === 'maintenance' ? 'ring-2 ring-[#1A6988] shadow-lg' : 'hover:shadow-md'}`}
              onClick={() => handleTileClick('maintenance')}
            >
              <div className="flex-grow p-4 flex flex-col items-center justify-center">
                {isLoadingMaintenance ? (
                  <div className="text-center">
                    <div className="animate-pulse h-10 w-20 bg-gray-200 rounded mx-auto"></div>
                  </div>
                ) : !maintenanceData?.hasQRCodeFeedback ? (
                  <div className="text-center text-gray-500">
                    <div>No QR code feedback available</div>
                  </div>
                ) : maintenanceData.maintenanceStatsData.length === 0 ? (
                  <div className="text-center text-green-600">
                    <div>No maintenance issues</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {maintenanceData.maintenanceStatsData.map((stat, index) => (
                      <div key={index} className="mb-2 text-center">
                        <div className="text-4xl font-bold">
                          {stat.StatValue}
                        </div>
                        <div className="text-sm mt-1">{stat.StatDescription}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-[#1A6988] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
                  <Image 
                    src="/images/dashboard-summary/maintenance-icon.svg" 
                    alt="Maintenance Issues" 
                    width={18} 
                    height={18} 
                    className="object-contain" 
                  />
                </div>
                <div className="text-sm font-medium text-center mt-2">Maintenance Issues</div>
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
                {isLoadingCarbon ? (
                  <div className="text-center">
                    <div className="animate-pulse h-10 w-20 bg-emerald-200 rounded mx-auto"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl font-bold text-center">
                      {carbonData?.carbonImpactData.toFixed(2)}
                      <span className="text-sm ml-1">kg</span>
                    </div>
                    <div className="text-sm mt-1 text-center">Carbon Impact</div>
                    <div className="text-sm mt-1 text-center">${carbonData?.carbonOffsetData.toFixed(2)}</div>
                    <div className="text-sm mt-1 text-center">Carbon Offset</div>
                  </>
                )}
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
            facilityId={facilityId}
          />
        </div>
      </div>
    </div>
  
  );
};

export default DashboardSummary;
