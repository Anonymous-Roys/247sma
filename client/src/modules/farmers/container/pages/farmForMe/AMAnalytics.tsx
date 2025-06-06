import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, ChevronDown, TrendingUp, TrendingDown, Eye, EyeOff, Menu, X, Bell, Search, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
  { logo: 'Corteva', name: 'Corteva Inc.', symbol: 'CTVA', percentage: '+14.2%', value: '$14,032', trend: 'up', price: '$58.42' },
  { logo: 'Tyson', name: 'Tyson Foods', symbol: 'TSN', percentage: '+12.8%', value: '$18,547', trend: 'up', price: '$72.15' },
  { logo: 'Calavo', name: 'Calavo Growers', symbol: 'CVGW', percentage: '+17.6%', value: '$9,823', trend: 'up', price: '$29.34' },
  { logo: 'Deere', name: 'John Deere', symbol: 'DE', percentage: '+8.4%', value: '$25,611', trend: 'up', price: '$385.20' },
  { logo: 'ADM', name: 'Archer Daniels', symbol: 'ADM', percentage: '+6.2%', value: '$12,445', trend: 'up', price: '$54.78' },
  { logo: 'Nutrien', name: 'Nutrien Ltd', symbol: 'NTR', percentage: '+11.3%', value: '$16,789', trend: 'up', price: '$48.90' }
];

const orderTypes = ['Market Price', 'Limit Order', 'Stop Loss', 'Stop Limit'];
const timeInForceOptions = ['Day', 'GTC', 'IOC', 'FOK'];

// Custom gradient for the chart
interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="mb-1 text-xs text-gray-500">{`${label} - Jan 30, 2025`}</p>
        <p className="text-xl font-bold text-green-600">${Number(payload[0].value).toLocaleString()}</p>
        <div className="flex items-center mt-2 text-xs text-green-600">
          <TrendingUp className="w-3 h-3 mr-1" />
          <span>+12.4% from previous</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function AMAnalytics() {
  const [timeframe, setTimeframe] = useState('1D');
  const [orderType, setOrderType] = useState('Market Price');
  const [timeInForce, setTimeInForce] = useState('Day');
  const [stopPrice, setStopPrice] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOrderTypeDropdown, setShowOrderTypeDropdown] = useState(false);
  const [showTimeForceDropdown, setShowTimeForceDropdown] = useState(false);
  const [tradingMode, setTradingMode] = useState('Buy');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedStock, setSelectedStock] = useState('MSFT');
  const [stopPriceValue, setStopPriceValue] = useState('400.00');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would update with real data
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuantityPreset = (value: number) => {
    setQuantity(value.toString());
  };

  const calculateEstimatedTotal = () => {
    const qty = parseInt(quantity) || 0;
    const price = 400; // Mock price
    const fees = 4;
    return (qty * price + fees).toLocaleString();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Overlay for dummy data indication */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute z-50 transform -translate-x-1/2 top-4 left-1/2">
          <div className="px-6 py-3 text-white border rounded-full shadow-lg bg-orange-500/90 backdrop-blur-sm border-orange-400/50">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Demo Mode - Working on real data integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md border-gray-200/50">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="p-2 mr-3 transition-colors rounded-lg lg:hidden hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                  Farm For Me
                </h1>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <h2 className="hidden text-lg font-medium text-gray-700 sm:block">Advanced Market Analysis</h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="items-center hidden px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm md:flex">
                <Search className="w-4 h-4 mr-2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search stocks..." 
                  className="w-32 text-sm outline-none lg:w-48"
                />
              </div>
              <button className="relative p-2 transition-colors rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute w-3 h-3 bg-red-500 rounded-full -top-1 -right-1"></div>
              </button>
              <button className="p-2 transition-colors rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/50 backdrop-blur-sm">
          <div className="w-64 h-full p-4 bg-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800">Navigation</h3>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-3">
              <a href="#" className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">Dashboard</a>
              <a href="#" className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">Portfolio</a>
              <a href="#" className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">Analytics</a>
              <a href="#" className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">Settings</a>
            </nav>
          </div>
        </div>
      )}

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Stock Cards Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Market Overview</h3>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Market Data</span>
            </div>
          </div>
          
          <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-hide">
            {stockCards.map((stock, index) => (
              <div key={index} className="min-w-[280px] bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 border border-white/50 hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1 space-x-2">
                      {stock.logo === "Corteva" && <div className="text-sm font-bold text-blue-600">CORTEVA</div>}
                      {stock.logo === "Tyson" && <div className="text-sm font-bold text-red-600">TYSON</div>}
                      {stock.logo === "Calavo" && <div className="text-sm font-bold text-green-600">CALAVO</div>}
                      {stock.logo === "Deere" && <div className="text-sm font-bold text-yellow-600">DEERE</div>}
                      {stock.logo === "ADM" && <div className="text-sm font-bold text-purple-600">ADM</div>}
                      {stock.logo === "Nutrien" && <div className="text-sm font-bold text-indigo-600">NUTRIEN</div>}
                      <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">{stock.symbol}</span>
                    </div>
                    <div className="text-xs text-gray-600">{stock.name}</div>
                  </div>
                  <div className="w-16 h-10">
                    <LineChart width={64} height={40} data={chartData.slice(-6)}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Current Price</span>
                    <span className="text-sm font-bold text-gray-800">{stock.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Change</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-sm font-bold text-green-600">{stock.percentage}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Portfolio Value</span>
                    <span className="text-sm font-bold text-gray-800">{stock.value}</span>
                  </div>
                </div>
                
                <button className="w-full py-2 mt-4 text-sm font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  Trade {stock.symbol}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Chart Section */}
          <div className="xl:col-span-7">
            <div className="overflow-hidden border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-gray-800">Portfolio Performance</h3>
                    <p className="text-sm text-gray-600">Real-time market analytics</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['1D', '5D', '1M', '6M', '1Y', '5Y', 'Max'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setTimeframe(time)}
                        className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                          timeframe === time
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-100 bg-white/50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="w-full h-80 lg:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                      />
                      <YAxis 
                        domain={[0, 'dataMax + 2000']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#16a34a" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 xl:col-span-5">
            {/* Balance Section */}
            <div className="border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Portfolio Balance</h3>
                  <button 
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="p-6 mb-4 text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1 text-sm text-green-100">Total Balance</p>
                      <p className="text-3xl font-bold">
                        {balanceVisible ? '$14,032.56' : '••••••••'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1 text-green-100">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">+5.63%</span>
                      </div>
                      <p className="text-sm text-green-100">Today</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="mb-1 text-sm text-gray-600">Invested</p>
                    <p className="text-xl font-bold text-gray-800">
                      {balanceVisible ? '$7,532.21' : '••••••••'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="mb-1 text-sm text-gray-600">Profit/Loss</p>
                    <p className="text-xl font-bold text-green-600">
                      {balanceVisible ? '+$6,500.35' : '••••••••'}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 mt-4 border border-blue-100 rounded-lg bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Top Performer</p>
                      <div className="flex items-center mt-1">
                        <span className="mr-2 font-bold text-green-600">CALAVO</span>
                        <span className="px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full">+17.63%</span>
                      </div>
                    </div>
                    <div className="w-16 h-8">
                      <LineChart width={64} height={32} data={chartData.slice(-4)}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#22c55e" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Trade Form */}
            <div className="border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Quick Trade</h3>
                
                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <button 
                    onClick={() => setTradingMode('Buy')}
                    className={`px-4 py-3 font-semibold rounded-lg transition-all duration-200 ${
                      tradingMode === 'Buy' 
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Buy
                  </button>
                  <button 
                    onClick={() => setTradingMode('Sell')}
                    className={`px-4 py-3 font-semibold rounded-lg transition-all duration-200 ${
                      tradingMode === 'Sell' 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sell
                  </button>
                </div>
                
                {/* Order Type Dropdown */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Order Type</label>
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-full p-3 transition-colors bg-white border border-gray-300 rounded-lg hover:border-gray-400"
                      onClick={() => setShowOrderTypeDropdown(!showOrderTypeDropdown)}
                    >
                      <span className="font-medium">{orderType}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${showOrderTypeDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showOrderTypeDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {orderTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setOrderType(type);
                              setShowOrderTypeDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Quantity Input */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                    <span className="px-3 py-2 ml-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-lg">
                      Shares
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[10, 50, 100, 500].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => handleQuantityPreset(qty)}
                        className="px-3 py-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-900"
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Time-in-Force Dropdown */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Time-in-Force</label>
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-full p-3 transition-colors bg-white border border-gray-300 rounded-lg hover:border-gray-400"
                      onClick={() => setShowTimeForceDropdown(!showTimeForceDropdown)}
                    >
                      <span className="font-medium">{timeInForce}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${showTimeForceDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showTimeForceDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {timeInForceOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setTimeInForce(option);
                              setShowTimeForceDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Stop Price Toggle */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Stop Price</span>
                  <div 
                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      stopPrice ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setStopPrice(!stopPrice)}
                  >
                    <div 
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        stopPrice ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </div>
                
                {/* Stop Price Input */}
                {stopPrice && (
                  <div className="mb-4">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-medium text-gray-600">
                        $
                      </span>
                      <input
                        type="text"
                        value={stopPriceValue}
                        onChange={(e) => setStopPriceValue(e.target.value)}
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="p-2 mt-2 text-sm text-red-600 rounded bg-red-50">
                      Est. Loss: $12,057.36
                    </div>
                  </div>
                )}
                
                {/* Summary */}
                <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Buying Power</span>
                    <span className="font-medium text-gray-800">$122,912.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction Fees</span>
                    <span className="font-medium text-gray-800">$4.00</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-semibold border-t border-gray-200">
                    <span className="text-gray-800">Estimated Total</span>
                    <span className="text-gray-800">${calculateEstimatedTotal()}</span>
                  </div>
                </div>
                
                {/* Trade Button */}
                <button className={`w-full px-4 py-4 mt-6 font-semibold rounded-lg transition-all duration-200 shadow-lg ${
                  tradingMode === 'Buy' 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white' 
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                }`}>
                  {tradingMode} {selectedStock}
                </button>
              </div>
            </div>
            
            {/* Market News */}
            <div className="border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Market News</h3>
                <div className="space-y-4">
                  <div className="flex items-start p-3 space-x-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Agricultural Futures Rise on Weather Concerns</p>
                      <p className="mt-1 text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 space-x-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Corteva Reports Strong Q4 Earnings</p>
                      <p className="mt-1 text-xs text-gray-600">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 space-x-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Food Inflation Drives Sector Growth</p>
                      <p className="mt-1 text-xs text-gray-600">6 hours ago</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 text-sm font-medium text-green-600 hover:text-green-700">
                  View All News
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Daily P&L</p>
                <p className="text-2xl font-bold text-green-600">+$1,247.83</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-green-600">+5.2%</span> from yesterday
            </div>
          </div>
          
          <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold text-blue-600">78.3%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-blue-600">+2.1%</span> this month
            </div>
          </div>
          
          <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Active Positions</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <ArrowRight className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-purple-600">3 new</span> positions today
            </div>
          </div>
          
          <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold text-yellow-600">Medium</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Portfolio diversification: <span className="text-yellow-600">Good</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}