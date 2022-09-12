import { useState } from 'react';
import DatePicker from 'sassy-datepicker';
import styles from './main-picker.module.css';

const MainPicker = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className={styles['main-picker--container']}>
      <DatePicker
        className={styles['main-picker']}
        value={date}
        onChange={setDate}
      />
    </div>
  );
};

export default MainPicker;
