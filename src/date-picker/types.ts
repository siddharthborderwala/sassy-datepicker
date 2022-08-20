export type WeekStartDay = 'Sunday' | 'Monday';

export type DatePickerOptions = {
  /**
   * Week starts from which day
   */
  weekStartsFrom: 'Sunday' | 'Monday';
};

export type DisplayDate = {
  date: Date;
  active: boolean;
  ms: number;
};
