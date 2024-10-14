// src/Appnew.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList'; 
import Slider from './components/Slider';
import PostDetail from './components/PostDetail'; 
import MyPosts from './components/MyPosts';
import CreatePost from './components/CreatePost'; 
import EditPost from './components/EditPost'; 
import Login from './components/Login';
import Register from './components/Register';
import PopularPostList from './components/PopularPostList';
import FacebookPageCard from './components/FacebookPageCard';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Profile from './components/Profile';
import AdminList from './components/AdminList';
import './App.css';

const App: React.FC = () => {
    // Get current location to check if it's the home page
    const location = useLocation(); 
    const isHomePage = location.pathname === '/';

    return (
        <div className="App">
            
            <Navbar/>

            <div className="mainContainer">
                <div className="container1">
                    {/* Conditionally render the Slider on the homepage */}
                    {isHomePage && (
                        <div className="slider"> {/* Flex container to center the slider */}
                            <Slider />
                        </div>
                    )}

                    {/* Render the recent posts based on routes */}
                    <div className="recent-posts">
                        <Routes>
                            <Route path="/" element={<PostList />} />
                            <Route path="/posts" element={<PostList />} />
                            <Route path="/posts/:id" element={<PostDetail />} />
                            <Route path="/my-posts" element={<MyPosts />} />
                            <Route path="/create-post" element={<CreatePost />} />
                            <Route path="/edit-post/:id" element={<EditPost />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin-list" element={<AdminList />} />

                        </Routes>
                    </div>
                </div>

                <div className="container2">
                    <div className="c2-item1">
                        <FacebookPageCard />
                    </div>

                    <div className="c2-item2">
                        <PopularPostList />
                    </div>

                    <div className="c2-item3">
                        <Categories/>
                    </div>

                    <div className="c2-item4">
                        <Categories/>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
};

// Wrap in the Router so `useLocation()` works
const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
