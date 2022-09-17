import {
  getMonthNumberFromName,
  getMonthNameFromNumber,
  getDayFromNumber,
  getDaysOfWeek,
} from '../../src/date-picker/methods';

const testName = (fn: (...args: any) => any) =>
  `DatePicker method - ${fn.name}`;

describe(testName(getMonthNameFromNumber), () => {
  it('gives correct name', () => {
    expect(getMonthNameFromNumber(0)).toBe('January');
    expect(getMonthNameFromNumber(5)).toBe('June');
    expect(getMonthNameFromNumber(11)).toBe('December');
    // no need to check all - typescript enum guarantees that this will work
  });
});

describe(testName(getMonthNumberFromName), () => {
  it('gives correct name', () => {
    expect(getMonthNumberFromName('January')).toBe(0);
    expect(getMonthNumberFromName('February')).toBe(1);
    expect(getMonthNumberFromName('March')).toBe(2);
    expect(getMonthNumberFromName('April')).toBe(3);
    expect(getMonthNumberFromName('May')).toBe(4);
    expect(getMonthNumberFromName('June')).toBe(5);
    expect(getMonthNumberFromName('July')).toBe(6);
    expect(getMonthNumberFromName('August')).toBe(7);
    expect(getMonthNumberFromName('September')).toBe(8);
    expect(getMonthNumberFromName('October')).toBe(9);
    expect(getMonthNumberFromName('November')).toBe(10);
    expect(getMonthNumberFromName('December')).toBe(11);
  });
});

describe(testName(getDayFromNumber), () => {
  it('gives correct name - week starts from monday', () => {
    const day = 'Monday';
    expect(getDayFromNumber(0, day)).toBe('Monday');
    expect(getDayFromNumber(1, day)).toBe('Tuesday');
    expect(getDayFromNumber(2, day)).toBe('Wednesday');
    expect(getDayFromNumber(3, day)).toBe('Thursday');
    expect(getDayFromNumber(4, day)).toBe('Friday');
    expect(getDayFromNumber(5, day)).toBe('Saturday');
    expect(getDayFromNumber(6, day)).toBe('Sunday');
  });

  it('gives correct name - week starts from sunday', () => {
    const day = 'Sunday';
    expect(getDayFromNumber(0, day)).toBe('Sunday');
    expect(getDayFromNumber(1, day)).toBe('Monday');
    expect(getDayFromNumber(2, day)).toBe('Tuesday');
    expect(getDayFromNumber(3, day)).toBe('Wednesday');
    expect(getDayFromNumber(4, day)).toBe('Thursday');
    expect(getDayFromNumber(5, day)).toBe('Friday');
    expect(getDayFromNumber(6, day)).toBe('Saturday');
  });
});

describe(testName(getDaysOfWeek), () => {
  it('gives correct weekdays order - week starts from monday', () => {
    expect(getDaysOfWeek('Monday')).toStrictEqual([
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
      'Su',
    ]);
  });

  it('gives correct weekdays order - week starts from sunday', () => {
    expect(getDaysOfWeek('Sunday')).toStrictEqual([
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
    ]);
  });
});
