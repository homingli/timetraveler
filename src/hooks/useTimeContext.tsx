'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  ReactNode,
} from 'react';
import { DateTime } from 'luxon';
import { getSystemTimezone } from '@/lib/timeUtils';

const isValidTimezone = (zone: string): boolean => {
  try {
    return DateTime.now().setZone(zone).isValid;
  } catch {
    return false;
  }
};

const TARGET_ZONES_STORAGE_KEY = 'timetraveler_zones';
const BASE_ZONE_STORAGE_KEY = 'timetraveler_base_zone';
const SHOW_SECONDS_STORAGE_KEY = 'timetraveler_show_seconds';
const DEFAULT_TARGET_ZONES = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
const STORAGE_EVENT_PREFIX = 'timetraveler-storage';
const DEFAULT_SHOW_SECONDS = true;

let cachedTargetZonesRaw: string | null = null;
let cachedTargetZones = DEFAULT_TARGET_ZONES;

interface TimeContextType {
  now: DateTime;
  baseTime: DateTime;
  setBaseTime: (dt: DateTime) => void;
  baseZone: string;
  setBaseZone: (zone: string) => void;
  targetZones: string[];
  addTargetZone: (zone: string) => void;
  removeTargetZone: (zone: string) => void;
  reorderTargetZones: (startIndex: number, endIndex: number) => void;
  isLive: boolean;
  setIsLive: (live: boolean) => void;
  showSeconds: boolean;
  setShowSeconds: (showSeconds: boolean) => void;
  toggleShowSeconds: () => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
};

const notifyLocalStorageSubscribers = (key: string) => {
  window.dispatchEvent(new Event(`${STORAGE_EVENT_PREFIX}:${key}`));
};

const subscribeToLocalStorageKey = (key: string, onStoreChange: () => void) => {
  const customEvent = `${STORAGE_EVENT_PREFIX}:${key}`;
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(customEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(customEvent, onStoreChange);
  };
};

const subscribeToTargetZones = (onStoreChange: () => void) => {
  return subscribeToLocalStorageKey(TARGET_ZONES_STORAGE_KEY, onStoreChange);
};

const subscribeToBaseZone = (onStoreChange: () => void) => {
  return subscribeToLocalStorageKey(BASE_ZONE_STORAGE_KEY, onStoreChange);
};

const subscribeToShowSeconds = (onStoreChange: () => void) => {
  return subscribeToLocalStorageKey(SHOW_SECONDS_STORAGE_KEY, onStoreChange);
};

const getStoredTargetZones = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_TARGET_ZONES;
  }

  try {
    const savedZones = window.localStorage.getItem(TARGET_ZONES_STORAGE_KEY);
    if (!savedZones || savedZones.trim() === '') {
      cachedTargetZonesRaw = savedZones;
      cachedTargetZones = DEFAULT_TARGET_ZONES;
      return DEFAULT_TARGET_ZONES;
    }

    if (savedZones === cachedTargetZonesRaw) {
      return cachedTargetZones;
    }

    const parsed = JSON.parse(savedZones);
    if (isStringArray(parsed)) {
      const validZones = parsed.filter(isValidTimezone);
      cachedTargetZonesRaw = savedZones;
      cachedTargetZones = validZones.length > 0 ? validZones : DEFAULT_TARGET_ZONES;
      return cachedTargetZones;
    }

    cachedTargetZonesRaw = savedZones;
    cachedTargetZones = DEFAULT_TARGET_ZONES;
    return DEFAULT_TARGET_ZONES;
  } catch (error) {
    console.error('Failed to parse or read saved timezones', error);
    cachedTargetZones = DEFAULT_TARGET_ZONES;
    return DEFAULT_TARGET_ZONES;
  }
};

const getStoredBaseZone = () => {
  if (typeof window === 'undefined') {
    return getSystemTimezone();
  }

  try {
    const stored = window.localStorage.getItem(BASE_ZONE_STORAGE_KEY);
    if (stored && isValidTimezone(stored)) {
      return stored;
    }
  } catch (error) {
    console.error('Failed to read base zone', error);
  }
  return getSystemTimezone();
};

const getStoredShowSeconds = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_SHOW_SECONDS;
  }

  try {
    const storedValue = window.localStorage.getItem(SHOW_SECONDS_STORAGE_KEY);
    if (storedValue === null) {
      return DEFAULT_SHOW_SECONDS;
    }
    return storedValue === 'true';
  } catch (error) {
    console.error('Failed to read show seconds preference', error);
    return DEFAULT_SHOW_SECONDS;
  }
};

const setStoredTargetZones = (zones: string[]) => {
  try {
    const serializedZones = JSON.stringify(zones);
    cachedTargetZonesRaw = serializedZones;
    cachedTargetZones = zones;
    window.localStorage.setItem(TARGET_ZONES_STORAGE_KEY, serializedZones);
    notifyLocalStorageSubscribers(TARGET_ZONES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to save target zones', error);
  }
};

const setStoredBaseZone = (zone: string) => {
  try {
    window.localStorage.setItem(BASE_ZONE_STORAGE_KEY, zone);
    notifyLocalStorageSubscribers(BASE_ZONE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to save base zone', error);
  }
};

const setStoredShowSeconds = (showSeconds: boolean) => {
  try {
    window.localStorage.setItem(SHOW_SECONDS_STORAGE_KEY, String(showSeconds));
    notifyLocalStorageSubscribers(SHOW_SECONDS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to save show seconds preference', error);
  }
};

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [now, setNow] = useState<DateTime>(DateTime.now());
  const [baseTime, setBaseTime] = useState<DateTime>(DateTime.now());
  const [isLive, setIsLive] = useState<boolean>(true);

  const targetZones = useSyncExternalStore(
    subscribeToTargetZones,
    getStoredTargetZones,
    () => DEFAULT_TARGET_ZONES
  );

  const baseZone = useSyncExternalStore(
    subscribeToBaseZone,
    getStoredBaseZone,
    getSystemTimezone
  );

  const showSeconds = useSyncExternalStore(
    subscribeToShowSeconds,
    getStoredShowSeconds,
    () => DEFAULT_SHOW_SECONDS
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const current = DateTime.now();
      setNow(current);
      if (isLive) {
        setBaseTime(current.setZone(baseZone));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive, baseZone]);

  const setBaseZone = useCallback((zone: string) => {
    setStoredBaseZone(zone);
  }, []);

  const setShowSeconds = useCallback((nextShowSeconds: boolean) => {
    setStoredShowSeconds(nextShowSeconds);
  }, []);

  const toggleShowSeconds = useCallback(() => {
    setStoredShowSeconds(!getStoredShowSeconds());
  }, []);

  const addTargetZone = useCallback((zone: string) => {
    const currentZones = getStoredTargetZones();
    if (!currentZones.includes(zone)) {
      setStoredTargetZones([...currentZones, zone]);
    }
  }, []);

  const removeTargetZone = useCallback((zone: string) => {
    setStoredTargetZones(getStoredTargetZones().filter((currentZone) => currentZone !== zone));
  }, []);

  const reorderTargetZones = useCallback((startIndex: number, endIndex: number) => {
    const reorderedZones = Array.from(getStoredTargetZones());
    const [removed] = reorderedZones.splice(startIndex, 1);

    if (removed === undefined) {
      return;
    }

    reorderedZones.splice(endIndex, 0, removed);
    setStoredTargetZones(reorderedZones);
  }, []);

  const value = useMemo(
    () => ({
      now,
      baseTime,
      setBaseTime,
      baseZone,
      setBaseZone,
      targetZones,
      addTargetZone,
      removeTargetZone,
      reorderTargetZones,
      isLive,
      setIsLive,
      showSeconds,
      setShowSeconds,
      toggleShowSeconds,
    }),
    [
      now,
      baseTime,
      baseZone,
      setBaseZone,
      targetZones,
      addTargetZone,
      removeTargetZone,
      reorderTargetZones,
      isLive,
      showSeconds,
      setShowSeconds,
      toggleShowSeconds,
    ]
  );

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error('useTimeContext must be used within a TimeProvider');
  }
  return context;
};
