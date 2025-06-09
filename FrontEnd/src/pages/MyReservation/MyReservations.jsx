import React, { useContext, useEffect, useState } from "react";
import "./MyReservations.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets.js";
import Swal from 'sweetalert2';
function MyReservations() {
    const { token, url } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedReserv, setSelectedReserv] = useState(null);
    const [formData, setFormData] = useState({ date: "", time: "", guests: "", specialRequests: "" });

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`${url}/api/reservation/getMyReservations`, {
                headers: { token },
            });
            if (response.data?.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    useEffect(() => {
        if (token) fetchReservations();
    }, [token]);

    const openUpdatePopup = (reservation) => {
        setSelectedReserv(reservation);
        setFormData({
            date: reservation.date?.slice(0, 10),
            time: reservation.time || "",
            guests: reservation.guests || "",
            specialRequests: reservation.specialRequests || "",
        });
        setShowPopup(true);
    };



    const handleUpdate = async () => {
        try {
            await axios.put(`${url}/api/reservation/updateReservation/${selectedReserv._id}`, formData, {
                headers: { token },
            });
            setShowPopup(false);
            await fetchReservations();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const handleDelete = async (reservationId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success me-2",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${url}/api/reservation/delete/${reservationId}`, {
                    headers: { token }
                });
                await swalWithBootstrapButtons.fire("Deleted!", "Your reservation has been deleted.", "success");
                await fetchReservations(); // Refresh the list
            } catch (error) {
                console.error("Delete error:", error);
                await Swal.fire("Error", "Failed to delete reservation.", "error");
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await swalWithBootstrapButtons.fire("Cancelled", "Your reservation is safe :)", "error");
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="my-reservations">
            <h2>My Reservations</h2>
            <div className="reservations-list">
                {data.length > 0 ? (
                    data.map((reserv, index) => (
                        <div key={index} className="reservation-card">
                            <img src={assets.parcel_icon} alt="Reservation" />
                            <div className="reservation-info">
                                <p><strong>Name:</strong> {reserv.name}</p>
                                <p><strong>Email:</strong> {reserv.email}</p>
                                <p><strong>Date:</strong> {new Date(reserv.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {reserv.time}</p>
                                <p><strong>Guests:</strong> {reserv.guests}</p>
                                {reserv.specialRequests && (
                                    <p><strong>Special Requests:</strong> {reserv.specialRequests}</p>
                                )}
                                <p><strong>Status:</strong> {reserv.status || "Pending"}</p>
                            </div>
                            <button className="update-btn" onClick={() => openUpdatePopup(reserv)}>Update</button>
                            <button className="delete-btn" onClick={() => handleDelete(reserv._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p className="no-reservations">No reservations found.</p>
                )}
            </div>

            {/* Modal Update Form */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Update Reservation</h3>
                        <label>Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        <label>Time:</label>
                        <input type="time" name="time" value={formData.time} onChange={handleChange} />
                        <label>Guests:</label>
                        <input type="number" name="guests" value={formData.guests} onChange={handleChange} />
                        <label>Special Requests:</label>
                        <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
                        <div className="popup-actions">
                            <button onClick={handleUpdate} className="save-btn">Save</button>
                            <button onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyReservations;
