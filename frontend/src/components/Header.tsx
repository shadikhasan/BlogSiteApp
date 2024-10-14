// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="bg-info text-white py-3">
            <div className="container">
                <h1 className="display-6 text-center">Welcome to BlogApp</h1>
                <p className="lead text-center">Explore insightful articles and posts</p>
                <nav className="navbar navbar-expand-lg navbar-light bg-info">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse justify-content-center">
                            <ul className="navbar-nav">
                                <li className="nav-item mx-2">
                                    <Link className="nav-link text-white" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item mx-2 dropdown">
                                    <Link 
                                        className="nav-link text-white dropdown-toggle" 
                                        to="#" 
                                        id="navbarDropdown" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        Menu
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/posts">Posts</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/about">About</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
