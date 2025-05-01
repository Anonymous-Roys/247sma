import { useState } from 'react';
import { MapPin, Search, Thermometer, Maximize, ChevronDown, Calendar } from 'lucide-react';

// Farm data
const farmData = {
  temperature: '38°C',
  soilMoisture: 50,
  farms: [
    { id: 1, name: 'ABY Farm', color: 'bg-green-200', x: 220, y: 210, width: 80, height: 90 },
    { id: 2, name: 'YNS Farm', color: 'bg-orange-200', x: 325, y: 145, width: 70, height: 50 },
    { id: 3, name: 'ARD Farm', color: 'bg-red-200', x: 365, y: 325, width: 70, height: 60 },
    { id: 4, name: 'BDY', color: 'bg-orange-200', x: 225, y: 145, width: 40, height: 30 },
  ],
  nutrients: {
    weeks: ['Week 01', 'Week 02', 'Week 03'],
    nitrogen: [430, 250, 350],
    phosphorus: [520, 220, 1150],
    potassium: [600, 370, 480],
  },
  crops: [
    { name: 'Mango', growth: 45, image: '/api/placeholder/190/120' },
    { name: 'Maize', growth: 14, image: '/api/placeholder/190/120' },
    { name: 'Cassava', growth: 23, image: '/api/placeholder/190/120' },
    { name: 'Rice', growth: 22, image: '/api/placeholder/190/120' },
    { name: 'Plantain', growth: 9, image: '/api/placeholder/190/120' },
  ],
  recommendations: [
    {
      title: 'How to grow your yam fields with the current moisture levels of your soil',
      category: 'Crop Growth',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...'
    },
    {
      title: 'How to grow your yam fields with the current moisture levels of your soil',
      category: 'Crop Growth',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ],
  phReading: 13
};

export default function SoilAnalytics() {
  const [activeTimeframe, setActiveTimeframe] = useState('Day');
  const [sensor] = useState('sensor_1');
  
  return (
    <div className="min-h-screen font-sans bg-white">
      <div className="container px-4 py-6 mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Farm For Me &gt; Soil Analytics</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left column */}
          <div>
            {/* Farm Map */}
            <div className="relative p-4 mb-6 bg-green-100 rounded-lg">
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 py-2 text-white bg-green-500 rounded-md">
                    <Thermometer className="w-5 h-5 mr-1" />
                    <span>{farmData.temperature}</span>
                  </div>
                  <button className="p-2 bg-white border border-gray-300 rounded-md">
                    <Maximize className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Map */}
              <div className="relative h-64">
                {farmData.farms.map((farm) => (
                  <div 
                    key={farm.id}
                    className={`absolute ${farm.color} rounded-md border border-gray-400 flex flex-col justify-center items-center`}
                    style={{
                      left: farm.x,
                      top: farm.y,
                      width: farm.width,
                      height: farm.height
                    }}
                  >
                    <div className="text-xs font-bold">{farm.name.split(' ')[0]}</div>
                    {farm.name.includes('Farm') && <div className="text-xs">Farm</div>}
                  </div>
                ))}
              </div>
              
              {/* Map Controls */}
              <div className="absolute flex flex-col gap-2 bottom-4 left-4">
                <button className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow">
                  +
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow">
                  -
                </button>
              </div>
            </div>
            
            {/* Crop Recommendations */}
            <div className="mb-6 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Crop Recommendations</h2>
              </div>
              <div className="p-4">
                <div className="flex gap-4 pb-2 overflow-x-auto flex-nowrap">
                  {farmData.crops.map((crop, index) => (
                    <div key={index} className="min-w-[190px] relative rounded-lg overflow-hidden">
                      <img src={crop.image} alt={crop.name} className="object-cover w-full h-32" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 to-transparent">
                        <div className="text-sm">{crop.name}</div>
                        <div className="text-lg font-bold">{crop.growth}% Growth</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div>
            {/* Soil Moisture */}
            <div className="p-6 mb-6 bg-white rounded-lg shadow">
              <h2 className="mb-6 text-xl font-bold text-center">Average Soil Moisture</h2>
              
              <div className="flex justify-center mb-4">
                <div className="relative w-48 h-48">
                  {/* Background circle */}
                  <div className="absolute inset-0 border-green-100 rounded-full border-16"></div>
                  
                  {/* Progress circle - dynamically covers a percentage */}
                  <div 
                    className="absolute inset-0 border-green-600 rounded-full border-16" 
                    style={{ 
                      clipPath: `polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)`,
                      transform: `rotate(${farmData.soilMoisture * 1.8 - 90}deg)`
                    }}
                  ></div>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-green-600">{farmData.soilMoisture}%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="px-4 py-1 text-green-600 bg-white border border-green-600 rounded-full">
                  Safe Zone
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md">
                  <div className="w-5 h-5 bg-green-600 rounded-sm"></div>
                  <span>{sensor}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="mb-1 text-sm text-gray-600">Potion name</div>
                <div className="relative w-full h-3 overflow-hidden bg-gray-200 rounded-full">
                  <div className="absolute inset-y-0 left-0 w-4/5 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex justify-end">
                  <div className="px-1 mt-1 text-xs text-green-800 bg-green-100 rounded">85%</div>
                </div>
              </div>
            </div>
            
            {/* Soil Nutrients */}
            <div className="p-6 mb-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Soil Nutrients</h2>
                <div className="flex gap-2">
                  <button 
                    className={`px-3 py-1 text-sm rounded-md ${activeTimeframe === 'Day' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setActiveTimeframe('Day')}
                  >
                    Day
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-md ${activeTimeframe === 'Week' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setActiveTimeframe('Week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-md ${activeTimeframe === 'Month' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setActiveTimeframe('Month')}
                  >
                    Month
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm">Nitrogen</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Phosphorus</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm">Potassium</span>
                </div>
              </div>
              
              <div className="h-64">
                <div className="flex h-full gap-6">
                  {farmData.nutrients.weeks.map((week, index) => (
                    <div key={week} className="flex flex-col items-center justify-end flex-1 gap-2">
                      <div className="flex items-end justify-center w-full h-56 gap-2">
                        <div 
                          className="w-6 bg-green-500" 
                          style={{height: `${(farmData.nutrients.nitrogen[index] / 1200) * 100}%`}}
                        ></div>
                        <div 
                          className="w-6 bg-orange-400" 
                          style={{height: `${(farmData.nutrients.phosphorus[index] / 1200) * 100}%`}}
                        ></div>
                        <div 
                          className="w-6 bg-red-400" 
                          style={{height: `${(farmData.nutrients.potassium[index] / 1200) * 100}%`}}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">{week}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* pH Readings */}
            <div className="p-6 mb-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Today's pH readings</h2>
                <div className="flex items-center gap-2 px-3 py-1 text-gray-600 border border-gray-300 rounded-md">
                  <span>September 11, 2024</span>
                  <ChevronDown className="w-4 h-4" />
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
              </div>
              
              <div className="relative mb-2 h-36">
                {/* pH scale */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="h-12 border-l border-gray-200"></div>
                      <div className="mt-1 text-xs text-gray-500">{i+1}</div>
                    </div>
                  ))}
                </div>
                
                {/* Current pH marker */}
                <div 
                  className="absolute bottom-12"
                  style={{left: `${((farmData.phReading - 1) / 14) * 100}%`}}
                >
                  <div className="h-24 border-l-2 border-green-600"></div>
                </div>
                
                {/* pH reading value */}
                <div
                  className="absolute bottom-1/2"
                  style={{right: `${(15 - farmData.phReading) / 14 * 100}%`}}
                >
                  <div className="w-6 h-6 bg-indigo-800 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500"></div>
                  <span className="text-sm">acidic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400"></div>
                  <span className="text-sm">neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-800"></div>
                  <span className="text-sm">alkaline</span>
                </div>
              </div>
            </div>
            
            {/* Farm Practices */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-xl font-bold">Farm Practices for Best Production</h2>
              <p className="mb-4 text-sm text-gray-600">These recommendations below are based on the farm data</p>
              
              <div className="space-y-6">
                {farmData.recommendations.map((recommendation, index) => (
                  <div key={index} className="pt-4 border-t">
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-10 h-10 p-2 bg-green-100 rounded-md">
                        <div className="text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-medium text-green-600">{recommendation.title}</h3>
                        <p className="mb-2 text-sm text-gray-600">{recommendation.content}</p>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Category:</span> {recommendation.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}