import React from 'react';
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets.js';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-section footer-left">
          <img src={assets.logoF} alt="BitySnack Logo" className="footer-logo" />
          <p className="footer-description">Delicious snacks delivered to your door.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-section footer-center">
          <h2>Company</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section footer-right">
          <h2>Get In Touch</h2>
          <ul>
            <li><a href="tel:+212531734209">+212 5 31 73 42 09</a></li>
            <li><a href="mailto:contact@aherestaurant.com">contact@aherestaurant.com</a></li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        © 2025 aherestaurant.com — All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
