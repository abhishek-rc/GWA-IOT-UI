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

export const getEstimatedWaterSavingsData = async (facilityId: string | null) => {
  try {
    // Make API call to get water savings data
    const response = await fetch(`/api/water-savings/${facilityId}`);
    const data = await response.json();
    
    if (!data || !data[0]) {
      return {
        estimatedWaterSavingsData: [],
        waterSavingsData: {},
        cardState: 'grey'
      };
    }
    
    const waterSavingsData = data[0];
    
    // Calculate total water savings from multiple sources
    let totalWaterSavings = 0;
    totalWaterSavings += waterSavingsData.halfFlushingSaving || 0;
    totalWaterSavings += waterSavingsData.urinalUseOverToiletSaving || 0;
    totalWaterSavings += waterSavingsData.useOfSmartShowerSaving || 0;
    totalWaterSavings += waterSavingsData.configureSmartFixtureSaving || 0;
    totalWaterSavings += waterSavingsData.ecoValveLeakDetectionSaving || 0;
  
    const totalWaterSavingsFinalValue = Math.round(totalWaterSavings) > 99999 ? 
      totalWaterSavings / 1000 : totalWaterSavings;
    const totalWaterSavingsFinalUnit = Math.round(totalWaterSavings) > 99999 ? 'ML' : 'kL';
    
    return {
      estimatedWaterSavingsData: [{
        StatValue: Math.round(totalWaterSavingsFinalValue).toString(),
        StatDescription: totalWaterSavingsFinalUnit
      }],
      waterSavingsData,
      cardState: 'green_stats'
    };
  } catch (error) {
    console.error("Error fetching estimated water savings:", error);
    return {
      estimatedWaterSavingsData: [],
      waterSavingsData: {},
      cardState: 'grey'
    };
  }
};


export const getCarbonImpactOffsetData = (estimatedWaterData: { StatValue: string; StatDescription: string }[]) => {
  // Carbon impact is calculated based on estimated water savings
  // No direct API call needed - it uses data from the Estimated Water Savings card
  
  if (!estimatedWaterData || !estimatedWaterData.length) {
    return {
      carbonImpactData: 0,
      carbonOffsetData: 0,
      cardState: 'green_stats'
    };
  }
  
  const parsedCarbonImpact = parseInt(estimatedWaterData[0]?.StatValue) || 0;
  const carbonImpactData = parsedCarbonImpact * 0.89;
  const carbonOffsetData = carbonImpactData * 0.02;
  
  return {
    carbonImpactData,
    carbonOffsetData,
    cardState: 'green_stats'
  };
};
