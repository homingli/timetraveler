'use client';

import { useHydrated } from '@/hooks/useHydrated';
import { useTimeContext } from '@/hooks/useTimeContext';
import { getSupportedTimezones } from '@/lib/timezones';
import { fromHTMLInput } from '@/lib/timeUtils';
import { useMemo, type ChangeEvent } from 'react';
import { TimezoneInput } from './TimezoneInput';

export const SourcePanel = () => {
  const { baseTime, setBaseTime, baseZone, setBaseZone, setIsLive, isLive, now, showSeconds } = useTimeContext();
  const isHydrated = useHydrated();
  const timezones = useMemo(() => getSupportedTimezones(), []);

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLive(false);
    const [hours, minutes, seconds = 0] = e.target.value.split(':').map(Number);
    const newDt = baseTime.set({ hour: hours, minute: minutes, second: seconds });
    if (newDt.isValid) {
      setBaseTime(newDt);
    }
  };

  const handleZoneChange = (newZone: string) => {
    setBaseZone(newZone);
    const currentWallTime = baseTime.toFormat("yyyy-MM-dd'T'HH:mm");
    const newDt = fromHTMLInput(currentWallTime, newZone);
    setBaseTime(newDt);
  };

  const handleSync = () => {
    setIsLive(true);
    setBaseTime(now.setZone(baseZone));
  };

  if (!isHydrated) {
    return <div className="h-8 w-48" />;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <TimezoneInput
          value={baseZone}
          onChange={handleZoneChange}
          timezones={timezones}
          placeholder="Search timezone..."
        />
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="time" 
          className="input-field font-mono text-sm bg-transparent border-0 p-0"
          step={showSeconds ? 1 : 60}
          value={baseTime.toFormat(showSeconds ? 'HH:mm:ss' : 'HH:mm')}
          onChange={handleTimeChange}
        />
      </div>
      
      <button 
        onClick={handleSync}
        className={`text-xs text-brand hover:underline ${isLive ? 'opacity-50' : ''}`}
        disabled={isLive}
      >
        {isLive ? 'LIVE' : 'Sync'}
      </button>
    </div>
  );
};
