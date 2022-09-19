import React, { useState } from 'react';
import DatePicker from 'sassy-datepicker';
import DemoContainer from './demo-container';
import styles from './limited-datepicker-demo.module.css';

const min = new Date(2001, 0, 1); // 1st January 2001
const max = new Date(2030, 11, 31); // 31st December 2030
const init = new Date(2001, 8, 30); // 30th September 2001

const formatDateForInputValue = (d) =>
  d
    ? `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
        .getDate()
        .toString()
        .padStart(2, '0')}`
    : null;

const LimitedDatePickerDemo = () => {
  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(max);
  const [date, setDate] = useState(init);

  const blockKeyStrokes = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <DemoContainer>
      <div className={styles['limited-dp--date-input']}>
        <label htmlFor="min-date">
          <pre>Min Date</pre>
        </label>
        <input
          id="min-date"
          type="date"
          value={formatDateForInputValue(minDate) ?? '2001-01-01'}
          onChange={(e) => setMinDate(e.target.valueAsDate)}
          onKeyDown={blockKeyStrokes}
        />
      </div>
      <div className={styles['limited-dp--date-input']}>
        <label htmlFor="max-date">
          <pre>Max Date</pre>
        </label>
        <input
          id="max-date"
          type="date"
          value={formatDateForInputValue(maxDate) ?? '2030-12-31'}
          onChange={(e) => setMaxDate(e.target.valueAsDate)}
          onKeyDown={blockKeyStrokes}
        />
      </div>
      <DatePicker
        className={styles['limited-dp--picker']}
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
      />
    </DemoContainer>
  );
};

export default LimitedDatePickerDemo;
