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
  const { data, isLoading, isError, error } = useUrinalToiletUsageData(facilityId, weekInterval);
  
  // Chart container with consistent styling
  const renderContainer = (content: React.ReactNode) => (
    <div className="border h-118 mt-6 border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-b from-[#001f38] to-[#001f38] text-white p-4">
        <h2 className="text-xl font-medium">Urinals vs Toilets (Male)</h2>
      </div>
      {content}
    </div>
  );

  // Loading state - show spinner outside the card
  if (!facilityId) {
    return <div className="p-6 text-center text-gray-500">Select a building to view urinal vs toilet usage data</div>;
  }
  
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading urinal vs toilet usage data...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return renderContainer(
      <div className="h-80 flex items-center justify-center">
        <p className="text-red-500">
          {error instanceof Error ? error.message : 'Error loading data'}
        </p>
      </div>
    );
  }

  // No data state
  if (!data) {
    return renderContainer(
      <div className="h-80 flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Process data with safe defaults
  const target = typeof data.target === 'number' ? data.target : 0;
  const actual = typeof data.actual === 'number' ? data.actual : 0;
  
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
