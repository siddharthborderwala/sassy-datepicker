import React, { useMemo } from 'react';
import LeftCaret from '../icons/left-caret';
import RightCaret from '../icons/right-caret';
import { getMonthNameFromNumber } from './methods';
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
  disabled: boolean;
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
  disabled,
}) => {
  const fromYear = useMemo(() => new Date(minDateValue).getFullYear(), [
    minDateValue,
  ]);
  const toYear = useMemo(() => new Date(maxDateValue).getFullYear(), [
    maxDateValue,
  ]);

  return (
    <div className="sdp--header">
      <button
        className="sdp--square-btn sdp--square-btn__shadowed sdp--square-btn__outlined"
        onClick={prevMonth}
        aria-label="Go to previous month"
        type="button"
        disabled={disabled}
      >
        <LeftCaret />
      </button>
      <div className="sdp--header__main">
        <MonthPicker
          disabled={disabled}
          value={getMonthNameFromNumber(month)}
          onChange={onMonthChange}
        />
        <YearPicker
          disabled={disabled}
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
        disabled={disabled}
      >
        <RightCaret />
      </button>
    </div>
  );
};

export default Header;
