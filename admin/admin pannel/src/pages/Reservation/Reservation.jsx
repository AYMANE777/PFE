import React, { useEffect, useState } from 'react';
import './Reservation.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Reservation({ url }) {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    const fetchAllReservation = async () => {
        try {
            const res = await axios.get(`${url}/api/reservation/getReservation`);
            if (res.status === 200) {
                setReservations(res.data);
                setFilteredReservations(res.data);
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

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);

        if (selectedDate === '') {
            setFilteredReservations(reservations);
        } else {
            const filtered = reservations.filter(res =>
                res.date && res.date.startsWith(selectedDate)
            );
            setFilteredReservations(filtered);
        }
    };

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
        <div className="reservation-page">
            <h3 className="reservation-title">Reservation Page</h3>
            <div className="filter-container">
                <label htmlFor="filterDate">Filter by date:</label>
                <input
                    type="date"
                    id="filterDate"
                    value={filterDate}
                    onChange={handleDateChange}
                />
            </div>
            <div className="order-list">
                {filteredReservations.length > 0 ? (
                    filteredReservations.map((res) => (
                        <div key={res._id} className="reservation-card">
                            <div className="reservation-header">
                                <h4>{res.name}</h4>
                                <span>{formatDate(res.createdAt)}</span>
                            </div>
                            <p><strong>Email:</strong> {res.email}</p>
                            <p><strong>Guests:</strong> {res.guests}</p>
                            <p><strong>Date:</strong> {formatDate(res.date)}</p>
                            <p><strong>Time:</strong> {formatTime(res.time)}</p>
                            <p><strong>Requests:</strong> {res.specialRequests}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-reservations">No reservations found for selected date.</p>
                )}
            </div>
        </div>
    );
}

export default Reservation;
