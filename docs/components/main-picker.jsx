import { useState } from 'react';
import DatePicker, { TimePicker } from 'sassy-datepicker';
import styles from './main-picker.module.css';

const MainPicker = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();

  return (
    <div className={styles['main-picker--container']}>
      <DatePicker
        className={styles['main-picker']}
        value={date}
        onChange={setDate}
      />
      <TimePicker value={time} onChange={setTime} minutesInterval={10} />
    </div>
  );
};

export default MainPicker;
