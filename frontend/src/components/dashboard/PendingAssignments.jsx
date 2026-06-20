import { pendingAssignments } from '../../data/mockData';
import './PendingAssignments.css';

const dueTypeClass = {
  urgent: 'pending-assignments__badge--urgent',
  warning: 'pending-assignments__badge--warning',
  normal: 'pending-assignments__badge--normal',
};

const PendingAssignments = () => {
  return (
    <div className="pending-assignments card">
      <h4 className="pending-assignments__title">Pending assignments</h4>

      <div className="pending-assignments__list">
        {pendingAssignments.map((item, index) => (
          <div className="pending-assignments__item" key={item.id}>
            <div className="pending-assignments__info">
              <h5 className="pending-assignments__name">{item.title}</h5>
              <p className="pending-assignments__course">{item.course}</p>
            </div>
            <span
              className={`pending-assignments__badge ${dueTypeClass[item.dueType] || ''}`}
            >
              {item.dueLabel}
            </span>
            {index < pendingAssignments.length - 1 && (
              <div className="pending-assignments__divider" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingAssignments;
