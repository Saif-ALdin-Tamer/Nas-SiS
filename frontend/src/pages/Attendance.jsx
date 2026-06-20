import { useState, useMemo } from 'react';
import DonutChart from '../components/ui/DonutChart';
import { courseAttendance, attendanceData } from '../data/mockData';
import './Attendance.css';

const Attendance = () => {
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Overall attendance
  const overallAttendance = useMemo(() => {
    const totalClasses = courseAttendance.reduce((sum, c) => sum + c.total, 0);
    const totalAttended = courseAttendance.reduce((sum, c) => sum + c.attended, 0);
    return totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;
  }, []);

  // Course options for filter
  const courseOptions = useMemo(() => {
    const unique = [...new Set(attendanceData.map((a) => a.course))];
    return ['All', ...unique];
  }, []);

  // Filtered attendance
  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((a) => {
      const matchesCourse = filterCourse === 'All' || a.course === filterCourse;
      const matchesFrom = !filterDateFrom || a.date >= filterDateFrom;
      const matchesTo = !filterDateTo || a.date <= filterDateTo;
      return matchesCourse && matchesFrom && matchesTo;
    });
  }, [filterCourse, filterDateFrom, filterDateTo]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'present': return 'att-status--present';
      case 'absent': return 'att-status--absent';
      case 'late': return 'att-status--late';
      default: return '';
    }
  };

  const getStatusCounts = () => {
    const present = filteredAttendance.filter((a) => a.status === 'present').length;
    const absent = filteredAttendance.filter((a) => a.status === 'absent').length;
    const late = filteredAttendance.filter((a) => a.status === 'late').length;
    return { present, absent, late };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="attendance-page">
      {/* Header */}
      <div className="attendance-page-header">
        <div className="attendance-page-header__info">
          <h1>Attendance</h1>
          <p className="attendance-page-subtitle">Track your class attendance across all courses</p>
        </div>
        <div className="attendance-page-header__overall">
          <DonutChart
            percentage={overallAttendance}
            size={90}
            strokeWidth={8}
            color="var(--primary)"
          />
          <div className="attendance-page-header__label">
            <span className="attendance-page-header__percent">{overallAttendance}%</span>
            <span className="attendance-page-header__text">Overall</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="attendance-summary-row">
        <div className="attendance-summary-stat attendance-summary-stat--present">
          <span className="attendance-summary-stat__value">{statusCounts.present}</span>
          <span className="attendance-summary-stat__label">Present</span>
        </div>
        <div className="attendance-summary-stat attendance-summary-stat--absent">
          <span className="attendance-summary-stat__value">{statusCounts.absent}</span>
          <span className="attendance-summary-stat__label">Absent</span>
        </div>
        <div className="attendance-summary-stat attendance-summary-stat--late">
          <span className="attendance-summary-stat__value">{statusCounts.late}</span>
          <span className="attendance-summary-stat__label">Late</span>
        </div>
      </div>

      {/* Per-Course Cards */}
      <div className="attendance-courses">
        <h3 className="attendance-courses__title">Per Course</h3>
        <div className="attendance-courses__scroll">
          {courseAttendance.map((course) => (
            <div
              key={course.code}
              className="attendance-course-card"
              onClick={() => setFilterCourse(filterCourse === course.course ? 'All' : course.course)}
              style={{
                '--att-course-color': course.color,
                borderColor: filterCourse === course.course ? course.color : 'var(--border)',
              }}
            >
              <DonutChart
                percentage={course.percentage}
                size={60}
                strokeWidth={6}
                color={course.color}
                showPercentage={false}
              />
              <div className="attendance-course-card__info">
                <span className="attendance-course-card__name">{course.course}</span>
                <span className="attendance-course-card__stats">
                  {course.attended}/{course.total} classes
                </span>
                <span
                  className="attendance-course-card__percentage"
                  style={{ color: course.color }}
                >
                  {course.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="attendance-filters">
        <div className="attendance-filter-group">
          <label>Course</label>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="attendance-filter__select"
          >
            {courseOptions.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="attendance-filter-group">
          <label>From</label>
          <input
            type="date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="attendance-filter__input"
          />
        </div>

        <div className="attendance-filter-group">
          <label>To</label>
          <input
            type="date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            className="attendance-filter__input"
          />
        </div>

        {(filterCourse !== 'All' || filterDateFrom || filterDateTo) && (
          <button
            className="attendance-filter__clear"
            onClick={() => {
              setFilterCourse('All');
              setFilterDateFrom('');
              setFilterDateTo('');
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Attendance Table */}
      <div className="attendance-table-wrap">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Code</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan="5" className="attendance-table__empty">
                  No attendance records found
                </td>
              </tr>
            ) : (
              filteredAttendance.map((record) => (
                <tr key={record.id}>
                  <td className="attendance-table__date">{formatDate(record.date)}</td>
                  <td className="attendance-table__course">{record.course}</td>
                  <td>
                    <span className="attendance-table__code">{record.code}</span>
                  </td>
                  <td className="attendance-table__time">{record.time}</td>
                  <td>
                    <span className={`att-status ${getStatusClass(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
