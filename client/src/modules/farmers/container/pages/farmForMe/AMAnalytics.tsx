import { useState } from 'react';
import { ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const chartData = [
  { time: '10 am', value: 6000 },
  { time: '10:15 am', value: 5000 },
  { time: '10:30 am', value: 7000 },
  { time: '10:45 am', value: 6500 },
  { time: '11 am', value: 7500 },
  { time: '11:15 am', value: 9000 },
  { time: '11:30 am', value: 10000 },
  { time: '11:45 am', value: 11500 },
  { time: '12 pm', value: 14032 },
  { time: '12:15 pm', value: 11000 },
  { time: '12:30 pm', value: 13000 },
  { time: '12:45 pm', value: 15000 },
];

// Mock data for stock cards
const stockCards = [
  { logo: 'Corteva', name: 'Corteva', percentage: '+14%', value: '$14,000', trend: 'up' },
  { logo: 'Tyson', name: 'Tyson Foods', percentage: '+14%', value: '$14,000', trend: 'up' },
  { logo: 'Calavo', name: 'Calavo', percentage: '+14%', value: '$14,000', trend: 'up' },
  { logo: 'Corteva', name: 'Corteva', percentage: '+14%', value: '$14,000', trend: 'up' },
  { logo: 'Tyson', name: 'Tyson Foods', percentage: '+14%', value: '$14,000', trend: 'up' },
  { logo: 'Calavo', name: 'Calavo', percentage: '+14%', value: '$14,000', trend: 'up' }
];

// Custom gradient for the chart
interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
  }
  
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  
  if (active && payload && payload.length) {
    return (
      <div className="p-3 text-white bg-green-800 rounded shadow-lg">
        <p className="text-xs opacity-80">{`Jan 30, 01:12:16 AM`}</p>
        <p className="text-xl font-semibold">${Number(payload[0].value).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function AMAnalytics() {
  const [timeframe, setTimeframe] = useState('1D');
  const [orderType] = useState('Market Price');
  const [timeInForce] = useState('Day');
  const [stopPrice, setStopPrice] = useState(true);
  const [quantity, setQuantity] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-700">Farm For Me</h1>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-700">Advanced Market Analysis</h2>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Stock Cards Carousel */}
        <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-hide">
          {stockCards.map((stock, index) => (
            <div key={index} className="min-w-[230px] bg-white rounded-lg shadow p-4 flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-center w-20 h-8">
                  {stock.logo === "Corteva" && <div className="font-bold text-blue-600">CORTEVA</div>}
                  {stock.logo === "Tyson" && <div className="font-bold text-red-600">TYSON</div>}
                  {stock.logo === "Calavo" && <div className="font-bold text-green-600">CALAVO</div>}
                </div>
                <div className="h-8">
                  <svg className="w-16 h-8" viewBox="0 0 64 32">
                    <polyline 
                      points="0,16 10,18 20,12 30,20 40,8 50,16 60,10" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Share</span>
                  <span className="text-sm font-medium text-green-600">{stock.percentage} ↑</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Return</span>
                  <span className="text-sm font-medium text-green-600">{stock.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-12">
          {/* Chart Section */}
          <div className="bg-white rounded-lg shadow lg:col-span-8">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Timely Analytics</h3>
                <div className="flex space-x-2">
                  {['1D', '5D', '1M', '6M', '1Y', '5Y', 'Max'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setTimeframe(time)}
                      className={`px-3 py-1 text-xs rounded ${
                        timeframe === time
                          ? 'bg-green-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#888' }}
                    />
                    <YAxis 
                      domain={[0, 'dataMax + 2000']}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#888' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#16a34a" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Trade Section */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            {/* Balance */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">Balance</h3>
                <div className="flex items-center mt-2">
                  <div className="flex-1 p-4 text-white bg-green-600 rounded">
                    <div className="text-2xl font-semibold">$14,032.56</div>
                  </div>
                  <div className="p-2 ml-2 text-sm font-medium text-green-800 bg-green-100 rounded">
                    +5.63%
                  </div>
                </div>
              </div>
              
              {/* Invested */}
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-lg font-medium text-gray-800">Invested</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center justify-between flex-1 p-4 text-white bg-gray-800 rounded">
                    <div className="text-2xl font-semibold">$7,532.21</div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Top Stock */}
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-lg font-medium text-gray-800">Top Stock</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <div className="mr-2 font-bold text-green-600">CALAVO</div>
                    <div className="text-xs font-semibold text-green-600">+17.63</div>
                  </div>
                  <div className="h-6">
                    <svg className="w-12 h-6" viewBox="0 0 48 24">
                      <polyline 
                        points="0,12 8,10 16,14 24,8 32,16 40,6 48,10" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <div>
                    <div className="text-gray-500">Invested Value</div>
                    <div className="font-medium">$29.34</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Current Value</div>
                    <div className="font-medium">$177.90</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trade Form */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">Trade</h3>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="px-4 py-2 font-medium text-center text-green-800 bg-green-100 rounded hover:bg-green-200">
                    Buy
                  </button>
                  <button className="px-4 py-2 font-medium text-center text-gray-800 bg-gray-100 rounded hover:bg-gray-200">
                    Sell
                  </button>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500">Order Type</label>
                  <div className="relative mt-1">
                    <button
                      className="flex items-center justify-between w-full p-2 pl-4 pr-10 text-white bg-green-600 rounded"
                      onClick={() => {}}
                    >
                      <span>{orderType}</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500">Quantity</label>
                  <div className="flex items-center mt-1">
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter amount"
                    />
                    <span className="px-2 py-1 ml-2 text-xs text-blue-800 bg-blue-100 rounded">
                      Shares
                    </span>
                  </div>
                  <div className="flex mt-2 space-x-2">
                    {[10, 50, 100, 500].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setQuantity(qty.toString())}
                        className="px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900"
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500">Time-in-Force</label>
                  <div className="relative mt-1">
                    <button
                      className="flex items-center justify-between w-full p-2 pl-4 pr-10 text-white bg-green-600 rounded"
                      onClick={() => {}}
                    >
                      <span>{timeInForce}</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <div 
                    className={`w-10 h-5 ${stopPrice ? 'bg-green-600' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
                    onClick={() => setStopPrice(!stopPrice)}
                  >
                    <div 
                      className={`bg-white w-3 h-3 rounded-full shadow transform ${stopPrice ? 'translate-x-5' : 'translate-x-0'} transition`}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">Stop Price</span>
                </div>
                
                <div className="mt-2">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-bold text-green-600">
                      $
                    </span>
                    <input
                      type="text"
                      value="400.00"
                      className="w-full p-2 pl-8 text-white bg-green-600 rounded"
                      readOnly
                    />
                    <div className="absolute inset-y-0 flex items-center right-2">
                      <ChevronDown className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-red-600">Est. Loss: 12,057.36</div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-800">Buying Power</span>
                    <span className="text-gray-800">$122,912.50</span>
                  </div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-800">Transaction Fees</span>
                    <span className="text-gray-800">$4.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-800">Estimated Total</span>
                    <span className="text-gray-800">$40,000</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 mt-4 font-medium text-white bg-green-600 rounded hover:bg-green-700">
                  Buy MSFT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}