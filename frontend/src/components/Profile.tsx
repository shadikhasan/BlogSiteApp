import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AdminUser {
    username: string;
    profile_picture: string | null;
    phone_number: string | null;
    address: string | null;
    date_of_birth: string | null;
    bio: string | null;
    interested_in: string | null;
    first_name: string | null;
    last_name: string | null;
    facebook_url?: string | null;
    linkedin_url?: string | null;
    youtube_url?: string | null;
    github_url?: string | null;
    created_at: string;
    updated_at: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<AdminUser | null>(null);
    const [editProfile, setEditProfile] = useState<AdminUser | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const BASE_URL = 'http://127.0.0.1:8000'; // Adjust your base URL here

    useEffect(() => {
        if (!token) {
            console.error('No auth token found');
            return;
        }

        axios.get('http://127.0.0.1:8000/auth/profile/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setProfile(response.data);
            setEditProfile(response.data);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
    }, [token]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editProfile) {
            setEditProfile({ ...editProfile, [name]: value });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setImagePreview(imageUrl);
            if (editProfile) {
                setEditProfile({ ...editProfile, profile_picture: imageUrl });
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            console.error('No auth token found');
            return;
        }

        if (!editProfile?.phone_number || !editProfile?.address) {
            setMessage('Please fill out all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('username', editProfile.username);
        formData.append('first_name', editProfile.first_name || '');
        formData.append('last_name', editProfile.last_name || '');
        formData.append('phone_number', editProfile.phone_number || '');
        formData.append('address', editProfile.address || '');
        formData.append('date_of_birth', editProfile.date_of_birth || '');
        formData.append('bio', editProfile.bio || '');
        formData.append('interested_in', editProfile.interested_in || '');
        formData.append('facebook_url', editProfile.facebook_url || '');
        formData.append('linkedin_url', editProfile.linkedin_url || '');
        formData.append('youtube_url', editProfile.youtube_url || '');
        formData.append('github_url', editProfile.github_url || '');
        if (file) {
            formData.append('profile_picture', file);
        }

        axios.patch('http://127.0.0.1:8000/auth/profile/', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            const updatedProfile = response.data;
            setProfile(updatedProfile);
            setEditProfile(updatedProfile);
            setIsEditing(false);
            setImagePreview(null);
            setMessage('Profile updated successfully!');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile. Please try again.');
        });
        window.scrollTo(0, 0);
    };

    const handleCancel = () => {
        setEditProfile(profile);
        setFile(null);
        setImagePreview(null);
        setIsEditing(false);
        setMessage(null);
        window.scrollTo(0, 0);
    };

    if (!profile) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">User Profile</h1>
            {message && <div className="alert alert-info text-center">{message}</div>}
            <div className="row justify-content-center mb-4">
                <div className="col-md-4 text-center">
                    <img 
                        src={imagePreview || (profile.profile_picture ? `${BASE_URL}${profile.profile_picture}` : '/default-avatar.png')} 
                        alt="Profile" 
                        className="img-fluid rounded-circle" 
                        width={150} 
                        height={150} 
                    />
                    {isEditing && (
                        <div className="mt-2">
                            <label htmlFor="file-upload" className="btn btn-secondary">
                                Change Profile Picture
                            </label>
                            <input 
                                id="file-upload" 
                                type="file" 
                                className="d-none" 
                                name="profile_picture" 
                                onChange={handleFileChange} 
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                            <div className="mb-3">
                                <label className="form-label">First Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="first_name" 
                                    value={editProfile?.first_name || ''} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="last_name" 
                                    value={editProfile?.last_name || ''} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="phone_number" 
                                    value={editProfile?.phone_number || ''} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="address" 
                                    value={editProfile?.address || ''} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date of Birth:</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="date_of_birth" 
                                    value={editProfile?.date_of_birth || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bio:</label>
                                <textarea 
                                    className="form-control" 
                                    name="bio" 
                                    value={editProfile?.bio || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Interested In:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="interested_in" 
                                    value={editProfile?.interested_in || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            {/* Social Media Links */}
                            <div className="mb-3">
                                <label className="form-label">Facebook URL:</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    name="facebook_url" 
                                    value={editProfile?.facebook_url || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">LinkedIn URL:</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    name="linkedin_url" 
                                    value={editProfile?.linkedin_url || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Youtube URL:</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    name="youtube_url"  
                                    value={editProfile?.youtube_url || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">GitHub URL:</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    name="github_url" 
                                    value={editProfile?.github_url || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-light p-4 rounded shadow-sm">
                            <h4>{profile.first_name} {profile.last_name}</h4>
                            <p><strong>Phone:</strong> {profile.phone_number}</p>
                            <p><strong>Address:</strong> {profile.address}</p>
                            <p><strong>Bio:</strong> {profile.bio || 'N/A'}</p>
                            <p><strong>Interested In:</strong> {profile.interested_in || 'N/A'}</p>
                            <p><strong>Date of Birth:</strong> {profile.date_of_birth || 'N/A'}</p>
                            {/* Social Media Links */}
                            <div className="mt-3">
                                {profile.facebook_url && <a href={profile.facebook_url} className="me-2">Facebook</a>}
                                {profile.linkedin_url && <a href={profile.linkedin_url} className="me-2">LinkedIn</a>}
                                {profile.github_url && <a href={profile.github_url} className="me-2">GitHub</a>}
                            </div>
                            <div className="text-center mt-4">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        setIsEditing(true);
                                        setMessage(null);
                                        }
                                    }>Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
