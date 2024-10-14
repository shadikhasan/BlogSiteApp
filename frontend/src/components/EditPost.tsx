import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import './EditPost.css'; // Import your custom styles

interface EditPostProps {
  placeholder?: string; // Optional placeholder prop
}

const EditPost: React.FC<EditPostProps> = () => {
  const { id } = useParams<{ id: string }>(); // Post ID from the URL
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(''); // State for editor content
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(''); // State for displaying existing thumbnail
  const [previewUrl, setPreviewUrl] = useState<string>(''); // State for displaying selected thumbnail preview
  const [categories, setCategories] = useState<any[]>([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // State for selected category
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const editor = useRef<JoditEditor>(null); // Reference to JoditEditor

  useEffect(() => {
    const fetchPost = async () => {
      const bearerToken = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load post data');
        }

        const post = await response.json();
        setTitle(post.title);
        setContent(post.content); // Set initial content for the editor
        setSelectedCategory(post.category); // Set initial category
        setThumbnailUrl(post.thumbnail); // Set the existing thumbnail URL
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchCategories = async () => {
      const bearerToken = localStorage.getItem('token');

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

    fetchPost();
    fetchCategories();
  }, [id]);

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const bearerToken = localStorage.getItem('token');

    if (!bearerToken) {
      setError('You need to be logged in to update a post.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content); // Include the editor content
    formData.append('category', selectedCategory); // Append selected category
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}/`, {
        method: 'PATCH', // Use PATCH instead of PUT
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      navigate('/my-posts'); // Redirect to "My Posts" after update
    } catch (err: any) {
      setError(err.message);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: 'Start typing your content...', // Placeholder text
      height: 400, // Set the desired height here
    }),
    []
  );

  // Handle thumbnail file selection
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setThumbnail(file);
    
    // If a new file is selected, create a preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(''); // Clear the preview URL if no file is selected
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdatePost} className="edit-post-form">
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
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // Update content on blur
            onChange={() => {}} // No operation on change for performance reasons
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
        <div className="thumbnail-preview">
            {thumbnailUrl && (
            <div className="thumbnail-container">
                <img
                src={thumbnailUrl}
                alt="Current Thumbnail"
                className="current-thumbnail"
                />
                <p className="thumbnail-caption">Current Thumbnail</p>
            </div>
            )}
            {previewUrl && (
            <div className="thumbnail-container">
                <img
                src={previewUrl}
                alt="Selected Thumbnail Preview"
                className="preview-thumbnail"
                />
                <p className="thumbnail-caption">Selected Thumbnail Preview</p>
            </div>
            )}
        </div>
        <input
            type="file"
            onChange={handleThumbnailChange}
            className="form-control"
        />
        </div>

        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost; // Export the component
