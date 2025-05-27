/**
 * Water consumption data interface for the UI
 */
export interface WaterConsumptionData {
  date: string;
  consumption: number;
  previousConsumption?: number;
}

/**
 * Raw API response format for water consumption data
 */
export interface ApiWaterConsumptionData {
  avgWaterConsumption: number;
  intervalPeriod: string;
}
