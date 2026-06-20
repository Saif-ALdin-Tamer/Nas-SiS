import { useState } from 'react';
import { allNotices } from '../data/mockData';
import './NoticeBoard.css';

const categories = [
  'All',
  'Announcement',
  'Academic',
  'Events',
  'Activities',
  'Lost & Found',
  'Workshops',
];

function NoticeBoard() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotices = allNotices.filter((notice) => {
    const matchesCategory =
      activeCategory === 'All' || notice.category === activeCategory;
    const matchesSearch =
      notice.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedCount = allNotices.filter((n) => n.pinned).length;

  return (
    <div className="noticeboard-page">
      {/* Header */}
      <div className="noticeboard-header">
        <div className="noticeboard-header__left">
          <h1 className="noticeboard-title">Notice Board</h1>
          <span className="noticeboard-count">{allNotices.length} notices</span>
        </div>
        <div className="noticeboard-header__right">
          <span className="noticeboard-pinned-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 17v5" />
              <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1 1 1 0 0 1 1 1z" />
            </svg>
            {pinnedCount} pinned
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="noticeboard-search">
        <svg className="noticeboard-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="noticeboard-search__input"
          placeholder="Search notices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter Pills */}
      <div className="notice-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`notice-filter-pill ${activeCategory === cat ? 'notice-filter-pill--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notice List */}
      <div className="notice-list">
        {filteredNotices.length === 0 && (
          <div className="notice-empty">
            <p>No notices found.</p>
          </div>
        )}
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`notice-card ${notice.pinned ? 'notice-card--pinned' : ''}`}
          >
            {/* Pinned Indicator */}
            {notice.pinned && (
              <div className="notice-pin">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1 1 1 0 0 1 1 1z" />
                </svg>
                <span>Pinned</span>
              </div>
            )}

            {/* Card Content */}
            <div className="notice-card__body">
              {/* Author Avatar */}
              <div
                className="notice-avatar"
                style={{ backgroundColor: notice.color }}
              >
                {notice.author.charAt(0)}
              </div>

              {/* Content */}
              <div className="notice-card__content">
                <div className="notice-card__meta">
                  <span className="notice-author" style={{ color: notice.color }}>
                    {notice.author}
                  </span>
                  <span className="notice-role">{notice.role}</span>
                  <span className="notice-time">{notice.time}</span>
                </div>
                <p className="notice-message">{notice.message}</p>

                <div className="notice-card__footer">
                  <span
                    className="notice-category-badge"
                    style={{
                      backgroundColor: `${notice.color}14`,
                      color: notice.color,
                    }}
                  >
                    {notice.category}
                  </span>

                  <div className="notice-actions">
                    <button className="notice-action-btn" title="Like">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button className="notice-action-btn" title="Comment">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticeBoard;
