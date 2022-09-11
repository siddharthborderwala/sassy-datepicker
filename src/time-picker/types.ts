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
  meridiem?: Meridiem;
};

export type TimeFormat = '12hr' | '24hr';

export type TimePickerOptions = {
  /**
   * Which time format to use
   */
  timeFormat: TimeFormat;
};

export enum Meridiem {
  AM = 'AM',
  PM = 'PM',
}
