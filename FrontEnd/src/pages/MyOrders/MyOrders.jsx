import React, {useContext, useEffect, useState} from 'react';
import "./MyOrders.css"
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {assets} from "../../assets/frontend_assets/assets.js";
function MyOrders() {
    const {token, url} = useContext(StoreContext)
    const [data, setData] = useState([]);
    
    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, {headers: {token}})
            if (response.data && response.data.data) {
                setData(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }

    useEffect(() => {
        if(token) {
            fetchOrders()
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data && data.length > 0 ? data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt=""/>
                        <p>
                            {order.items && order.items.map((item, itemIndex) => (
                                <span key={itemIndex}>
                                    {item.name} x {item.quantity}
                                    {itemIndex < order.items.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </p>
                        <p>{order.amount}.00 DH</p>
                        <p>Items: {order.items ? order.items.length : 0}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )) : (
                    <p>No orders found</p>
                )}
            </div>
        </div>
    );
}

export default MyOrders;