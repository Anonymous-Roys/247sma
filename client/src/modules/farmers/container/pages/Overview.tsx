import React, { useState } from 'react';
import { ArrowUpRight} from 'lucide-react';
import {
  LineChart,
  Line,
  
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import CrowdfundingProjects from '../../components/overview/CrowdFunding';
import CropDemandChart from '../../components/overview/CropDemandChart';
import SoilNutrientsChart from '../../components/overview/SoilNutrientsChart';
import MetricsDashboard from '../../components/overview/MetricsDashboard';




const FarmDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const navigate = useNavigate();
  // Investment chart data
  const investmentData = [
    { quarter: 'Q1', value: 0, secondValue: 0 },
    { quarter: 'Q2', value: 0, secondValue: 0 },
    { quarter: 'Q2.5', value: 0, secondValue: 0 },
    { quarter: 'Q3', value: 0, secondValue: 0 },
    { quarter: 'Q3.5', value: 0, secondValue: 0 },
    { quarter: 'Q4', value: 0, secondValue: 0 },
    { quarter: 'Q4.5', value: 0, secondValue: 0 },
    { quarter: 'Q5', value: 0, secondValue: 0 },
    { quarter: 'Q5.5', value: 0, secondValue: 0 },
  ];

  
  return (
    <div className="p-4 mx-auto max-w-7xl">

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Investment Balance and Chart Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm h-fit">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-sm text-gray-600">Current Investment Balance</h2>
              <div className="flex items-baseline mt-1">
                <span className="text-3xl font-bold">$ 0.00</span>
                <span className="ml-3 text-sm text-green-500">+0% than last week</span>
              </div>
            </div>
            <button className="p-2 text-white bg-green-500 rounded-full">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          {/* Time range picker */}
          <div className="flex mb-4 space-x-4">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((range) => (
              <button
                key={range}
                className={`px-5 py-2 rounded-full text-sm ${timeRange === range
                    ? 'bg-gray-200 text-gray-800'
                    : 'text-gray-500 hover:bg-gray-100'
                  }`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Investment chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="secondValue"
                  stroke="#D1FAE5"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Buy from other farmers card */}
        <div>

          <div className="flex flex-col justify-between p-6 text-white rounded-lg bg-gradient-to-br from-green-600 to-green-700">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">Buy from other Farmers with a Click</h2>
              <p className="text-green-100">Get to know the crop price of other farmers and make a purchase</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => navigate('/farmers/marketplace')}
                className="px-4 py-2 text-white transition-colors bg-green-600 rounded hover:bg-green-700"
              >
                Go to Marketplace
              </button>
            </div>
          </div>
          {/* Crop Demands Chart */}
         <CropDemandChart/>
        </div>

       
        <SoilNutrientsChart/>

        {/* Stats Cards */}
        <MetricsDashboard/>
        {/* </div> */}
      </div>

      {/* Crowdfunding Projects */}
      <CrowdfundingProjects/>
    </div>
  );
};

export default FarmDashboard;