import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedPosts.css';

interface RelatedPost {
  id: number;
  title: string;
  author_username: string;
  thumbnail: string | null; // Allow for null thumbnails
  date_posted: string;
}

interface RelatedPostsProps {
  postId: number; // Pass the current post ID as a prop
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ postId }) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/related/`);
        if (!response.ok) {
          throw new Error('Failed to fetch related posts');
        }
        const data: RelatedPost[] = await response.json();
        setRelatedPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (relatedPosts.length === 0) {
    return <div>No related posts found.</div>;
  }

  const handleClick = (postId: number) => {
    navigate(`/posts/${postId}`);
    window.scrollTo(0, 0);
  };

  // Base URL for your media assets
  const BASE_URL = 'http://127.0.0.1:8000'; // Change to your actual base URL if different

  return (
    <div className="related-posts-container">
      <h2>Related Posts</h2>
      <div className="posts-grid">
        {relatedPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="thumbnail-container">
              {/* Check if the thumbnail exists and prepend the base URL */}
              {post.thumbnail ? (
                <img src={`${BASE_URL}${post.thumbnail}`} alt={post.title} className="thumbnail" />
              ) : (
                <div className="placeholder-thumbnail">No Image Available</div> // Fallback for missing thumbnail
              )}
            </div>
            <div className="post-title-container3">
              <h6>{post.title}</h6>
              <button className="read-more-btn3" onClick={() => handleClick(post.id)}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
