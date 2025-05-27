import React from 'react';
import Image from 'next/image';
import { MetricType } from './WaterSavingsDashboard';

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
  return (
    <div 
      className={`${bgColor} ${textColor} rounded-md p-4 h-full flex flex-col justify-between transition-all duration-200 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}
      onClick={onClick}
    >
      <div className="text-sm font-medium mb-2">{title}</div>
      
      <div className="flex flex-col items-center justify-center flex-grow">
        {icon ? (
          <div className="flex items-center justify-center w-full h-full">
            <Image 
              src={icon} 
              alt={title} 
              width={40} 
              height={40} 
              className="object-contain" 
            />
          </div>
        ) : (
          <>
            {value && (
              <div className="text-3xl font-bold flex items-baseline">
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
          </>
        )}
      </div>
    </div>
  );
};

export default WaterSavingsTile;
