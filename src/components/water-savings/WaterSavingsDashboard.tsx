'use client'
import React, { useState } from 'react';
import WaterSavingsTile from './WaterSavingsTile';
import WaterSavingsDetails from './WaterSavingsDetails';


// Define types for the dashboard metrics
export type MetricType = 
  | 'waterSavings' 
  | 'ecoValves' 
  | 'maintenance' 
  | 'loadReduced' 
  | 'fixtureHealth' 
  | 'carbonImpact' 
  | 'dolphinSystem' 
  | 'hygieneIndex'
  | 'other';

// Define the data for each metric tile
const metricsData = [
  {
    id: 'waterSavings',
    title: 'Est. Water Savings so far',
    value: '710',
    unit: 'kL',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-900'
  },
  {
    id: 'ecoValves',
    title: 'Eco Valves',
    value: '17',
    subtext: 'Warning(s)',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-900'
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    icon: '/images/maintenance-icon.svg',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-900'
  },
  {
    id: 'loadReduced',
    title: 'Load Reduced',
    value: '6.26',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-900'
  },
  {
    id: 'fixtureHealth',
    title: 'Fixture Health',
    value: '01',
    subtext: '29',
    subtext2: 'Warning(s)',
    bgColor: 'bg-red-200',
    textColor: 'text-red-900'
  },
  {
    id: 'carbonImpact',
    title: 'Carbon Impact/Offset',
    value: '631.90',
    unit: 'kg',
    subtext: 'Carbon Impact',
    subtext2: '$12.64',
    subtext3: 'Carbon Offset',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-900'
  },
  {
    id: 'hygieneIndex',
    title: 'Hygiene Index',
    value: '',
    icon: '/images/hygiene-icon.svg',
    bgColor: 'bg-blue-700',
    textColor: 'text-white'
  },
  {
    id: 'dolphinSystem',
    title: 'Dolphin System',
    value: 'Not Supported',
    bgColor: 'bg-gray-300',
    textColor: 'text-gray-700'
  },
  {
    id: 'other',
    title: '',
    value: '',
    bgColor: 'bg-white',
    textColor: 'text-gray-900'
  }
];

// Water savings details data
const waterSavingsDetails = [
  { id: 1, title: '2.42 kL Saved', subtitle: 'By Eco Valve (Urinal Valve)' },
  { id: 2, title: '1.96 kL Saved', subtitle: 'By Eco Valve (Toilet Valve)' },
  { id: 3, title: '482.57 kL Saved', subtitle: 'By Eco Valve (Shower Valve)' },
  { id: 4, title: '22.67 kL Saved', subtitle: 'By Eco Valve (Basin Valve)' },
  { id: 5, title: '0.00 kL Saved', subtitle: 'By Eco Valve (Kitchen Valve)' },
];

const WaterSavingsDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('waterSavings');

  const handleTileClick = (metricId: MetricType) => {
    setSelectedMetric(metricId);
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-6">
        <div className="grid grid-cols-3 gap-4">
          {metricsData.map((metric) => (
            <WaterSavingsTile
              key={metric.id}
              id={metric.id as MetricType}
              title={metric.title}
              value={metric.value}
              unit={metric.unit}
              subtext={metric.subtext}
              subtext2={metric.subtext2}
              subtext3={metric.subtext3}
              icon={metric.icon}
              bgColor={metric.bgColor}
              textColor={metric.textColor}
              isSelected={selectedMetric === metric.id}
              onClick={() => handleTileClick(metric.id as MetricType)}
            />
          ))}
        </div>
      </div>
      
      <div className="col-span-12 xl:col-span-6">
        <WaterSavingsDetails 
          selectedMetric={selectedMetric} 
          waterSavingsDetails={waterSavingsDetails}
        />
      </div>
    </div>
  );
};

export default WaterSavingsDashboard;
