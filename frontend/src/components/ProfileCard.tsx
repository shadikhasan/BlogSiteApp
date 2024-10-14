import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

interface ProfileCardProps {
  name: string;
  username: string;
  level: number;
  email: string;
  address: string;
  bio: string;
  interestedIn: string;
  avatarUrl: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  minHeight?: string; // Optional minHeight prop
  minWidth?: string;  // Optional minWidth prop
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name, 
  username,
  level, 
  email,
  address,
  bio,
  interestedIn,
  avatarUrl = 'https://via.placeholder.com/100', 
  facebookUrl = "", // Default to empty string
  linkedinUrl = "", // Default to empty string
  youtubeUrl = "",  // Default to empty string
  githubUrl = "",   // Default to empty string
  minHeight = '500px', // Default value if not provided
  minWidth = '100%'     // Default value if not provided
}) => {
  // Check if there are any social media URLs to display
  const hasSocialLinks = facebookUrl || linkedinUrl || youtubeUrl || githubUrl;

  return (
    <div 
      className="card text-center p-4 mb-4 shadow-sm profile-card" 
      style={{ minHeight, minWidth }} // Use props for minHeight and minWidth
    > 
      <div className="d-flex justify-content-center mb-3">
        <img 
          src={avatarUrl} 
          alt={`${name}'s avatar`} 
          className="rounded-circle img-fluid" 
          style={{ width: '120px', height: '120px' }} 
        />
      </div>
      <h2 className="card-title mb-2">{name}</h2>
      
      <div className="d-flex justify-content-center mb-2">
        <span className="badge bg-primary">Level {level}</span>
      </div>
      
      <p className="card-text text-muted">
        <strong>Username:</strong> {username}<br />
        <strong>Email:</strong> {email}<br />
        <strong>Address:</strong> {address}<br />
        <strong>Bio:</strong> {bio}<br />
        <strong>Interests:</strong> {interestedIn}
      </p>

      {hasSocialLinks && (
        <div className="profile-container">
          <h5>Connect with me:</h5>
          <div className="d-flex justify-content-center gap-3 mt-2">
            {facebookUrl && (
              <a href={facebookUrl} aria-label="Facebook" className="text-primary" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={24} />
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} aria-label="LinkedIn" className="text-primary" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={24} />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} aria-label="GitHub" className="text-dark" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
              </a>
            )}
            {youtubeUrl && (
              <a href={youtubeUrl} aria-label="YouTube" className="text-danger" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} />
              </a>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          .profile-card:hover {
            transform: translateY(-10px); 
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
          }
        `}
      </style>
    </div>
  );
};

export default ProfileCard;
