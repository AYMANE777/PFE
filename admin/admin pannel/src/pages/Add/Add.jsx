import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({ url }) {
  const [image, setImage] = useState(false);
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
    }
  };

  return (
    <div className="add-container">
      <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="form-section image-upload">
          <p>Upload Image</p>
          <label htmlFor="image" className="image-label">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="form-section">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type here"
            required
          />
        </div>

        <div className="form-section">
          <label>Product Description</label>
          <textarea
            name="description"
            rows="5"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Description here"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-section">
            <label>Product Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pure Veg">Pure Veg</option>
            </select>
          </div>

          <div className="form-section">
            <label>Product Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default Add;
