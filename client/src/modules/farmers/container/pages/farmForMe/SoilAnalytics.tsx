import { useState, useEffect } from 'react';
import { Search, Thermometer, Maximize, MapPin, Plus, Minus, Eye, EyeOff, TrendingUp, Droplets, Sun, Cloud, AlertTriangle, CheckCircle, BarChart3, Users, Truck, Wrench } from 'lucide-react';

interface Farm {
  id: string;
  name: string;
  x: string;
  y: string;
  width: string;
  height: string;
  color: string;
  cropType: string;
  plantedDate: string;
  harvestDate: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  soilMoisture: number;
  workers: number;
  area: number;
}

interface Crop {
  name: string;
  growth: number;
  image: string;
  profitability: number;
  difficulty: 'easy' | 'medium' | 'hard';
  season: string;
  daysToHarvest: number;
}

interface WeatherForecast {
  day: string;
  temp: number;
  condition: string;
  humidity: number;
  precipitation: number;
}

interface FarmData {
  temperature: string;
  humidity: number;
  soilMoisture: number;
  farms: Farm[];
  crops: Crop[];
  weather: WeatherForecast[];
}

const mockFarmData: FarmData = {
  temperature: "24°C",
  humidity: 65,
  soilMoisture: 72,
  farms: [
    { id: '1', name: 'North Farm', x: '10%', y: '15%', width: '25%', height: '20%', color: 'bg-green-400', cropType: 'Wheat', plantedDate: '2024-03-15', harvestDate: '2024-07-10', health: 'excellent', soilMoisture: 75, workers: 8, area: 12.5 },
    { id: '2', name: 'South Farm', x: '45%', y: '35%', width: '30%', height: '25%', color: 'bg-yellow-400', cropType: 'Corn', plantedDate: '2024-04-01', harvestDate: '2024-08-15', health: 'good', soilMoisture: 68, workers: 12, area: 18.2 },
    { id: '3', name: 'East Farm', x: '20%', y: '65%', width: '20%', height: '18%', color: 'bg-orange-400', cropType: 'Tomatoes', plantedDate: '2024-04-20', harvestDate: '2024-07-30', health: 'fair', soilMoisture: 82, workers: 6, area: 8.5 },
    { id: '4', name: 'West Farm', x: '65%', y: '10%', width: '22%', height: '22%', color: 'bg-blue-400', cropType: 'Potatoes', plantedDate: '2024-03-30', harvestDate: '2024-08-05', health: 'excellent', soilMoisture: 71, workers: 10, area: 15.3 },
    { id: '5', name: 'Central Farm', x: '50%', y: '60%', width: '28%', height: '15%', color: 'bg-purple-400', cropType: 'Soybeans', plantedDate: '2024-04-10', harvestDate: '2024-09-01', health: 'good', soilMoisture: 79, workers: 9, area: 11.8 }
  ],
  crops: [
    { name: 'Premium Wheat', growth: 85, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop', profitability: 92, difficulty: 'easy', season: 'Spring', daysToHarvest: 120 },
    { name: 'Sweet Corn', growth: 72, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop', profitability: 78, difficulty: 'medium', season: 'Summer', daysToHarvest: 90 },
    { name: 'Cherry Tomatoes', growth: 68, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300&h=200&fit=crop', profitability: 88, difficulty: 'hard', season: 'Summer', daysToHarvest: 75 },
    { name: 'Organic Potatoes', growth: 91, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop', profitability: 65, difficulty: 'easy', season: 'Spring', daysToHarvest: 110 },
    { name: 'Soybeans', growth: 79, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop', profitability: 71, difficulty: 'medium', season: 'Summer', daysToHarvest: 100 }
  ],
  weather: [
    { day: 'Today', temp: 24, condition: 'sunny', humidity: 65, precipitation: 0 },
    { day: 'Tomorrow', temp: 26, condition: 'partly-cloudy', humidity: 58, precipitation: 10 },
    { day: 'Day 3', temp: 22, condition: 'rainy', humidity: 78, precipitation: 85 },
    { day: 'Day 4', temp: 25, condition: 'sunny', humidity: 62, precipitation: 0 },
    { day: 'Day 5', temp: 23, condition: 'cloudy', humidity: 71, precipitation: 20 }
  ]
};

export default function SoilAnalytics() {
  const [search, setSearch] = useState('');
  const [isRealData, setIsRealData] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'crops' | 'weather' | 'analytics'>('overview');
  const [farmData] = useState<FarmData>(mockFarmData);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredFarms = farmData.farms.filter(farm =>
    farm.name.toLowerCase().includes(search.toLowerCase()) ||
    farm.cropType.toLowerCase().includes(search.toLowerCase())
  );


  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      case 'fair': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'poor': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'partly-cloudy': return <Cloud className="w-5 h-5 text-gray-400" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-600" />;
      case 'rainy': return <Droplets className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalArea = farmData.farms.reduce((sum, farm) => sum + farm.area, 0);
  const totalWorkers = farmData.farms.reduce((sum, farm) => sum + farm.workers, 0);
  const avgSoilMoisture = farmData.farms.reduce((sum, farm) => sum + farm.soilMoisture, 0) / farmData.farms.length;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
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
              Continue to View
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h3 className="font-bold text-gray-900 ">Soil Analytics</h3>
            <p className="text-sm text-gray-600">{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}</p>
          </div>
          {/* <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Farm
            </button>
            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div> */}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Area</p>
                <p className="text-2xl font-bold text-gray-900">{totalArea.toFixed(1)}</p>
                <p className="text-xs text-gray-500">hectares</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Workers</p>
                <p className="text-2xl font-bold text-gray-900">{totalWorkers}</p>
                <p className="text-xs text-gray-500">active</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Soil Moisture</p>
                <p className="text-2xl font-bold text-gray-900">{avgSoilMoisture.toFixed(0)}%</p>
                <p className="text-xs text-gray-500">average</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">{farmData.temperature}</p>
                <p className="text-xs text-gray-500">current</p>
              </div>
              <Thermometer className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-1 mb-6 space-x-1 bg-gray-100 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'crops', label: 'Crops', icon: TrendingUp },
            { id: 'weather', label: 'Weather', icon: Cloud },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Farm Map Section */}
            <div className="relative p-4 bg-white rounded-lg shadow">
              <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                  <input 
                    type="text" 
                    placeholder="Search farms or crops..." 
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      showLabels ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {showLabels ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                    Labels
                  </button>
                  <div className="flex items-center px-3 py-2 text-sm text-white bg-green-500 rounded-md">
                    <Thermometer className="w-4 h-4 mr-1" />
                    <span>{farmData.temperature}</span>
                  </div>
                  <button className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    <Maximize className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Map Grid */}
              <div className="relative w-full overflow-hidden border-2 border-green-200 border-dashed rounded-lg h-80 bg-green-50">
                {filteredFarms.map((farm) => (
                  <div 
                    key={farm.id}
                    className={`absolute ${farm.color} rounded-md border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                      selectedFarm?.id === farm.id ? 'ring-4 ring-blue-500' : ''
                    }`}
                    style={{
                      left: farm.x,
                      top: farm.y,
                      width: farm.width,
                      height: farm.height,
                      transform: `scale(${zoomLevel})`
                    }}
                    onClick={() => setSelectedFarm(farm)}
                  >
                    {showLabels && (
                      <div className="flex flex-col items-center justify-center h-full p-1 text-center">
                        <div className="text-xs font-bold text-white drop-shadow-lg">{farm.name}</div>
                        <div className="text-xs text-white/90 drop-shadow">{farm.cropType}</div>
                        <div className="flex items-center mt-1">
                          {getHealthIcon(farm.health)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Map Controls */}
              <div className="absolute flex flex-col gap-2 bottom-4 left-4">
                <button className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 2))}
                  className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-lg shadow-lg hover:bg-gray-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}
                  className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-lg shadow-lg hover:bg-gray-50"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>

              {/* Zoom indicator */}
              <div className="absolute px-3 py-1 text-sm bg-white rounded-full shadow top-4 right-4">
                {(zoomLevel * 100).toFixed(0)}%
              </div>
            </div>

            {/* Selected Farm Details */}
            {selectedFarm && (
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="mb-4 text-xl font-bold text-gray-900">{selectedFarm.name} Details</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-sm text-gray-600">Crop Type</p>
                    <p className="font-semibold">{selectedFarm.cropType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Health Status</p>
                    <div className="flex items-center gap-2">
                      {getHealthIcon(selectedFarm.health)}
                      <span className="font-semibold capitalize">{selectedFarm.health}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Soil Moisture</p>
                    <p className="font-semibold">{selectedFarm.soilMoisture}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Workers</p>
                    <p className="font-semibold">{selectedFarm.workers} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="font-semibold">{selectedFarm.area} hectares</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Planted Date</p>
                    <p className="font-semibold">{new Date(selectedFarm.plantedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Harvest Date</p>
                    <p className="font-semibold">{new Date(selectedFarm.harvestDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Days to Harvest</p>
                    <p className="font-semibold">
                      {Math.max(0, Math.ceil((new Date(selectedFarm.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <Truck className="w-4 h-4 mr-2" />
                    Schedule Harvest
                  </button>
                  <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                    <Wrench className="w-4 h-4 mr-2" />
                    Maintenance
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'crops' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Crop Recommendations</h2>
              <p className="text-gray-600">Optimized for current season and conditions</p>
            </div>
            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {farmData.crops.map((crop, index) => (
                  <div key={index} className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg">
                    <div className="relative">
                      <img src={crop.image} alt={crop.name} className="object-cover w-full h-48" />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(crop.difficulty)}`}>
                          {crop.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                      <p className="mb-3 text-sm text-gray-600">{crop.season} • {crop.daysToHarvest} days</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Growth Progress</span>
                            <span>{crop.growth}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 transition-all duration-300 bg-green-500 rounded-full"
                              style={{ width: `${crop.growth}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Profitability</span>
                            <span>{crop.profitability}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
                              style={{ width: `${crop.profitability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
                        Plant Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">5-Day Weather Forecast</h2>
              <p className="text-gray-600">Plan your farming activities accordingly</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {farmData.weather.map((day, index) => (
                  <div key={index} className="p-4 text-center border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{day.day}</h3>
                    <div className="flex justify-center my-3">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{day.temp}°C</div>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div>Humidity: {day.humidity}%</div>
                      <div>Rain: {day.precipitation}%</div>
                    </div>
                    <div className="mt-2">
                      <span className="px-2 py-1 text-xs capitalize bg-gray-100 rounded-full">
                        {day.condition.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 mt-6 rounded-lg bg-blue-50">
                <h3 className="mb-2 font-semibold text-blue-900">Weather Recommendations</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Day 3: Heavy rain expected - postpone harvesting activities</li>
                  <li>• Days 1, 4, 5: Ideal conditions for field work and spraying</li>
                  <li>• Consider irrigation for Day 2 if soil moisture drops below 60%</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="mb-4 text-lg font-semibold">Crop Distribution</h3>
                <div className="space-y-3">
                  {Array.from(new Set(farmData.farms.map(f => f.cropType))).map(crop => {
                    const count = farmData.farms.filter(f => f.cropType === crop).length;
                    const percentage = (count / farmData.farms.length) * 100;
                    return (
                      <div key={crop}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>{crop}</span>
                          <span>{count} farms ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full">
                          <div 
                            className="h-3 bg-green-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="mb-4 text-lg font-semibold">Farm Health Overview</h3>
                <div className="space-y-3">
                  {['excellent', 'good', 'fair', 'poor'].map(health => {
                    const count = farmData.farms.filter(f => f.health === health).length;
                    // const percentage = (count / farmData.farms.length) * 100;
                    return (
                      <div key={health} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getHealthIcon(health)}
                          <span className="capitalize">{health}</span>
                        </div>
                        <span className="font-semibold">{count} farms</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold">Upcoming Harvests</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Farm</th>
                      <th className="py-2 text-left">Crop</th>
                      <th className="py-2 text-left">Harvest Date</th>
                      <th className="py-2 text-left">Days Left</th>
                      <th className="py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmData.farms
                      .sort((a, b) => new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime())
                      .map(farm => {
                        const daysLeft = Math.ceil((new Date(farm.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        return (
                          <tr key={farm.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 font-medium">{farm.name}</td>
                            <td className="py-2">{farm.cropType}</td>
                            <td className="py-2">{new Date(farm.harvestDate).toLocaleDateString()}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                daysLeft <= 7 ? 'bg-red-100 text-red-700' :
                                daysLeft <= 14 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {daysLeft} days
                              </span>
                            </td>
                            <td className="py-2">
                              <div className="flex items-center gap-2">
                                {getHealthIcon(farm.health)}
                                <span className="capitalize">{farm.health}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}