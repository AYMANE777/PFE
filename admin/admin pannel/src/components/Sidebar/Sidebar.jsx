import React from 'react';
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import {
    FiHome,
    FiPlusSquare,
    FiList,
    FiShoppingBag,
    FiCalendar,
    FiSettings,
    FiLogOut
} from "react-icons/fi";

function Sidebar({ onLogout }) {
    const location = useLocation();
    const isMobile = window.innerWidth <= 768;

    const menuItems = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FiHome size={isMobile ? 20 : 18} />,
            exact: true
        },
        {
            path: "/add",
            name: "Add Items",
            icon: <FiPlusSquare size={isMobile ? 20 : 18} />,
            exact: false
        },
        {
            path: "/list",
            name: "Menu Items",
            icon: <FiList size={isMobile ? 20 : 18} />,
            exact: false
        },
        {
            path: "/orders",
            name: "Orders",
            icon: <FiShoppingBag size={isMobile ? 20 : 18} />,
            exact: false
        },
        {
            path: "/reservation",
            name: "Reservations",
            icon: <FiCalendar size={isMobile ? 20 : 18} />,
            exact: false
        }
    ];

    return (
        <aside className="sidebar" aria-label="Main navigation">
            <div className="sidebar-header">
                {!isMobile && <h2 className="sidebar-title">Admin Panel</h2>}
            </div>

            <nav className="sidebar-nav">
                <ul className="sidebar-options">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `sidebar-option ${isActive ? "active" : ""}`
                                }
                                end={item.exact}
                                aria-current={location.pathname === item.path ? "page" : undefined}
                            >
                <span className="option-icon" aria-hidden="true">
                  {item.icon}
                </span>
                                {!isMobile && <span className="option-text">{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button
                    className="sidebar-option logout-btn"
                    onClick={onLogout}
                    aria-label="Logout"
                >
                    <FiLogOut size={isMobile ? 20 : 18} />
                    {!isMobile && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
