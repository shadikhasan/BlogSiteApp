import React, { useEffect, useState } from 'react';
import './AdminList.css';  // Import the CSS styles
import ProfileCard from './ProfileCard';  // Import the ProfileCard component

// Interface for AdminUser type
interface AdminUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  bio: string | null;
  interested_in: string | null;
}

// AdminList Component
const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/admins');
        if (!response.ok) {
          throw new Error('Failed to fetch admin users');
        }
        const data: AdminUser[] = await response.json();
        setAdmins(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-list-container">
      <h2>Admin Users</h2>
      <div className="admin-grid">
        {admins.map((admin) => (
          <ProfileCard
            key={admin.id}
            name={
              admin.first_name && admin.last_name
                ? `${admin.first_name} ${admin.last_name}`
                : "Not Set"
            }
            username={admin.username}
            level={7}  // Example level
            email={admin.email}
            address={admin.address || "No address provided"}
            bio={admin.bio || "No bio available"}
            interestedIn={admin.interested_in || "No interest specified"}
            avatarUrl={admin.profile_picture || 'https://via.placeholder.com/100'}
            facebookUrl="#"  // Dummy URLs, you can pass actual URLs
            linkedinUrl="#"
            youtubeUrl="#"
            githubUrl="#"
            minHeight="500px" // Custom min height
            minWidth="300px"  // Custom min width
          />
        ))}
      </div>
    </div>
  );
};

export default AdminList;
