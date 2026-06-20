import TimetableCard from '../components/dashboard/TimetableCard';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import AssignmentChart from '../components/dashboard/AssignmentChart';
import NoticeBoardWidget from '../components/dashboard/NoticeBoardWidget';
import TestReport from '../components/dashboard/TestReport';
import PendingAssignments from '../components/dashboard/PendingAssignments';
import '../components/dashboard/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Row 1 — Full-width timetable */}
      <div className="dashboard__timetable">
        <TimetableCard />
      </div>

      {/* Row 2 — Three columns */}
      <div className="dashboard__attendance">
        <AttendanceChart />
      </div>

      <div className="dashboard__assignment">
        <AssignmentChart />
      </div>

      <div className="dashboard__noticeboard">
        <NoticeBoardWidget />
      </div>

      {/* Row 3 — Two columns (noticeboard continues from row 2) */}
      <div className="dashboard__test-report">
        <TestReport />
      </div>

      <div className="dashboard__pending">
        <PendingAssignments />
      </div>
    </div>
  );
};

export default Dashboard;
