import * as React from 'react';

import MonthPicker from './month-picker';
import { getDatesOfMonth } from './util';
import './styles.css';
import DateButton from './date-button';

export type DatePickerProps = {
  onChange?: (date: Date) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [monthDate, setMonthDate] = React.useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const nextMonth = () =>
    setMonthDate(d => {
      const m = d.getMonth();
      const y = d.getFullYear();
      if (m === 11) {
        return new Date(y + 1, 0);
      } else {
        return new Date(y, m + 1);
      }
    });

  const prevMonth = () =>
    setMonthDate(d => {
      const m = d.getMonth();
      const y = d.getFullYear();
      if (m === 0) {
        return new Date(y - 1, 11);
      } else {
        return new Date(y, m - 1);
      }
    });

  const setNewSelectedDate = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <div className="sdp">
      <MonthPicker
        month={monthDate.getMonth()}
        year={monthDate.getFullYear()}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <div className="sdp--dates-grid">
        <p className="sdp--text sdp--text__inactive">Mo</p>
        <p className="sdp--text sdp--text__inactive">Tu</p>
        <p className="sdp--text sdp--text__inactive">We</p>
        <p className="sdp--text sdp--text__inactive">Th</p>
        <p className="sdp--text sdp--text__inactive">Fr</p>
        <p className="sdp--text sdp--text__inactive">Sa</p>
        <p className="sdp--text sdp--text__inactive">Su</p>
        {getDatesOfMonth(monthDate).map(({ d, active }) => (
          <DateButton
            key={d.toString()}
            date={d}
            active={active}
            selected={selectedDate.toDateString() === d.toDateString()}
            onClick={setNewSelectedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
