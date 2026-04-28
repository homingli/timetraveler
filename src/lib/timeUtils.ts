import { DateTime } from 'luxon';

/**
 * Returns the current time in the specified IANA timezone.
 */
export const getCurrentTime = (zone: string = 'system'): DateTime => {
  return DateTime.now().setZone(zone);
};

/**
 * Formats a DateTime object for display.
 */
export const formatTime = (dt: DateTime, format: string = 'HH:mm:ss'): string => {
  return dt.toFormat(format);
};

/**
 * Formats a DateTime object for date display.
 */
export const formatDate = (dt: DateTime, format: string = 'cccc, LLLL d, yyyy'): string => {
  return dt.toFormat(format);
};

/**
 * Converts a time from one zone to another.
 */
export const convertTimezone = (dt: DateTime, targetZone: string): DateTime => {
  return dt.setZone(targetZone);
};

/**
 * Validates if a string is a valid IANA timezone.
 */
export const isValidTimezone = (zone: string): boolean => {
  return DateTime.now().setZone(zone).isValid;
};

/**
 * Gets the user's system timezone.
 */
export const getSystemTimezone = (): string => {
  return DateTime.now().zoneName || 'UTC';
};

/**
 * Parses an HTML datetime-local input value into a DateTime object.
 */
export const fromHTMLInput = (value: string, zone: string): DateTime => {
  return DateTime.fromISO(value, { zone });
};

/**
 * Formats a DateTime object for an HTML datetime-local input.
 */
export const toHTMLInput = (dt: DateTime): string => {
  return dt.toFormat("yyyy-MM-dd'T'HH:mm");
};

/**
 * Returns a full ISO string with offset.
 */
export const toFullISO = (dt: DateTime): string => {
  return dt.toISO() || '';
};

/**
 * Returns a human-readable string for sharing.
 */
export const toShareableString = (dt: DateTime): string => {
  return dt.toFormat('cccc, LLLL d, yyyy HH:mm (ZZZZ)');
};

/**
 * Calculates the hour offset between two timezones.
 */
export const getHourOffset = (baseTime: DateTime, targetZone: string): number => {
  const targetTime = baseTime.setZone(targetZone);
  const offsetDiff = (targetTime.offset - baseTime.offset) / 60;
  return offsetDiff;
};
