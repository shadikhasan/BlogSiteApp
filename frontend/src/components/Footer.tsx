import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Us Section */}
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>
                        We are dedicated to providing the best tech solutions and tutorials for our audience.
                        Stay connected with us for more updates and innovations.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@techtrickbangla.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>

                {/* Social Media Section */}
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-media">
                        <a href="https://www.facebook.com/TechTrickBangla" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Tech Trick Bangla. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
