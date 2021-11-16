const MONTHS: { [key: number]: string } = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const getMonthNameFromNumber = (month: number): string => {
  if (month < 0 || month > 11) {
    throw new Error(`Invalid month number: ${month}`);
  }
  return MONTHS[month];
};

export const getDatesOfMonth = (date: Date): { d: Date; active: boolean }[] => {
  // generate dates of each week of the month including the residue dates
  // of the last week of previous month and first week of next month
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
  const lastDayOfMonthWeekDay = lastDayOfMonth.getDay();

  const previousMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const previousMonthLastDay = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0
  );

  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);

  const dates: { d: Date; active: boolean }[] = [];

  for (let i = 0; i < firstDayOfMonthWeekDay; i++) {
    dates.push({
      d: new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        previousMonthLastDay.getDate() - firstDayOfMonthWeekDay + i + 1
      ),
      active: false,
    });
  }

  for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
    dates.push({
      d: new Date(date.getFullYear(), date.getMonth(), i + 1),
      active: true,
    });
  }

  for (let i = 0; i < 6 - lastDayOfMonthWeekDay; i++) {
    dates.push({
      d: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1),
      active: false,
    });
  }

  return dates;
};
