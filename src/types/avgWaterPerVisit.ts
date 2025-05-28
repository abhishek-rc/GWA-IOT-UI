/**
 * Interface for the average water consumption per visit data from the API
 */
export interface AvgWaterPerVisitResponse {
  date: string;
  currentConsumption: number;
  previousConsumption: number;
}

/**
 * Interface for the processed average water consumption per visit data used in the UI
 */
export interface AvgWaterPerVisitData {
  dailyData: AvgWaterPerVisitDailyData[];
  currentAverage: number;
  previousAverage: number;
  percentageChange: number;
}

/**
 * Interface for daily average water consumption per visit data
 */
export interface AvgWaterPerVisitDailyData {
  date: string;
  currentConsumption: number;
  previousConsumption: number;
}
