'use client';

import React, { useState, useEffect } from 'react';
import { useBuildingData } from '@/hooks/useBuildingData';
import type { Building } from '@/types/building';

interface SearchBuildingsProps {
  onBuildingSelect: (building: Building) => void;
}

const SearchBuildings: React.FC<SearchBuildingsProps> = ({ onBuildingSelect }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Building[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  // Use TanStack Query to fetch building data
  const { data: apiBuildings } = useBuildingData();
  
  // Save selected building to local storage when it changes
  useEffect(() => {
    if (selectedBuilding) {
      localStorage.setItem('selectedBuilding', JSON.stringify({
        id: selectedBuilding.id,
        name: selectedBuilding.name,
        customerId: selectedBuilding.customerId
      }));
    }
  }, [selectedBuilding]);

  // Load buildings from API when available
  useEffect(() => {
    if (apiBuildings) {
      console.log('Using building data from API');
      setSearchResults(apiBuildings);
    } else {
      // Initialize with empty array if API data is not available yet
      setSearchResults([]);
    }
  }, [apiBuildings]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowDropdown(true);
    
    // Search in API data
    setTimeout(() => {
      const dataToSearch = apiBuildings || [];
      
      if (!query || query.trim() === '') {
        setSearchResults(dataToSearch);
      } else {
        const normalizedQuery = query.toLowerCase().trim();
        
        const results = dataToSearch.filter((building: Building) => {
          return (
            building.id.toLowerCase().includes(normalizedQuery) ||
            building.name.toLowerCase().includes(normalizedQuery)
          );
        });
        
        setSearchResults(results);
      }
      
      setIsSearching(false);
    }, 300);
  };
  
  // Handle building selection
  const handleBuildingSelect = (building: Building) => {
    setSelectedBuilding(building);
    setShowDropdown(false);
    onBuildingSelect(building);
  };
  
  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setShowDropdown(false);
      
      // If there are search results and dropdown is shown, select the first result
      if (searchResults.length > 0 && showDropdown) {
        handleBuildingSelect(searchResults[0]);
      }
    }
    
    // Close dropdown on Escape key
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div className="col-span-12 space-y-6 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Building Search</h2>
      </div>
      
      <div className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search buildings by name or ID..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-12 px-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        {isSearching && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Search Suggestions Dropdown */}
        {showDropdown && searchQuery.trim() !== '' && searchResults.length > 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-lg border border-gray-300 shadow-lg max-h-80 overflow-y-auto">
            {searchResults.map((building) => (
              <div 
                key={building.id}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleBuildingSelect(building)}
              >
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">{building.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showDropdown && searchQuery.trim() !== '' && searchResults.length === 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-lg border border-gray-300 shadow-lg p-4 text-center">
            <p className="text-gray-500">No buildings found matching '{searchQuery}'</p>
          </div>
        )}
      </div>
      
      {/* Save selected building to local storage when changed */}
      {selectedBuilding && (
        <div className="hidden">
          {/* This is just a placeholder - actual saving happens in the useEffect */}
        </div>
      )}
    </div>
  );
};

export default SearchBuildings;
