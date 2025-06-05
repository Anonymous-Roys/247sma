import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

const CrowdfundingProjects = () => {
  const [isRealData, setIsRealData] = useState(false);

  // Dummy data
  const dummyProjects = [
  {
      id: 1,
      title: 'Organic Maize Farm Expansion',
      description: 'Help me expand my maize farm in Kumasi to meet growing demand for organic produce. Funds will go towards seeds, irrigation, and equipment.',
      progress: 45,
      amount: 12500,
      contributors: 8,
      contributorType: 'GHC',
    },
    {
      id: 2,
      title: 'Kente Weaving Workshop',
      description: 'Support traditional Kente weaving in Bonwire by funding new looms and training for young apprentices to preserve this cultural heritage.',
      progress: 72,
      amount: 18300,
      contributors: 15,
      contributorType: 'GHC',
    },
    {
      id: 3,
      title: 'Shea Butter Processing Unit',
      description: 'Establish a women-led shea butter processing center in Tamale to create jobs and add value to raw materials before export.',
      progress: 38,
      amount: 8900,
      contributors: 5,
      contributorType: 'GHC',
    },
    {
      id: 4,
      title: 'Mobile Fish Farming Initiative',
      description: 'Innovative mobile fish farming tanks for coastal communities in Elmina to improve food security and create sustainable livelihoods.',
      progress: 91,
      amount: 22450,
      contributors: 23,
      contributorType: 'GHC',
    },
  ];

  // Real data - replace with API data
  const realProjects = [
    {
      id: 1,
      title: '',
      description: '',
      progress: 0,
      amount: 0,
      contributors: 0,
      contributorType: 'GHC',
    },
    // ... other real projects
  ];

  const projects = isRealData ? realProjects : dummyProjects;

  return (
    <div className="relative p-6 mt-6 bg-white rounded-lg shadow-sm">
      {/* Dummy data overlay */}
      {!isRealData && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] z-10">
          <div className="p-4 text-center border border-gray-200 rounded-lg shadow-sm bg-white/90">
            <span className="inline-block px-2 py-1 mb-2 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
              DEMONSTRATION DATA
            </span>
            <p className="mb-3 text-gray-700">Sample crowdfunding projects shown</p>
            <button
              onClick={() => setIsRealData(true)}
              className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
            >
              Switch to Real Projects
            </button>
          </div>
        </div>
      )}

      {/* Header with toggle */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Crowdfunding Projects</h2>
          <p className="text-gray-600">
            {isRealData ? 'Live agricultural projects seeking funding' : 'Sample agricultural projects'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsRealData(!isRealData)}
            className={`text-xs px-2 py-1 rounded ${isRealData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {isRealData ? 'Live Data' : 'Demo Data'}
          </button>
          <button aria-label="More options" className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <div key={project.id} className="overflow-hidden transition-shadow border border-gray-200 rounded-lg hover:shadow-md">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  {project.title}
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between mb-1 text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-yellow-600 bg-yellow-100 rounded-full">
                    {project.contributorType}
                  </div>
                  <div className="px-2 py-1 ml-2 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                    +{project.contributors}
                  </div>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {project.contributorType === 'GHC' ? '₵' : '$'}{project.amount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrowdfundingProjects