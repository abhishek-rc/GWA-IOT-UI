import React from 'react';
import { MetricType } from './WaterSavingsDashboard';

interface WaterSavingsDetailsProps {
  selectedMetric: MetricType;
  waterSavingsDetails: {
    id: number;
    title: string;
    subtitle: string;
  }[];
}

const WaterSavingsDetails: React.FC<WaterSavingsDetailsProps> = ({
  selectedMetric,
  waterSavingsDetails,
}) => {
  const renderContent = () => {
    switch (selectedMetric) {
      case 'waterSavings':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Estimated Water Savings Details</h3>
            <div className="space-y-4">
              {waterSavingsDetails.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-blue-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.subtitle}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'ecoValves':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Eco Valves Details</h3>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h4 className="font-medium text-amber-800">17 Warnings</h4>
                <p className="text-sm text-amber-700 mt-1">There are 17 eco valves that require attention</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Valve ID: EV-2023-001</div>
                      <div className="text-sm text-gray-500">{"Location: Floor 2, Men's Restroom"}</div>
                    </div>
                    <div className="text-amber-500">Warning</div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Valve ID: EV-2023-008</div>
                      <div className="text-sm text-gray-500">{"Location: Floor 1, Women's Restroom"}</div>
                    </div>
                    <div className="text-amber-500">Warning</div>
                  </div>
                </div>
                <div className="text-center text-sm text-blue-600 mt-2">
                  View all 17 warnings
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'maintenance':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="font-medium text-blue-800">Next Scheduled Maintenance</h4>
                <p className="text-sm text-blue-700 mt-1">June 15, 2025 - Regular system check</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium">Maintenance History</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>May 12, 2025</span>
                    <span>Filter replacement</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>April 3, 2025</span>
                    <span>System calibration</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>March 15, 2025</span>
                    <span>Regular inspection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'loadReduced':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Load Reduced Details</h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
                <h4 className="font-medium text-emerald-800">6.26 Load Reduced</h4>
                <p className="text-sm text-emerald-700 mt-1">Total load reduction across all systems</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Shower Systems</div>
                      <div className="text-sm text-gray-500">3.42 load reduced</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Toilet Systems</div>
                      <div className="text-sm text-gray-500">2.18 load reduced</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Basin Systems</div>
                      <div className="text-sm text-gray-500">0.66 load reduced</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'fixtureHealth':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Fixture Health Details</h3>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <h4 className="font-medium text-red-800">1 Critical Issue, 29 Warnings</h4>
                <p className="text-sm text-red-700 mt-1">Immediate attention required for critical issues</p>
              </div>
              <div className="border border-red-300 rounded-md p-3 bg-red-50">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium text-red-800">Fixture ID: FX-2023-042</div>
                    <div className="text-sm text-red-700">Location: Floor 3, Kitchen Area</div>
                  </div>
                  <div className="text-red-600 font-medium">Critical</div>
                </div>
                <div className="mt-2 text-sm text-red-700">
                  Leak detected, immediate maintenance required
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 mt-4">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Fixture ID: FX-2023-018</div>
                      <div className="text-sm text-gray-500">Location: Floor 1, Men&apos;s Restroom</div>
                    </div>
                    <div className="text-amber-500">Warning</div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Fixture ID: FX-2023-023</div>
                      <div className="text-sm text-gray-500">Location: Floor 2, Women&apos;s Restroom</div>
                    </div>
                    <div className="text-amber-500">Warning</div>
                  </div>
                </div>
                <div className="text-center text-sm text-blue-600 mt-2">
                  View all 29 warnings
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'carbonImpact':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Carbon Impact/Offset Details</h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
                <h4 className="font-medium text-emerald-800">631.90 kg Carbon Impact</h4>
                <p className="text-sm text-emerald-700 mt-1">$12.64 Carbon Offset</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium">Monthly Carbon Impact</h4>
                <div className="h-40 mt-4 flex items-end space-x-2">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-emerald-200 rounded-t-sm" style={{ height: '30%' }}></div>
                    <div className="text-xs mt-1">Jan</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-emerald-200 rounded-t-sm" style={{ height: '45%' }}></div>
                    <div className="text-xs mt-1">Feb</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-emerald-200 rounded-t-sm" style={{ height: '60%' }}></div>
                    <div className="text-xs mt-1">Mar</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-emerald-200 rounded-t-sm" style={{ height: '40%' }}></div>
                    <div className="text-xs mt-1">Apr</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-emerald-300 rounded-t-sm" style={{ height: '80%' }}></div>
                    <div className="text-xs mt-1">May</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'hygieneIndex':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Hygiene Index Details</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="font-medium text-blue-800">Hygiene Index: Good</h4>
                <p className="text-sm text-blue-700 mt-1">Overall hygiene status is within acceptable parameters</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Restroom Areas</div>
                      <div className="text-sm text-gray-500">Hygiene score: 8.5/10</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Kitchen Areas</div>
                      <div className="text-sm text-gray-500">Hygiene score: 7.8/10</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Common Areas</div>
                      <div className="text-sm text-gray-500">Hygiene score: 9.2/10</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'dolphinSystem':
        return (
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Dolphin System</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 border border-gray-200 rounded-md p-4 text-center">
                <h4 className="font-medium text-gray-800">Not Supported</h4>
                <p className="text-sm text-gray-600 mt-1">This feature is not available for your current subscription</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium">Upgrade to Access Dolphin System</h4>
                <p className="text-sm text-gray-600 mt-2">
                  The Dolphin System provides advanced water management features including:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  <li>Predictive maintenance</li>
                  <li>Advanced leak detection</li>
                  <li>Real-time water quality monitoring</li>
                  <li>Automated system optimization</li>
                </ul>
                <button className="mt-4 bg-[#001f38] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Upgrade Subscription
                </button>
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

export default WaterSavingsDetails;
