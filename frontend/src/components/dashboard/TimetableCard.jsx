import { todayTimetable } from '../../data/mockData';
import './TimetableCard.css';

const TimetableCard = ({ data = todayTimetable }) => {
  return (
    <div className="timetable-card card">
      <h4 className="timetable-card__title">TODAY&apos;S TIMETABLE</h4>
      <div className="timetable-card__scroll">
        {data.map((item) => (
          <div
            className="timetable-card__item"
            key={item.id}
            style={{ borderLeftColor: item.color }}
          >
            <span
              className="timetable-card__time"
              style={{ backgroundColor: item.color }}
            >
              {item.startTime} - {item.endTime}
            </span>
            <h5 className="timetable-card__course">{item.course}</h5>
            <p className="timetable-card__topic">{item.topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimetableCard;
