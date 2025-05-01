import React, { useState } from 'react';
import { Mail, Shield, Star } from 'lucide-react';

interface Donation {
  donor: string;
  amount: number;
  type: string;
  timeAgo?: string;
  message?: string;
}

const CampaignDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All Donors' | 'Top Donors'>('All Donors');
  
  const campaignData = {
    title: "Help Kwame buy pesticide for his farm after loosing all his harvest to pests and rodents",
    target: 320013,
    raised: 200000,
    donors: 82,
    progress: 70,
    secure: true
  };
  
  const donations: Donation[] = [
    {
      donor: "Katherine felton",
      amount: 100,
      type: "Recent donation"
    },
    {
      donor: "Katherine felton",
      amount: 1000,
      type: "Top donation"
    },
    {
      donor: "Katherine felton",
      amount: 1000,
      type: "First donation"
    },
    {
      donor: "Katherine felton",
      amount: 250,
      type: "",
      timeAgo: "2d",
      message: "Lorem ipsum dolor sit amet consectetur. Sed dolor tempor nibh aliquet in risus lectus id. Tristique"
    },
    {
      donor: "Katherine felton",
      amount: 250,
      type: "",
      timeAgo: "2d",
      message: "Lorem ipsum dolor sit amet consectetur. Sed dolor tempor nibh aliquet in risus lectus id. Tristique"
    },
    {
      donor: "Katherine felton",
      amount: 250,
      type: "",
      timeAgo: "2d",
      message: "Lorem ipsum dolor sit amet consectetur. Sed dolor tempor nibh aliquet in risus lectus id. Tristique"
    }
  ];
  
  return (
    <div className="px-4 py-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left section (3/5 on large screens) */}
        <div className="lg:col-span-3">
          {/* Campaign Image */}
          <div className="w-full mb-4 overflow-hidden rounded-lg">
            <img 
              src="/farm-workers.jpg" 
              alt="Campaign Image" 
              className="object-cover w-full h-auto"
            />
          </div>
          
          {/* Campaign Title */}
          <h1 className="mb-4 text-2xl font-semibold text-gray-800">
            {campaignData.title}
          </h1>
          
          {/* Contact Button */}
          <div className="mb-6">
            <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-md">
              Contact <Mail className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          {/* Security Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 text-white bg-green-600 rounded-md">
            <Shield className="w-4 h-4 mr-2" /> Donation secured
          </div>
          
          {/* Description */}
          <div className="mb-10 space-y-4">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Consequat aliquam sagittis in odio orci ullamcorper euismod ipsum tincidunt. Interdum nisi pellentesque ac eleifend eget fames ultrices. Sit eget in placerat dolor felis proin donec. Etiam consequat rutrum in in neque pellentesque leo amet. Ultrices elementum sit porttitor amet diam dignissim cursus. Sodales tristique lectus aliquam consectetur dictumst non risus convallis. Elit velit sed velit in justo aenean aliquam interdum lobortis.
            </p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Consequat aliquam sagittis in odio orci ullamcorper euismod ipsum tincidunt. Interdum nisi pellentesque ac eleifend eget fames ultrices. Sit eget in placerat dolor felis proin donec. Etiam consequat rutrum in in neque pellentesque leo amet. Ultrices elementum sit porttitor amet diam dignissim cursus. Sodales tristique lectus aliquam consectetur dictumst non risus convallis. Elit velit sed velit in justo aenean aliquam interdum lobortis.
            </p>
          </div>
          
          {/* Share Button (Bottom) */}
          <div className="mb-10">
            <button className="w-full py-3 text-center text-gray-700 border border-gray-300 rounded-md">
              Share
            </button>
          </div>
          
          {/* Words of Support Section */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">Words of support (3)</h2>
            <p className="mb-6 text-gray-600">Please donate to share words of support.</p>
            
            <div className="space-y-6">
              {donations.slice(3).map((donation, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-full">
                      {donation.donor.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{donation.donor}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span>${donation.amount}</span>
                      {donation.timeAgo && <span className="ml-2">· {donation.timeAgo}</span>}
                    </div>
                    {donation.message && <p className="mt-1 text-gray-600">{donation.message}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right section (2/5 on large screens) */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            {/* Campaign Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Target</div>
                <div className="font-semibold">${campaignData.target.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Raised</div>
                <div className="font-semibold">${campaignData.raised.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Donors</div>
                <div className="font-semibold">{campaignData.donors}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-1 text-sm">
                <span>{campaignData.progress}% Target reached</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{ width: `${campaignData.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mb-8 space-y-3">
              <button className="w-full px-4 py-3 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
                Edit
              </button>
              <button className="w-full px-4 py-3 font-medium text-orange-500 border border-orange-500 rounded-md">
                Share
              </button>
            </div>
            
            {/* Recent Donations */}
            <div className="space-y-4">
              {donations.slice(0, 3).map((donation, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-full">
                      {donation.donor.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{donation.donor}</div>
                    <div className="flex items-center text-gray-600">
                      <span>${donation.amount}</span>
                      {donation.type && <span className="ml-2">· {donation.type}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Donor Tabs */}
            <div className="grid grid-cols-2 gap-0 mt-6 border border-gray-200 rounded-md">
              {(['All Donors', 'Top Donors'] as const).map((tab) => (
                <button 
                  key={tab}
                  className={`py-3 px-4 text-center ${
                    activeTab === tab 
                      ? 'bg-white font-medium' 
                      : 'bg-gray-50 text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {tab === 'Top Donors' && (
                    <Star className="inline-block w-4 h-4 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;