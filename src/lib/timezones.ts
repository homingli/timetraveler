'use client';

const FALLBACK_TIMEZONES = ['UTC'];

type IntlWithSupportedValues = typeof Intl & {
  supportedValuesOf?: (key: 'timeZone') => string[];
};

/**
 * Returns browser-supported IANA timezones, with UTC available for quick access.
 */
export const getSupportedTimezones = (): string[] => {
  const intlApi = Intl as IntlWithSupportedValues;
  const supportedTimezones = intlApi.supportedValuesOf?.('timeZone') ?? FALLBACK_TIMEZONES;

  if (supportedTimezones.includes('UTC')) {
    return supportedTimezones;
  }

  return ['UTC', ...supportedTimezones];
};
