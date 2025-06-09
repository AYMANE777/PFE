import React, {useContext, useState} from 'react';
import "./Reservation.css"
import {StoreContext} from "../../context/StoreContext.jsx";
import {toast} from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

function Reservation() {

    const {url,token} = useContext(StoreContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '',
        specialRequests: '',
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data, [name]: value}));
    };

    const handleReservation = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/reservation/add`,data,{headers: {token}} );

            if (response.status === 201 && token) {

                Swal.fire({
                    title: "Réservation confirmée avec succès !",
                    text: "Merci pour votre réservation. Nous sommes ravis de vous accueillir au restaurant.",
                    icon: "success"
                });
                setData({
                    name: '',
                    email: '',
                    date: '',
                    time: '',
                    guests: '',
                    specialRequests: '',
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login First",
                });
            }
        } catch (err) {
            console.error('Submit error:', err);
            toast.error(err.message || 'Server error');
        }
    };

    return (
        <section id="reservations" className="reservation-section">
            <div id="explore-reservation" className="reservation-container">
                <div className="reservation-flex">
                    <div className="reservation-form-wrapper">
                        <h2 className="reservation-subtitle">Reservations</h2>
                        <h3 className="reservation-title">Book Your Experience</h3>
                        <p className="reservation-description">
                            Reserve your table at BitySnack for an unforgettable dining experience.
                            For private dining and special events, please contact our events team directly.
                        </p>

                        <form onSubmit={handleReservation} className="reservation-form">
                            <div className="reservation-grid">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        onChange={onChangeHandler} 
                                        value={data.name} 
                                        id="name" 
                                        placeholder="Your Name" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        onChange={onChangeHandler} 
                                        value={data.email} 
                                        id="email" 
                                        placeholder="Your Email" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="reservation-grid">
                                <div>
                                    <label htmlFor="date">Date</label>
                                    <input 
                                        type="date" 
                                        name="date" 
                                        onChange={onChangeHandler} 
                                        value={data.date} 
                                        id="date" 
                                        min={new Date().toISOString().split('T')[0]}
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time">Time</label>
                                    <div className="select-wrapper">
                                        <select 
                                            id="time" 
                                            name="time" 
                                            onChange={onChangeHandler} 
                                            value={data.time} 
                                            required
                                        >
                                            <option value="">Select Time</option>
                                            <option value="17:30">5:30 PM</option>
                                            <option value="18:00">6:00 PM</option>
                                            <option value="18:30">6:30 PM</option>
                                            <option value="19:00">7:00 PM</option>
                                            <option value="19:30">7:30 PM</option>
                                            <option value="20:00">8:00 PM</option>
                                            <option value="20:30">8:30 PM</option>
                                            <option value="21:00">9:00 PM</option>
                                        </select>
                                        <span className="select-icon">▼</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="guests">Number of Guests</label>
                                <div className="select-wrapper">
                                    <select 
                                        id="guests" 
                                        name="guests" 
                                        onChange={onChangeHandler} 
                                        value={data.guests} 
                                        required
                                    >
                                        <option value="">Select Number of Guests</option>
                                        <option value="1">1 Person</option>
                                        <option value="2">2 People</option>
                                        <option value="3">3 People</option>
                                        <option value="4">4 People</option>
                                        <option value="5">5 People</option>
                                        <option value="6">6 People</option>
                                        <option value="7+">7+ People</option>
                                    </select>
                                    <span className="select-icon">▼</span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="special-requests">Special Requests</label>
                                <textarea 
                                    name="specialRequests" 
                                    onChange={onChangeHandler} 
                                    value={data.specialRequests}
                                    id="special-requests"
                                    rows={3}
                                    placeholder="Any special requests or dietary requirements"
                                    required
                                />
                            </div>

                            <button type="submit" className="reservation-button">
                                Request Reservation
                            </button>
                        </form>
                    </div>

                    <div className="reservation-hours-wrapper">
                        <div className="reservation-hours-box">
                            <h4>Opening Hours</h4>
                            <div className="hours-list">
                                <div className="hours-item">
                                    <span>Monday - Thursday</span>
                                    <span className="highlight">5:30 PM - 10:00 PM</span>
                                </div>
                                <div className="hours-item">
                                    <span>Friday - Saturday</span>
                                    <span className="highlight">5:30 PM - 11:00 PM</span>
                                </div>
                                <div className="hours-item">
                                    <span>Sunday</span>
                                    <span className="highlight">5:30 PM - 9:30 PM</span>
                                </div>
                            </div>

                            <p className="hours-note">
                                "For groups of 8 or more, please contact us directly for availability."
                            </p>

                            <div className="phone-link">
                                <a href="tel:+212531734209">
                                    📞 +212 5 31 73 42 09
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reservation;