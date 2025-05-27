/**
 * Interface for the urinal vs toilet usage data from the API
 */
export interface UrinalToiletUsageResponse {
  target: number;
  actual: number;
  toiletUsage: number;
  urinalUsage: number;
}

/**
 * Interface for the processed urinal vs toilet usage data used in the UI
 */
export interface UrinalToiletUsageData {
  target: number;
  actual: number;
  toiletUsage: number;
  urinalUsage: number;
  percentageOfTarget: number;
}
