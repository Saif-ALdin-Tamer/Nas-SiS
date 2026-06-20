import { notices } from '../../data/mockData';
import './NoticeBoardWidget.css';

const NoticeBoardWidget = () => {
  return (
    <div className="notice-widget card">
      <div className="notice-widget__header">
        <h4 className="notice-widget__title">Notice board</h4>
        <span className="notice-widget__date">10th June 2023</span>
      </div>

      <div className="notice-widget__list">
        {notices.map((notice) => (
          <div className="notice-widget__item" key={notice.id}>
            <div className="notice-widget__meta">
              <span
                className="notice-widget__author"
                style={{ color: notice.color }}
              >
                {notice.author}
              </span>
              <span className="notice-widget__time">{notice.time}</span>
            </div>
            <p className="notice-widget__message">{notice.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoardWidget;
