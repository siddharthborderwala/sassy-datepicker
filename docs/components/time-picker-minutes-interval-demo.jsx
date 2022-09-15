import React, { useCallback, useState } from 'react';
import { TimePicker } from 'sassy-datepicker';
import DemoContainer from './demo-container';
import styles from './time-picker-minutes-interval-demo.module.css';

const TimePickerMinutesIntervalDemo = () => {
  const [time, setTime] = useState();
  const [minutesInterval, setMinutesInterval] = useState(5);

  const handleChange = useCallback(
    ({ target }) => {
      const n = target.valueAsNumber;
      if (Number.isNaN(n)) {
        setMinutesInterval(5);
      } else if (!Number.isInteger(n)) {
        setMinutesInterval(Math.round(n));
      } else {
        setMinutesInterval(n);
      }
    },
    [setMinutesInterval]
  );

  return (
    <DemoContainer>
      <div className={styles['minutes-interval--input']}>
        <label>
          <pre>Minutes Interval</pre>
        </label>
        <input
          type="number"
          value={minutesInterval}
          onChange={handleChange}
          max={30}
          min={1}
        />
      </div>
      <TimePicker
        className={styles['minutes-interval--picker']}
        value={time}
        onChange={setTime}
        minutesInterval={minutesInterval}
      />
    </DemoContainer>
  );
};

export default TimePickerMinutesIntervalDemo;
