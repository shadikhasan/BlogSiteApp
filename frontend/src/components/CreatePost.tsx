// src/components/CreatePost.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import './CreatePost.css'; // Importing custom styles

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in; if not, redirect to login
  useEffect(() => {
    const bearerToken = localStorage.getItem('token');
    if (!bearerToken) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const bearerToken = localStorage.getItem('token');
      if (!bearerToken) return;

      try {
        const response = await fetch('http://localhost:8000/api/categories/', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const bearerToken = localStorage.getItem('token');

    if (!bearerToken) {
      setError('You need to be logged in to create a post.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', selectedCategory); // Append selected category
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const response = await fetch('http://localhost:8000/api/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: formData, // Use formData for file upload
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      navigate('/my-posts'); // Redirect to "My Posts" after successful creation
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreatePost} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="jodit-editor"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="form-control"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} {/* Change to your category name field */}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
