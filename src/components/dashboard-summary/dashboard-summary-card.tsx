import React from 'react';
import Image from 'next/image';
import { MetricType } from './dashboard-summary';

interface WaterSavingsTileProps {
  id: MetricType;
  title: string;
  value?: string;
  unit?: string;
  subtext?: string;
  subtext2?: string;
  subtext3?: string;
  icon?: string;
  bgColor: string;
  textColor: string;
  isSelected: boolean;
  onClick: () => void;
}

const WaterSavingsTile: React.FC<WaterSavingsTileProps> = ({
  id,
  title,
  value,
  unit,
  subtext,
  subtext2,
  subtext3,
  icon,
  bgColor,
  textColor,
  isSelected,
  onClick,
}) => {
  // Define default icons based on metric type
  const getDefaultIcon = () => {
    switch (id) {
      case 'waterSavings':
        return '/images/dashboard-summary/water-drop-icon.svg';
      case 'ecoValves':
        return '/images/dashboard-summary/valve-icon.svg';
      case 'maintenance':
        return '/images/dashboard-summary/maintenance-icon.svg';
      case 'fixtureHealth':
        return '/images/dashboard-summary/fixture-icon.svg';
      case 'carbonImpact':
        return '/images/dashboard-summary/carbon-icon.svg';
      case 'hygieneIndex':
        return '/images/dashboard-summary/hygiene-icon.svg';
      case 'dolphinSystem':
        return '/images/dashboard-summary/dolphin-icon.svg';
      default:
        return '/images/dashboard-summary/water-drop-icon.svg';
    }
  };

  const iconToUse = icon || getDefaultIcon();

  return (
    <div 
      className={`${bgColor} ${textColor} h-[230px] flex flex-col transition-all duration-200 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}
      onClick={onClick}
    >
      <div className="flex-grow p-4 flex flex-col items-center justify-center">
        {value && (
          <div className="text-4xl font-bold text-center">
            {value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </div>
        )}
        
        {subtext && (
          <div className="text-sm mt-1 text-center">{subtext}</div>
        )}
        
        {subtext2 && (
          <div className="text-sm mt-1 text-center">{subtext2}</div>
        )}
        
        {subtext3 && (
          <div className="text-sm mt-1 text-center">{subtext3}</div>
        )}
        
        {!value && !subtext && (
          <div className="text-lg font-medium text-center">
            {title}
          </div>
        )}
      </div>

      <div className="bg-[#465FFF] text-white py-3 px-4 h-[50px] flex items-center justify-center relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md flex items-center justify-center w-9 h-9">
          <Image 
            src={iconToUse} 
            alt={title} 
            width={18} 
            height={18} 
            className="object-contain" 
          />
        </div>
        <div className="text-sm font-medium text-center mt-2">{title}</div>
      </div>
    </div>
  );
};

export default WaterSavingsTile;
