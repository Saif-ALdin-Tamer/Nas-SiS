import './DonutChart.css';

const DonutChart = ({
  percentage = 0,
  size = 160,
  strokeWidth = 12,
  color = '#6C63FF',
  label = '',
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div className="donut-chart" style={{ width: size, height: size }}>
      <svg
        className="donut-chart__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background ring */}
        <circle
          className="donut-chart__ring-bg"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Foreground animated ring */}
        <circle
          className="donut-chart__ring"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          style={{
            '--circumference': circumference,
            '--offset': offset,
          }}
        />
      </svg>

      {/* Center text */}
      <div className="donut-chart__center">
        {showPercentage && (
          <span className="donut-chart__value">
            {percentage}
            <span className="donut-chart__percent">%</span>
          </span>
        )}
        {label && <span className="donut-chart__label">{label}</span>}
      </div>
    </div>
  );
};

export default DonutChart;
