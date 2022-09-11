import { OptionType } from './../components/select';
import { Time, Meridiem, TimeDisplay, TimeFormat } from './types';

/**
 * Creates a time value aligned with the minutes interval from am raw time input
 *
 * @param {Time} time The time value
 * @param {number} interval The interval between each minute select option
 * @returns {Time} Time value rounded to the nearest interval
 */
export const alignTime = (
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

/**
 * Convert Time to a 12hr TimeDisplay format
 *
 * @param selectedTime
 */
export const timeToTimeDisplay = (selectedTime: Time): TimeDisplay => {
  let hours;
  let meridiem = Meridiem.AM;
  if (selectedTime.hours === 0) {
    hours = 12;
  } else if (selectedTime.hours === 12) {
    hours = 12;
    meridiem = Meridiem.PM;
  } else if (selectedTime.hours > 12) {
    hours = selectedTime.hours - 12;
    meridiem = Meridiem.PM;
  } else {
    hours = selectedTime.hours;
  }

  return {
    hours,
    minutes: selectedTime.minutes,
    meridiem,
  };
};

export const generateMeridiemOptions = (
  minTime: Time,
  maxTime: Time,
  selectedTime: Time
): OptionType<Meridiem>[] => {
  let isPmDisabled = false;
  let isAmDisabled = false;

  if (minTime.hours > 11) {
    isAmDisabled = true;
  } else if (selectedTime.hours > 11) {
    const h = selectedTime.hours - 12;
    if (
      h < minTime.hours ||
      (h === minTime.hours && selectedTime.minutes < minTime.minutes)
    ) {
      isAmDisabled = true;
    }
  }

  if (maxTime.hours < 12) {
    isPmDisabled = true;
  } else if (selectedTime.hours < 12) {
    const h = selectedTime.hours + 12;
    if (
      h > maxTime.hours ||
      (h === maxTime.hours && selectedTime.minutes > maxTime.minutes)
    ) {
      isPmDisabled = true;
    }
  }

  return [
    { value: Meridiem.AM, label: Meridiem.AM, disabled: isAmDisabled },
    { value: Meridiem.PM, label: Meridiem.PM, disabled: isPmDisabled },
  ];
};

export const generateHourOptions = (
  timeFormat: TimeFormat
): OptionType<string>[] => {
  if (timeFormat === '12hr') {
    const listOfOptions: OptionType<string>[] = new Array(12);
    listOfOptions[0] = {
      value: '12',
      label: '12',
      disabled: false,
    };
    for (let i = 1; i <= 11; i += 1) {
      listOfOptions[i] = {
        value: i.toString(),
        label: i.toString().padStart(2, '0'),
        disabled: false,
      };
    }
    return listOfOptions;
  }
  const listOfOptions: OptionType<string>[] = new Array(24);
  for (let i = 0; i <= 23; i += 1) {
    listOfOptions[i] = {
      value: i.toString(),
      label: i.toString().padStart(2, '0'),
      disabled: false,
    };
  }
  return listOfOptions;
};

export const generateMinuteOptions = (
  minutesInterval: number
): OptionType<string>[] => {
  let options: OptionType<string>[] = [];
  for (let i = 0; i < 60; i += minutesInterval) {
    options.push({
      value: i.toString(),
      label: i.toString().padStart(2, '0'),
      disabled: false,
    });
  }
  return options;
};
