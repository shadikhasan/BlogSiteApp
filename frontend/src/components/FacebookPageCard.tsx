import React, { useEffect } from 'react';
import './FacebookPageCard.css'

const FacebookPageCard: React.FC = () => {
    // Use useEffect to ensure the Facebook SDK parses the element after render
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <div className="card facebook-page-card" style={{ width: '100%', marginTop: '20px' }}>
            <div className="card-body">
                <h5 className="card-title">Follow Us on Facebook</h5>
                <hr />
                <div className="facebook-embed-container">
                    <div
                        className="fb-page"
                        data-href="https://www.facebook.com/TechTrickBangla/"
                        data-width="340"  // Set a smaller width to fit the card
                        data-small-header="false"
                        data-adapt-container-width="true"
                        data-hide-cover="false"
                        data-show-facepile="true"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default FacebookPageCard;
