import React, { useEffect, useState } from 'react';
import './AuthorPosts.css';
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  author_id: number;
  author_username: string;
  category_name: string;
  title: string;
  content: string;
  date_posted: string;
  thumbnail: string;
  views: number;
}

interface AuthorPostsProps {
  authorId: number; // Accept authorId as a prop
}

const AuthorPosts: React.FC<AuthorPostsProps> = ({ authorId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/author-posts/${authorId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [authorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available for this author.</div>;
  }

  const handleClick = (postId: number) => {
    navigate(`/posts/${postId}`);
    window.scrollTo(0, 0); 
  };

  return (
    <div className="author-posts-container">
      <h2>More posts by {posts[0]?.author_username}</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="thumbnail-container">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="thumbnail"
              />
            </div>
            <div className="post-title-container">
              <h6>{post.title}</h6>
              <button
                className="read-more-btn2"
                onClick={() => handleClick(post.id)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorPosts;
