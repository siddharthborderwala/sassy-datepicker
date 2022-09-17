import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TimePicker } from '../../src';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const onChange = jest.fn();
    ReactDOM.render(
      <TimePicker value={{ hours: 15, minutes: 30 }} onChange={onChange} />,
      div
    );
  });
});
