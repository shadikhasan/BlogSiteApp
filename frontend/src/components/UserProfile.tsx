// src/components/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

interface User {
  name: string;
  level: number;
  description: string;
  avatarUrl: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/admins/${userId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        
        // Assuming the API response structure matches your ProfileCard props
        setUser({
          name: data.username,
          level: 7,
          description: data.address,
          avatarUrl: data.profile_picture, // Adjust this according to the API response
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return user ? (
    <ProfileCard
      name={user.name}
      level={user.level}
      description={user.description}
      avatarUrl={user.avatarUrl}
    />
  ) : null;
};

export default UserProfile;
