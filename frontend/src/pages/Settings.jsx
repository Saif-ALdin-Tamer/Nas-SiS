import { useState, useEffect } from 'react';
import { currentUser } from '../data/mockData';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'system';
  });

  useEffect(() => {
    const applyTheme = (selectedTheme) => {
      let resolvedTheme = selectedTheme;
      if (selectedTheme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      localStorage.setItem('app-theme', selectedTheme);
    };

    applyTheme(theme);

    // Optional: listen to system theme changes if 'system' is selected
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account settings and preferences.</p>
      </div>

      <div className="settings-content card">
        <div className="settings-sidebar">
          <ul className="settings-nav">
            <li>
              <button
                className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className={`settings-nav-btn ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
            </li>
            <li>
              <button
                className={`settings-nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                className={`settings-nav-btn ${activeTab === 'appearance' ? 'active' : ''}`}
                onClick={() => setActiveTab('appearance')}
              >
                Appearance
              </button>
            </li>
          </ul>
        </div>

        <div className="settings-panel">
          {activeTab === 'profile' && (
            <div className="settings-section animate-fadeIn">
              <h3>Profile Information</h3>
              <p className="settings-desc">Update your personal information and public profile.</p>

              <div className="profile-avatar-section">
                <div className="avatar-preview">
                  {currentUser.initials}
                </div>
                <div className="avatar-actions">
                  <button className="btn btn-outline">Change Avatar</button>
                  <button className="btn btn-ghost">Remove</button>
                </div>
              </div>

              <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue={currentUser.firstName} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue={currentUser.lastName} />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue={currentUser.email} />
                </div>
                
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" defaultValue={currentUser.department} readOnly className="read-only" />
                </div>

                <div className="settings-actions">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="settings-section animate-fadeIn">
              <h3>Account Settings</h3>
              <p className="settings-desc">Manage your password and security settings.</p>

              <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>

                <div className="settings-actions">
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </div>
              </form>

              <div className="danger-zone">
                <h4>Danger Zone</h4>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn btn-outline danger-btn">Delete Account</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section animate-fadeIn">
              <h3>Notification Preferences</h3>
              <p className="settings-desc">Choose what notifications you receive.</p>

              <div className="notification-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Email Notifications</h4>
                    <p>Receive daily summaries of your classes and assignments.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Push Notifications</h4>
                    <p>Get instant alerts for new grades and messages.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>SMS Alerts</h4>
                    <p>Receive text messages for urgent announcements.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section animate-fadeIn">
              <h3>Appearance Settings</h3>
              <p className="settings-desc">Customize how NAS looks on your device.</p>

              <div className="theme-options">
                <div 
                  className={`theme-card ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <div className="theme-preview light-theme"></div>
                  <span>Light Mode</span>
                </div>
                <div 
                  className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="theme-preview dark-theme"></div>
                  <span>Dark Mode</span>
                </div>
                <div 
                  className={`theme-card ${theme === 'system' ? 'active' : ''}`}
                  onClick={() => setTheme('system')}
                >
                  <div className="theme-preview system-theme"></div>
                  <span>System Default</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
