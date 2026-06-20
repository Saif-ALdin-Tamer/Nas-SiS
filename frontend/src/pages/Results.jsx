import { examResults, gpaSummary } from '../data/mockData';
import './Results.css';

const gradeColorMap = {
  'A+': '#4CAF50',
  'A': '#2196F3',
  'A-': '#00BCD4',
  'B+': '#F5A623',
  'B': '#FFD93D',
  'B-': '#FF9800',
  'C+': '#FF6B6B',
  'C': '#E53935',
};

function Results() {
  const maxTotal = Math.max(...examResults.map((r) => r.total));

  return (
    <div className="results-page">
      <div className="results-header">
        <h1 className="results-title">Exam Results</h1>
        <p className="results-subtitle">6th Semester — Spring 2024</p>
      </div>

      {/* GPA Summary Cards */}
      <div className="gpa-cards">
        <div className="gpa-card">
          <div className="gpa-card__icon gpa-card__icon--purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="gpa-card__content">
            <span className="gpa-card__value">{gpaSummary.currentGPA}</span>
            <span className="gpa-card__label">Current GPA</span>
          </div>
          <div className="gpa-card__trend gpa-card__trend--up">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span>+0.13</span>
          </div>
        </div>

        <div className="gpa-card">
          <div className="gpa-card__icon gpa-card__icon--blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="gpa-card__content">
            <span className="gpa-card__value">{gpaSummary.previousGPA}</span>
            <span className="gpa-card__label">Previous GPA</span>
          </div>
        </div>

        <div className="gpa-card">
          <div className="gpa-card__icon gpa-card__icon--green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div className="gpa-card__content">
            <span className="gpa-card__value">{gpaSummary.totalCredits}</span>
            <span className="gpa-card__label">Total Credits</span>
          </div>
        </div>

        <div className="gpa-card">
          <div className="gpa-card__icon gpa-card__icon--orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="gpa-card__content">
            <span className="gpa-card__value">
              {gpaSummary.semesterRank}
              <span className="gpa-card__rank-total">/{gpaSummary.totalStudents}</span>
            </span>
            <span className="gpa-card__label">Semester Rank</span>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="results-table-container">
        <div className="results-table-header">
          <h2 className="section-title">Course Results</h2>
        </div>
        <div className="results-table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Midterm</th>
                <th>Final</th>
                <th>Assignment</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((result) => (
                <tr key={result.id} className="results-table__row">
                  <td>
                    <div className="course-cell">
                      <span
                        className="course-indicator"
                        style={{ backgroundColor: result.color }}
                      />
                      <span className="course-name">{result.course}</span>
                    </div>
                  </td>
                  <td className="code-cell">{result.code}</td>
                  <td>{result.midterm}</td>
                  <td>{result.final}</td>
                  <td>{result.assignment}</td>
                  <td className="total-cell">{result.total}</td>
                  <td>
                    <span
                      className="grade-badge"
                      style={{
                        backgroundColor: `${gradeColorMap[result.grade] || '#6B7280'}18`,
                        color: gradeColorMap[result.grade] || '#6B7280',
                      }}
                    >
                      {result.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Bar Chart */}
      <div className="performance-chart-container">
        <h2 className="section-title">Performance Overview</h2>
        <div className="performance-chart">
          {examResults.map((result) => (
            <div key={result.id} className="chart-row">
              <span className="chart-label">{result.course}</span>
              <div className="chart-bar-track">
                <div
                  className="chart-bar-fill"
                  style={{
                    width: `${(result.total / maxTotal) * 100}%`,
                    backgroundColor: result.color,
                  }}
                >
                  <span className="chart-bar-value">{result.total}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
