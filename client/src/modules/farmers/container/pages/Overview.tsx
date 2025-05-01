// import React, { useEffect, useState } from 'react'
// import CountUp from 'react-countup'
// import { SalesChart } from '../../components/AreaCharts';
// import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
// import Reviews from '../../components/overview/Reviews';
// import Transactions from '../../components/overview/Transactions';
// import { Scrollbars } from 'react-custom-scrollbars-2';

// const Overview = () => {
//   return (
    
//          <Scrollbars>
          
//             <div className="min-h-screen p-3">
//       <div className="container mx-auto space-y-4">
       
//         <StatsCards />
//         <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 ">
//           <SalesReport />
//           <Reviews />
//           <Transactions/>
       
//         </div>
//       </div>
//     </div>
//          </Scrollbars>
       
//   )
// }

// interface Stat {
//   label: string;
//   value: number;
//   prefix?: string;
//   duration: number;
//   change: number; // Positive for increase, negative for decrease
// }

// export const StatsCards: React.FC = () => {
//   const [refresh, setRefresh] = useState(false);

//   const stats: Stat[] = [
//     { label: 'Total Products', value: 11, duration: 2, change: 1 }, // 1% increase
//     { label: 'Total Sales', value: 238485, prefix: 'GHC', duration: 2.5, change: -4 }, // 4% decrease
//     { label: 'Total Orders', value: 84382, duration: 2, change: 36 }, // 36% increase
//     { label: 'credits From SMA', value: 82, duration: 2, change: 1, prefix:'XP' }, // 36% increase
//   ];
// useEffect(()=>{
//   setRefresh(false)
// },[refresh])
//   // Function to trigger refresh animation
//   // const handleRefresh = () => {
//   //   setRefresh(true);
//   //   setTimeout(() => setRefresh(false), 500);
//   // };

//   return (
//     <div className="relative">
//       {/* Refresh Button */}
//       {/* <button
//         onClick={handleRefresh}
//         className="absolute px-4 py-2 text-white transition bg-blue-600 rounded-lg top-4 right-4 hover:bg-blue-700"
//       >
//         Refresh
//       </button> */}

     
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className={`p-4 ${stat.prefix=="XP"?'bg-gradient-to-br from-[#A7FFA7] to-[#006600]':'bg-white'} shadow-md rounded-lg transition-transform duration-300 ${
//               refresh ? 'animate-pulse' : ''
//             }`}
//           >
//             <h3 className="mb-2 text-gray-500">{stat.label}</h3>
//             <div className='flex justify-between'>
//             <p className="flex items-center justify-center text-2xl font-bold">
//               {stat.prefix}&nbsp;
//               <CountUp start={0} end={stat.value} duration={stat.duration} separator="," />
//             </p>
//             {/* Change Indicator */}
//             <div className="flex items-center justify-center mt-1 text-sm">
//               {stat.change > 0 ? (
//                 <span className="flex items-center text-green-600">
//                   <ArrowUpIcon className="w-4 h-4 mr-1" />
//                   {stat.change}%
//                 </span>
//               ) : (
//                 <span className="flex items-center text-red-600">
//                   <ArrowDownIcon className="w-4 h-4 mr-1" />
//                   {Math.abs(stat.change)}%
//                 </span>
//               )}
//             </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const SalesReport: React.FC = () => {
//   return (
//     <div className="h-[300px] col-span-1 lg:col-span-2 ">
//         <SalesChart/>  
//     </div>
//   );
// };



// export default Overview


import React, { useState } from 'react';
import { ArrowUpRight, MoreVertical } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const FarmDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [cropDemandTimeRange, setcropDemandTimeRange] = useState<'Day' | 'Week' | 'Month'>('Day');

  // Investment chart data
  const investmentData = [
    { quarter: 'Q1', value: 5, secondValue: 12 },
    { quarter: 'Q2', value: 35, secondValue: 15 },
    { quarter: 'Q2.5', value: 28, secondValue: 18 },
    { quarter: 'Q3', value: 60, secondValue: 20 },
    { quarter: 'Q3.5', value: 100, secondValue: 32 },
    { quarter: 'Q4', value: 25, secondValue: 22 },
    { quarter: 'Q4.5', value: 75, secondValue: 18 },
    { quarter: 'Q5', value: 28, secondValue: 25 },
    { quarter: 'Q5.5', value: 85, secondValue: 22 },
  ];

  // Crop demand data
  const cropDemandData = [
    { month: 'April', value: 650, secondValue: 300 },
    { month: 'May', value: 450, secondValue: 400 },
    { month: 'June', value: 200, secondValue: 300 },
    { month: 'July', value: 350, secondValue: 350 },
    { month: 'August', value: 550, secondValue: 450 },
    { month: 'September', value: 280, secondValue: 400 },
    { month: 'October', value: 380, secondValue: 150 },
    { month: 'November', value: 150, secondValue: 100 },
    { month: 'December', value: 350, secondValue: 200 },
  ];

  // Soil nutrients data
  const soilNutrientsData = [
    { week: 'Week 01', nitrogen: 420, phosphorus: 520, potassium: 590 },
    { week: 'Week 02', nitrogen: 250, phosphorus: 230, potassium: 380 },
    { week: 'Week 03', nitrogen: 320, phosphorus: 900, potassium: 480 },
    { week: 'Week 04', nitrogen: 670, phosphorus: 440, potassium: 200 },
    { week: 'Week 05', nitrogen: 670, phosphorus: 450, potassium: 190 },
  ];

  // Pie chart data
  const pieData = [
    { name: 'Completed', value: 76 },
    { name: 'Remaining', value: 24 },
  ];
  const COLORS = ['#00C49F', '#EDEDED'];

  // Crowdfunding projects data
  const crowdfundingProjects = [
    {
      id: 1,
      title: 'Front-End Coding',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i...',
      progress: 60,
      amount: 2983,
      contributors: 3,
      contributorType: 'P',
    },
    {
      id: 2,
      title: 'Front-End Coding',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i...',
      progress: 60,
      amount: 2983,
      contributors: 3,
      contributorType: 'P',
    },
    {
      id: 3,
      title: 'Front-End Coding',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i...',
      progress: 60,
      amount: 2983,
      contributors: 3,
      contributorType: 'P',
    },
    {
      id: 4,
      title: 'Front-End Coding',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i...',
      progress: 60,
      amount: 2983,
      contributors: 3,
      contributorType: 'P',
    },
  ];

  // Mini charts data for Stats cards
  const miniChartData = [
    { id: 1, value: 10 },
    { id: 2, value: 15 },
    { id: 3, value: 8 },
    { id: 4, value: 18 },
    { id: 5, value: 12 },
    { id: 6, value: 20 },
  ];

  return (
    <div className="p-4 mx-auto max-w-7xl bg-gray-50">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Investment Balance and Chart Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm h-fit">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-sm text-gray-600">Current Investment Balance</h2>
              <div className="flex items-baseline mt-1">
                <span className="text-3xl font-bold">$ 24,567.33</span>
                <span className="ml-3 text-sm text-green-500">+2.7% than last week</span>
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
            <button className="px-6 py-3 font-medium text-gray-800 bg-white rounded-full hover:bg-gray-100">
              Click here
            </button>
          </div>
        </div>
          {/* Crop Demands Chart */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Crop Demands on Market</h2>
          <button>
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cropDemandData}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
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
        
        <div className="flex justify-center mt-4 space-x-4">
          {(['Day', 'Week', 'Month'] as const).map((range) => (
            <button
              key={range}
              className={`px-5 py-1 rounded-full text-sm ${
                cropDemandTimeRange === range 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => setcropDemandTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
        </div>



        
      
    
      
      {/* Soil Nutrients Chart and Stats Cards */}
      {/* <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3"> */}
        {/* Soil Nutrients */}
        <div className="p-6 bg-white rounded-lg shadow-sm lg:mt-[-164px]">
          <h2 className="mb-6 text-xl font-semibold">Soil Nutrients Over Time</h2>
          
          <div className="flex items-center mb-4 space-x-6">
            <div className="flex items-center">
              <span className="w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Nitrogen</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Phosphorus</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 mr-2 bg-red-400 rounded-full"></span>
              <span className="text-sm text-gray-600">Potassium</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soilNutrientsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="nitrogen" fill="#10B981" radius={[10, 10, 0, 0]} />
                <Bar dataKey="phosphorus" fill="#F59E0B" radius={[10, 10, 0, 0]} />
                <Bar dataKey="potassium" fill="#F87171" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Crop Sales */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Crop Sales</h3>
                <div className="flex items-center mt-2">
                  <span className="text-4xl font-bold">68</span>
                  <span className="ml-2 text-sm text-green-500">+0,5%</span>
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
                      {pieData.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className={`${item}`}/>
                      ))}
                    </Pie>
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xs font-semibold fill-green-500">
                      76%
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Crop Growth */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold">40%</div>
                <div className="mt-1 font-medium text-gray-700">Crop Growth</div>
                <div className="mt-1 text-sm text-green-500">+0,5% than last month</div>
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
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      {/* </div> */}
                    </div>
      
      {/* Crowdfunding Projects */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Crowdfunding Projects</h2>
          <button>
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="mb-6 text-gray-600">Lorem ipsum dolor sit amet</p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {crowdfundingProjects.map((project) => (
            <div key={project.id} className="overflow-hidden border border-gray-200 rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                    {project.title}
                  </div>
                  <button>
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <p className="mb-4 text-sm text-gray-500">{project.description}</p>
                
                <div>
                  <div className="flex justify-end mb-1 text-sm text-gray-500">
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 mb-4 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-600 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 text-sm text-yellow-600 bg-yellow-100 rounded-full">
                      {project.contributorType}
                    </div>
                    <div className="px-2 py-1 ml-2 text-xs text-green-600 bg-green-100 rounded-full">
                      +{project.contributors}
                    </div>
                  </div>
                  <div className="font-semibold text-green-600">
                    ${project.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmDashboard;