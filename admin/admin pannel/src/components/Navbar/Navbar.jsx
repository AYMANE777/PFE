import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <img className="logo" src={assets.chef} alt="Chef Logo" />
            <img className="profile" onClick={()=>navigate('/')} src={assets.profile_image} alt="Profile" />
        </div>
    );
}

export default Navbar;
