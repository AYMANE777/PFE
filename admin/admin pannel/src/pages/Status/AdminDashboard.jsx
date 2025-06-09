import React, {useEffect, useState} from "react";
import "./AdminDashboard.css";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

const AdminDashboard = ({url}) => {
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(true);
    const [dataF, setDataF] = useState(0)
    // Mock data
    const foodStats = [
        { name: "Pizza", value: 120 },
        { name: "Burger", value: 80 },
        { name: "Salad", value: 40 },
        { name: "Drinks", value: 60 },
    ];


    const fetchClient = async () => {
        try {
            const response = await axios.post(`${url}/api/user/total`)
            console.log(response)
            if (response.status === 200) {

                setData(response.data.total)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }
    const fetchFood = async () => {
        try {
            const response = await axios.post(`${url}/api/food/totalfood`)
            console.log(response)
            if (response.status === 200) {

                setDataF(response.data.total)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }
    useEffect(() => {
        fetchClient();
        fetchFood();
    }, []);
    const clientStats = [
        { date: "Mon", clients: 12 },
        { date: "Tue", clients: 18 },
        { date: "Wed", clients: 9 },
        { date: "Thu", clients: 22 },
        { date: "Fri", clients: 15 },
        { date: "Sat", clients: 30 },
        { date: "Sun", clients: 20 },
    ];

    const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div className="status-cards">
                <div className="status-card">
                    <h3>Total Food Items</h3>
                    <p>{dataF}</p>
                </div>
                <div className="status-card">
                    <h3>Registered Clients</h3>
                    <p>{data}</p>
                </div>
                <div className="status-card">
                    <h3>Reservations Today</h3>
                    <p>25</p>
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-box">
                    <h3>Food Popularity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={foodStats} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                                {foodStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h3>Clients This Week</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={clientStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="clients" fill="#FF8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
