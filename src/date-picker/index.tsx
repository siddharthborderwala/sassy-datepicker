import React from 'react';
import dt from 'date-and-time';

import Header from './header';
import DateButton from './date-button';
import {
  getDatesOfMonth,
  getDaysOfWeek,
  getMonthNumberFromName,
} from '../util';
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
  Omit<
    React.HTMLProps<HTMLDivElement>,
    'onChange' | 'selected' | 'options' | 'value'
  >
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

    // current month and year the user is viewing
    const [openedDate, setOpenedDate] = React.useState<Date>(value);

    const nextMonth = React.useCallback(
      () => setOpenedDate((d) => dt.addMonths(d, 1)),
      [setOpenedDate]
    );

    const prevMonth = React.useCallback(
      () => setOpenedDate((d) => dt.addMonths(d, -1)),
      [setOpenedDate]
    );

    const onMonthChange = React.useCallback(
      (month: string) => {
        setOpenedDate(
          (d) =>
            new Date(
              d.getFullYear(),
              getMonthNumberFromName(month),
              d.getDate()
            )
        );
      },
      [setOpenedDate]
    );

    const onYearChange = React.useCallback(
      (year: number) => {
        setOpenedDate((d) => new Date(year, d.getMonth(), d.getDate()));
      },
      [setOpenedDate]
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
          openedDate,
          minDateValue,
          maxDateValue,
          options.weekStartsFrom
        ),
      [openedDate, minDateValue, maxDateValue, options.weekStartsFrom]
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
        <Header
          month={openedDate.getMonth()}
          year={openedDate.getFullYear()}
          minDateValue={minDateValue}
          maxDateValue={maxDateValue}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
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
