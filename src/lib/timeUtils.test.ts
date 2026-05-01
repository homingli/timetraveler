import { describe, expect, it } from 'vitest';
import { DateTime } from 'luxon';

import {
  convertTimezone,
  formatDate,
  formatTime,
  fromHTMLInput,
  getHourOffset,
  isValidTimezone,
  toFullISO,
  toHTMLInput,
  toShareableString,
} from './timeUtils';

describe('timeUtils timezone conversion', () => {
  it('preserves the instant when converting between hemispheres with opposite DST seasons', () => {
    const londonSummer = DateTime.fromISO('2024-06-15T12:00:00', {
      zone: 'Europe/London',
    });
    const sydneyWinter = convertTimezone(londonSummer, 'Australia/Sydney');

    expect(sydneyWinter.zoneName).toBe('Australia/Sydney');
    expect(sydneyWinter.toISO()).toBe('2024-06-15T21:00:00.000+10:00');
    expect(sydneyWinter.toUTC().toISO()).toBe(londonSummer.toUTC().toISO());

    const londonWinter = DateTime.fromISO('2024-12-15T12:00:00', {
      zone: 'Europe/London',
    });
    const sydneySummer = convertTimezone(londonWinter, 'Australia/Sydney');

    expect(sydneySummer.toISO()).toBe('2024-12-15T23:00:00.000+11:00');
    expect(sydneySummer.toUTC().toISO()).toBe(londonWinter.toUTC().toISO());
  });

  it('keeps distinct fall-back instants even when local wall time is ambiguous', () => {
    const firstOccurrenceUtc = DateTime.fromISO('2024-11-03T05:30:00Z', {
      zone: 'utc',
    });
    const secondOccurrenceUtc = DateTime.fromISO('2024-11-03T06:30:00Z', {
      zone: 'utc',
    });

    const firstNewYorkTime = convertTimezone(firstOccurrenceUtc, 'America/New_York');
    const secondNewYorkTime = convertTimezone(secondOccurrenceUtc, 'America/New_York');

    expect(toHTMLInput(firstNewYorkTime)).toBe('2024-11-03T01:30');
    expect(toHTMLInput(secondNewYorkTime)).toBe('2024-11-03T01:30');
    expect(firstNewYorkTime.offset).toBe(-240);
    expect(secondNewYorkTime.offset).toBe(-300);
    expect(formatTime(firstNewYorkTime, 'ZZZZ')).toBe('EDT');
    expect(formatTime(secondNewYorkTime, 'ZZZZ')).toBe('EST');
  });

  it('normalizes nonexistent spring-forward local input to the next valid wall time', () => {
    const newYorkGapTime = fromHTMLInput('2024-03-10T02:30', 'America/New_York');

    expect(newYorkGapTime.isValid).toBe(true);
    expect(toHTMLInput(newYorkGapTime)).toBe('2024-03-10T03:30');
    expect(newYorkGapTime.offset).toBe(-240);
    expect(toFullISO(newYorkGapTime)).toBe('2024-03-10T03:30:00.000-04:00');
  });

  it('uses the earlier offset when parsing an ambiguous fall-back HTML input', () => {
    const ambiguousNewYorkTime = fromHTMLInput('2024-11-03T01:30', 'America/New_York');

    expect(ambiguousNewYorkTime.isValid).toBe(true);
    expect(toHTMLInput(ambiguousNewYorkTime)).toBe('2024-11-03T01:30');
    expect(ambiguousNewYorkTime.offset).toBe(-240);
    expect(formatTime(ambiguousNewYorkTime, 'ZZZZ')).toBe('EDT');
  });

  it('converts leap-day times across the international date line', () => {
    const leapDayKiritimatiTime = DateTime.fromISO('2024-02-29T23:30:00', {
      zone: 'Pacific/Kiritimati',
    });
    const adakTime = convertTimezone(leapDayKiritimatiTime, 'America/Adak');

    expect(leapDayKiritimatiTime.isValid).toBe(true);
    expect(adakTime.toISO()).toBe('2024-02-28T23:30:00.000-10:00');
    expect(formatDate(adakTime, 'yyyy-MM-dd')).toBe('2024-02-28');
    expect(adakTime.toUTC().toISO()).toBe(leapDayKiritimatiTime.toUTC().toISO());
  });

  it('marks invalid leap-day input invalid without throwing', () => {
    const invalidLeapDay = fromHTMLInput('2023-02-29T12:00', 'UTC');

    expect(invalidLeapDay.isValid).toBe(false);
    expect(invalidLeapDay.invalidReason).toBe('unit out of range');
    expect(toFullISO(invalidLeapDay)).toBe('');
    expect(toHTMLInput(invalidLeapDay)).toBe('Invalid DateTime');
  });

  it('validates IANA timezone names and rejects malformed zones', () => {
    expect(isValidTimezone('UTC')).toBe(true);
    expect(isValidTimezone('America/New_York')).toBe(true);
    expect(isValidTimezone('Asia/Kathmandu')).toBe(true);

    expect(isValidTimezone('America/Not_A_City')).toBe(false);
    expect(isValidTimezone('GMT+25')).toBe(false);
    expect(isValidTimezone('')).toBe(false);
  });

  it('formats HTML input strings without seconds or offset data', () => {
    const sourceTime = DateTime.fromISO('2024-07-01T09:08:07.123', {
      zone: 'Asia/Tokyo',
    });

    expect(toHTMLInput(sourceTime)).toBe('2024-07-01T09:08');
    expect(fromHTMLInput('2024-07-01T09:08', 'Asia/Tokyo').toISO()).toBe(
      '2024-07-01T09:08:00.000+09:00',
    );
  });

  it('calculates hour offsets at the supplied instant, including DST and fractional zones', () => {
    const londonSummer = DateTime.fromISO('2024-06-15T12:00:00', {
      zone: 'Europe/London',
    });
    const londonWinter = DateTime.fromISO('2024-12-15T12:00:00', {
      zone: 'Europe/London',
    });
    const utcTime = DateTime.fromISO('2024-01-15T00:00:00Z', {
      zone: 'utc',
    });

    expect(getHourOffset(londonSummer, 'Australia/Sydney')).toBe(9);
    expect(getHourOffset(londonWinter, 'Australia/Sydney')).toBe(11);
    expect(getHourOffset(utcTime, 'Asia/Kathmandu')).toBe(5.75);
  });

  it('formats display and share strings from the supplied DateTime', () => {
    const parisTime = DateTime.fromISO('2024-04-05T06:07:08', {
      zone: 'Europe/Paris',
    });

    expect(formatTime(parisTime)).toBe('06:07:08');
    expect(formatDate(parisTime)).toBe('Friday, April 5, 2024');
    expect(toShareableString(parisTime)).toBe('Friday, April 5, 2024 06:07 (GMT+2)');
  });
});
