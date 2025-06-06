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
import CrowdfundingProjects from '../../../components/overview/CrowdFunding';
import CropDemandChart from '../../../components/overview/CropDemandChart';
import SoilNutrientsChart from '../../../components/overview/SoilNutrientsChart';
import MetricsDashboard from '../../../components/overview/MetricsDashboard';
import InvestmentCard from '@/modules/farmers/components/overview/InvestmentCard';




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
       <InvestmentCard/>

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