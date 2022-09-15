import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DatePicker, { TimePicker } from '../src';
import '../dist/styles.css';
import './styles.css';

const App = () => {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState({ hours: 0, minutes: 0 });
  const [format, setFormat] = React.useState('12hr');
  const [timeDisabled, setTimeDisabled] = React.useState(false);
  const [dateDisabled, setDateDisabled] = React.useState(false);

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={dateDisabled}
          onChange={(e) => setDateDisabled(e.target.checked)}
        />
        <br />
        <DatePicker
          className="date-picker"
          value={date}
          onChange={setDate}
          options={{ weekStartsFrom: 'Sunday' }}
          disabled={dateDisabled}
        />
      </div>
      <br />
      <div>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="12hr">12hr</option>
          <option value="24hr">24hr</option>
        </select>
        <br />
        <input
          type="checkbox"
          checked={timeDisabled}
          onChange={(e) => setTimeDisabled(e.target.checked)}
        />
        <TimePicker
          value={time}
          onChange={setTime}
          className="time-picker"
          minutesInterval={1}
          // options={{ timeFormat: format }}
          disabled={timeDisabled}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
