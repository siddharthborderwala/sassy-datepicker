import React, { useMemo } from 'react';
import CustomSelect, { OptionType } from '../components/select';

export type MonthPickerProps = {
  value: string;
  onChange: (year: string) => void;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MonthPicker: React.FC<MonthPickerProps> = ({ value, onChange }) => {
  const options = useMemo(
    () =>
      months.map(
        (m) =>
          ({
            value: [m, m],
            disabled: false,
          } as OptionType<string>)
      ),
    []
  );

  return (
    <CustomSelect
      className="sdp--select__month"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default MonthPicker;
