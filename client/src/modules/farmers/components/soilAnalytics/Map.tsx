// components/FarmOverview.tsx
import { useState } from 'react';
import { Search, Thermometer, Maximize, MapPin } from 'lucide-react';

interface Farm {
  id: string;
  name: string;
  x: string;
  y: string;
  width: string;
  height: string;
  color: string;
}

interface Crop {
  name: string;
  growth: number;
  image: string;
}

interface FarmData {
  temperature: string;
  farms: Farm[];
  crops: Crop[];
}

export default function FarmMap({ farmData }: { farmData: FarmData }) {
  const [search, setSearch] = useState('');

  const filteredFarms = farmData.farms.filter(farm =>
    farm.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Farm Map Section */}
      <div className="relative p-4 bg-green-100 rounded-lg">
        <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center px-3 py-2 text-sm text-white bg-green-500 rounded-md">
              <Thermometer className="w-5 h-5 mr-1" />
              <span>{farmData.temperature}</span>
            </div>
            <button className="p-2 bg-white border border-gray-300 rounded-md">
              <Maximize className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Map Grid */}
        <div className="relative w-full h-64 overflow-hidden rounded-md">
          {filteredFarms.map((farm) => (
            <div 
              key={farm.id}
              className={`absolute ${farm.color} rounded-md border border-gray-400 flex flex-col justify-center items-center text-[10px] sm:text-xs`}
              style={{
                left: farm.x,
                top: farm.y,
                width: farm.width,
                height: farm.height
              }}
            >
              <div className="max-w-full px-1 font-bold truncate">{farm.name.split(' ')[0]}</div>
              {farm.name.includes('Farm') && <div>Farm</div>}
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute flex flex-col gap-2 bottom-4 left-4">
          <button className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow">
            <MapPin className="w-5 h-5 text-gray-700" />
          </button>
          <button className="flex items-center justify-center w-8 h-8 font-bold bg-white rounded-md shadow">+</button>
          <button className="flex items-center justify-center w-8 h-8 font-bold bg-white rounded-md shadow">-</button>
        </div>
      </div>

      {/* Crop Recommendations Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold sm:text-xl">Crop Recommendations</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-4 pb-2 flex-nowrap">
            {farmData.crops.map((crop, index) => (
              <div key={index} className="min-w-[160px] sm:min-w-[190px] relative rounded-lg overflow-hidden">
                <img src={crop.image} alt={crop.name} className="object-cover w-full h-28 sm:h-32" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white sm:p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="text-xs sm:text-sm">{crop.name}</div>
                  <div className="text-sm font-bold sm:text-lg">{crop.growth}% Growth</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
