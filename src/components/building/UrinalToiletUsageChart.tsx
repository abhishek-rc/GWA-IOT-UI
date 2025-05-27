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
      <div className="px-4 py-2">
        <div>
          <p className="text-gray-600">Target vs Actual Usage</p>
        </div>
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
    <div className="h-80">
      {isBrowser && (
        <ApexCharts
          options={{
            chart: {
              type: 'donut',
              toolbar: { show: false }
            },
            colors: isEmptyData ? ['#d1d5db', '#e5e7eb'] : ['#001f38', '#f9d56e'],
            labels: ['Target', 'Actual'],
            dataLabels: { enabled: false },
            legend: {
              position: 'bottom',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              markers: {
                width: 12,
                height: 12,
                radius: 12
              },
              itemMargin: {
                horizontal: 10,
                vertical: 0
              }
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '70%',
                  labels: {
                    show: true,
                    name: { show: false },
                    value: {
                      show: true,
                      fontSize: '22px',
                      fontWeight: 600,
                      color: isEmptyData ? '#9ca3af' : '#f9d56e',
                      formatter: function() {
                        return isEmptyData ? 'No Data' : `${actual.toFixed(1)}%`;
                      }
                    },
                    total: { show: false }
                  }
                }
              }
            },
            stroke: { width: 0 },
            tooltip: {
              enabled: !isEmptyData,
              y: { formatter: (value: number) => `${value.toFixed(1)}%` }
            }
          }}
          series={[target, actual]}
          type="donut"
          height="100%"
        />
      )}
    </div>
  );
};

export default UrinalToiletUsageChart;
