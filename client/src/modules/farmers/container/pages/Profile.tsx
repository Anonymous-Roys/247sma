import { useEffect, useState } from 'react';
import { Edit2, Camera } from 'lucide-react';
import ProfileSummary from '../../components/profile/ProfileSummary';



export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null); // Initially null
  const [tempData, setTempData] = useState<any>(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('https://two47sma.onrender.com/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
const [firstName = '', lastName = ''] = (data.user.fullname || '').trim().split(' ');

        const user = {
          firstName,
          lastName,
          email: data.user.email || '',
          phone: data.user.phone || '',
          phoneIntl: data.user.phoneIntl || '',
          country: data.user.country || '',
          postalCode: data.user.postalCode || '',
          farmSize: data.user.farmSize || '',
          location: data.user.location || '',
          cropTypes: data.user.cropTypes || '',
          smartEquipment: data.user.smartEquipment || '',
          idNumber: data.user.idNumber || '',
          totalInvest: data.user.totalInvest || '',
          totalProfit: data.user.totalProfit || '',
          netIncome: data.user.netIncome || ''
        };

        setProfileData(user);
        setTempData(user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTempData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch('https://two47sma.onrender.com/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tempData),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      
      setProfileData(tempData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  if (!profileData) return <div className="p-6">Loading...</div>;

  return (
    
    <div className="flex flex-col min-h-screen p-4 ">
      <div className="relative p-6 text-white bg-green-800">
        <h1 className="text-2xl font-bold">
          {profileData.firstName}'s Agro Profile
        </h1>
      </div>

      <div className="flex flex-col flex-grow gap-4 mt-4 md:flex-row">
        <ProfileSummary />

        <div className="w-full p-6 bg-white rounded-lg shadow-sm md:w-3/4">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
              <Camera size={24} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-500">{profileData.phoneIntl}</p>
            </div>
          </div>

         <div className="pb-2 mb-6 border-b border-gray-200">
            <h3 className="text-sm font-medium text-green-600 uppercase">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-500">First Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="firstName" 
                  value={tempData.firstName} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.firstName}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Last Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="lastName" 
                  value={tempData.lastName} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.lastName}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Email</label>
              {isEditing ? (
                <input 
                  type="email" 
                  name="email" 
                  value={tempData.email} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.email}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Phone Number</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="phone" 
                  value={tempData.phone} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.phone}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Country</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="country" 
                  value={tempData.country} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.country}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Postal Code</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="postalCode" 
                  value={tempData.postalCode} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.postalCode}</div>
              )}
            </div>
          </div>
          
          <div className="pb-2 mt-10 mb-6 border-b border-gray-200">
            <h3 className="text-sm font-medium text-green-600 uppercase">Farm Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-500">Farm Size</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="farmSize" 
                  value={tempData.farmSize} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.farmSize}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Location</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="location" 
                  value={tempData.location} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.location}</div>
              )}
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-500">Crop Types</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="cropTypes" 
                  value={tempData.cropTypes} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="font-medium">{profileData.cropTypes}</div>
              )}
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-1 text-sm text-gray-500">Smart Equipment owned</label>
              {isEditing ? (
                <textarea 
                  name="smartEquipment" 
                  value={tempData.smartEquipment} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                />
              ) : (
                <div className="font-medium">{profileData.smartEquipment}</div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            {isEditing ? (
              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                <Edit2 size={16} />
                EDIT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
