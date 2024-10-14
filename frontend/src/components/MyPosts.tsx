import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard'; // Import the PostCard component

const MyPosts: React.FC = () => {
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem('token');

  useEffect(() => {
    if (!bearerToken) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/my-posts', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const data = await response.json();
        setMyPosts(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, [bearerToken, navigate]);

  const handleDeletePost = async (id: number) => {
    const confirmation = window.confirm("Are you sure you want to delete this post?");
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete post');
      }

      setMyPosts(myPosts.filter((post) => post.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>My Posts</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {myPosts.map((post) => (
          <li key={post.id} style={{ margin: '10px 0' }}>
            {/* Use PostCard component for each post */}
            <PostCard post={post} />
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => navigate(`/edit-post/${post.id}`)}
                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{ padding: '5px 10px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
