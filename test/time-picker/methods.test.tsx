import { OptionType } from '../../src/components/select';
import {
  alignTime,
  generateHourOptions,
  generateMinuteOptions,
  timeToTimeDisplay,
  convertHourFrom12HrTo24Hr,
} from '../../src/time-picker/methods';
import { Meridiem } from '../../src/time-picker/types';

const testName = (fn: (...args: any) => any) =>
  `TimePicker method - ${fn.name}`;

describe(testName(alignTime), () => {
  const t = { hours: 2, minutes: 12 };
  it('align to previous interval works', () => {
    const t1 = alignTime(t, 5);
    expect(t1.hours).toBe(2);
    expect(t1.minutes).toBe(10);
  });

  it('align to next interval works', () => {
    const t2 = alignTime(t, 5, false);
    expect(t2.hours).toBe(2);
    expect(t2.minutes).toBe(15);
  });
});

describe(testName(generateHourOptions), () => {
  const mapToNumbersArray = (a: OptionType<number>[]) =>
    a.map(({ value }) => value);

  it('24hr hour options generate', () => {
    const options12Hr = mapToNumbersArray(generateHourOptions('12hr'));
    expect(options12Hr).toStrictEqual([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it('24hr hour options generate', () => {
    const options24Hr = mapToNumbersArray(generateHourOptions('24hr'));
    const zeroToTwelve = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const twelveToEnd = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    expect(options24Hr).toStrictEqual([...zeroToTwelve, ...twelveToEnd]);
  });
});

describe(testName(generateMinuteOptions), () => {
  const mapToNumbersArray = (a: OptionType<number>[]) =>
    a.map(({ value }) => value);

  it('minute options get generated', () => {
    const options = mapToNumbersArray(generateMinuteOptions(10));
    expect(options).toStrictEqual([0, 10, 20, 30, 40, 50]);
  });
});

describe(testName(timeToTimeDisplay), () => {
  it('converts', () => {
    const td = timeToTimeDisplay({ hours: 15, minutes: 10 });
    expect(td).toStrictEqual({ hours: 3, minutes: 10, meridiem: 'PM' });
  });
});

describe(testName(convertHourFrom12HrTo24Hr), () => {
  it('converts PM', () => {
    const h = convertHourFrom12HrTo24Hr(3, Meridiem.PM);
    expect(h).toBe(15);
  });

  it('converts AM', () => {
    const h = convertHourFrom12HrTo24Hr(3, Meridiem.AM);
    expect(h).toBe(3);
  });
});
