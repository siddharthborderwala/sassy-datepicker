import React, { useState } from 'react';
import DatePicker from 'sassy-datepicker';
import DemoContainer from './demo-container';
import styles from './week-starts-from-demo.module.css';

const WeekStartsFromDemo = () => {
  const [weekStartsFrom, setWeekStartsFrom] = useState('Monday');
  const [date, setDate] = useState(new Date());

  return (
    <DemoContainer>
      <div className={styles['week-starts--input']}>
        <label htmlFor="week-day">
          <pre>Week Starts From</pre>
        </label>
        <select
          id="week-day"
          value={weekStartsFrom}
          onChange={(e) => setWeekStartsFrom(e.target.value)}
        >
          <option value="Monday">Monday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <DatePicker
        onChange={setDate}
        value={date}
        weekStartsFrom={weekStartsFrom}
        className={styles['week-starts--picker']}
      />
    </DemoContainer>
  );
};

export default WeekStartsFromDemo;
