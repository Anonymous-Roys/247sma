import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SoilNutrientsChart = () => {
  const [isRealData, setIsRealData] = useState(false);

  // Dummy data
  const dummyData = [
    { week: 'Week 1', nitrogen: 40, phosphorus: 30, potassium: 35 },
    { week: 'Week 2', nitrogen: 45, phosphorus: 25, potassium: 40 },
    { week: 'Week 3', nitrogen: 35, phosphorus: 35, potassium: 30 },
    { week: 'Week 4', nitrogen: 50, phosphorus: 20, potassium: 45 },
  ];

  // Real data - replace with your API data
  const realData = [
    { week: 'Week 1', nitrogen: 42, phosphorus: 28, potassium: 38 },
    { week: 'Week 2', nitrogen: 47, phosphorus: 22, potassium: 43 },
    { week: 'Week 3', nitrogen: 38, phosphorus: 32, potassium: 35 },
    { week: 'Week 4', nitrogen: 53, phosphorus: 18, potassium: 48 },
  ];

  const chartData = isRealData ? realData : dummyData;

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-sm lg:mt-[-164px]">
      {/* Dummy data overlay */}
      {!isRealData && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] z-10">
          <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white/90">
            <span className="px-2 py-1 mr-2 text-xs text-yellow-800 bg-yellow-100 rounded">
              DEMO
            </span>
            <p className="text-sm text-gray-700">
              Showing sample nutrient data
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

      {/* Header with toggle */}
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-xl font-semibold">Soil Nutrients Over Time</h2>
        <button 
          onClick={() => setIsRealData(!isRealData)}
          className={`text-xs px-2 py-1 rounded ${isRealData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {isRealData ? 'Simulating Real Data' : 'Demo Data'}
        </button>
      </div>

      {/* Nutrient legend */}
      <div className="flex items-center mb-4 space-x-6">
        <div className="flex items-center">
          <span className="w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-600">Nitrogen</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></span>
          <span className="text-sm text-gray-600">Phosphorus</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 mr-2 bg-red-400 rounded-full"></span>
          <span className="text-sm text-gray-600">Potassium</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="week" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="nitrogen" 
              name="Nitrogen"
              fill="#10B981" 
              radius={[10, 10, 0, 0]} 
            />
            <Bar 
              dataKey="phosphorus" 
              name="Phosphorus"
              fill="#F59E0B" 
              radius={[10, 10, 0, 0]} 
            />
            <Bar 
              dataKey="potassium" 
              name="Potassium"
              fill="#F87171" 
              radius={[10, 10, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SoilNutrientsChart