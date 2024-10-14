import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS for collapse
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);  // State to track the collapse status
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);  // Toggle the collapse state
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    BlogApp
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    aria-expanded={!isCollapsed}
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}  // Toggle the navbar collapse on click
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin-list">
                                Admin Lists
                            </NavLink>
                        </li>
                        {token && ( // Show Profile link only if token exists
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    Profile
                                </NavLink>
                            </li>
                        )}
                        {token && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/create-post">
                                        Create Post
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-posts">
                                        My Posts
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {token ? (
                            <li className="nav-item">
                                <button 
                                    className="btn btn-outline-light bg-danger nav-link" 
                                    onClick={handleLogout}
                                >
                                    <i className="fas fa-sign-out-alt me-2"></i>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
