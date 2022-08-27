import React from 'react';
import CustomSelect, { OptionType } from '../components/select';
import { TimePickerOptions } from './types';

import './styles.css';
import { convertHourFrom12Hrto24Hr } from '../util';

/**
 * Time type
 */
export type Time = {
  hours: number;
  minutes: number;
};

/**
 * Time display type
 */
export type TimeDisplay = {
  hours: number;
  minutes: number;
  amPm?: 'AM' | 'PM'
}

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
  value?: Time;
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
  /**
   * TimePicker configuration options
   */
  options?: TimePickerOptions;
} & React.PropsWithRef<
  Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'selected' | 'options' | 'value'>
>;

const defaultOptions: TimePickerOptions = {
  displayFormat: '24hr'
}

/**
 *
 * @param time {Time} The time value
 * @param interval {number} The interval between each minute select option
 * @returns {Time} Time value rounded to the nearest interval
 */
const alignTime = (
  { hours, minutes }: Time,
  interval: number,
  lower: boolean = true
): Time => {
  // round minutes to nearest interval
  if (minutes % interval !== 0) {
    minutes = lower
      ? minutes - (minutes % interval)
      : minutes + (minutes % interval);
  }
  return {
    hours,
    minutes,
  };
};

const isMinuteOptionDisabled = (
  selectedTime: Time,
  maxTime: Time,
  minTime: Time,
  i: number
): boolean =>
  selectedTime.hours > maxTime.hours ||
  selectedTime.hours < minTime.hours ||
  (selectedTime.hours === maxTime.hours && i > maxTime.minutes) ||
  (selectedTime.hours === minTime.hours && i < minTime.minutes);

/**
 * Convert Time to a 12hr TimeDisplay format
 * @param selectedTime
 */
const to12HrTimeDisplay = (selectedTime: Time): TimeDisplay => {
  let hours;
  let amPm: any = 'AM';
  if (selectedTime.hours === 0) {
    hours = 12;
  }
  else if (selectedTime.hours === 12) {
    hours = 12;
    amPm = 'PM';
  }
  else if (selectedTime.hours > 12) {
    hours = selectedTime.hours - 12
    amPm = 'PM';
  }
  else {
    hours = selectedTime.hours
  }

  return {
    hours,
    minutes: selectedTime.minutes,
    amPm
  };
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
      value,
      minTime = MIN_TIME,
      maxTime = MAX_TIME,
      minutesInterval = MINUTES_INTERVAL,
      options = defaultOptions,
      className,
      ...props
    },
    ref
  ) => {
    if (
      typeof minutesInterval !== 'number' &&
      minutesInterval < 1 &&
      Number.isInteger(minutesInterval)
    ) {
      throw new Error('minutesInterval must be an integer greater than 0');
    }

    const [selectedTime, setSelectedTime] = React.useState(() => {
      if (value !== undefined) {
        return alignTime(value, minutesInterval);
      }
      const d = new Date();
      return alignTime(
        { hours: d.getHours(), minutes: d.getMinutes() },
        minutesInterval
      );
    });

    const [displayTime, setDisplayTime] = React.useState(() => {
      if (options.displayFormat === '12hr') {
        return to12HrTimeDisplay(selectedTime);
      }

      return {...selectedTime};
    })

    const handleMinutesChange = React.useCallback(
      (v: string) => {
        setSelectedTime((t) => {
          if (t.hours === maxTime.hours && Number(v) > maxTime.minutes) {
            return alignTime(
              { ...t, minutes: maxTime.minutes },
              minutesInterval
            );
          } else if (t.hours === minTime.hours && Number(v) < minTime.minutes) {
            return alignTime(
              { ...t, minutes: minTime.minutes },
              minutesInterval,
              false
            );
          } else {
            return alignTime({ ...t, minutes: Number(v) }, minutesInterval);
          }
        });
      },
      [minutesInterval, maxTime, minTime]
    );

    const handleHoursChange = React.useCallback(
      (v: string) => {
        setSelectedTime((t) => {
          let h = Number(v);
          if (options.displayFormat === '12hr' && displayTime.amPm) {
            h = convertHourFrom12Hrto24Hr(h, displayTime.amPm);
          }

          if (h === minTime.hours && t.minutes < minTime.minutes) {
            return alignTime(
              { hours: h, minutes: minTime.minutes },
              minutesInterval,
              false
            );
          } else if (h === maxTime.hours && t.minutes > maxTime.minutes) {
            return alignTime(
              { hours: h, minutes: maxTime.minutes },
              minutesInterval
            );
          } else {
            return alignTime({ ...t, hours: h }, minutesInterval);
          }
        });
      },
      [minutesInterval, maxTime, minTime, displayTime.amPm]
    );

    const handleAmPmChange = React.useCallback(
      (v: string) => {
        setSelectedTime((t) => {
          let h;

          if (v === 'AM') {
            // when switching to PM make 12 hour 0
            h = t.hours === 12 ? 0 : t.hours - 12;
          }
          else {
            // when switching to PM make 0 hour 12
            h = t.hours === 0 ? 12 : t.hours + 12;
          }

          return alignTime({...t, hours: h}, minutesInterval)
        })
      },
      [maxTime, minTime]
    );

    // the array of options for the minutes to select from
    const minuteOptions = React.useMemo<OptionType<string>[]>(() => {
      let options: OptionType<string>[] = [];
      for (let i = 0; i < 60; i += minutesInterval) {
        options.push({
          value: [i.toString(), i.toString().padStart(2, '0')],
          disabled: isMinuteOptionDisabled(selectedTime, maxTime, minTime, i),
        });
      }
      return options;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minutesInterval, maxTime, minTime, selectedTime.hours]);

    const hourOptions = React.useMemo<OptionType<string>[]>(() => {
      const [startIndex, maxHours] = options.displayFormat === '12hr' ?
        [1, 12] : [0, 23];

      let o: OptionType<string>[] = [];
      let normalizedHour;
      for (let i = startIndex; i <= maxHours; i++) {
        normalizedHour = i;
        if (options.displayFormat === '12hr' && displayTime.amPm) {
          normalizedHour = convertHourFrom12Hrto24Hr(i, displayTime.amPm)
        }

        o.push({
          value: [i.toString(), i.toString().padStart(2, '0')],
          disabled: minTime.hours > normalizedHour || maxTime.hours < normalizedHour,
        });
      }
      return o;
    }, [maxTime, minTime, options.displayFormat, displayTime.amPm]);

    const amPmOptions = React.useMemo<OptionType<string>[]>(() => {
      let isPmDisabled = false;
      let isAmDisabled = false;

      if (minTime.hours > 11) {
        isAmDisabled = true
      }
      else if (selectedTime.hours > 11) {
        const h = selectedTime.hours - 12;
        if (h < minTime.hours || h === minTime.hours && selectedTime.minutes < minTime.minutes) {
          isAmDisabled = true;
        }
      }

      if (maxTime.hours < 12) {
        isPmDisabled = true
      }
      else if (selectedTime.hours < 12) {
        const h = selectedTime.hours + 12;
        if (h > maxTime.hours || h === maxTime.hours && selectedTime.minutes > maxTime.minutes) {
          isPmDisabled = true;
        }
      }

      return [
        {value: ['AM', 'AM'], disabled: isAmDisabled },
        {value: ['PM', 'PM'], disabled: isPmDisabled }
      ]
    }, [maxTime, minTime, selectedTime.hours, selectedTime.minutes]);

    React.useEffect(() => {
      onChange?.(selectedTime);
    }, [selectedTime, onChange]);

    React.useEffect(() => {
      const updatedTime = alignTime(selectedTime, minutesInterval);
      setSelectedTime(updatedTime);
      onChange?.(updatedTime);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minutesInterval]);

    React.useEffect(() => {
      let displayTime = selectedTime;
      if (options.displayFormat === '12hr') {
        displayTime = to12HrTimeDisplay(selectedTime);
      }
      setDisplayTime(displayTime);
    }, [selectedTime, options.displayFormat])

    return (
      <div className={`stp ${className ?? ''}`} {...props} ref={ref}>
        <CustomSelect
          value={displayTime.hours.toString().padStart(2, '0')}
          onChange={handleHoursChange}
          options={hourOptions}
        />
        <p>:</p>
        <CustomSelect
          value={displayTime.minutes.toString().padStart(2, '0')}
          onChange={handleMinutesChange}
          options={minuteOptions}
        />
        { displayTime.amPm &&
          <CustomSelect
            value={displayTime.amPm}
            onChange={handleAmPmChange}
            options={amPmOptions}
          />
        }
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
