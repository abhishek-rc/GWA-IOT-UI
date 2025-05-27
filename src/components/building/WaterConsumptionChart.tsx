'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useWaterConsumptionData } from '@/hooks/useWaterConsumptionData';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface WaterConsumptionChartProps {
  facilityId: string | null;
  weekInterval?: number;
  buildingName?: string;
}

const WaterConsumptionChart: React.FC<WaterConsumptionChartProps> = ({ facilityId, weekInterval = 4, buildingName = 'Building' }) => {
  const { data, isLoading, isError, error } = useWaterConsumptionData(facilityId, weekInterval);

  // Early returns for different states
  if (!facilityId) {
    return <div className="p-6 text-center text-gray-500">Select a building to view water consumption data</div>;
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading water consumption data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading water consumption data: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="p-6 text-center text-gray-500">No water consumption data available</div>;
  }

  // Process chart data - reverse to show in chronological order
  const processedData = [...data].reverse();
  const dates = processedData.map(item => {
    const dateParts = item.date.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // YYYY-MM-DD to DD-MM-YYYY
  });
  const currentConsumption = processedData.map(item => item.consumption);
  const previousConsumption = processedData.map(item => item.previousConsumption || 0);

  // Calculate summary metrics
  const totalCurrent = currentConsumption.reduce((sum, value) => sum + value, 0);
  const totalPrevious = previousConsumption.reduce((sum, value) => sum + value, 0);
  const percentChange = totalPrevious > 0 
    ? ((totalCurrent - totalPrevious) / totalPrevious * 100).toFixed(2)
    : '0.00';

  // Chart configuration
  const chartOptions = {
    chart: { type: 'line', toolbar: { show: false }, zoom: { enabled: false } },
    colors: ['#2563eb', '#94a3b8'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
    xaxis: {
      categories: dates,
      labels: { rotate: -45, style: { fontSize: '10px' } }
    },
    yaxis: { title: { text: 'Kilolitres' } },
    legend: { position: 'top' },
    tooltip: { y: { formatter: (value: number) => `${value.toFixed(3)} kilolitres` } }
  };

  const chartSeries = [
    { name: 'Current Consumption', data: currentConsumption },
    { name: 'Previous Consumption', data: previousConsumption }
  ];

  return (
    <div className="mb-8 border border-gray-200 rounded-lg mt-6 overflow-hidden">
      <div className="bg-gradient-to-b from-[#001f38] to-[#001f38] text-white p-4">
        <h2 className="text-xl font-medium">Total water usage - {buildingName}</h2>
      </div>
      
      <div className="px-4 py-2">
        <div className="">
          <p className="text-gray-600">
            Total consumption ({weekInterval} days) - 
            <span className={`text-red-500`}>
              ({parseFloat(percentChange) > 0 ? '+' : ''}{percentChange}%
              {parseFloat(percentChange) > 0 ? ' ↑' : parseFloat(percentChange) < 0 ? ' ↓' : ''})
            </span>
          </p>
          
          <div className="space-y-1">
            <div className="flex">
              <p className="text-gray-600 w-24 ">Current :</p>
              <p className="font-bold text-blue-600">{totalCurrent.toFixed(3)} kilolitres</p>
            </div>
            <div className="flex">
              <p className="text-gray-600 w-24">Previous :</p>
              <p className="font-bold text-gray-500">{totalPrevious.toFixed(3)} kilolitres</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <Chart
          options={chartOptions as any}
          series={chartSeries}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
};

export default WaterConsumptionChart;
