import React, { useEffect, useState } from 'react';
import './Reservation.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiUser, FiMail, FiUsers, FiMessageSquare } from 'react-icons/fi';

function Reservation({ url }) {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [todayReservations, setTodayReservations] = useState(0);

    const fetchAllReservation = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/reservation/getReservation`);
            if (res.status === 200) {
                const sortedReservations = res.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setReservations(sortedReservations);
                setFilteredReservations(sortedReservations);

                // Count today's reservations
                const today = new Date().toISOString().split('T')[0];
                const todayCount = sortedReservations.filter(res =>
                    res.date && res.date.startsWith(today)
                ).length;
                setTodayReservations(todayCount);
            } else {
                toast.error(res.data?.message || "Error getting reservations");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching reservations");
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReservation();
    }, []);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);

        if (!selectedDate) {
            setFilteredReservations(reservations);
        } else {
            const filtered = reservations.filter(res =>
                res.date && new Date(res.date).toISOString().split('T')[0] === selectedDate
            );
            setFilteredReservations(filtered);
        }
    };

    const formatDateTime = (isoString) => {
        if (!isoString) return "N/A";

        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatReservationDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusBadge = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return null;

        const reservationDateTime = new Date(`${dateStr}T${timeStr}`);
        const now = new Date();

        if (reservationDateTime < now) {
            return <span className="status-badge past">Completed</span>;
        } else if (reservationDateTime > new Date(now.getTime() + 3600000)) {
            return <span className="status-badge upcoming">Upcoming</span>;
        } else {
            return <span className="status-badge active">Active</span>;
        }
    };

    return (
        <div className="reservation-page">
            <div className="reservation-header">
                <h2>Reservation Management</h2>
                <div className="reservation-stats">
                    <span>Total: {reservations.length}</span>
                    <span>Today: {todayReservations}</span>
                </div>
            </div>

            <div className="filter-controls">
                <div className="date-filter">
                    <FiCalendar className="filter-icon" />
                    <input
                        type="date"
                        id="filterDate"
                        value={filterDate}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    {filterDate && (
                        <button
                            className="clear-filter"
                            onClick={() => {
                                setFilterDate('');
                                setFilteredReservations(reservations);
                            }}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="loading-spinner">Loading reservations...</div>
            ) : (
                <div className="reservation-list">
                    {filteredReservations.length > 0 ? (
                        filteredReservations.map((res) => (
                            <div key={res._id} className="reservation-card">
                                <div className="card-header">
                                    <h3>
                                        <FiUser /> {res.name}
                                    </h3>
                                    <div className="header-meta">
                                        {getStatusBadge(res.date, res.time)}
                                        <span className="reservation-id">#{res._id.slice(-6)}</span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="info-row">
                                        <span className="info-label"><FiMail /> Email:</span>
                                        <span className="info-value">{res.email || "N/A"}</span>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-label"><FiUsers /> Guests:</span>
                                        <span className="info-value">{res.guests || "N/A"}</span>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-label"><FiCalendar /> Date:</span>
                                        <span className="info-value">
                                            {formatReservationDate(res.date)}
                                        </span>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-label"><FiClock /> Time:</span>
                                        <span className="info-value">
                                            {res.time ? new Date(`2000-01-01T${res.time}`).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : "N/A"}
                                        </span>
                                    </div>

                                    {res.specialRequests && (
                                        <div className="special-requests">
                                            <span className="info-label"><FiMessageSquare /> Requests:</span>
                                            <p>{res.specialRequests}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="card-footer">
                                    <span>Created: {formatDateTime(res.createdAt)}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <img src="/empty-reservations.svg" alt="No reservations" />
                            <p>{filterDate ?
                                `No reservations found for ${new Date(filterDate).toLocaleDateString()}` :
                                "No reservations available"}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Reservation;
