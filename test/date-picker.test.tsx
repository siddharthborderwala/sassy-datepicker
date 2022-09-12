import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DatePicker from '../src';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const onChange = jest.fn();
    ReactDOM.render(<DatePicker onChange={onChange} />, div);
  });
});
