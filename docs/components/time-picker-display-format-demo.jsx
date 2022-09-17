import React, { useState } from 'react';
import { TimePicker } from 'sassy-datepicker';
import DemoContainer from './demo-container';
import styles from './time-picker-display-format-demo.module.css';

const TimePickerDisplayFormatDemo = () => {
  const [time, setTime] = useState();
  const [displayFormat, setDisplayFormat] = useState('12hr');

  return (
    <DemoContainer>
      <div className={styles['display-format--input']}>
        <label>
          <pre>Display Format</pre>
        </label>
        <select
          value={displayFormat}
          onChange={(e) => setDisplayFormat(e.target.value)}
        >
          <option value="12hr">12hr</option>
          <option value="24hr">24hr</option>
        </select>
      </div>
      <TimePicker
        className={styles['display-format--picker']}
        value={time}
        onChange={setTime}
        displayFormat={displayFormat}
      />
    </DemoContainer>
  );
};

export default TimePickerDisplayFormatDemo;
