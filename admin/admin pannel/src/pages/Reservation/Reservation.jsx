import React, { useEffect, useState } from 'react';
import './Reservation.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

function Reservation({ url }) {
    const [reservations, setReservations] = useState([]);

    const fetchAllReservation = async () => {
        try {
            const res = await axios.get(`${url}/api/reservation/getReservation`);
            if (res.status === 200) {
                setReservations(res.data);
              
            } else if (res.status === 404) {
                toast.error("No reservations found");  

            } else {
                toast.error("Error getting reservations");
            }
        } catch (error) {
            toast.error("Error fetching reservations");
        }
    };

    useEffect(() => {
        fetchAllReservation();
    }, []);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();
    };

    const formatTime = (timeStr) => {
        const [hour, minute] = timeStr.split(":");
        const date = new Date();
        date.setHours(hour, minute);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="order add">
            <h3>Reservation Page</h3>
            <br/>
            <div className="order-list">
         {reservations.map((res, index) => (
                           <div key={res._id} className="reservation-card">
    <div className="reservation-header">
        <h4>{res.name}</h4>
        <span>{formatDate(res.createdAt)}</span>
    </div>
    <p><strong>Email:</strong> {res.email}</p>
    <p><strong>Guests:</strong> {res.guests}</p>
    <p><strong>Date:</strong> {formatDate(res.date)}</p>
    <p><strong>Time:</strong> {formatTime(res.time)}</p>
  
</div>

                         ))}
               
            </div>
        </div>
    );
}

export default Reservation;
