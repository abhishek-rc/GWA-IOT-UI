'use client';

import React, { useState, useEffect } from 'react';
import { useHandWashDurationData } from '@/hooks/useHandWashDurationData';

// Define props interface
interface HandWashDurationChartProps {
  facilityId: string | null;
  dayInterval?: number;
  buildingName?: string;
}

const HandWashDurationChart: React.FC<HandWashDurationChartProps> = ({ 
  facilityId, 
  dayInterval = 28,
  buildingName = 'Building'
}) => {
  // State for client-side rendering
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Data fetching
  const { data, isLoading, isError, error } = useHandWashDurationData(facilityId, dayInterval);
  
  // Initialize chart only on client-side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Chart container with consistent styling
  const renderContainer = (content: React.ReactNode) => (
    <div className="border mt-6 border-gray-200 rounded-lg overflow-hidden" style={{ height: '420px' }}>
      <div className="bg-gradient-to-b from-[#001f38] to-[#001f38] text-white p-4">
        <h2 className="text-lg font-medium">Average Hand-Wash Duration</h2>
      </div>
      <div className="h-[calc(420px-56px)]">{content}</div>
    </div>
  );

  // Loading state - show spinner outside the card
  if (!facilityId) {
    return <div className="p-6 text-center text-gray-500">Select a building to view hand wash duration data</div>;
  }
  
  if (!isBrowser || isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading hand wash duration data...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return renderContainer(
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">
          {error instanceof Error ? error.message : 'Error loading data'}
        </p>
      </div>
    );
  }

  // No data state
  if (!data) {
    return renderContainer(
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Process data with safe defaults
  const currentDuration = typeof data.currentDuration === 'number' ? data.currentDuration : 0;
  const previousDuration = typeof data.previousDuration === 'number' ? data.previousDuration : 0;
  const dailyData = Array.isArray(data.dailyData) ? data.dailyData : [];
  
  // Format dates for the chart
  const formattedDailyData = dailyData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
    currentDuration: day.currentDuration,
    previousDuration: day.previousDuration
  }));
  
  // Dynamically import ApexCharts only on client side
  const ApexCharts = require('react-apexcharts').default;

  // Render chart with data
  return renderContainer(
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <p className="text-gray-600">Average Hand-Wash Duration ({dayInterval} days)</p>
        <div className="flex flex-col mt-1">
          <div className="flex">
            <p className="text-gray-600 w-24">Current :</p>
            <p className="font-bold text-green-500">{currentDuration.toFixed(3)} seconds</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 w-24">Previous :</p>
            <p className="font-bold text-gray-500">{previousDuration.toFixed(3)} seconds</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        {isBrowser && (
          <ApexCharts
            options={{
              chart: {
                type: 'area',
                toolbar: { show: false },
                zoom: { enabled: false },
                animations: {
                  enabled: true,
                  easing: 'easeinout',
                  speed: 800,
                }
              },
              colors: ['#e2e8f0', '#10b981'], // Light gray for previous, green for current
              stroke: {
                curve: 'smooth',
                width: 2
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.3,
                  stops: [0, 90, 100]
                }
              },
              dataLabels: { enabled: false },
              grid: {
                borderColor: '#f1f1f1',
                row: { colors: ['transparent'], opacity: 0.5 }
              },
              xaxis: {
                categories: formattedDailyData.map(d => d.date),
                labels: {
                  rotate: -45,
                  style: { fontSize: '10px' }
                },
                tickAmount: 10,
                axisBorder: { show: false },
                axisTicks: { show: false }
              },
              yaxis: {
                title: { text: 'Seconds' },
                min: 0,
                max: 20,
                tickAmount: 4, // This will give us 0, 5, 10, 15, 20
                decimalsInFloat: 0
              },
              legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                offsetY: 10,
                itemMargin: { horizontal: 10, vertical: 0 }
              },
              tooltip: {
                x: { show: true },
                y: { formatter: (value: number) => `${value.toFixed(2)} seconds` }
              },
              markers: {
                size: 0,
                hover: { size: 5 }
              }
            }}
            series={[
              {
                name: 'Previous 28 days Duration',
                data: formattedDailyData.map(d => d.previousDuration)
              },
              {
                name: 'Current 28 days Duration',
                data: formattedDailyData.map(d => d.currentDuration)
              }
            ]}
            type="area"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default HandWashDurationChart;
