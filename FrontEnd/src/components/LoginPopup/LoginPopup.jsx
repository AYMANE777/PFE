import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets.js';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

function LoginPopup({ setShowLogin }) {
  const { url, token, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState('Sign Up');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: "Welcome",
          icon: "success"
        });
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        Swal.fire({
          title: "Oops...",
          text: response.data.msg,
          icon: "error"
        });

      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="close-icon"
          />
        </div>

        <div className="login-popup-inputs">
          {currentState !== 'Login' && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the <a href="#">terms of use</a> &{' '}
            <a href="#">privacy policy</a>
          </p>
        </div>

        <button type="submit" className="login-submit">
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="toggle-auth-mode">
          {currentState === 'Login' ? (
            <>
              Create a new account?{' '}
              <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setCurrentState('Login')}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default LoginPopup;
