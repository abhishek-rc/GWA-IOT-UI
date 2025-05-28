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

export interface QRCodeFeedbackDetails {
  feedbackName: string | null;
  location: string | null;
  totalMaintenanceLast3H: number | null;
  totalCleaningLast3H: number | null;
  totalOthersLast3H: number | null;
  totalMaintenancePrior21H: number | null;
  totalCleaningPrior21H: number | null;
  totalOthersPrior21H: number | null;
}

export interface MaintenanceData {
  maintenanceStatsData: { StatValue: string; StatDescription: string }[];
  qrCodeFeedbackData: QRCodeFeedbackDetails[];
  hasQRCodeFeedback: boolean;
  cardState: string;
}

/**
 * Fetches maintenance issues data from QR code feedback
 * @param facilityId The ID of the facility to fetch data for
 * @returns Object containing maintenance stats and UI state
 */
export const getMaintenanceData = async (facilityId: string | null): Promise<MaintenanceData> => {
  try {
    if (!facilityId) {
      return {
        maintenanceStatsData: [],
        qrCodeFeedbackData: [],
        hasQRCodeFeedback: false,
        cardState: 'grey'
      };
    }

    // Make API call to get QR code feedback data
    const response = await fetch(`/api/qr-code-feedback?facilityId=${facilityId}`);
    const data = await response.json();
    
    // Check if QR code feedback is available
    const hasQRCodeFeedback = data.hasQRCodeFeedback;
    
    if (!hasQRCodeFeedback) {
      return {
        maintenanceStatsData: [],
        qrCodeFeedbackData: [],
        hasQRCodeFeedback: false,
        cardState: 'grey'
      };
    }
    
    // Get the QR code feedback data
    const qrCodeFeedbackData = data.qrCodeFeedbackList;
    
    // Calculate totals for different time periods
    let totalIssuesReportedOnLast3Hours = 0;
    let totalIssuesReportedOnPrior21Hours = 0;
    
    qrCodeFeedbackData.forEach((item: QRCodeFeedbackDetails) => {
      totalIssuesReportedOnLast3Hours +=
        Number(item.totalMaintenanceLast3H || 0) + 
        Number(item.totalCleaningLast3H || 0) + 
        Number(item.totalOthersLast3H || 0);
      
      totalIssuesReportedOnPrior21Hours +=
        Number(item.totalMaintenancePrior21H || 0) + 
        Number(item.totalCleaningPrior21H || 0) + 
        Number(item.totalOthersPrior21H || 0);
    });
    
    // Create stats data
    const maintenanceStatsData: { StatValue: string; StatDescription: string }[] = [];
    if (totalIssuesReportedOnLast3Hours > 0) {
      maintenanceStatsData.push({
        StatValue: totalIssuesReportedOnLast3Hours.toString().padStart(2, '0'),
        StatDescription: 'Issue(s) in last 3h'
      });
    }
    
    if (totalIssuesReportedOnPrior21Hours > 0) {
      maintenanceStatsData.push({
        StatValue: totalIssuesReportedOnPrior21Hours.toString().padStart(2, '0'),
        StatDescription: 'Issue(s) in last 24h'
      });
    }
    
    // Determine card state
    let cardState = 'green';
    if (totalIssuesReportedOnLast3Hours > 0) {
      cardState = 'red_stats';
    } else if (totalIssuesReportedOnPrior21Hours > 0) {
      cardState = 'amber_stats';
    } else {
      cardState = 'green_stats';
    }
    
    return {
      maintenanceStatsData,
      qrCodeFeedbackData,
      hasQRCodeFeedback,
      cardState
    };
  } catch (error) {
    console.error('Error fetching maintenance data:', error);
    return {
      maintenanceStatsData: [],
      qrCodeFeedbackData: [],
      hasQRCodeFeedback: false,
      cardState: 'grey'
    };
  }
};
