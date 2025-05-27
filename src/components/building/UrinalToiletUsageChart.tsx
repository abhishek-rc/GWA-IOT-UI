'use client';

import React, { useState, useEffect } from 'react';
import { useUrinalToiletUsageData } from '@/hooks/useUrinalToiletUsageData';

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
  // State for client-side rendering
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Data fetching
  const { data, isLoading, isError, error } = useUrinalToiletUsageData(facilityId, weekInterval);
  
  // Initialize chart only on client-side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

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
  
  if (!isBrowser || isLoading) {
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
  
  // Dynamically import ApexCharts only on client side
  const ApexCharts = require('react-apexcharts').default;

  // Render chart with data
  return renderContainer(
    <div className="h-80 relative">
      {isBrowser && (
        <>
          <ApexCharts
            options={{
              chart: {
                type: 'radialBar',
                toolbar: { show: false }
              },
              colors: ['#001f38', '#f9d56e'], // Dark blue for actual (outer), Gold for target (inner)
              stroke: {
                lineCap: 'round'
              },
              plotOptions: {
                radialBar: {
                  startAngle: 0,
                  endAngle: 360,
                  hollow: {
                    margin: 0,
                    size: '40%',
                    background: 'transparent'
                  },
                  track: {
                    show: true,
                    background: ["rgba(0,31,56,0.3)", "rgba(231,202,75,0.3)"], // Semi-transparent background for unfilled portion
                    strokeWidth: '97%',
                    opacity: 1,
                    margin: 5,
                    dropShadow: {
                      enabled: false
                    }
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      show: true,
                      fontSize: '16px',
                      fontWeight: 600,
                      offsetY: 8
                    },
                    total: {
                      show: true,
                      label: 'Usage',
                      color: '#373d3f',
                      fontSize: '16px',
                      fontWeight: 600,
                      formatter: function() {
                        return isEmptyData ? 'No Data' : `${actual.toFixed(1)}%`;
                      }
                    }
                  }
                }
              },
              labels: ['Actual', 'Target'],
              legend: {
                show: false // Hide default legend, we'll use our custom one
              },
              tooltip: {
                enabled: !isEmptyData,
                y: { formatter: (value: number) => `${value.toFixed(1)}%` }
              }
            }}
            series={[actual, target]}
            type="radialBar"
            height="100%"
          />
          
          {/* Custom legend with flex column layout at bottom left */}
          <div className="absolute  left-7 flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="inline-block w-5 h-5 rounded-full bg-[#001f38] mr-2"></span>
              <span className="text-md font-medium">Actual</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-5 h-5 rounded-full bg-[#f9d56e] mr-2"></span>
              <span className="text-md font-medium">Target</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UrinalToiletUsageChart;
