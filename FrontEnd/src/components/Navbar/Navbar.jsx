import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <Link to="/"><img src={assets.logo} alt="Logo" className="logo" /></Link>
            
            <ul className="navbar-menu">
                <li><Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link></li>
                <li><a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
                <li><a href="#app-download" onClick={() => setMenu("mobile")} className={menu === "mobile" ? "active" : ""}>Mobile App</a></li>
                <li><a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a></li>
            </ul>

            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img src={assets.panier} alt="Cart" />
                        {getTotalCartAmount() > 0 && <div className="dot"></div>}
                    </Link>
                </div>

                <img src={assets.blue_search} alt="Search" className="icon" />

                {!token ? (
                    <button className="signin-btn" onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/myorders")}>
                                <img src={assets.bag_icon} alt="Orders" />
                                <p>Orders</p>
                            </li>
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
