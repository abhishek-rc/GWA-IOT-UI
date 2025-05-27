'use client';

import React from 'react';
import SearchBuildings from './SearchBuildings';
import { Building } from '@/types/building';

interface BuildingSearchWrapperProps {
  onBuildingSelect: (building: Building) => void;
}

const BuildingSearchWrapper: React.FC<BuildingSearchWrapperProps> = ({ onBuildingSelect }) => {
  return <SearchBuildings onBuildingSelect={onBuildingSelect} />;
};

export default BuildingSearchWrapper;
