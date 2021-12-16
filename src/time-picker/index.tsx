import React from 'react';
import CustomSelect from './custom-select';

import './styles.css';

/**
 * Time type
 */
export type Time = {
  hours: number;
  minutes: number;
};

/**
 * Props for TimePicker React Component
 */
export type TimePickerProps = {
  /**
   * This function is called when the selected date is changed.
   */
  onChange?: (time: Time) => void;
  /**
   * The selected date.
   */
  selected?: Time;
  /**
   * The minimum time that can be selected - 0 to 23 (inclusive).
   */
  minTime?: Time;
  /**
   * The maximum time that can be selected - 0 to 23 (inclusive).
   */
  maxTime?: Time;
  /**
   * The number of minutes between each minute select option - default is 30
   */
  minutesInterval?: number;
} & React.PropsWithRef<
  Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'selected'>
>;

/**
 *
 * @param time {Time} The time value
 * @param interval {number} The interval between each minute select option
 * @returns {Time} Time value rounded to the nearest interval
 */
const alignTime = ({ hours, minutes }: Time, interval: number): Time => {
  // round minutes to nearest interval
  if (minutes % interval !== 0) {
    minutes = minutes - (minutes % interval);
  }
  return {
    hours,
    minutes,
  };
};

/**
 * Compares two time values and returns true if a is greater than b
 *
 * @param a {Time} Time value a
 * @param b {Time} Time value b
 * @returns {boolean} If a is greater than b
 */
const greaterThan = (a: Time, b: Time): boolean => {
  if (a.hours !== b.hours) {
    return a.hours > b.hours;
  }
  return a.minutes > b.minutes;
};

// sane defaults
const MIN_TIME = { hours: 0, minutes: 0 };
const MAX_TIME = { hours: 23, minutes: 59 };
const MINUTES_INTERVAL = 30;

/**
 * TimePicker React Component
 */
const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      onChange,
      selected,
      minTime = MIN_TIME,
      maxTime = MAX_TIME,
      minutesInterval = MINUTES_INTERVAL,
      className,
      ...props
    },
    ref
  ) => {
    if (60 % minutesInterval !== 0) {
      throw new Error('TimePicker: minutesInterval must be a factor of 60');
    }

    const selectedTime = React.useMemo(() => {
      if (selected !== undefined) {
        return alignTime(selected, minutesInterval);
      }
      const d = new Date();
      return alignTime(
        { hours: d.getHours(), minutes: d.getMinutes() },
        minutesInterval
      );
    }, [selected, minutesInterval]);

    // change event handler
    const handleChange = React.useCallback(
      (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(
          alignTime(
            { ...selectedTime, [name]: parseInt(e.target.value, 10) },
            minutesInterval
          )
        );
      },
      [minutesInterval, onChange, selectedTime]
    );

    // the array of options for the minutes to select from
    const minuteOptions = React.useMemo<number[]>(() => {
      let options = [];
      for (let i = 0; i < 60; i += minutesInterval) {
        options.push(i);
      }
      return options;
    }, [minutesInterval]);

    // need to update the value of selectedTime when onChange changes or minutesInterval changes
    React.useEffect(() => {
      onChange?.(selectedTime);
    }, [minutesInterval, onChange]);

    if (
      process.env.NODE_ENV !== 'production' &&
      (greaterThan(selectedTime, maxTime) || greaterThan(minTime, selectedTime))
    ) {
      console.warn(
        'Selected time must fall in the range of maxTime and minTime'
      );
    }

    // TODO: apply minTime and maxTime constraints
    return (
      <div className={`stp ${className ?? ''}`} {...props} ref={ref}>
        <CustomSelect
          className="stp--select stp--select__hours"
          value={selectedTime.hours.toString().padStart(2, '0')}
          onChange={
            ((v: string) =>
              handleChange('hours')({ target: { value: v } } as any)) as any
          }
          values={Array.from(Array(24).keys()).map(hour =>
            hour.toString().padStart(2, '0')
          )}
        />
        <p>:</p>
        <CustomSelect
          className="stp--select stp--select__minutes"
          value={selectedTime.minutes.toString().padStart(2, '0')}
          onChange={
            ((v: string) =>
              handleChange('minutes')({ target: { value: v } } as any)) as any
          }
          values={minuteOptions.map(m => m.toString().padStart(2, '0'))}
        />
      </div>
    );
  }
);

export default TimePicker;
