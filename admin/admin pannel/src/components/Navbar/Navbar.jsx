import "./Navbar.css";
import { assets } from "../../assets/assets.js";

function Navbar() {
    return (
        <div className="navbar">
            <img className="logo" src={assets.chef} alt="Chef Logo" />
            <img className="profile" src={assets.profile_image} alt="Profile" />
        </div>
    );
}

export default Navbar;
