import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function List({ url }) {
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        description: '',
        category: '',
        price: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchList = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error('Error fetching list');
            }
        } catch (error) {
            toast.error('Network error');
        } finally {
            setIsLoading(false);
        }
    };

    const removeFood = async (foodId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
                await fetchList();
                response.data.success
                    ? toast.success('Item removed successfully')
                    : toast.error('Failed to remove item');
            } catch (error) {
                toast.error('Error removing item');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const startEdit = (item) => {
        setEditId(item._id);
        setEditData({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditData({ name: '', description: '', category: '', price: '' });
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id) => {
        if (!editData.name || !editData.price) {
            toast.warning('Please fill all required fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${url}/api/food/update`, { id, ...editData });
            if (response.data.success) {
                toast.success('Item updated successfully');
                await fetchList();
                cancelEdit();
            } else {
                toast.error('Failed to update item');
            }
        } catch (error) {
            toast.error('Error updating item');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list-container">
            <h2 className="list-header">Food Items Management</h2>

            {isLoading && <div className="loading-overlay">Loading...</div>}

            <div className="list-table-container">
                <div className="list-table-header">
                    <div className="header-cell image">Image</div>
                    <div className="header-cell">Name</div>
                    <div className="header-cell description">Description</div>
                    <div className="header-cell">Category</div>
                    <div className="header-cell">Price</div>
                    <div className="header-cell actions">Actions</div>
                </div>

                <div className="list-table-body">
                    {list.length === 0 ? (
                        <div className="empty-message">No food items found</div>
                    ) : (
                        list.map((item) => (
                            <div key={item._id} className={`list-table-row ${editId === item._id ? 'editing' : ''}`}>
                                {editId === item._id ? (
                                    <>
                                        <div className="cell image">
                                            <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        </div>
                                        <div className="cell">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name}
                                                onChange={handleEditChange}
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="cell description">
                                            <textarea
                                                name="description"
                                                value={editData.description}
                                                onChange={handleEditChange}
                                                placeholder="Description"
                                                rows="2"
                                            />
                                        </div>
                                        <div className="cell">
                                            <select
                                                name="category"
                                                value={editData.category}
                                                onChange={handleEditChange}
                                            >
                                                <option value="Salad">Salad</option>
                                                <option value="Rolls">Rolls</option>
                                                <option value="Desserts">Desserts</option>
                                                <option value="Sandwich">Sandwich</option>
                                                <option value="Cake">Cake</option>
                                                <option value="Pasta">Pasta</option>
                                                <option value="Noodles">Noodles</option>
                                                <option value="Pure Veg">Pure Veg</option>
                                            </select>
                                        </div>
                                        <div className="cell">
                                            <div className="price-input">

                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={editData.price}
                                                    onChange={handleEditChange}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                />
                                                <span>DH</span>
                                            </div>
                                        </div>
                                        <div className="cell actions">
                                            <button
                                                className="save-btn"
                                                onClick={() => saveEdit(item._id)}
                                                disabled={isLoading}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="cancel-btn"
                                                onClick={cancelEdit}
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="cell image">
                                            <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        </div>
                                        <div className="cell">{item.name}</div>
                                        <div className="cell description">{item.description}</div>
                                        <div className="cell">{item.category}</div>
                                        <div className="cell">{item.price.toFixed(2)} DH</div>
                                        <div className="cell actions">
                                            <button
                                                className="edit-btn"
                                                onClick={() => startEdit(item)}
                                                disabled={isLoading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFood(item._id)}
                                                disabled={isLoading}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default List;
