'use client';

import React from 'react';
import { useUrinalToiletUsageData } from '@/hooks/useUrinalToiletUsageData';
import RadialBarChart from '../charts/circle/RadialBarChart';


// Define props interface
interface UrinalToiletUsageChartProps {
  facilityId: string | null;
  weekInterval?: number;
  buildingName?: string;
}

const UrinalToiletUsageChart: React.FC<UrinalToiletUsageChartProps> = ({ 
  facilityId, 
  weekInterval = 4,
  buildingName = 'Building'
}) => {
  // Data fetching
  const { data, isLoading } = useUrinalToiletUsageData(facilityId, weekInterval);
  
  // Chart container with consistent styling
  const renderContainer = (content: React.ReactNode) => (
    <div className="border h-118 mt-6 border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-b from-[#001f38] to-[#001f38] text-white p-4">
        <h2 className="text-xl font-medium">Urinals vs Toilets (Male)</h2>
      </div>
      {content}
    </div>
  );

  // If no facility is selected, show a message but maintain the component structure
  if (!facilityId) {
    return renderContainer(
      <div className="h-80 flex items-center justify-center">
        <p className="text-gray-500">Select a building to view urinal vs toilet usage data</p>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return renderContainer(
      <div className="h-80 flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading urinal vs toilet usage data...</p>
      </div>
    );
  }
  
  // Use the data from the hook or fallback to initial values if somehow data is undefined
  const displayData = data || {
    target: 0,
    actual: 0,
    toiletUsage: 0,
    urinalUsage: 0,
    percentageOfTarget: 0
  };

  // Process data with safe defaults
  const target = typeof displayData.target === 'number' ? displayData.target : 0;
  const actual = typeof displayData.actual === 'number' ? displayData.actual : 0;
  
  // Check if data is empty (both values are 0)
  const isEmptyData = target === 0 && actual === 0;

  // Render chart with data using the reusable RadialBarChart component
  return renderContainer(
    <div className="h-80">
      <RadialBarChart
        actual={actual}
        target={target}
        isEmptyData={isEmptyData}
        actualLabel="Actual"
        targetLabel="Target"
        actualColor="#001f38" // Dark blue
        targetColor="#f9d56e" // Gold
        height="100%"
      />
    </div>
  );
};

export default UrinalToiletUsageChart;
