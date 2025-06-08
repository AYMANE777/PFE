import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header-overlay" />
            <div className="header-contents">
                <h2>Order your favorite food here</h2>
                <p>
                    Start your journey with crispy samosas, golden and flaky, filled with a spiced mix of potatoes, peas, and coriander, served with tangy tamarind chutney. Enjoy savory gyoza dumplings—pan-seared to perfection.
                </p>
                <a href="#reservations" className="header-button">Reserve Now</a>
            </div>
        </div>
    );
}

export default Header;
