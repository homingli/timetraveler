'use client';

import { useTimeContext } from '@/hooks/useTimeContext';
import { toHTMLInput, fromHTMLInput } from '@/lib/timeUtils';
import { Calendar, MapPin, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

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

  if (!mounted) return <div className="card h-48 animate-pulse" />;

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
    <div className="card space-y-6 border-brand">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-brand flex items-center gap-2">
          <Calendar size={20} />
          Source Time
        </h2>
        <button 
          onClick={handleSync}
          className={`btn-primary text-xs flex items-center gap-1 ${isLive ? 'opacity-50' : ''}`}
          disabled={isLive}
        >
          <RefreshCw size={14} className={isLive ? 'animate-spin' : ''} />
          Sync to Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
            <MapPin size={12} />
            Source Timezone
          </label>
          <select 
            className="input-field w-full font-sans appearance-none cursor-pointer"
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

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
            Time
          </label>
          <input 
            type="time" 
            className="input-field w-full font-mono text-lg"
            value={baseTime.toFormat("HH:mm")}
            onChange={handleTimeChange}
          />
        </div>
      </div>
      
      {isLive && (
        <div className="text-[10px] text-brand font-bold animate-pulse text-right">
          LIVE UPDATING
        </div>
      )}
    </div>
  );
};
