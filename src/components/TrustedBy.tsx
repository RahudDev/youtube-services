// components/TrustedBy.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import './TrustedBy.css';
import CountUp from './countUp';

interface YouTubeUser {
  username: string;
  title: string;
  image: string;
}

const TrustedBy: React.FC = () => {
  const [profiles, setProfiles] = useState<YouTubeUser[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${API}/api/youtube/yt-profiles`); // your backend route

        // response.data now has { totalUsers, profiles }
        setProfiles(response.data.profiles);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Failed to load YouTube profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="flex flex-col items-center my-6">
      <p className="text-gray-300 text-sm mb-2">
        Trusted by{' '}
      <span className="font-semibold text-white">
     <CountUp target={totalUsers} duration={500} /> total creators
      </span>
      </p>
      <div className="flex -space-x-4">
        {profiles.map((user, idx) => (
  <div key={idx} className="relative group spherical-profile-container">
    <img
      src={user.image}
      alt={user.username}
      className="spherical-profile"
    />
    <span className="tooltip-text">{user.username}</span>
  </div>
))}

      </div>
    </div>
  );
};

export default TrustedBy;
