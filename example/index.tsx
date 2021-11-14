import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import DatePicker from '../dist';
import './styles.css';

const App = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  return (
    <div>
      <p>Select Date of Departure</p>
      <p>{date.toDateString()}</p>
      <DatePicker onChange={setDate} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
