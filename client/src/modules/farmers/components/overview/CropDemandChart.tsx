import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CropDemandChart = () => {
  const [isRealData, setIsRealData] = useState(false);
  const [cropDemandTimeRange, setCropDemandTimeRange] = useState<'Day' | 'Week' | 'Month'>('Week');

  // Sample dummy data
  const dummyData = [
    { month: 'Jan', value: 400, secondValue: 240 },
    { month: 'Feb', value: 300, secondValue: 139 },
    { month: 'Mar', value: 600, secondValue: 380 },
    { month: 'Apr', value: 200, secondValue: 120 },
    { month: 'May', value: 500, secondValue: 280 },
  ];

  // This would be replaced with your actual data fetching logic
  const realData = [
    { month: 'Jan', value: 420, secondValue: 210 },
    { month: 'Feb', value: 380, secondValue: 190 },
    { month: 'Mar', value: 650, secondValue: 420 },
    { month: 'Apr', value: 230, secondValue: 150 },
    { month: 'May', value: 480, secondValue: 310 },
  ];

  const chartData = isRealData ? realData : dummyData;

  return (
    <div className="relative p-6 mt-6 bg-white rounded-lg shadow-sm">
      {/* Dummy data overlay - only shows when using dummy data */}
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
              Switch to real data
            </button>
          </div>
        </div>
      )}

      {/* Header with toggle button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Crop Demands on Market</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsRealData(!isRealData)}
            className={`text-xs px-2 py-1 rounded ${isRealData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {isRealData ? 'Using Real Data' : 'Using Demo Data'}
          </button>
          <button aria-label="View more options" className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Chart container */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
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
            <Line 
              type="monotone" 
              dataKey="value" 
              name="Primary Demand"
              stroke="#10B981" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 8, stroke: '#059669', strokeWidth: 2, fill: '#FFFFFF' }} 
            />
            <Line 
              type="monotone" 
              dataKey="secondValue" 
              name="Secondary Demand"
              stroke="#D1FAE5" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, stroke: '#6EE7B7', strokeWidth: 2, fill: '#FFFFFF' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Time range selector */}
      <div className="flex justify-center mt-4 space-x-2">
        {(['Day', 'Week', 'Month'] as const).map((range) => (
          <button
            key={range}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              cropDemandTimeRange === range 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setCropDemandTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};


export default CropDemandChart