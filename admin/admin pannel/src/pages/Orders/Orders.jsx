import React, { useEffect, useState } from 'react';
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

function Orders({ url }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const fetchAllOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/order/list`);
            if (res.data.success) {
                setOrders(res.data.data);
            } else {
                toast.error("Error getting orders");
            }
        } catch (error) {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            const res = await axios.post(`${url}/api/order/status`, {
                orderId,
                status: event.target.value
            });
            if (res.data.success) {
                await fetchAllOrders();
                toast.success("Order status updated");
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Food Processing': return '#f6ad55'; // orange
            case 'Out for delivery': return '#4299e1'; // blue
            case 'Delivered': return '#48bb78'; // green
            default: return '#a0aec0'; // gray
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="orders-container">
            <h2 className="orders-header">Orders Management</h2>

            {loading && <div className="loading-overlay">Loading orders...</div>}

            {orders.length === 0 && !loading && (
                <div className="empty-orders">
                    <img src={assets.parcel_icon} alt="No orders" />
                    <p>No orders found</p>
                </div>
            )}

            <div className="orders-list">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className={`order-card ${expandedOrder === order._id ? 'expanded' : ''}`}
                        onClick={() => toggleOrderDetails(order._id)}
                    >
                        <div className="order-summary">
                            <div className="order-id-time">

                                <span className="order-date">
                                    {new Date(order.date).toLocaleDateString("en-US")}
                                </span>
                            </div>

                            <div className="order-customer">
                                <p className="customer-name">
                                    {order.address.firstName} {order.address.lastName}
                                </p>
                                <p className="customer-location">
                                    {order.address.city}, {order.address.country}
                                </p>
                            </div>

                            <div className="order-stats">
                                <span className="items-count">{order.items.length} items</span>
                                <span className="order-amount">${order.amount.toFixed(2)}</span>
                            </div>

                            <div className="order-status">
                                <select
                                    value={order.status}
                                    onChange={(e) => statusHandler(e, order._id)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ borderColor: getStatusColor(order.status) }}
                                >
                                    <option value="Food Processing">Processing</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>

                        {expandedOrder === order._id && (
                            <div className="order-details">
                                <div className="order-items">
                                    <h4>Items Ordered</h4>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-quantity">x{item.quantity}</span>
                                                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="order-address">
                                    <h4>Delivery Address</h4>
                                    <p>{order.address.street}</p>
                                    <p>{order.address.city}, {order.address.state}</p>
                                    <p>{order.address.country}, {order.address.zipcode}</p>
                                    <p className="contact-phone">Phone: {order.address.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
