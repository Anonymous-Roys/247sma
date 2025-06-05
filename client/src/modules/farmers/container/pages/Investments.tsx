import React, { useState } from 'react';
import { ChevronDown, MoreHorizontal, Info, DollarSign, Users, TrendingUp, Calendar, X, CheckCircle, AlertCircle, Filter, Search } from 'lucide-react';

interface CampaignProps {
  name: string;
  description: string;
  progress: number;
  amount: number;
  contributorType: 'B' | 'P';  // B for Business, P for Personal
  contributorCount: number;
  imageUrl: string;
  returnRate: number;
  daysLeft: number;
  location: string;
}

const ViewModeDropdown: React.FC<{
  viewMode: 'Monthly' | 'Weekly' | 'Yearly',
  setViewMode: React.Dispatch<React.SetStateAction<'Monthly' | 'Weekly' | 'Yearly'>>
}> = ({ viewMode, setViewMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options: ('Monthly' | 'Weekly' | 'Yearly')[] = ['Monthly', 'Weekly', 'Yearly'];
  
  return (
    <div className="relative">
      <button 
        className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{viewMode}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-50 ${
                viewMode === option ? 'bg-green-50 text-green-700' : ''
              }`}
              onClick={() => {
                setViewMode(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CampaignCard: React.FC<{ campaign: CampaignProps, onInvest: () => void }> = ({ campaign, onInvest }) => {
  return (
    <div className="overflow-hidden transition-all border border-gray-200 rounded-lg hover:shadow-md">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={campaign.imageUrl} 
          alt={campaign.name} 
          className="object-cover w-full h-full"
        />
        <div className="absolute p-1 bg-white rounded-full shadow-sm top-3 right-3">
          <Info className="w-5 h-5 text-gray-500" />
        </div>
        <div className="absolute px-2 py-1 text-xs font-medium bg-white rounded-lg shadow-sm bottom-3 left-3">
          {campaign.location}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
            {campaign.name}
          </div>
          <button>
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">{campaign.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium text-green-700">{campaign.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-600 rounded-full" 
              style={{ width: `${campaign.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-gray-600">
          <div className="p-2 rounded-lg bg-gray-50">
            <div className="font-medium">Return Rate</div>
            <div className="text-lg font-bold text-green-700">{campaign.returnRate}%</div>
          </div>
          <div className="p-2 rounded-lg bg-gray-50">
            <div className="font-medium">Days Left</div>
            <div className="text-lg font-bold text-gray-800">{campaign.daysLeft}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              campaign.contributorType === 'B' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
            }`}>
              {campaign.contributorType}
            </div>
            <div className={`ml-2 px-2 py-1 rounded-full text-xs ${
              campaign.contributorType === 'B' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              {campaign.contributorType === 'B' ? 'Business' : 'Personal'} ({campaign.contributorCount})
            </div>
          </div>
          <div className="text-xl font-bold text-green-700">
            ${campaign.amount.toFixed(2)}
          </div>
        </div>
        
        <button 
          className="w-full py-2 mt-4 font-medium text-center text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
          onClick={onInvest}
        >
          Invest Now
        </button>
      </div>
    </div>
  );
};

const Investments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Farm Investment' | 'Crowdfunding'>('Farm Investment');
  const [viewMode, setViewMode] = useState<'Monthly' | 'Weekly' | 'Yearly'>('Monthly');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignProps | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(100);
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error' | 'info'}>({
    show: false,
    message: '',
    type: 'info'
  });
  const [filterOptions, setFilterOptions] = useState({
    minReturn: 0,
    maxReturn: 10,
    type: 'all',
    location: 'all'
  });
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    amount: 0,
    returnRate: 0,
    location: '',
    duration: 30
  });

  const campaigns: CampaignProps[] = [
    {
      name: "Nunu's Organic Maize Farm",
      description: "Supporting sustainable maize production with organic practices. This farm produces high-yield, drought-resistant corn varieties ideal for local markets.",
      progress: 60,
      amount: 2983.00,
      contributorType: 'B',
      contributorCount: 12,
      imageUrl: "/maize.png",
      returnRate: 8.5,
      daysLeft: 45,
      location: "Eastern Region, Ghana"
    },
    {
      name: "Koo Dairy Collective",
      description: "Small-scale dairy farm collective focusing on sustainable practices and local milk production. Investing supports 15 family farmers in the region.",
      progress: 75,
      amount: 4250.00,
      contributorType: 'B',
      contributorCount: 6,
      imageUrl: "/cows.png",
      returnRate: 7.2,
      daysLeft: 30,
      location: "Central Region, Kenya"
    },
    {
      name: "Calvaho Rice Paddies",
      description: "Traditional rice cultivation using innovative water conservation methods. This project also creates local employment and supports food security initiatives.",
      progress: 40,
      amount: 1780.00,
      contributorType: 'P',
      contributorCount: 23,
      imageUrl: "/rice.png",
      returnRate: 9.1,
      daysLeft: 60,
      location: "Volta Region, Ghana"
    },
    {
      name: "Wheat Cooperative Union",
      description: "Community-owned wheat farm implementing climate-smart agriculture. Focused on improving soil health and providing stable income for 35 local farmers.",
      progress: 85,
      amount: 3650.00,
      contributorType: 'P',
      contributorCount: 41,
      imageUrl: "/wheat.png",
      returnRate: 6.8,
      daysLeft: 15,
      location: "Rift Valley, Tanzania"
    }
  ];

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleInvestSubmit = () => {
    if (selectedCampaign && investAmount > 0) {
      showToast(`Successfully invested ${investAmount} in ${selectedCampaign.name}!`, 'success');
      setShowInvestModal(false);
    } else {
      showToast('Please enter a valid investment amount', 'error');
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filterOptions.type !== 'all' && 
        ((filterOptions.type === 'business' && campaign.contributorType !== 'B') ||
         (filterOptions.type === 'personal' && campaign.contributorType !== 'P'))) {
      return false;
    }
    
    if (campaign.returnRate < filterOptions.minReturn || 
        campaign.returnRate > filterOptions.maxReturn) {
      return false;
    }
    
    if (filterOptions.location !== 'all' && 
        !campaign.location.toLowerCase().includes(filterOptions.location.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="p-4 mx-auto bg-gray-50 max-w-7xl">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-100 text-green-800' : 
          toast.type === 'error' ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          <div className="mr-2">
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
             toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
             <Info className="w-5 h-5" />}
          </div>
          <p>{toast.message}</p>
          <button 
            className="ml-4 text-gray-500 hover:text-gray-700"
            onClick={() => setToast(prev => ({...prev, show: false}))}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Invest Dashboard</h1>
        <p className="text-gray-600">Connect with farmers, invest in agriculture, grow your portfolio</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
  {/* Tabs */}
  <div className="flex flex-wrap justify-between p-4 space-x-2 border-b border-gray-200 sm:space-x-4">
    {['Farm Investment', 'Crowdfunding'].map((tab) => (
      <button
        key={tab}
        className={`py-2 text-sm sm:text-base font-medium ${
          activeTab === tab 
            ? 'border-b-2 border-green-700 text-green-700' 
            : 'text-gray-500'
        }`}
        onClick={() => setActiveTab(tab as 'Farm Investment' | 'Crowdfunding')}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Stats Grid */}
  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-5">
    {/* Each Card */}
    {[{
      title: "Total Investments",
      subtitle: "Growth (YTD)",
      subtitleValue: "+18% ↑",
      label: "Amount",
      value: "$15,320",
      icon: <DollarSign className="w-full h-full text-green-600" />,
      chartPath: "M0,20 L10,18 L20,15 L30,10 L40,15 L50,5 L60,12 L70,8 L80,16 L90,12 L100,8"
    }, {
      title: "Average Return",
      subtitle: "Change",
      subtitleValue: "+1.2% ↑",
      label: "Rate",
      value: "7.9%",
      icon: <TrendingUp className="w-full h-full text-green-600" />,
      chartPath: "M0,15 L10,13 L20,18 L30,15 L40,12 L50,15 L60,10 L70,12 L80,8 L90,5 L100,8"
    }, {
      title: "Active Investments",
      subtitle: "This Month",
      subtitleValue: "+3 ↑",
      label: "Total",
      value: "12",
      icon: <Calendar className="w-full h-full text-green-600" />,
      chartPath: "M0,20 L10,18 L20,15 L30,10 L40,15 L50,5 L60,12 L70,8 L80,16 L90,12 L100,8"
    }, {
      title: "Community Impact",
      subtitle: "Farmers Supported",
      subtitleValue: "82",
      label: "Hectares Cultivated",
      value: "156",
      icon: <Users className="w-full h-full text-green-600" />,
      chartPath: "M0,10 L10,12 L20,15 L30,14 L40,18 L50,16 L60,20 L70,18 L80,22 L90,20 L100,25"
    }].map((item, i) => (
      <div key={i} className="flex flex-col justify-between p-4 text-xs bg-white border border-gray-100 rounded-lg shadow-sm sm:text-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium text-gray-500">{item.title}</div>
            <div className="mt-1">
              <span className="text-gray-600">{item.subtitle}</span>
              <span className="ml-2 text-green-600">{item.subtitleValue}</span>
            </div>
            <div className="mt-1 font-semibold text-green-700">
              <span className="text-gray-600">{item.label}</span>
              <span className="ml-2">{item.value}</span>
            </div>
          </div>
          <div className="w-10 h-10 p-2 bg-green-100 rounded-full">{item.icon}</div>
        </div>
        <div className="mt-4 overflow-hidden">
          <svg viewBox="0 0 100 30" className="w-full h-8">
            <path d={item.chartPath} fill="none" stroke="#4ade80" strokeWidth="2" />
          </svg>
        </div>
      </div>
    ))}

    {/* CTA Card */}
    <div className="flex flex-col justify-between p-4 text-white rounded-lg shadow-sm bg-gradient-to-r from-green-600 to-green-700">
      <div>
        <div className="flex items-start gap-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div className="text-sm">
            <h2 className="text-base font-semibold sm:text-lg">Create New Campaign</h2>
            <p className="mt-1 text-xs text-green-100 sm:text-sm">
              Raise funds for your next agricultural project.
            </p>
          </div>
        </div>
        <button
          className="px-3 py-2 mt-3 text-sm font-medium text-green-700 bg-white rounded-lg hover:bg-green-100"
          onClick={() => setShowCreateModal(true)}
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</div>


      {/* My Campaigns Section */}
      <div className="p-4 mt-8 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-green-800">My Investment Portfolio</h2>
          <div className="flex items-center">
            <ViewModeDropdown viewMode={viewMode} setViewMode={setViewMode} />
            <button 
              className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <CampaignCard 
                key={index} 
                campaign={campaign} 
                onInvest={() => {
                  setSelectedCampaign(campaign);
                  setShowInvestModal(true);
                }}
              />
            ))
          ) : (
            <div className="col-span-4 p-8 text-center text-gray-500">
              <div className="flex justify-center mb-4">
                <Search className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium">No matching investments found</h3>
              <p className="mt-2">Try adjusting your filters to see more results</p>
              <button 
                className="px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                onClick={() => setFilterOptions({
                  minReturn: 0,
                  maxReturn: 10,
                  type: 'all',
                  location: 'all'
                })}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 mx-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-green-800">Create New Campaign</h2>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Campaign Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Organic Maize Farm"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Describe your agricultural project..."
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Target Amount ($)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="5000"
                    value={newCampaign.amount || ''}
                    onChange={(e) => setNewCampaign({...newCampaign, amount: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Return Rate (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="7.5"
                    value={newCampaign.returnRate || ''}
                    onChange={(e) => setNewCampaign({...newCampaign, returnRate: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Region, Country"
                    value={newCampaign.location}
                    onChange={(e) => setNewCampaign({...newCampaign, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Duration (days)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="60"
                    value={newCampaign.duration || ''}
                    onChange={(e) => setNewCampaign({...newCampaign, duration: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Upload Farm Image</label>
                <div className="p-4 text-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={() => {
                  if (!newCampaign.name || !newCampaign.description || !newCampaign.amount || !newCampaign.location) {
                    showToast('Please fill out all required fields', 'error');
                    return;
                  }
                  
                  showToast('Campaign created successfully!', 'success');
                  setShowCreateModal(false);
                  setNewCampaign({
                    name: '',
                    description: '',
                    amount: 0,
                    returnRate: 0,
                    location: '',
                    duration: 30
                  });
                }}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Filter Investments</h2>
              <button onClick={() => setShowFilterModal(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Return Rate Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    className="w-full"
                    value={filterOptions.minReturn}
                    onChange={(e) => setFilterOptions({...filterOptions, minReturn: parseFloat(e.target.value)})}
                  />
                  <span className="text-sm text-gray-600">{filterOptions.minReturn}%</span>
                  <span className="text-sm text-gray-600">to</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    className="w-full"
                    value={filterOptions.maxReturn}
                    onChange={(e) => setFilterOptions({...filterOptions, maxReturn: parseFloat(e.target.value)})}
                  />
                  <span className="text-sm text-gray-600">{filterOptions.maxReturn}%</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Investment Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={filterOptions.type}
                  onChange={(e) => setFilterOptions({...filterOptions, type: e.target.value})}
                >
                  <option value="all">All Types</option>
                  <option value="business">Business (B)</option>
                  <option value="personal">Personal (P)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={filterOptions.location}
                  onChange={(e) => setFilterOptions({...filterOptions, location: e.target.value})}
                >
                  <option value="all">All Locations</option>
                  <option value="ghana">Ghana</option>
                  <option value="kenya">Kenya</option>
                  <option value="tanzania">Tanzania</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setFilterOptions({
                    minReturn: 0,
                    maxReturn: 10,
                    type: 'all',
                    location: 'all'
                  });
                }}
              >
                Reset
              </button>
              <button 
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={() => {
                  showToast('Filters applied successfully', 'info');
                  setShowFilterModal(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invest Modal */}
      {showInvestModal && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-green-800">Invest in {selectedCampaign.name}</h2>
              <button onClick={() => setShowInvestModal(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            
            <div className="p-4 mb-4 rounded-lg bg-green-50">
              <div className="flex items-center mb-2">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-green-800">Expected Returns</div>
                  <div className="text-sm text-green-700">
                    {selectedCampaign.returnRate}% return rate
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Investment in {selectedCampaign.name} is projected to return 
                ${(investAmount * (selectedCampaign.returnRate / 100)).toFixed(2)} annually 
                on a ${investAmount} investment.
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter amount"
                  value={investAmount || ''}
                  onChange={(e) => setInvestAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="flex justify-between">
                <button 
                  className="px-4 py-2 text-green-700 bg-green-100 rounded-lg"
                  onClick={() => setInvestAmount(100)}
                >
                  $100
                </button>
                <button 
                  className="px-4 py-2 text-green-700 bg-green-100 rounded-lg"
                  onClick={() => setInvestAmount(250)}
                >
                  $250
                </button>
                <button 
                  className="px-4 py-2 text-green-700 bg-green-100 rounded-lg"
                  onClick={() => setInvestAmount(500)}
                >
                  $500
                </button>
                <button 
                  className="px-4 py-2 text-green-700 bg-green-100 rounded-lg"
                  onClick={() => setInvestAmount(1000)}
                >
                  $1000
                </button>
              </div>
              
              <div className="p-3 mt-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-medium text-gray-700">Investment Summary</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Principal Amount:</span>
                  <span className="font-medium">${investAmount}</span>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-gray-600">Expected Annual Return:</span>
                  <span className="font-medium">${(investAmount * (selectedCampaign.returnRate / 100)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-gray-600">Project Duration:</span>
                  <span className="font-medium">{selectedCampaign.daysLeft} days</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 font-medium border-t border-gray-200">
                  <span className="text-gray-700">Total Potential Value:</span>
                  <span className="text-green-700">
                    ${(investAmount * (1 + selectedCampaign.returnRate / 100)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowInvestModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={handleInvestSubmit}
              >
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investments;