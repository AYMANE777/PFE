import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({ url }) {
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="add-container">
        <h2 className="form-title">Add New Product</h2>
        <form className="add-form" onSubmit={onSubmitHandler}>
          <div className="form-section image-upload">
            <p className="section-label">Upload Image</p>
            <label htmlFor="image" className="image-label">
              <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="upload"
                  className={image ? 'image-preview' : ''}
              />
              {!image && <span className="upload-text">Click to upload</span>}
            </label>
            <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                accept="image/*"
                required
            />
          </div>

          <div className="form-section">
            <label className="section-label">Product Name</label>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Type product name"
                className="form-input"
                required
            />
          </div>

          <div className="form-section">
            <label className="section-label">Product Description</label>
            <textarea
                name="description"
                rows="5"
                value={data.description}
                onChange={onChangeHandler}
                placeholder="Enter detailed description"
                className="form-textarea"
                required
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="section-label">Product Category</label>
              <select
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  className="form-select"
                  required
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Desserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
                <option value="Pure Veg">Pure Veg</option>
              </select>
            </div>

            <div className="form-section">
              <label className="section-label">Product Price</label>
              <div className="price-input-container">
                <span className="currency-symbol">$</span>
                <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={onChangeHandler}
                    placeholder="20.00"
                    className="form-input price-input"
                    min="0"
                    step="0.01"
                    required
                />
              </div>
            </div>
          </div>

          <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
  );
}

export default Add;
