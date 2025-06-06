import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TimeRange = 'Daily' | 'Weekly' | 'Monthly';

const InvestmentCard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('Weekly');
const navigate = useNavigate();
  // Example dynamic data
  const investmentData = {
    Daily: [
      { quarter: 'Mon', value: 10, secondValue: 8 },
      { quarter: 'Tue', value: 12, secondValue: 9 },
      { quarter: 'Wed', value: 11, secondValue: 10 },
      { quarter: 'Thu', value: 14, secondValue: 12 },
      { quarter: 'Fri', value: 13, secondValue: 11 },
    ],
    Weekly: [
      { quarter: 'Week 1', value: 100, secondValue: 80 },
      { quarter: 'Week 2', value: 120, secondValue: 95 },
      { quarter: 'Week 3', value: 130, secondValue: 110 },
      { quarter: 'Week 4', value: 150, secondValue: 125 },
    ],
    Monthly: [
      { quarter: 'Jan', value: 400, secondValue: 300 },
      { quarter: 'Feb', value: 420, secondValue: 310 },
      { quarter: 'Mar', value: 460, secondValue: 350 },
      { quarter: 'Apr', value: 480, secondValue: 370 },
    ],
  };

  const currentData = investmentData[timeRange];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm h-fit">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-sm text-gray-600">Current Investment Balance</h2>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-bold">$ 0.00</span>
            <span className="ml-3 text-sm text-green-500">+0% than last week</span>
          </div>
        </div>
        <button
          className="p-2 text-white transition bg-green-500 rounded-full hover:bg-green-600"
          onClick={() => navigate('/farmers/investments/')}
        >
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      {/* Time range picker */}
      <div className="flex mb-4 space-x-4">
        {(['Daily', 'Weekly', 'Monthly'] as const).map((range) => (
          <button
            key={range}
            className={`px-5 py-2 rounded-full text-sm ${
              timeRange === range
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
          <LineChart data={currentData}>
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
  );
};

export default InvestmentCard;
