import { convertDateToTime, convertTimeToDate } from './../src/util';

const testName = (fn: (...args: any) => any) => `Utility function - ${fn.name}`;

describe(testName(convertDateToTime), () => {
  it('converts correctly', () => {
    const d = new Date();
    const t = convertDateToTime(d);
    expect(t.hours).toBe(d.getHours());
    expect(t.minutes).toBe(d.getMinutes());
  });
});

describe(testName(convertTimeToDate), () => {
  const t = { hours: 15, minutes: 30 };

  it('converts correctly without parent date', () => {
    const d = convertTimeToDate(t);
    expect(d.getHours()).toBe(t.hours);
    expect(d.getMinutes()).toBe(t.minutes);
  });

  it('converts correctly with parent date', () => {
    const d = convertTimeToDate(t, new Date(2001, 8, 30));
    expect(d.getHours()).toBe(t.hours);
    expect(d.getMinutes()).toBe(t.minutes);
    expect(d.getFullYear()).toBe(2001);
    expect(d.getMonth()).toBe(8);
    expect(d.getDate()).toBe(30);
  });
});
