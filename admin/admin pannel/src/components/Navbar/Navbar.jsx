import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";

function Navbar({ onLogout }) {
    const navigate = useNavigate();

    return (
        <header className="navbar" role="banner">
            <div className="navbar-brand">
                <img
                    className="logo"
                    src={assets.chef}
                    alt="Logo Chef Restaurant"
                    onClick={() => navigate('/dashboard')}
                />
                <h1 className="app-name">Admin Restaurant</h1>
            </div>

            <nav className="navbar-actions" role="navigation">
                <button
                    className="nav-btn settings-btn"
                    onClick={() => navigate('/settings')}
                    aria-label="Paramètres"
                >
                    <FiSettings size={20} />
                </button>

                <button
                    className="nav-btn logout-btn"
                    onClick={onLogout}
                    aria-label="Déconnexion"
                >
                    <FiLogOut size={20} />
                </button>

                <img
                    className="profile"
                    onClick={() => navigate('/profile')}
                    src={assets.profile_image}
                    alt="Photo de profil utilisateur"
                    tabIndex="0"
                />
            </nav>
        </header>
    );
}

export default Navbar;
