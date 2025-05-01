import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Volume2, Sun, Zap, ChevronDown, ChevronRight, Bird, Mouse } from 'lucide-react';

// Mock data for the chart
const chartData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 130 },
  { name: 'Mar', value: 140 },
  { name: 'Apr', value: 160 },
  { name: 'May', value: 160 },
  { name: 'Jun', value: 140 },
  { name: 'Jul', value: 150 },
  { name: 'Aug', value: 140 },
  { name: 'Sep', value: 145 },
  { name: 'Oct', value: 165 },
  { name: 'Nov', value: 170 },
];

// Highlight point
const highlightPoint = {
  month: 'May',
  label: '15 Mar 2022',
  value: 47
};

export default function ScarecrowDashboard() {
  const [isActivated, setIsActivated] = useState(true);
  const [soundIntensity, setSoundIntensity] = useState(25);
  const [lightIntensity, setLightIntensity] = useState(58);
  const [motionSpeed, setMotionSpeed] = useState(85);
  const [selectedTab] = useState('Pests');
  const [timeframe] = useState('Monthly');

  return (
    <div className="min-h-screen font-sans bg-white">
      <div className="container px-4 py-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Farm For Me &gt; Scarecrow</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          {/* Activation Status */}
          <div className="p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Activated</h2>
              <div 
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${isActivated ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}
                onClick={() => setIsActivated(!isActivated)}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Scarecrow Status</span>
            </div>
          </div>
          
          {/* Detections Today */}
          <div className="p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">46,827</h2>
                <div className="font-medium text-gray-600">Detections Today</div>
                
                <div className="flex items-center gap-2 mt-2">
                  <ChevronRight className="w-4 h-4 text-red-500 rotate-90" />
                  <span className="text-gray-500">2.56</span>
                  <span className="text-red-500">-0.91% this week</span>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <div className="w-4 h-4 text-green-600">🌱</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Deterrence Actions */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <div>
              <h2 className="text-lg font-medium text-gray-600">Deterrence Actions</h2>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">38</div>
                <div className="flex items-center text-red-500">
                  <span>+14%</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity Logs */}
        <div className="p-4 mb-8 text-white bg-green-900 rounded-lg">
          <div className="grid grid-cols-4">
            <div className="col-span-1 p-4 border-r border-green-700">
              <h3 className="text-xl font-bold">Activity Logs</h3>
            </div>
            
            <div className="flex items-center col-span-1 gap-4 p-4 border-r border-green-700">
              <Bird className="w-10 h-10 text-green-400" />
              <div>
                <div className="font-medium">Birds</div>
                <div className="text-sm">10:30AM | ZONE-A</div>
              </div>
            </div>
            
            <div className="flex items-center col-span-1 gap-4 p-4 border-r border-green-700">
              <Mouse className="w-10 h-10 text-green-400" />
              <div>
                <div className="font-medium">Rodents</div>
                <div className="text-sm">10:30AM | ZONE-A</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center col-span-1 p-4">
              <div className="p-2 bg-white rounded-full bg-opacity-20">
                <ChevronRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Detection Trends */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Detection trends</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <span>{selectedTab}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-md cursor-pointer">
                  <span>{timeframe}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f0fdf4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f0fdf4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 200]} 
                    ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#166534" 
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                  
                  {/* Highlight point */}
                  {chartData.map((entry, index) => {
                    if (entry.name === highlightPoint.month) {
                      return (
                        <g key={`highlight-${index}`}>
                          <circle 
                            cx={`${(index / (chartData.length - 1)) * 100}%`} 
                            cy={`${100 - ((entry.value / 200) * 100)}%`} 
                            r={4} 
                            fill="#166534" 
                            stroke="#fff" 
                            strokeWidth={2}
                          />
                          <text 
                            x={`${(index / (chartData.length - 1)) * 100}%`} 
                            y={`${100 - ((entry.value / 200) * 100) - 15}%`} 
                            textAnchor="middle"
                            fill="#166534"
                            fontWeight="bold"
                            fontSize="12"
                          >
                            {highlightPoint.label}
                          </text>
                          <text 
                            x={`${(index / (chartData.length - 1)) * 100}%`} 
                            y={`${100 - ((entry.value / 200) * 100) - 3}%`} 
                            textAnchor="middle"
                            fill="#166534"
                            fontWeight="bold"
                            fontSize="14"
                          >
                            {highlightPoint.value}
                          </text>
                        </g>
                      );
                    }
                    return null;
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Deterrence Control */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg lg:col-span-1">
            <h2 className="mb-6 text-xl font-bold">Deterrence Control</h2>
            
            {/* Sound Intensity */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-600">Sound Intensity</span>
                </div>
                <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded">
                  {soundIntensity}%
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute inset-y-0 left-0 bg-green-600 rounded-full" 
                  style={{ width: `${soundIntensity}%` }}
                ></div>
                <div 
                  className="absolute w-4 h-4 -translate-y-1/2 bg-green-600 border-2 border-white rounded-full cursor-pointer top-1/2"
                  style={{ left: `${soundIntensity}%` }}
                  onMouseDown={(e:any) => {
                    const parent = e.currentTarget.parentElement;
if (!parent) return;
const rect = parent.getBoundingClientRect();

                    const width = rect.width;
                    const handleMouseMove = (e:any) => {
                      const newPosition = Math.max(0, Math.min(100, ((e.clientX - rect.left) / width) * 100));
                      setSoundIntensity(Math.round(newPosition));
                    };
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
              </div>
            </div>
            
            {/* Light Intensity */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-600">Light Intensity</span>
                </div>
                <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded">
                  {lightIntensity}%
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute inset-y-0 left-0 bg-green-600 rounded-full" 
                  style={{ width: `${lightIntensity}%` }}
                ></div>
                <div 
                  className="absolute w-4 h-4 -translate-y-1/2 bg-green-600 border-2 border-white rounded-full cursor-pointer top-1/2"
                  style={{ left: `${lightIntensity}%` }}
                  onMouseDown={(e) => {
                    const parent = e.currentTarget.parentElement;
if (!parent) return;
const rect = parent.getBoundingClientRect();

                    const width = rect.width;
                    const handleMouseMove = (e:any) => {
                      const newPosition = Math.max(0, Math.min(100, ((e.clientX - rect.left) / width) * 100));
                      setLightIntensity(Math.round(newPosition));
                    };
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
              </div>
            </div>
            
            {/* Motion Speed */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-600">Motion Speed</span>
                </div>
                <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded">
                  {motionSpeed}%
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute inset-y-0 left-0 bg-green-600 rounded-full" 
                  style={{ width: `${motionSpeed}%` }}
                ></div>
                <div 
                  className="absolute w-4 h-4 -translate-y-1/2 bg-green-600 border-2 border-white rounded-full cursor-pointer top-1/2"
                  style={{ left: `${motionSpeed}%` }}
                  onMouseDown={(e:any) => {
                    const parent = e.currentTarget.parentElement;
                    if (!parent) return;
                    const rect = parent.getBoundingClientRect();
                                        const width = rect.width;
                    const handleMouseMove = (e:any) => {
                      const newPosition = Math.max(0, Math.min(100, ((e.clientX - rect.left) / width) * 100));
                      setMotionSpeed(Math.round(newPosition));
                    };
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}