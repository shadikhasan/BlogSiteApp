// src/components/PostList.tsx
import React, { useState, useEffect, useContext } from 'react';
import PostCard from './PostCard';
import Pagination from './Pagination';
import { Post } from '../types/post';
import Search from './Search';
import { CategoryContext } from '../CategoryContext'; // Import the context

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(5); // Number of posts per page
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    const { selectedCategoryName } = useContext(CategoryContext)!; // Get the selected category name

    useEffect(() => {
        // Fetch posts from your API
        const fetchPosts = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/posts/');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    // Update the search query when a category is selected
    useEffect(() => {
        if (selectedCategoryName) {
            setSearchQuery(selectedCategoryName); // Set search query to the selected category name
        } else {
            setSearchQuery(''); // Reset search query if no category is selected
        }
    }, [selectedCategoryName]);

    // Calculate total pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    // Filter posts based on the search query
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            <h1>Recent Posts</h1>
            <hr />
            {currentPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </div>
    );
};

export default PostList;
