import React from 'react';
import { getMonthNameFromNumber } from './util';

export type MonthPickerProps = {
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  month,
  year,
  nextMonth,
  prevMonth,
}) => {
  return (
    <div className="sdp--month-picker">
      <button
        className="sdp--square-btn sdp--square-btn__shadowed"
        onClick={prevMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <polyline
            points="160 208 80 128 160 48"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          ></polyline>
        </svg>
      </button>
      <p className="sdp--text">
        {getMonthNameFromNumber(month)} {year}
      </p>
      <button
        className="sdp--square-btn sdp--square-btn__shadowed"
        onClick={nextMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <polyline
            points="96 48 176 128 96 208"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          ></polyline>
        </svg>
      </button>
    </div>
  );
};

export default MonthPicker;
