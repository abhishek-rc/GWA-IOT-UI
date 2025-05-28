'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useAvgWaterPerVisitData } from '@/hooks/useAvgWaterPerVisitData';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AvgWaterPerVisitChartProps {
  facilityId: string | null;
  weekInterval?: number;
  buildingName?: string;
}

const AvgWaterPerVisitChart: React.FC<AvgWaterPerVisitChartProps> = ({ 
  facilityId, 
  weekInterval = 4,
  buildingName = 'Building'
}) => {
  const { data, isLoading } = useAvgWaterPerVisitData(facilityId, weekInterval * 7); // Convert weeks to days

  // Chart container with consistent styling
  const renderContainer = (content: React.ReactNode) => (
    <div className="border border-gray-200 rounded-lg mt-6 overflow-hidden" style={{ height: '420px' }}>
      <div className="bg-gradient-to-b from-[#001f38] to-[#001f38] text-white p-4">
        <h2 className="text-lg font-medium">Average Water Usage Per Visit</h2>
      </div>
      <div className="h-[calc(420px-56px)]">{content}</div>
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
        <p className="text-gray-500">Select a building to view water usage data</p>
      </div>
    );
  }

  // Use the data from the hook or fallback to initial values if somehow data is undefined
  const displayData = data || {
    dailyData: [],
    currentAverage: 0,
    previousAverage: 0,
    percentageChange: 0
  };

  // Format dates for display
  const dates = displayData.dailyData.map(item => {
    if (!item || !item.date) {
      // Return a fallback date string if date is undefined
      return '';
    }
    
    try {
      const dateParts = item.date.split('-');
      // Check if we have all parts before trying to access them
      if (dateParts.length === 3) {
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // YYYY-MM-DD to DD-MM-YYYY
      } else {
        // If date format is unexpected, return the original date string
        return item.date;
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      // Return the original date or empty string if there's an error
      return item.date || '';
    }
  });

  // Prepare chart data
  const currentConsumption = displayData.dailyData.map(item => item.currentConsumption);
  const previousConsumption = displayData.dailyData.map(item => item.previousConsumption);

  // Chart configuration
  const chartOptions = {
    chart: { 
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#f9d56e', '#d3d3d3'], // Gold for current, gray for previous
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: dates,
      labels: { rotate: -45, style: { fontSize: '10px' } }
    },
    yaxis: { 
      title: { text: 'Litres' },
      min: 0,
      max: 6,
      tickAmount: 3 // This will give us 0, 2, 4, 6
    },
    legend: { position: 'bottom' },
    tooltip: { y: { formatter: (value: number) => `${value.toFixed(3)} litres` } }
  };

  const chartSeries = [
    { name: 'Current 28 days Consumption', data: currentConsumption },
    { name: 'Previous 28 days Consumption', data: previousConsumption }
  ];

  // Format the percentage change with + sign for positive values
  const formattedPercentChange = displayData.percentageChange > 0 
    ? `+${displayData.percentageChange.toFixed(2)}%` 
    : `${displayData.percentageChange.toFixed(2)}%`;

  // Determine color based on change direction (higher water usage is negative)
  const percentChangeColor = displayData.percentageChange > 0 ? 'text-red-500' : 'text-green-500';
  const changeIcon = displayData.percentageChange > 0 ? ' ↑' : displayData.percentageChange < 0 ? ' ↓' : '';

  return renderContainer(
    <div className="h-full flex flex-col">
      <div className="px-4 py-3">
        <p className="text-gray-700 font-medium">Average water usage per visit (28 days)</p>
        <div className="flex flex-col space-y-1 mt-1">
          <div className="flex">
            <p className="text-gray-600 w-24">Current :</p>
            <p className="font-bold text-amber-500">{displayData.currentAverage.toFixed(3)} Litres</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 w-24">Previous :</p>
            <p className="font-bold text-gray-500">{displayData.previousAverage.toFixed(3)} Litres</p>
          </div>
          {displayData.percentageChange !== 0 && (
            <p className="text-sm">
              <span className={percentChangeColor}>
                ({formattedPercentChange}{changeIcon})
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="flex-grow">
        <Chart
          options={chartOptions as any}
          series={chartSeries}
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
};

export default AvgWaterPerVisitChart;
