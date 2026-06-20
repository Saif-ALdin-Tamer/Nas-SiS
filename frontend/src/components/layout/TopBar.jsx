import { currentUser } from '../../data/mockData';
import './TopBar.css';

function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__welcome">
        <h1 className="topbar__greeting">
          Welcome, {currentUser.firstName} 👋
        </h1>
      </div>

      <div className="topbar__actions">
        {/* Search Button */}
        <button className="topbar__icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Notification Bell */}
        <button className="topbar__icon-btn topbar__icon-btn--notification" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2C7.24 2 5 4.24 5 7V11L3 14H17L15 11V7C15 4.24 12.76 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 14V15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15V14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="topbar__notification-dot"></span>
        </button>

        {/* User Profile */}
        <div className="topbar__user">
          <div className="topbar__avatar">
            {currentUser.initials}
          </div>
          <span className="topbar__user-name">
            {currentUser.firstName} {currentUser.lastName}
          </span>
          <svg className="topbar__dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
