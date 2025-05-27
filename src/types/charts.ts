/**
 * Interface for the RadialBarChart component props
 */
export interface RadialBarChartProps {
  /** The actual value to display (outer ring) */
  actual: number;
  /** The target value to display (inner ring) */
  target: number;
  /** Whether the data is empty (both values are 0) */
  isEmptyData?: boolean;
  /** Label for the actual value */
  actualLabel?: string;
  /** Label for the target value */
  targetLabel?: string;
  /** Color for the actual value ring */
  actualColor?: string;
  /** Color for the target value ring */
  targetColor?: string;
  /** Height of the chart */
  height?: string;
}
