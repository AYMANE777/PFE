import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Cart() {
    const { cartItems, food_list, removeFromCart, token, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        if (!token) {
            Swal.fire({
                title: 'Login Required',
                text: 'You need to login first to proceed to checkout',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            })
        } else {
            navigate('/order');
        }
    };

    return (
        <div className="cart">
            <div className="cart-items">
                {food_list && food_list.length > 0 && (
                    <div className="cart-items-title">
                        <p>Items</p><p>Title</p><p>Price</p><p>Quantity</p><p>Total</p><p>Remove</p>
                    </div>
                )}
                <br />
                <hr />
                {food_list && food_list.length > 0 && food_list.map((item, i) => {
                    if (item && item._id && cartItems && cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} DH</p>
                        </div>
                    </div>
                    <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="Promo Code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;