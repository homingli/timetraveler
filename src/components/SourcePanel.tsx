'use client';

import { useTimeContext } from '@/hooks/useTimeContext';
import { fromHTMLInput } from '@/lib/timeUtils';
import { useEffect, useState } from 'react';

export const SourcePanel = () => {
  const { baseTime, setBaseTime, baseZone, setBaseZone, setIsLive, isLive, now } = useTimeContext();
  const [mounted, setMounted] = useState(false);
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    if (typeof Intl !== 'undefined' && (Intl as any).supportedValuesOf) {
      setTimezones((Intl as any).supportedValuesOf('timeZone'));
    }
}, []);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLive(false);
    const newTime = e.target.value; // "HH:mm" format
    const [hours, minutes] = newTime.split(':').map(Number);
    const newDt = baseTime.set({ hour: hours, minute: minutes });
    if (newDt.isValid) {
      setBaseTime(newDt);
    }
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newZone = e.target.value;
    setBaseZone(newZone);
    // Adjust baseTime to the new zone but keep the absolute time (or keep the wall time?)
    // Usually people want to keep the wall time when changing zone if they are planning.
    // e.g. "I want to see what 9 AM in Paris is in Tokyo". 
    // If I change zone to Paris, I want it to stay 9 AM.
    const currentWallTime = baseTime.toFormat("yyyy-MM-dd'T'HH:mm");
    const newDt = fromHTMLInput(currentWallTime, newZone);
    setBaseTime(newDt);
  };

  const handleSync = () => {
    setIsLive(true);
    setBaseTime(now.setZone(baseZone));
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <select 
          className="input-field font-sans text-sm appearance-none cursor-pointer bg-transparent border-0"
          value={baseZone}
          onChange={handleZoneChange}
        >
          {timezones.length > 0 ? (
            timezones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))
          ) : (
            <option value={baseZone}>{baseZone}</option>
          )}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="time" 
          className="input-field font-mono text-sm bg-transparent border-0 p-0"
          value={baseTime.toFormat("HH:mm")}
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
