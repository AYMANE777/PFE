import React from 'react';
import "./Add.css"
import {assets} from "../../assets/assets.js";
function Add(props) {
    return (
        <div className="add">
            <form className="flex-col">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={assets.upload_area} alt="" />
                    </label>
                    <input type="file" id="image" hidden required/>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" name="name" id="product_name" placeholder="Type here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea name="description" rows="6" id="product_description" placeholder="Description here" />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name="category" id="category_id" required>
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
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type="Number" name="price" id="price" required/>
                    </div>
                    <button type="submit" className="add-btn">Add</button>
                </div>
            </form>

        </div>
    );
}

export default Add;