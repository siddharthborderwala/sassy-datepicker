import { useState } from 'react';
import DatePicker from 'sassy-datepicker';

const MainPicker = () => {
  const [date, setDate] = useState(new Date());

  return <DatePicker className="main-picker" value={date} onChange={setDate} />;
};

export default MainPicker;
