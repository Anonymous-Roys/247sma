
import { Bell} from 'lucide-react';
import ProfileSummary from '../../components/profile/ProfileSummary';

export default function FarmNotifications() {


  // Notification data
  const notifications = {
    today: [
      {
        id: 1,
        time: "2m ago",
        type: "recommendation",
        message: "for increasing your maize crops to 20%",
        date: "Monday, June 31 2020",
        icon: "bell"
      },
      {
        id: 2,
        time: "6m ago",
        type: "alert",
        message: "pH Sensor for section 1 not working",
        date: "Monday, June 31 2020",
        icon: "alert"
      },
      {
        id: 3,
        time: "16m ago",
        type: "investment",
        message: "Kwame Adu has invested in your farm",
        date: "Monday, June 31 2020",
        icon: "investment"
      },
      {
        id: 4,
        time: "4h ago",
        type: "recommendation",
        message: "water plot 2 twice for 3 weeks",
        date: "Monday, June 31 2020",
        icon: "bell"
      },
      {
        id: 5,
        time: "12:31 AM",
        type: "recommendation",
        message: "for increasing your maize crops to 20%",
        date: "Monday, June 31 2020",
        icon: "bell"
      }
    ],
    yesterday: [
      {
        id: 6,
        time: "2m ago",
        type: "market",
        message: "the sales of yam has increased by 3% over the past 2 days",
        date: "Monday, June 31 2020",
        icon: "bell"
      },
      {
        id: 7,
        time: "2m ago",
        type: "alert",
        message: "Rodent infestation on farm land 3",
        date: "Monday, June 31 2020",
        icon: "alert"
      }
    ]
  };

  // Function to render notification icon based on type
  const renderIcon = (type:any) => {
    switch(type) {
      case "recommendation":
      case "market":
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
            <Bell size={18} className="text-white" />
          </div>
        );
      case "alert":
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
            <Bell size={18} className="text-white" />
          </div>
        );
      case "investment":
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full">
            <Bell size={18} className="text-white" />
          </div>
        );
    }
  };

  // Function to render notification title based on type
  const renderTitle = (type:any, message:any) => {
    switch(type) {
      case "recommendation":
        return (
          <div className="font-medium">
            Recommendation: <span className="font-normal">{message}</span>
          </div>
        );
      case "alert":
        return <div className="font-medium">{message}</div>;
      case "investment":
        return <div className="font-medium">{message}</div>;
      case "market":
        return (
          <div className="font-medium">
            Market Analysis: <span className="font-normal">{message}</span>
          </div>
        );
      default:
        return <div className="font-medium">{message}</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Banner */}
      <div className="relative p-6 text-white bg-green-800">
        <h1 className="text-2xl font-bold">Green Fields Agro Farm</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow gap-4 p-4 md:flex-row">
        
        {/* Left Sidebar */}
        <ProfileSummary/>
        {/* Main Notifications Content */}
        <div className="w-full p-6 bg-white rounded-lg shadow-sm md:w-3/4">
          {/* Today's Notifications */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Today</h2>
            
            <div className="space-y-6">
              {notifications.today.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4">
                  <div className="w-16 pt-2 text-sm text-gray-500">
                    {notification.time}
                  </div>
                  {renderIcon(notification.type)}
                  <div className="flex-1">
                    {renderTitle(notification.type, notification.message)}
                    <div className="mt-1 text-sm text-gray-500">{notification.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Yesterday's Notifications */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Yesterday</h2>
            
            <div className="space-y-6">
              {notifications.yesterday.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4">
                  <div className="w-16 pt-2 text-sm text-gray-500">
                    {notification.time}
                  </div>
                  {renderIcon(notification.type)}
                  <div className="flex-1">
                    {renderTitle(notification.type, notification.message)}
                    <div className="mt-1 text-sm text-gray-500">{notification.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}