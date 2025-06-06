
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  user: {
    name: string;
    email: string;
    avatar: string | null;
    initials: string;
    role?: string; // Optional, if available
  } | null;
};

const Header = ({ user }: HeaderProps) => {




  return (
    <div className="sticky top-0 z-20 p-3 right-2 left-2  bg-gradient-to-t from-[#dcdcdc0a] to-[#DCDCDC]">
      <header className="flex items-center justify-between w-full gap-2 p-2 bg-white rounded-md shadow-md">
        <div className="relative flex flex-grow md:mx-4">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for buyer investor, etc..."
            className="w-3/4 py-3 pl-10 pr-2 bg-[#dcdcdc07] border-none rounded-lg focus:outline-none placeholder:text-sm"
          />
        </div>
        <Link to="/farmers/notification">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6 text-center text-gray-700 " />
            </button>
            {/* Notification badge */}
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full">
              3
            </span>
          </div>
        </Link>

        {/* Right section: User profile */}
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="object-cover w-10 h-10 bg-gray-200 border border-gray-300 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white bg-gray-300 rounded-full">
              {user?.initials || "U"}
            </div>
          )}

          <div className="flex-col hidden text-left md:flex">
            <span className="text-sm font-medium">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.role || "Farmer"}
            </span>
          </div>

        </div>

      </header>
    </div>
  );
};

export default Header;
