'use client';

import React from 'react';
import RadialBarChart from '@/components/charts/circle/RadialBarChart';
import { useFullFlushHalfFlushRatioData } from '@/hooks/useFullFlushHalfFlushRatioData';

interface HalfFlushPercentageChartProps {
  facilityId: string | null;
  buildingName?: string;
}

/**
 * Component to display the half flush percentage using a radial bar chart
 */
const HalfFlushPercentageChart: React.FC<HalfFlushPercentageChartProps> = ({ 
  facilityId,
  buildingName = 'Building'
}) => {
  // Fetch data using the custom hook
  const { data, isLoading, isError } = useFullFlushHalfFlushRatioData(facilityId);

  // Chart container with consistent styling
  const renderContainer = (content: React.ReactNode) => (
    <div className="border border-gray-200 rounded-lg mt-6 overflow-hidden" style={{ height: '420px' }}>
      <div className="bg-gradient-to-b from-[#001f38] to-[#001f38] text-white p-4">
        <h2 className="text-lg font-medium">Half flush percentage</h2>
      </div>
      <div className="relative h-[calc(420px-56px)]" style={{ overflow: 'visible' }}>
        {content}
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return renderContainer(
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600 ml-3">Loading data...</p>
      </div>
    );
  }

  // If no facility is selected, show a message but maintain the component structure
  if (!facilityId) {
    return renderContainer(
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a building to view half flush percentage data</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return renderContainer(
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading half flush percentage data</p>
      </div>
    );
  }

  // Use the data from the hook or fallback to initial values if somehow data is undefined
  const displayData = data || {
    halfFlushRatio: 0,
    targetHalfFlushRatio: 0,
    fullFlushRatio: 0,
    targetFullFlushRatio: 0,
    isEmptyData: true
  };

  return renderContainer(
    <div className="h-full">      
      <div className="h-full">
        <RadialBarChart
          actual={displayData.halfFlushRatio}
          target={displayData.targetHalfFlushRatio}
          isEmptyData={displayData.isEmptyData}
          actualLabel="Actual"
          targetLabel="Target"
          actualColor="#001f38" // Dark blue for target
          targetColor="#f9d56e" // Gold for actual
          height="100%"
        />
      </div>
    </div>
  );
};

export default HalfFlushPercentageChart;
