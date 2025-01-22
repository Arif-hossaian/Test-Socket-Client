import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_KEY;

const LaunchList = () => {
  const users = [
    {
      id: 1,
      name: 'Sarah Wilson',
      role: 'Product Designer',
      online: true,
      avatar: '/api/placeholder/32/32',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Frontend Developer',
      online: true,
      avatar: '/api/placeholder/32/32',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Project Manager',
      online: false,
      avatar: '/api/placeholder/32/32',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'UX Researcher',
      online: true,
      avatar: '/api/placeholder/32/32',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Backend Developer',
      online: false,
      avatar: '/api/placeholder/32/32',
    },
  ];
  const [launchList, setLaunchList] = useState([]);
  const fetchLaunchList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/launch/src/al`);
      if (response.data.error === false) {
        setLaunchList(response.data.data);
      } else {
        setLaunchList([]);
      }
    } catch (error) {
      console.log(error, 'error');
      setLaunchList([]);
    }
  };

  useEffect(() => {
    fetchLaunchList();
  }, []);

  return (
    <div className="mt-3 border border-2 border-green-800 rounded-lg mx-5 p-6">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Active Launch List</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
          >
            {/* User Info Section */}
            <div className="flex items-center space-x-4">
              {/* Avatar with Online Status */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    user.online ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              </div>

              {/* User Details */}
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.online
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {user.online ? 'Online' : 'Offline'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchList;
