import React from 'react';
import LeftCaret from '../icons/left-caret';
import RightCaret from '../icons/right-caret';
import { getMonthNameFromNumber } from '../util';
import MonthPicker from './month-picker';
import YearPicker from './year-picker';

export type HeaderProps = {
  month: number;
  year: number;
  minDateValue: number;
  maxDateValue: number;
  nextMonth: () => void;
  prevMonth: () => void;
  onMonthChange: (_: string) => void;
  onYearChange: (_: number) => void;
};

const Header: React.FC<HeaderProps> = ({
  month,
  year,
  minDateValue,
  maxDateValue,
  nextMonth,
  prevMonth,
  onMonthChange,
  onYearChange,
}) => {
  const fromYear = React.useMemo(() => new Date(minDateValue).getFullYear(), [
    minDateValue,
  ]);
  const toYear = React.useMemo(() => new Date(maxDateValue).getFullYear(), [
    maxDateValue,
  ]);

  return (
    <div className="sdp--header">
      <button
        className="sdp--square-btn sdp--square-btn__shadowed sdp--square-btn__outlined"
        onClick={prevMonth}
        aria-label="Go to previous month"
        type="button"
      >
        <LeftCaret />
      </button>
      <div className="sdp--header__main">
        <MonthPicker
          value={getMonthNameFromNumber(month)}
          onChange={onMonthChange}
        />
        <YearPicker
          fromYear={fromYear}
          toYear={toYear}
          onChange={onYearChange}
          value={year}
        />
      </div>
      <button
        className="sdp--square-btn sdp--square-btn__shadowed sdp--square-btn__outlined"
        onClick={nextMonth}
        aria-label="Go to next month"
        type="button"
      >
        <RightCaret />
      </button>
    </div>
  );
};

export default Header;
