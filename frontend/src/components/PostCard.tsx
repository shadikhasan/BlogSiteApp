// src/components/PostCard.tsx

import React from "react";
import { Post } from "../types/post";
import { timeAgo } from '../utils/timeAgo'; // Import the timeAgo function
import { useNavigate } from "react-router-dom";
import { FaEye } from 'react-icons/fa'; // Import the icon you want to use
import "./PostCard.css"; // Ensure this path is correct

import DOMPurify from 'dompurify';

const sanitizeAndTruncateHtml = (html, maxLength) => {
  const sanitizedHtml = DOMPurify.sanitize(html, { ALLOWED_TAGS: ['b', 'i', 'strong', 'em'] });
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedHtml;
  const plainText = tempDiv.textContent || tempDiv.innerText || "";
  
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};


interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
    window.scrollTo(0, 0);
  };
  

  return (
    <div className="post-card">
      <div className="post-card-row">
        <div className="post-card-image">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="post-card-img"
          />
        </div>
        <div className="post-card-content">
          <h5 className="post-card-title">{post.title}</h5>
          <p
            className="post-card-text">
            {sanitizeAndTruncateHtml(post.content, 100)}
          </p>
          {/* Floating time ago text at the top right */}
          <p className="post-card-meta time-ago">
            <small>{timeAgo(post.date_posted)}</small>
          </p>
          <p className="post-card-meta">
            <small>By: {post.author_username}</small>
          </p>
          <div className="read-more-wrapper">
            <button
              className="read-more-btn"
              onClick={handleClick}
            >
              Read More
            </button>
          </div>
          {/* Floating Icon */}
          <div className="floating-icon">
            <FaEye size={24} className="eye-icon" />
            <span className="views-count">{post.views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
