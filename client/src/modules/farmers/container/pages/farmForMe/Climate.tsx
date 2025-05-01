import { useState } from 'react';
import { ChevronRight, Cloud, Sun, CloudSun, Calendar, MapPin } from 'lucide-react';

// Weather forecast data
const hourlyForecast:ForecastItem[] = [
  { time: '1PM', temp: 20, icon: 'partly-cloudy' },
  { time: '2PM', temp: 21, icon: 'partly-cloudy' },
  { time: '3PM', temp: 20, icon: 'partly-cloudy' },
  { time: '4PM', temp: 19, icon: 'sunny' },
  { time: '5PM', temp: 18, icon: 'partly-cloudy' },
  { time: '6PM', temp: 18, icon: 'partly-cloudy' },
  { time: '7PM', temp: 15, icon: 'partly-cloudy' }
];

// Advisory posts data
const advisoryPosts = [
  {
    date: 'April 20th, 2023',
    title: 'New Vegetables and Flowers',
    image: '/vegetables.jpg',
    content: "We're excited to share that our farm is now offering a new selection of vegetables. They are all grown organically and taste amazing. We have also added a few new flowers to the mix. Come visit us this weekend at the farmers' market in town."
  },
  {
    date: 'April 15th, 2023',
    title: 'Fresh Strawberries',
    image: '/strawberries.jpg',
    content: "We just harvested some delicious strawberries from our farm. They are sweet and juicy, perfect for making jam or eating on their own. Come visit us at the farmers' market this weekend to get your hands on these tasty treats!"
  },
  {
    date: 'April 15th, 2023',
    title: 'Fresh Strawberries',
    image: '/strawberries.jpg',
    content: "We just harvested some delicious strawberries from our farm. They are sweet and juicy, perfect for making jam or eating on their own."
  }
];

interface WeatherIconProps {
    type: 'sunny' | 'partly-cloudy' | 'cloudy';
  }
  type WeatherIconType = 'sunny' | 'partly-cloudy' | 'cloudy';

  interface ForecastItem {
    time: string;
    temp: number;
    icon: WeatherIconType;
  }
  
  const WeatherIcon = ({ type }: WeatherIconProps) => {
  if (type === 'sunny') {
    return <Sun className="w-8 h-8 text-yellow-400" />;
  } else if (type === 'partly-cloudy') {
    return <CloudSun className="w-8 h-8 text-gray-500" />;
  } else if (type === 'cloudy') {
    return <Cloud className="w-8 h-8 text-gray-500" />;
  }
  return null;
};

export default function ClimateDashboard() {
  const [tempUnit, setTempUnit] = useState('C');
  const [timeView, setTimeView] = useState('Today');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-700">Farm For Me</h1>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-700">Climate</h2>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-green-700">Today's Highlights</h2>
        
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-12">
          {/* Main Weather Display */}
          <div className="bg-white rounded-lg shadow-sm lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              {/* Location and Date */}
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="flex items-center p-2 text-white bg-green-600 rounded-lg">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span className="font-medium">Ghana, Tarkwa</span>
                  </div>
                </div>
                
                <h3 className="text-4xl font-bold text-gray-800">Monday</h3>
                <p className="text-gray-600">24 Dec, 2023</p>
                
                <div className="flex items-center mt-8">
                  <Cloud className="w-16 h-16 text-green-600" />
                  <div className="ml-4">
                    <div className="flex items-baseline">
                      <span className="font-bold text-7xl">26</span>
                      <span className="text-4xl font-bold">°C</span>
                    </div>
                    <p className="text-gray-600">High: 27 Low: 10</p>
                  </div>
                </div>
              </div>
              
              {/* Current Weather */}
              <div className="flex flex-col items-center justify-center md:col-span-1">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0">
                    <div className="flex items-center justify-center w-full h-full">
                      <Sun className="w-32 h-32 text-yellow-400" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0">
                    <Cloud className="w-24 h-24 text-gray-300" />
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-medium text-gray-700">Cloudy</h3>
                <p className="text-gray-600">Feels Like 26</p>
              </div>
              
              {/* Temperature Unit Toggle */}
              <div className="flex justify-end md:col-span-1">
                <div className="inline-flex p-1 bg-gray-100 rounded-full">
                  <button
                    className={`px-3 py-1 rounded-full ${
                      tempUnit === 'F' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                    onClick={() => setTempUnit('F')}
                  >
                    F
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full ${
                      tempUnit === 'C' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                    onClick={() => setTempUnit('C')}
                  >
                    C
                  </button>
                </div>
              </div>
            </div>
            
            {/* Hourly Forecast */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-1 text-sm rounded-md ${
                      timeView === 'Today' ? 'bg-green-600 text-white' : 'text-gray-500'
                    }`}
                    onClick={() => setTimeView('Today')}
                  >
                    Today
                  </button>
                  <button
                    className={`px-4 py-1 text-sm rounded-md ${
                      timeView === 'Week' ? 'bg-green-600 text-white' : 'text-gray-500'
                    }`}
                    onClick={() => setTimeView('Week')}
                  >
                    Week
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {hourlyForecast.map((item, index) => (
                  <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
                    <span className="font-medium text-gray-700">{item.time}</span>
                    <div className="my-2">
                      <WeatherIcon type={item.icon} />
                    </div>
                    <span className="text-lg font-semibold">{item.temp}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sun Information */}
          <div className="lg:col-span-4">
            <div className="p-6 text-white bg-green-900 rounded-lg shadow-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border-r border-green-700">
                  <p className="text-green-200">Sunrise</p>
                  <p className="mt-1 text-xl font-medium">6:45 AM</p>
                </div>
                <div className="border-r border-green-700">
                  <p className="text-green-200">Sunset</p>
                  <p className="mt-1 text-xl font-medium">5:30 PM</p>
                </div>
                <div>
                  <p className="text-green-200">Length of day</p>
                  <p className="mt-1 text-xl font-medium">10h 23m</p>
                </div>
              </div>
            </div>
            
            {/* Advisory Tips */}
            <div className="mt-6">
              <h3 className="mb-4 text-xl font-medium text-gray-700">Advisory tips</h3>
              
              <div className="space-y-4">
                {advisoryPosts.map((post, index) => (
                  <div key={index} className="overflow-hidden bg-white rounded-lg shadow-sm">
                    <div className="flex items-center p-3 text-white bg-green-900">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex p-4">
                      <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-md">
                        <img 
                          src={index === 0 ? "/api/placeholder/120/120" : "/api/placeholder/120/120"} 
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{post.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}