'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DateTime } from 'luxon';
import { getSystemTimezone } from '@/lib/timeUtils';

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
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [now, setNow] = useState<DateTime>(DateTime.now());
  const [baseTime, setBaseTime] = useState<DateTime>(DateTime.now());
  const [baseZone, setBaseZone] = useState<string>(getSystemTimezone());
  const [targetZones, setTargetZones] = useState<string[]>(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [isLive, setIsLive] = useState<boolean>(true);

  // Persistence
  useEffect(() => {
    const savedZones = localStorage.getItem('timetraveler_zones');
    const savedBaseZone = localStorage.getItem('timetraveler_base_zone');
    
    if (savedZones) {
      try {
        setTargetZones(JSON.parse(savedZones));
      } catch (e) {
        console.error('Failed to load saved timezones', e);
      }
    }
    
    if (savedBaseZone) {
      setBaseZone(savedBaseZone);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timetraveler_zones', JSON.stringify(targetZones));
  }, [targetZones]);

  useEffect(() => {
    localStorage.setItem('timetraveler_base_zone', baseZone);
  }, [baseZone]);

  // Update "now" every second
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

  const addTargetZone = (zone: string) => {
    if (!targetZones.includes(zone)) {
      setTargetZones([...targetZones, zone]);
    }
  };

  const removeTargetZone = (zone: string) => {
    setTargetZones(targetZones.filter((z) => z !== zone));
  };

  const reorderTargetZones = (startIndex: number, endIndex: number) => {
    setTargetZones((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <TimeContext.Provider
      value={{
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
      }}
    >
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
