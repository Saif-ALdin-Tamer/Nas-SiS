import DonutChart from '../ui/DonutChart';
import { testReport } from '../../data/mockData';
import './ChartWidget.css';

const TestReport = () => {
  const { percentage, label } = testReport;

  return (
    <div className="chart-widget card">
      <div className="chart-widget__header">
        <h4 className="chart-widget__title">Test report</h4>
        <span className="chart-widget__subtitle">{label}</span>
      </div>

      <div className="chart-widget__body">
        <DonutChart
          percentage={percentage}
          size={120}
          strokeWidth={12}
          color="var(--primary, #6C63FF)"
        />
      </div>
    </div>
  );
};

export default TestReport;
