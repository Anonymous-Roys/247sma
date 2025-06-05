
import { Link, useNavigate } from 'react-router-dom';
import { User, Bell, HelpCircle, ArrowLeft } from 'lucide-react';
import { BASE_URL } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';

const ProfileSummary = () => {
    const navigate = useNavigate();
      const [userData, setProfileData] = useState<any>(null); // Initially null

      
    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch(`${BASE_URL}/api/me`, {
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
               
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);
   if (!userData) return <div className="p-6">Loading...</div>;

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm md:w-1/4 h-fit">
            <div className="mb-2 text-lg font-bold text-green-600">{userData.firstName} {userData.lastName}</div>
            {/* <div className="mb-4 text-sm text-gray-600">
                ID Number<br />
                <span className="font-semibold">{userData.idNumber}</span>
            </div> */}

            <div className="pt-4 mb-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                    Total Invest<br />
                    <span className="text-lg font-semibold">{userData.totalInvest}</span>
                </div>
            </div>

            <div className="flex justify-between mb-4">
                <div className="text-sm text-gray-600">
                    Total Profit<br />
                    <span className="font-semibold text-green-600">{userData.totalProfit}</span>
                </div>
                <div className="text-sm text-right text-gray-600">
                    Net Income<br />
                    <span className="font-semibold text-green-600">{userData.netIncome}</span>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <Link
                    to="/farmers/profile"
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-green-600"
                >
                    <User size={18} />
                    <span className="font-medium">User Profile</span>
                </Link>

                <Link
                    to="/farmers/notification"
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-green-600"
                >
                    <Bell size={18} />
                    <span className="font-medium">Notification</span>
                </Link>

                <Link
                    to="/farmers/support"
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-green-600"
                >
                    <HelpCircle size={18} />
                    <span className="font-medium">Support</span>
                </Link>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-8 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
                <ArrowLeft size={18} />
                <span>Back</span>
            </button>
        </div>
    );
}

export default ProfileSummary;
