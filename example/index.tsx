import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DatePicker from '../';
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
      {/* <TimePicker className="time-picker" /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
