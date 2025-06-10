import { useState } from 'react';
import { FiEdit2, FiSave, FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Admin Restaurant',
        email: 'admin@restaurant.com',
        phone: '+33 6 12 34 56 78',
        role: 'Administrateur Principal',
        joinDate: '10/06/2023',
        lastLogin: '10/06/2025 12:45'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Ici vous ajouteriez la logique pour sauvegarder les modifications
    };

    return (
        <div className="profile-admin-container">
            <div className="profile-header">
                <h1>Profil Administrateur</h1>
                <button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="edit-btn"
                >
                    {isEditing ? <><FiSave /> Sauvegarder</> : <><FiEdit2 /> Modifier</>}
                </button>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <div className="avatar-section">
                        <div className="avatar">
                            <FiUser size={48} />
                        </div>
                        <h2>{userData.name}</h2>
                        <span className="role-badge">{userData.role}</span>
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <FiMail className="detail-icon" />
                            <div>
                                <label>Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>{userData.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="detail-item">
                            <FiPhone className="detail-icon" />
                            <div>
                                <label>Téléphone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>{userData.phone}</p>
                                )}
                            </div>
                        </div>

                        <div className="detail-item">
                            <FiLock className="detail-icon" />
                            <div>
                                <label>Mot de passe</label>
                                <button className="change-password-btn">
                                    Changer le mot de passe
                                </button>
                            </div>
                        </div>

                        <div className="meta-info">
                            <div>
                                <label>Date d'adhésion</label>
                                <p>{userData.joinDate}</p>
                            </div>
                            <div>
                                <label>Dernière connexion</label>
                                <p>{userData.lastLogin}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-stats">
                    <h3>Statistiques</h3>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h4>Commandes gérées</h4>
                            <p>1,248</p>
                            <span>Ce mois: 42</span>
                        </div>
                        <div className="stat-card">
                            <h4>Menus modifiés</h4>
                            <p>76</p>
                            <span>Cette semaine: 3</span>
                        </div>
                        <div className="stat-card">
                            <h4>Utilisateurs créés</h4>
                            <p>18</p>
                            <span>Dernier: 2 jours</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
