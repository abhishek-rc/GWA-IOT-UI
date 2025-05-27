export interface WaterSavingsData {
  halfFlushingSaving: number;
  urinalUseOverToiletSaving: number;
  useOfSmartShowerSaving: number;
  configureSmartFixtureSaving: number;
  ecoValveLeakDetectionSaving: number;
  fullHalfFlushingBenchmark: number;
  showerBenchmark: number;
  urinalUsageBenchmark: number;
  halfFlushingRatio: number;
  urinalToiletActivationRatio: number;
}

export const fetchWaterSavingsData = async (facilityId: string): Promise<WaterSavingsData> => {
  try {
    const response = await fetch(`/api/water-savings/${facilityId}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data[0] as WaterSavingsData;
  } catch (error) {
    console.error('Error fetching water savings data:', error);
    throw error;
  }
};

export const calculateTotalWaterSavings = (data: WaterSavingsData): number => {
  const halfFlushingSaving = Math.round(data.halfFlushingSaving * 100) / 100;
  const urinalUseOverToiletSaving = Math.round(data.urinalUseOverToiletSaving * 100) / 100;
  const useOfSmartShowerSaving = Math.round(data.useOfSmartShowerSaving * 100) / 100;
  const configureSmartFixtureSaving = Math.round(data.configureSmartFixtureSaving * 100) / 100;
  const ecoValveLeakDetectionSaving = Math.round(data.ecoValveLeakDetectionSaving * 100) / 100;
  
  return halfFlushingSaving + 
         urinalUseOverToiletSaving + 
         useOfSmartShowerSaving + 
         configureSmartFixtureSaving + 
         ecoValveLeakDetectionSaving;
};
