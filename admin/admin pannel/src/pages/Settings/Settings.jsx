import { useState } from 'react';
import {FiSave, FiClock, FiBell, FiShield, FiDatabase, FiGlobe, FiSettings} from 'react-icons/fi';
import './Settings.css';

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: {
            newOrders: true,
            reservations: true,
            systemAlerts: true,
            emailNotifications: true,
            soundAlerts: false
        },
        security: {
            twoFactorAuth: true,
            sessionTimeout: 30,
            passwordComplexity: 'medium'
        },
        system: {
            autoBackup: true,
            backupFrequency: 'daily',
            dataRetention: 365,
            language: 'fr'
        }
    });

    const handleToggle = (category, field) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: !prev[category][field]
            }
        }));
    };

    const handleSelectChange = (category, field, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        // Logique pour sauvegarder les paramètres
        console.log('Paramètres sauvegardés:', settings);
        alert('Paramètres sauvegardés avec succès!');
    };

    return (
        <div className="admin-settings-container">
            <h1 className="settings-header">
                <FiSettings className="header-icon" />
                Paramètres Administrateur
            </h1>

            <div className="settings-sections">
                {/* Section Notifications */}
                <div className="settings-section">
                    <div className="section-header">
                        <FiBell className="section-icon" />
                        <h2>Notifications</h2>
                    </div>

                    <div className="settings-grid">
                        <div className="setting-item">
                            <label>Nouvelles commandes</label>
                            <ToggleSwitch
                                checked={settings.notifications.newOrders}
                                onChange={() => handleToggle('notifications', 'newOrders')}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Réservations</label>
                            <ToggleSwitch
                                checked={settings.notifications.reservations}
                                onChange={() => handleToggle('notifications', 'reservations')}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Alertes système</label>
                            <ToggleSwitch
                                checked={settings.notifications.systemAlerts}
                                onChange={() => handleToggle('notifications', 'systemAlerts')}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Notifications par email</label>
                            <ToggleSwitch
                                checked={settings.notifications.emailNotifications}
                                onChange={() => handleToggle('notifications', 'emailNotifications')}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Alertes sonores</label>
                            <ToggleSwitch
                                checked={settings.notifications.soundAlerts}
                                onChange={() => handleToggle('notifications', 'soundAlerts')}
                            />
                        </div>
                    </div>
                </div>

                {/* Section Sécurité */}
                <div className="settings-section">
                    <div className="section-header">
                        <FiShield className="section-icon" />
                        <h2>Sécurité</h2>
                    </div>

                    <div className="settings-grid">
                        <div className="setting-item">
                            <label>Authentification à deux facteurs</label>
                            <ToggleSwitch
                                checked={settings.security.twoFactorAuth}
                                onChange={() => handleToggle('security', 'twoFactorAuth')}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Délai d'expiration de session (minutes)</label>
                            <select
                                value={settings.security.sessionTimeout}
                                onChange={(e) => handleSelectChange('security', 'sessionTimeout', parseInt(e.target.value))}
                            >
                                <option value={15}>15</option>
                                <option value={30}>30</option>
                                <option value={60}>60</option>
                                <option value={120}>120</option>
                            </select>
                        </div>

                        <div className="setting-item">
                            <label>Complexité du mot de passe</label>
                            <select
                                value={settings.security.passwordComplexity}
                                onChange={(e) => handleSelectChange('security', 'passwordComplexity', e.target.value)}
                            >
                                <option value="low">Faible</option>
                                <option value="medium">Moyenne</option>
                                <option value="high">Élevée</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section Système */}
                <div className="settings-section">
                    <div className="section-header">
                        <FiDatabase className="section-icon" />
                        <h2>Système</h2>
                    </div>

                    <div className="settings-grid">
                        <div className="setting-item">
                            <label>Sauvegarde automatique</label>
                            <ToggleSwitch
                                checked={settings.system.autoBackup}
                                onChange={() => handleToggle('system', 'autoBackup')}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Fréquence de sauvegarde</label>
                            <select
                                value={settings.system.backupFrequency}
                                onChange={(e) => handleSelectChange('system', 'backupFrequency', e.target.value)}
                                disabled={!settings.system.autoBackup}
                            >
                                <option value="daily">Quotidienne</option>
                                <option value="weekly">Hebdomadaire</option>
                                <option value="monthly">Mensuelle</option>
                            </select>
                        </div>

                        <div className="setting-item">
                            <label>Conservation des données (jours)</label>
                            <input
                                type="number"
                                value={settings.system.dataRetention}
                                onChange={(e) => handleSelectChange('system', 'dataRetention', parseInt(e.target.value))}
                                min={30}
                                max={1095}
                            />
                        </div>

                        <div className="setting-item">
                            <label>Langue du système</label>
                            <select
                                value={settings.system.language}
                                onChange={(e) => handleSelectChange('system', 'language', e.target.value)}
                            >
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-footer">
                <button className="save-btn" onClick={handleSave}>
                    <FiSave className="save-icon" />
                    Sauvegarder les paramètres
                </button>
            </div>
        </div>
    );
};

// Composant ToggleSwitch réutilisable
const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider round"></span>
        </label>
    );
};

export default Settings;
