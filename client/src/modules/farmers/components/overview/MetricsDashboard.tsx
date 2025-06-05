import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#F97316'];

const MetricsDashboard = () => {
  const [isRealData, setIsRealData] = useState(false);

  // Dummy data
  const dummyPieData = [
    { name: 'Sold', value: 68 },
    { name: 'Remaining', value: 32 }
  ];

  const dummyMiniChartData = [
    { value: 30 }, { value: 45 }, { value: 40 }, { value: 55 }, { value: 50 }
  ];

  // Real data - replace with API data
  const realPieData = [
    { name: 'Sold', value: 72 },
    { name: 'Remaining', value: 28 }
  ];

  const realMiniChartData = [
    { value: 35 }, { value: 48 }, { value: 42 }, { value: 60 }, { value: 55 }
  ];

  const pieData = isRealData ? realPieData : dummyPieData;
  const miniChartData = isRealData ? realMiniChartData : dummyMiniChartData;

  return (
    <div className="relative grid grid-cols-2 gap-4">
      {/* Dummy data overlay */}
      {!isRealData && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] z-10">
          <div className="p-4 text-center border border-gray-200 rounded-lg shadow-sm bg-white/90">
            <span className="inline-block px-2 py-1 mb-2 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
              DEMO METRICS
            </span>
            <p className="mb-3 text-gray-700">Sample dashboard metrics shown</p>
            <button
              onClick={() => setIsRealData(true)}
              className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
            >
              Show Real Data
            </button>
          </div>
        </div>
      )}

      {/* Crop Sales */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-700">Crop Sales</h3>
            <div className="flex items-center mt-2">
              <span className="text-4xl font-bold">{pieData[0].value}</span>
              <span className="ml-2 text-sm text-green-500">+0.5%</span>
            </div>
          </div>
          <div className="w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={18}
                  outerRadius={25}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-xs font-semibold fill-green-500"
                >
                  {Math.round((pieData[0].value / (pieData[0].value + pieData[1].value) * 100))}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {!isRealData && (
          <div className="mt-2 text-xs text-right text-gray-500">Sample data</div>
        )}
      </div>

      {/* Crop Growth */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-3xl font-bold">40%</div>
            <div className="mt-1 font-medium text-gray-700">Crop Growth</div>
            <div className="mt-1 text-sm text-green-500">+0.5% than last month</div>
          </div>
          <div className="w-24 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {!isRealData && (
          <div className="mt-2 text-xs text-right text-gray-500">Sample data</div>
        )}
      </div>

      {/* Intruding Activities */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div>
          <div className="text-3xl font-bold">562</div>
          <div className="mt-1 font-medium text-gray-700">Intruding activities</div>
          <div className="mt-1 text-sm text-red-500">-2% than last month</div>
        </div>
        <div className="w-full h-10 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniChartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#EF4444"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {!isRealData && (
          <div className="mt-2 text-xs text-right text-gray-500">Sample data</div>
        )}
      </div>

      {/* Data Toggle Button */}
      <div className="absolute z-20 top-2 right-2">
        <button 
          onClick={() => setIsRealData(!isRealData)}
          className={`px-2 py-1 text-xs rounded ${isRealData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {isRealData ? 'Using Real Data' : 'Using Demo Data'}
        </button>
      </div>
    </div>
  );
};

export default MetricsDashboard;