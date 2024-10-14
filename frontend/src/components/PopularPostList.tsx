import React, { useState, useEffect } from 'react';
import PostCard from './PostCard'; // Import your PostCard component
import { Post } from '../types/post'; // Import the Post type definition

const PopularPostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // State to hold posts data
    const [maxPostsToShow, setMaxPostsToShow] = useState<number>(3); // Max number of posts to show
    const initialMaxPosts = 3; // Initial number of posts to show

    useEffect(() => {
        // Fetch popular posts from your API
        const fetchPopularPosts = async () => {
            const response = await fetch('http://localhost:8000/api/popular-posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchPopularPosts();
    }, []);

    // Function to load more posts
    const handleShowMore = () => {
        setMaxPostsToShow(prevMax => prevMax + 5); // Increase the max posts to show by 5
    };

    // Function to hide extra posts (reset to initial number of posts)
    const handleHidePosts = () => {
        setMaxPostsToShow(initialMaxPosts); // Reset max posts to the initial number
    };

    // Slice the posts array to show only up to maxPostsToShow
    const displayedPosts = posts.slice(0, maxPostsToShow);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Popular Posts</h1>
            <hr />

            <div className="row">
                {/* Post Cards */}
                {displayedPosts.length > 0 ? (
                    displayedPosts.map(post => (
                        <div key={post.id} className="col-12 mb-4"> {/* Full width on all screen sizes */}
                            <PostCard post={post} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts found.</p>
                )}
            </div>

            {/* Show more and Hide buttons */}
            <div className="text-center mt-3">
                {displayedPosts.length < posts.length && (
                    <button className="btn btn-primary me-2" onClick={handleShowMore}>
                        Show More
                    </button>
                )}

                {displayedPosts.length > initialMaxPosts && (
                    <button className="btn btn-secondary" onClick={handleHidePosts}>
                        Hide
                    </button>
                )}
            </div>
        </div>
    );
};

export default PopularPostList;
