// src/components/PostDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../types/post'; // Adjust the import according to your file structure
import AuthorPosts from './AuthorPosts';
import RelatedPosts from './RelatedPosts';
import UserProfile from './UserProfile';


const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const data: Post = await response.json();
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>; // or an error message
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <div
                    className="card-text mt-3"
                    dangerouslySetInnerHTML={{ __html: post.content }} // Display the rich text content
                    />
                    <p className="card-subtitle mt-4 text-muted">
                    By: {post.author_username} on {new Date(post.date_posted).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="card mt-5">
                <AuthorPosts authorId={post.author_id} />
            </div>
            <div className="card mt-5">
                <RelatedPosts postId={post.id} />
            </div>
            <div className="mt-5">
                <UserProfile userId={post.author_id} />
            </div>


        </div>
    );
    };    

export default PostDetail;
