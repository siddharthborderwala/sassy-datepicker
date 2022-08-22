import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DatePicker, { TimePicker } from '../';
import './styles.css';

const App = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <div>
      <DatePicker
        className="date-picker"
        value={date}
        onChange={setDate}
        options={{ weekStartsFrom: 'Sunday' }}
      />
      <br />
      <TimePicker className="time-picker" minutesInterval={5} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
