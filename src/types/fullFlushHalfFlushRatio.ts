/**
 * Interface for the Full Flush Half Flush Ratio API response
 */
export interface FullFlushHalfFlushRatioResponse {
  // First array contains target data
  0: TargetFullFlushHalfFlushRatio[];
  // Second array contains actual data
  1: ActualFullFlushHalfFlushRatio[];
}

/**
 * Interface for the target Full Flush Half Flush Ratio data
 */
export interface TargetFullFlushHalfFlushRatio {
  TargetFullFlushHalfFlushRatio: number;
}

/**
 * Interface for the actual Full Flush Half Flush Ratio data
 */
export interface ActualFullFlushHalfFlushRatio {
  FullFlushHalfFlushRatio: number;
}

/**
 * Interface for the processed Full Flush Half Flush Ratio data used in the UI
 */
export interface FullFlushHalfFlushRatioData {
  halfFlushRatio: number;
  targetHalfFlushRatio: number;
  fullFlushRatio: number;
  targetFullFlushRatio: number;
  isEmptyData: boolean;
}
