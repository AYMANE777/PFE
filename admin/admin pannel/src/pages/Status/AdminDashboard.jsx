import React, {useEffect, useState} from "react";
import "./AdminDashboard.css";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const AdminDashboard = ({url}) => {
    const [data, setData] = useState(0);
    const [foodStats, setFoodStats] = useState([]);
    const [dataF, setDataF] = useState(0);
    const [foodOrderStatus, setFoodOrderStatus] = useState([]);
    const [clientStats, setClientStats] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);

    const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#8884D8", "#82CA9D"];

    const fetchClient = async () => {
        try {
            const response = await axios.post(`${url}/api/user/total`);
            if (response.status === 200) {
                setData(response.data.total);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchFood = async () => {
        try {
            const response = await axios.post(`${url}/api/food/totalfood`);
            if (response.status === 200) {
                setDataF(response.data.total);
            }
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    };

    const fetchFoodOrderStatus = async () => {
        try {
            const response = await axios.get(`${url}/api/order/food-status`);
            if (response.status === 200) {
                setFoodOrderStatus(response.data.data);


                // Prepare data for PieChart (top 5 most ordered foods)
                const topFoods = response.data.data
                    .sort((a, b) => b.totalOrders - a.totalOrders)
                    .slice(0, 5);
                const pieData = topFoods.map(food => ({
                    name: food.name,
                    value: food.totalOrders
                }));

                setFoodStats(pieData);
            }
        } catch (error) {
            console.error("Error fetching food order status:", error);
        }
    };
    const fetchClientStats = async () => {
        try {
            const response = await axios.get(`${url}/api/user/weekly-stats`);
            if (response.status === 200) {
                console.log(response.data.data);
                setClientStats(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching client stats:", error);
            setClientStats([
                { date: "Mon", clients: 0 },
                { date: "Tue", clients: 0 },
                { date: "Wed", clients: 0 },
                { date: "Thu", clients: 0 },
                { date: "Fri", clients: 0 },
                { date: "Sat", clients: 0 },
                { date: "Sun", clients: 0 }
            ]);
        }
    };

// Mettez à jour votre useEffect
    useEffect(() => {
        fetchClient();
        fetchFood();
        fetchFoodOrderStatus();
        fetchClientStats();
    }, []);




    // Prepare data for status breakdown when a food is selected
    const getStatusData = () => {
        if (!selectedFood) return [];

        const food = foodOrderStatus.find(f => f.name === selectedFood);
        if (!food) return [];

        return Object.entries(food.statusCount).map(([status, count]) => ({
            name: status,
            value: count
        }));
    };

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
                    <h3>Commande Status</h3>
                    <div className="food-selector">
                        <select
                            onChange={(e) => setSelectedFood(e.target.value)}
                            value={selectedFood || ""}
                        >
                            <option value="">Select a food for details</option>
                            {foodOrderStatus.map((food, index) => (
                                <option key={index} value={food.name}>
                                    {food.name} ({food.totalOrders} orders)
                                </option>
                            ))}
                        </select>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={selectedFood ? getStatusData() : foodStats}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#8884d8"
                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {(selectedFood ? getStatusData() : foodStats).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    {selectedFood && (
                        <div className="food-stats">
                            <p>Total Orders: {
                                foodOrderStatus.find(f => f.name === selectedFood)?.totalOrders || 0
                            }</p>
                            <p>Total Quantity: {
                                foodOrderStatus.find(f => f.name === selectedFood)?.totalQuantity || 0
                            }</p>
                        </div>
                    )}
                </div>

                <div className="chart-box">
                    <h3>Clients This Week</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={clientStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="registered" fill="#8884d8" name="Nouveaux comptes" />
                            <Bar dataKey="loggedIn" fill="#82ca9d" name="Connexions" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;