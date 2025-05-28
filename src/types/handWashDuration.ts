/**
 * Interface for the hand wash duration data from the API
 */
export interface HandWashDurationResponse {
  currentDuration: number;
  previousDuration: number;
  dailyData: DailyHandWashData[];
}

/**
 * Interface for daily hand wash duration data
 */
export interface DailyHandWashData {
  date: string;
  currentDuration: number;
  previousDuration: number;
}

/**
 * Interface for the processed hand wash duration data used in the UI
 */
export interface HandWashDurationData {
  currentDuration: number;
  previousDuration: number;
  dailyData: DailyHandWashData[];
  percentageChange: number;
}
