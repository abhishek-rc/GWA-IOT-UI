import React from 'react';
import Image from 'next/image';
import { MetricType } from './dashboard-summary';
import { useWaterSavingsData } from '@/hooks/useDashboardSummary';

interface DashboardSummaryDetailsProps {
  selectedMetric: MetricType;
  facilityId: string | null;
}

const DashboardSummaryDetails: React.FC<DashboardSummaryDetailsProps> = ({
  selectedMetric,
  facilityId,
}) => {

  const { data: waterSavingsData } = useWaterSavingsData(facilityId);
  const renderContent = () => {
    switch (selectedMetric) {
      case 'waterSavings':
        return (
          <div className="h-full">
            <div className="bg-[#00B0F0] text-white px-4 py-2 rounded-t-md">
              <h3 className="text-lg font-semibold">Estimated Water Savings Details</h3>
            </div>
            <div className="bg-white shadow-lg">
              <div className="border-b border-gray-100">
                <div className="flex items-center p-4">
                  <div className="bg-blue-900 rounded-full p-2 mr-4">
                    <Image 
                      src="/images/dashboard-summary/toilet-icon.svg" 
                      alt="Toilet" 
                      width={24} 
                      height={24}
                      className="text-white" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-blue-900">{waterSavingsData?.halfFlushingSaving?.toFixed(2)} kL Saved</div>
                    <div className="text-sm text-gray-400">Monitored Half Flushing</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center p-4">
                  <div className="bg-blue-900 rounded-full p-2 mr-4">
                    <Image 
                      src="/images/dashboard-summary/urinal-icon.svg" 
                      alt="Urinal" 
                      width={24} 
                      height={24}
                      className="text-white" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-blue-900">{waterSavingsData?.urinalUseOverToiletSaving?.toFixed(2)} kL Saved</div>
                    <div className="text-sm text-gray-400">Monitored urinal use over toilet</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center p-4">
                  <div className="bg-blue-900 rounded-full p-2 mr-4">
                    <Image 
                      src="/images/dashboard-summary/shower-icon.svg" 
                      alt="Shower" 
                      width={24} 
                      height={24}
                      className="text-white" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-blue-900">{waterSavingsData?.useOfSmartShowerSaving?.toFixed(2)} kL Saved</div>
                    <div className="text-sm text-gray-400">By the use of smart showers</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center p-4">
                  <div className="bg-blue-900 rounded-full p-2 mr-4">
                    <Image 
                      src="/images/dashboard-summary/fixture-icon.svg" 
                      alt="Fixture" 
                      width={24} 
                      height={24}
                      className="text-white" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-blue-900">{waterSavingsData?.configureSmartFixtureSaving?.toFixed(2)} kL Saved</div>
                    <div className="text-sm text-gray-400">By configuring smart fixtures</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center p-4">
                  <div className="bg-blue-900 rounded-full p-2 mr-4">
                    <Image 
                      src="/images/dashboard-summary/valve-icon.svg" 
                      alt="Valve" 
                      width={24} 
                      height={24}
                      className="text-white" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-blue-900">{waterSavingsData?.ecoValveLeakDetectionSaving?.toFixed(2)} kL Saved</div>
                    <div className="text-sm text-gray-400">By eco valve leak detection</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'ecoValves':
        return (
          <div className="h-full">
            <div className="bg-white shadow-lg rounded-md">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Eco Valves Warnings</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Eco-Valve Offline
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        L20_EV_COLD
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Battery Fault
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        L20_EV_COLD
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Battery Fault
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        L18-EV-WARM-NEW
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'dolphinSystem':
        return (
          <div className="h-full">
            <div className="bg-amber-50 border border-amber-100 px-6 py-20 rounded-md">
              <p className="text-amber-700">
              This feature is currently not supported as no Caroma Smart Command Alavo Sensor’s are installed at this location.
              </p>
              <p className="text-amber-700">
              To enquire about Alavo, please contact your Caroma Smart Command business partner. 

              </p>
           
            </div>
          </div>
        );

        case 'carbonImpact':
        return (
          <div className="h-full">
            <div className="bg-amber-50 border border-amber-100 px-6 py-20 rounded-md">
              <p className="text-amber-700 mb-4">
              Carbon calculated as the upstream and downstream carbon emissions associated with 1 kL of water being approximately 0.89 kg CO2-e at 22 cents.

              </p>
              <p className="text-amber-700 mb-4">
              Please see the ‘Est. Water Savings so far’ to understand your buildings water savings as facilitated by Caroma Smart Command to date.

              </p>
            </div>
          </div>
        );

        case 'maintenance':
        return (
          <div className="h-full">
            <div className="bg-amber-50 border border-amber-100 px-6 py-20 rounded-md">
              <p className="text-amber-700 mb-4">
                This feature is currently not supported as no Quick Connect QR Codes are detected at this location.
              </p>
              <p className="text-amber-700 mb-4">
                To enable this feature, please speak to your Caroma Smart Command business partner.
              </p>
              <p className="text-amber-700 italic">
                (Enable your users to promptly inform you of any maintenance issues such as a broken toilet door lock or water on the floor before they impact user experience.)
              </p>
            </div>
          </div>
        );
      
      case 'hygieneIndex':
        return (
          <div className="h-full">
            <div className="bg-white shadow-lg rounded-md p-6">
              <h3 className="text-lg font-semibold mb-6">Room-wise hygiene indices</h3>
              <div className="flex flex-wrap gap-2">
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">1.08</span>
                </div>
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">1.27</span>
                </div>
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">1.32</span>
                </div>
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">1.71</span>
                </div>
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">1.99</span>
                </div>
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">2.05</span>
                </div>
                <div className="bg-green-200 rounded-full px-4 py-2 text-center">
                  <span className="font-medium">2.11</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'fixtureHealth':
        return (
          <div className="h-full">
            <div className="bg-white shadow-lg rounded-md">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Fixture Health by Floor</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Floor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alert(s)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Warning(s)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Level 20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        3
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Level 18
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Level 19
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Select a metric to view details</h3>
            <p className="text-gray-600">Click on any of the tiles on the left to view detailed information.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
};

export default DashboardSummaryDetails;
