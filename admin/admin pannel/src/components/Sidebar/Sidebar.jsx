import React from 'react';
import "./Sidebar.css"
import {assets} from "../../assets/assets.js";
import {NavLink} from "react-router-dom";
import reserv from "../../assets/reservation.png";
function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add_icon} alt=""/>
                    <p>Add Items</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_check} alt=""/>
                    <p>List Food</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.order_icon} alt=""/>
                    <p>Orders</p>
                </NavLink>
                <NavLink to="/reservation" className="sidebar-option">
                    <img src={assets.reserv} alt=""/>
                    <p>Reservations</p>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;