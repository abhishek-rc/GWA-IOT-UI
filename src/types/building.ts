/**
 * Building interface representing a building in the system
 */
export interface Building {
  /** Unique identifier for the building */
  id: string;
  
  /** Building name */
  name: string;
  
  /** Building physical address */
  address: string;
  
  /** Total area of the building in square feet */
  totalArea: number;
  
  /** Number of floors in the building */
  floors: number;
  
  /** Energy usage in kWh */
  energyUsage: number;
  
  /** Water usage in gallons */
  waterUsage: number;
  
  /** Occupancy rate as a percentage */
  occupancy: number;
  
  /** Last updated timestamp */
  lastUpdated: Date;
}
