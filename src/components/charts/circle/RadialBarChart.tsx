'use client';

import React, { useState, useEffect } from 'react';
import { RadialBarChartProps } from '@/types/charts';

/**
 * A reusable radial bar chart component that displays two concentric circles
 * representing actual and target values with customizable colors and labels.
 */
const RadialBarChart: React.FC<RadialBarChartProps> = ({
  actual,
  target,
  isEmptyData = false,
  actualLabel = 'Actual',
  targetLabel = 'Target',
  actualColor = '#001f38', // Dark blue
  targetColor = '#f9d56e', // Gold
  height = '100%'
}) => {
  // State for client-side rendering
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Initialize chart only on client-side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Only render on client side
  if (!isBrowser) {
    return <div className="h-full flex items-center justify-center">
      <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
    </div>;
  }

  // Dynamically import ApexCharts only on client side
  const ApexCharts = require('react-apexcharts').default;

  // Semi-transparent background colors for the unfilled portions
  const actualColorBg = 'rgba(0,31,56,0.3)'; // Semi-transparent dark blue
  const targetColorBg = 'rgba(249,213,110,0.3)'; // Semi-transparent gold

  return (
    <div className="relative h-full">
      <ApexCharts
        options={{
          chart: {
            type: 'radialBar',
            toolbar: { show: false }
          },
          colors: [actualColor, targetColor], // Outer ring (actual), Inner ring (target)
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
                background: [actualColorBg, targetColorBg], // Semi-transparent background for unfilled portion
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
          labels: [actualLabel, targetLabel],
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
        height={height}
      />
      
      {/* Custom legend with flex column layout at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row space-x-6">
        <div className="flex items-center">
          <span className="inline-block w-5 h-5 rounded-full" style={{ backgroundColor: actualColor }} aria-hidden="true"></span>
          <span className="text-md font-medium ml-2">{actualLabel}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-5 h-5 rounded-full" style={{ backgroundColor: targetColor }} aria-hidden="true"></span>
          <span className="text-md font-medium ml-2">{targetLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default RadialBarChart;
