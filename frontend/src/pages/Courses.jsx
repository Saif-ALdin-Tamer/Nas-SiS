import { useState } from 'react';
import DonutChart from '../components/ui/DonutChart';
import { courses } from '../data/mockData';
import './Courses.css';

const TABS = ['Price', 'Requirements', 'Attendance'];

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('Price');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setActiveTab('Price');
    setIsEnrolled(false);
  };

  const handleClose = () => {
    setSelectedCourse(null);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'present': return 'status-badge--present';
      case 'absent': return 'status-badge--absent';
      case 'late': return 'status-badge--late';
      default: return '';
    }
  };

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <div>
          <h1>My Courses</h1>
          <p className="courses-subtitle">
            Enrolled in {courses.length} courses this semester
          </p>
        </div>
        <div className="courses-header__stats">
          <div className="stat-pill">
            <span className="stat-pill__value">{courses.length}</span>
            <span className="stat-pill__label">Courses</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill__value">
              {courses.reduce((sum, c) => sum + c.credits, 0)}
            </span>
            <span className="stat-pill__label">Credits</span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="courses-grid stagger-children">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            style={{ '--course-color': course.color }}
            onClick={() => handleCourseClick(course)}
          >
            <div className="course-card__header">
              <span
                className="course-card__code"
                style={{ background: `${course.color}15`, color: course.color }}
              >
                {course.code}
              </span>
              <span className="course-card__credits">{course.credits} Credits</span>
            </div>

            <h3 className="course-card__name">{course.name}</h3>
            <p className="course-card__instructor">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {course.instructor}
            </p>

            {/* Progress Bar */}
            <div className="course-card__progress">
              <div className="progress-bar__header">
                <span>Progress</span>
                <span className="progress-bar__value">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: `${course.progress}%`, background: course.color }}
                />
              </div>
            </div>

            {/* Footer Info */}
            <div className="course-card__footer">
              <span className="course-card__schedule">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {course.schedule}
              </span>
              <span className="course-card__enrolled">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {course.enrolled}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Course Detail Modal */}
      {selectedCourse && (
        <div className="course-overlay" onClick={handleClose}>
          <div
            className="course-detail"
            style={{ '--course-color': selectedCourse.color }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Detail Header */}
            <div className="course-detail__header">
              <div className="course-detail__title-area">
                <span
                  className="course-card__code"
                  style={{ background: `${selectedCourse.color}15`, color: selectedCourse.color }}
                >
                  {selectedCourse.code}
                </span>
                <h2>{selectedCourse.name}</h2>
                <p>{selectedCourse.instructor} · {selectedCourse.schedule}</p>
              </div>
              <button className="course-detail__close" onClick={handleClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="course-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`course-tabs__btn ${activeTab === tab ? 'course-tabs__btn--active' : ''}`}
                  style={activeTab === tab ? { '--tab-color': selectedCourse.color } : {}}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'Price' && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  )}
                  {tab === 'Requirements' && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  )}
                  {tab === 'Attendance' && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* ===== PRICE TAB ===== */}
              {activeTab === 'Price' && (
                <div className="tab-price animate-fadeIn">
                  <div className="price-display">
                    <div className="price-display__main">
                      <span className="price-display__currency">$</span>
                      <span className="price-display__amount">{selectedCourse.price.amount}</span>
                      <span className="price-display__period">/ {selectedCourse.price.paymentPlan}</span>
                    </div>
                    {selectedCourse.price.discount > 0 && (
                      <div className="price-display__discount-row">
                        <span className="price-display__original">
                          ${selectedCourse.price.originalPrice}
                        </span>
                        <span className="price-display__discount-badge">
                          {selectedCourse.price.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="price-includes">
                    <h4>What's Included</h4>
                    <ul className="price-includes__list">
                      {selectedCourse.price.includes.map((item, idx) => (
                        <li key={idx} className="price-includes__item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="btn-enroll" 
                    style={{ background: isEnrolled ? 'var(--accent-green)' : selectedCourse.color }}
                    onClick={() => setIsEnrolled(true)}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? 'Successfully Enrolled' : 'Enroll Now'}
                    {isEnrolled ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </button>
                </div>
              )}

              {/* ===== REQUIREMENTS TAB ===== */}
              {activeTab === 'Requirements' && (
                <div className="tab-requirements animate-fadeIn">
                  <div className="requirements-card">
                    <h4>Prerequisites</h4>
                    <p className="requirements-card__subtitle">
                      Complete these before enrolling in {selectedCourse.name}
                    </p>
                    <ul className="requirements-list">
                      {selectedCourse.requirements.map((req, idx) => (
                        <li key={idx} className="requirements-list__item">
                          <div className="requirements-list__icon" style={{ background: `${selectedCourse.color}15`, color: selectedCourse.color }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ===== ATTENDANCE TAB ===== */}
              {activeTab === 'Attendance' && (
                <div className="tab-attendance animate-fadeIn">
                  <div className="attendance-overview">
                    <div className="attendance-overview__chart">
                      <DonutChart
                        percentage={selectedCourse.attendance.percentage}
                        size={140}
                        strokeWidth={12}
                        color={selectedCourse.color}
                      />
                    </div>
                    <div className="attendance-overview__stats">
                      <div className="attendance-stat">
                        <span className="attendance-stat__value">{selectedCourse.attendance.totalClasses}</span>
                        <span className="attendance-stat__label">Total Classes</span>
                      </div>
                      <div className="attendance-stat">
                        <span className="attendance-stat__value" style={{ color: 'var(--accent-green)' }}>
                          {selectedCourse.attendance.attended}
                        </span>
                        <span className="attendance-stat__label">Attended</span>
                      </div>
                      <div className="attendance-stat">
                        <span className="attendance-stat__value" style={{ color: 'var(--accent-red)' }}>
                          {selectedCourse.attendance.totalClasses - selectedCourse.attendance.attended}
                        </span>
                        <span className="attendance-stat__label">Missed</span>
                      </div>
                    </div>
                  </div>

                  <div className="attendance-history">
                    <h4>Recent History</h4>
                    <div className="attendance-history__list">
                      {selectedCourse.attendance.history.map((entry, idx) => (
                        <div key={idx} className="attendance-history__item">
                          <span className="attendance-history__date">{formatDate(entry.date)}</span>
                          <span className={`status-badge ${getStatusClass(entry.status)}`}>
                            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
