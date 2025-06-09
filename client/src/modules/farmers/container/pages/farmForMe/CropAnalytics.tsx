import { useState } from 'react';
import { ChevronRight, BookOpen, ChevronDown, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const cropGrowthData = [
  { date: 'May 5', value1: 200, value2: 100 },
  { date: 'May 6', value1: 150, value2: 120 },
  { date: 'May 7', value1: 276, value2: 150 },
  { date: 'May 8', value1: 230, value2: 180 },
  { date: 'May 9', value1: 290, value2: 120 },
  { date: 'May 10', value1: 190, value2: 60 },
  { date: 'May 11', value1: 150, value2: 80 },
];

const growthStages = [
  { name: 'Seedling', status: 'Present', icon: '🌱', active: true },
  { name: 'Germination', status: '2weeks more', icon: '🌿', active: false },
  { name: 'Maturity', status: '----', icon: '🌽', active: false },
  { name: 'Harvesting', status: '----', icon: '🌾', active: false },
];

const recommendations = [
  {
    title: 'How to grow your yam fields with the current moisture levels of your soil',
    category: 'Crop Growth',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
  },
  {
    title: 'Pest control methods for your maize crop',
    category: 'Pest Management',
    description: 'Effective management of stem borers and fall armyworms can increase your yield by up to 30%. Consider integrated pest management approaches'
  },
  {
    title: 'Soil nutrient management for optimal growth',
    category: 'Soil Health',
    description: 'Your soil analysis indicates low nitrogen levels. Consider applying nitrogen-rich fertilizers to improve crop yield and health'
  }
];

export default function CropAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Day');
  const [selectedCrop, setSelectedCrop] = useState('maize');
  const [expandedRec, setExpandedRec] = useState(0);
const [isRealData, setIsRealData] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
       {!isRealData && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] z-10">
          <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white/90">
            <span className="px-2 py-1 mr-2 text-xs text-yellow-800 bg-yellow-100 rounded">
              DEMO
            </span>
            <p className="text-sm text-gray-700">
              Showing sample data
            </p>
            <button 
              onClick={() => setIsRealData(true)}
              className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Continue To View
            </button>
          </div>
        </div>
      )}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-700">Farm For Me</h1>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-700">Crop Analytics</h2>
          </div>
          {/* <button className="flex items-center px-3 py-1 text-green-700 hover:text-green-800">
            <span>Export Data</span>
            <Download className="w-5 h-5 ml-1" />
          </button> */}
        </div>
      </header>

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="flex items-center p-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <div className="w-6 h-6 text-green-600">♻️</div>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-700">Real Time Monitoring</h3>
              </div>
              
              <div className="overflow-hidden bg-gray-100 aspect-w-16 aspect-h-9">
                <img 
                  src="/maize.png" 
                  alt="Corn cob in field" 
                  className="object-cover w-full"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">Crop Growth Data Over the Past</h3>
                <div className="flex mt-2 mb-4 space-x-2">
                  {['Day'].map((timeframe) => (
                    <button 
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-4 py-1 text-sm rounded-md ${
                        selectedTimeframe === timeframe 
                          ? 'bg-green-100 text-green-800' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
                
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cropGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 300]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value1" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value2" 
                        stroke="#eab308" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800">Growth Stage</h3>
                  <div className="mt-4 space-y-4">
                    {growthStages.map((stage, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-lg
                            ${stage.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {stage.icon}
                          </div>
                          <span className="ml-3 text-gray-700">{stage.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-500">Stage:</div>
                          <div className={`text-sm ${stage.active ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                            {stage.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-start mt-4">
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 mr-1 bg-gray-300 rounded-full"></div>
                      <span className="text-xs text-gray-500">inactive</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-1 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">active stage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="h-full overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Disease and Pest Management for Best Production</h3>
                  <div className="relative">
                    <select 
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="px-3 py-1 pr-8 text-sm bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="maize">maize</option>
                      {/* <option value="yam">yam</option>
                      <option value="cassava">cassava</option> */}
                    </select>
                    <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 right-2 top-1/2" />
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">These recommendations below are based on the farm data</p>
                
                <div className="mt-6 space-y-6">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="pt-4 border-t">
                      <div 
                        className="flex cursor-pointer"
                        onClick={() => setExpandedRec(expandedRec === index ? -1 : index)}
                      >
                        <div className="p-2 mr-3 rounded bg-green-50">
                          <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-700">{rec.title}</h4>
                          {expandedRec === index && (
                            <p className="mt-2 text-sm text-gray-600">{rec.description}</p>
                          )}
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">Category: </span>
                            <span className="text-xs text-gray-700">{rec.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
{/*                 
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <span>SEE MORE RECOMMENDATIONS</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}