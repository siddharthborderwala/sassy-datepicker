import React from 'react';
import dt from 'date-and-time';

import MonthPicker from './month-picker';
import DateButton from './date-button';
import { getDatesOfMonth, getDaysOfWeek } from '../util';
import { DatePickerOptions } from './types';

import './styles.css';

export type DatePickerProps = {
  /**
   * This function is called when the selected date is changed.
   */
  onChange?: (date: Date) => void;
  /**
   * The selected date.
   */
  value?: Date;
  /**
   * The minimum date that can be selected (inclusive).
   * Default is 1st January 1900
   */
  minDate?: Date;
  /**
   * The maximum date that can be selected (inclusive).
   * Default is 100 years from now
   */
  maxDate?: Date;
  /**
   * DatePicker configuration options
   */
  options?: DatePickerOptions;
} & React.PropsWithRef<
  Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'selected' | 'options'>
>;

const defaultOptions: DatePickerOptions = {
  weekStartsFrom: 'Sunday',
};

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      onChange,
      value = new Date(),
      minDate,
      maxDate,
      options = defaultOptions,
      className,
      ...props
    },
    ref
  ) => {
    const minDateValue = React.useMemo(
      () => minDate?.getTime() ?? new Date(1900, 0, 1).getTime(),
      [minDate]
    );
    const maxDateValue = React.useMemo(
      () => maxDate?.getTime() ?? dt.addYears(new Date(), 100).getTime(),
      [maxDate]
    );

    const [activeMonthDate, setActiveMonthDate] = React.useState<Date>(value);

    const nextMonth = React.useCallback(
      () => setActiveMonthDate((d) => dt.addMonths(d, 1)),
      [setActiveMonthDate]
    );

    const prevMonth = React.useCallback(
      () => setActiveMonthDate((d) => dt.addMonths(d, -1)),
      [setActiveMonthDate]
    );

    const handleClick = React.useCallback((d: Date) => onChange?.(d), [
      onChange,
    ]);

    const daysOfWeekElements = React.useMemo(
      () =>
        getDaysOfWeek(options.weekStartsFrom).map((v) => (
          <p key={v} className="sdp--text sdp--text__inactive">
            {v}
          </p>
        )),
      [options.weekStartsFrom]
    );

    const daysOfMonthList = React.useMemo(
      () =>
        getDatesOfMonth(
          activeMonthDate,
          minDateValue,
          maxDateValue,
          options.weekStartsFrom
        ),
      [activeMonthDate, minDateValue, maxDateValue, options.weekStartsFrom]
    );

    // TODO: arrow-keys navigation
    return (
      <div
        className={`sdp ${className ?? ''}`}
        aria-label="Date Picker"
        tabIndex={0}
        ref={ref}
        {...props}
      >
        <MonthPicker
          month={activeMonthDate.getMonth()}
          year={activeMonthDate.getFullYear()}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />
        <div className="sdp--dates-grid">
          <>{daysOfWeekElements}</>
          <>
            {daysOfMonthList.map(({ date, active, ms }) => (
              <DateButton
                key={ms}
                date={date}
                active={active}
                selected={dt.isSameDay(value, date)}
                onClick={handleClick}
              />
            ))}
          </>
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
