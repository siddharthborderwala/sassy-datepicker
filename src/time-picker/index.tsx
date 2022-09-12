import React, {
  forwardRef,
  HTMLProps,
  PropsWithRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CustomSelect, { OptionType } from '../components/select';
import { Meridiem, Time, TimePickerOptions } from './types';

import './styles.css';
import { convertHourFrom12HrTo24Hr } from '../util';
import {
  alignTime,
  generateHourOptions,
  generateMinuteOptions,
} from './methods';

/**
 * Props for TimePicker React Component
 */
export type TimePickerProps = {
  /**
   * This function is called when the selected date is changed.
   */
  onChange: (time: Time) => void;
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
  /**
   * If the TimePicker is disabled
   */
  disabled?: boolean;
} & PropsWithRef<
  Omit<
    HTMLProps<HTMLInputElement>,
    'onChange' | 'selected' | 'options' | 'value' | 'disabled'
  >
>;

const defaultOptions: TimePickerOptions = {
  timeFormat: '12hr',
};

const meridiemOptions: OptionType<Meridiem>[] = [
  { value: Meridiem.AM, label: Meridiem.AM, disabled: false },
  { value: Meridiem.PM, label: Meridiem.PM, disabled: false },
];

// defaults
const MINUTES_INTERVAL = 30;

/**
 * TimePicker React Component
 */
const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      onChange,
      value,
      minutesInterval = MINUTES_INTERVAL,
      options = defaultOptions,
      className,
      disabled,
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

    const { timeFormat } = options;
    const [selectedTime, setSelectedTime] = useState(() => {
      if (value !== undefined) alignTime(value, minutesInterval);
      const d = new Date();
      return alignTime(
        { minutes: d.getMinutes(), hours: d.getHours() },
        minutesInterval
      );
    });

    const [currentMeridiem, setCurrentMeridiem] = useState<Meridiem>(() =>
      selectedTime.hours <= 11 ? Meridiem.AM : Meridiem.PM
    );

    const handleMinutesChange = useCallback(
      (v: string) => {
        setSelectedTime((t) => {
          const minutes = Number(v);
          return alignTime({ ...t, minutes }, minutesInterval);
        });
      },
      [minutesInterval]
    );

    const handleHoursChange = useCallback(
      (v: string) => {
        setSelectedTime((t) => {
          let hours = Number(v);
          if (timeFormat === '12hr') {
            hours = convertHourFrom12HrTo24Hr(hours, currentMeridiem);
          }
          return alignTime({ ...t, hours }, minutesInterval);
        });
      },
      [minutesInterval, currentMeridiem, timeFormat]
    );

    const handleMeridiemChange = useCallback((v: Meridiem) => {
      setCurrentMeridiem(v);
      setSelectedTime((t) => {
        if (v === Meridiem.AM) {
          return {
            minutes: t.minutes,
            hours: t.hours - 12,
          };
        }
        return {
          minutes: t.minutes,
          hours: t.hours + 12,
        };
      });
    }, []);

    // the array of options of minutes to select from
    const minuteOptions = useMemo(
      () => generateMinuteOptions(minutesInterval),
      [minutesInterval]
    );

    // the array of options of hours to select from
    const hourOptions = useMemo(() => generateHourOptions(timeFormat), [
      timeFormat,
    ]);

    //
    const currentHourDisplayValue = useMemo(() => {
      if (timeFormat === '24hr')
        return selectedTime.hours.toString().padStart(2, '0');
      if (currentMeridiem === Meridiem.AM) {
        const h = selectedTime.hours;
        if (h === 0) return '12';
        return h.toString().padStart(2, '0');
      } else {
        const h = selectedTime.hours - 12;
        if (h === 0) return '12';
        return h.toString().padStart(2, '0');
      }
    }, [selectedTime.hours, timeFormat, currentMeridiem]);

    const currentMinuteDisplayValue = useMemo(
      () => selectedTime.minutes.toString().padStart(2, '0'),
      [selectedTime.minutes]
    );

    useEffect(() => {
      onChange(selectedTime);
    }, [selectedTime, onChange]);

    useEffect(() => {
      setSelectedTime(alignTime(selectedTime, minutesInterval));
    }, [minutesInterval]);

    // FIXME: hour and minute options depending on maxTime and minTime
    return (
      <div
        className={`stp ${className ?? ''} ${disabled ? 'stp--disabled' : ''}`}
        {...props}
        ref={ref}
      >
        <CustomSelect
          disabled={disabled}
          value={currentHourDisplayValue}
          onChange={handleHoursChange}
          options={hourOptions}
        />
        <span
          className={`stp--divider ${disabled ? 'stp--divider__disabled' : ''}`}
        >
          :
        </span>
        <CustomSelect
          disabled={disabled}
          value={currentMinuteDisplayValue}
          onChange={handleMinutesChange}
          options={minuteOptions}
        />
        {timeFormat === '12hr' && (
          <CustomSelect
            disabled={disabled}
            value={currentMeridiem}
            onChange={handleMeridiemChange}
            options={meridiemOptions}
          />
        )}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
