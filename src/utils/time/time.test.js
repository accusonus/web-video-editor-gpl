import {
  duration2sec,
  sec2duration,
  timeValidation
} from './';

describe('various', () => {
  it('duration2sec works as expected', () => {
    // duration is undefined or null
    expect(duration2sec(undefined)).toBe(null);
    expect(duration2sec(null)).toBe(null);

    // duration is 10 seconds in various formats
    expect(duration2sec('10')).toBe(10);
    expect(duration2sec('00:10')).toBe(10);
    expect(duration2sec('00:00:10')).toBe(10);
    expect(duration2sec('00:00:10.00')).toBe(10);

    // duration is 10 seconds
    expect(duration2sec('10')).toBe(10);
    // duration is 610 seconds (10:10)
    expect(duration2sec('10:10')).toBe(610);
    // duration is 36610 seconds (10:10:10 in 2 formats)
    expect(duration2sec('10:10:10')).toBe(10 * 60 * 60 + 10 * 60 + 10);
    expect(duration2sec('10:10:10.00')).toBe(10 * 60 * 60 + 10 * 60 + 10);
  });

  it('sec2duration works as expected', () => {
    // seconds are undefined or null
    expect(sec2duration(undefined)).toBe(null);
    expect(sec2duration(null)).toBe(null);

    // 10 seconds 
    expect(sec2duration(10)).toBe('10.00');
    // 610 seconds
    expect(sec2duration(610)).toBe('10:10.00');
    // 36610 seconds
    expect(sec2duration(36610)).toBe('10:10:10.00');
  });

  it('timeValidation works as expected', () => {
    // timestamp is undefined or null, return false
    expect(timeValidation(undefined)).toBe(false);
    expect(timeValidation(null)).toBe(false);

    // timestamp is false
    expect(timeValidation('0')).toBe(false);
    expect(timeValidation('.0')).toBe(false);
    expect(timeValidation(':0.0')).toBe(false);
    expect(timeValidation(':00.0')).toBe(false);
    expect(timeValidation(':0:00.0')).toBe(false);
    expect(timeValidation(':00:00.0')).toBe(false);
    expect(timeValidation('0:00:00.0')).toBe(false);
    expect(timeValidation('00:00:00.0')).toBe(false);
    expect(timeValidation('00:00:00.00')).toBe(false);

    // timestamp is true
    expect(timeValidation('0.0')).toBe(true);
    expect(timeValidation('00.0')).toBe(true);
    expect(timeValidation('0:00.0')).toBe(true);
    expect(timeValidation('00:00.0')).toBe(true);
  });
});
