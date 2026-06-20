import { NavLink } from 'react-router';
import './Sidebar.css';

const navItems = [
  {
    to: '/',
    end: true,
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: '/courses',
    label: 'Courses',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5C3 3.67 3.67 3 4.5 3H15.5C16.33 3 17 3.67 17 4.5V15.5C17 16.33 16.33 17 15.5 17H4.5C3.67 17 3 16.33 3 15.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 3V17" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 10H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/materials',
    label: 'Materials',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5.5C3 4.67 3.67 4 4.5 4H8L10 6H15.5C16.33 6 17 6.67 17 7.5V14.5C17 15.33 16.33 16 15.5 16H4.5C3.67 16 3 15.33 3 14.5V5.5Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: '/attendance',
    label: 'Attendance',
    badge: 'NEW',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/results',
    label: 'Results',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17V10H7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 17V6H12V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 17V3H17V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/notice-board',
    label: 'Notice Board',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 3H15C15.55 3 16 3.45 16 4V16C16 16.55 15.55 17 15 17H5C4.45 17 4 16.55 4 16V4C4 3.45 4.45 3 5 3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 10H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/messages',
    label: 'Messages',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5C3 4.45 3.45 4 4 4H16C16.55 4 17 4.45 17 5V13C17 13.55 16.55 14 16 14H7L4 17V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7.5" cy="9" r="1" fill="currentColor" />
        <circle cx="10" cy="9" r="1" fill="currentColor" />
        <circle cx="12.5" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const bottomItems = [
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/help',
    label: 'Help',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 8C7.5 6.62 8.62 5.5 10 5.5C11.38 5.5 12.5 6.62 12.5 8C12.5 9.38 11.38 10 10 10V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3L2 9L14 15L26 9L14 3Z" fill="#6C63FF" />
            <path d="M5 11V19C5 19 9 23 14 23C19 23 23 19 23 19V11" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 9V17" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="sidebar__logo-text">NAS</span>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navItems.map((item) => (
            <li key={item.to} className="sidebar__nav-item">
              <NavLink
                to={item.to}
                end={item.end || false}
                className={({ isActive }) =>
                  `sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`
                }
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
                {item.badge && (
                  <span className="sidebar__nav-badge">{item.badge}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__bottom">
        <ul className="sidebar__nav-list">
          {bottomItems.map((item) => (
            <li key={item.to} className="sidebar__nav-item">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`
                }
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
