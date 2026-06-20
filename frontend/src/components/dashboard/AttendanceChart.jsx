import DonutChart from '../ui/DonutChart';
import { attendanceSummary } from '../../data/mockData';
import './ChartWidget.css';

const AttendanceChart = () => {
  const { percentage, present, notMarked, absent } = attendanceSummary;

  return (
    <div className="chart-widget card">
      <div className="chart-widget__header">
        <h4 className="chart-widget__title">Attendance</h4>
        <span className="chart-widget__subtitle">This Semester</span>
      </div>

      <div className="chart-widget__body">
        <DonutChart
          percentage={percentage}
          size={140}
          strokeWidth={14}
          color="var(--primary, #6C63FF)"
        />
      </div>

      <div className="chart-widget__legend">
        <div className="chart-widget__legend-item">
          <span
            className="chart-widget__legend-dot"
            style={{ backgroundColor: 'var(--primary, #6C63FF)' }}
          />
          <span className="chart-widget__legend-label">Present</span>
          <span className="chart-widget__legend-value">{present}%</span>
        </div>
        <div className="chart-widget__legend-item">
          <span
            className="chart-widget__legend-dot"
            style={{ backgroundColor: 'var(--accent-orange, #F5A623)' }}
          />
          <span className="chart-widget__legend-label">Not marked</span>
          <span className="chart-widget__legend-value">{notMarked}%</span>
        </div>
        <div className="chart-widget__legend-item">
          <span
            className="chart-widget__legend-dot"
            style={{ backgroundColor: 'var(--text-tertiary, #9CA3AF)' }}
          />
          <span className="chart-widget__legend-label">Absent</span>
          <span className="chart-widget__legend-value">{absent}%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
