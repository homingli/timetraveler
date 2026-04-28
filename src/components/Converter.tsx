'use client';

import { useTimeContext } from '@/hooks/useTimeContext';
import { formatTime, convertTimezone, getHourOffset } from '@/lib/timeUtils';
import { X, Plus, Copy, Check, ArrowLeftRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Converter = () => {
  const { baseTime, setBaseTime, setBaseZone, targetZones, removeTargetZone, addTargetZone, isLive, setIsLive } = useTimeContext();
  const [newZone, setNewZone] = useState('');
  const [mounted, setMounted] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [availableZones, setAvailableZones] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    if (typeof Intl !== 'undefined' && (Intl as any).supportedValuesOf) {
      setAvailableZones((Intl as any).supportedValuesOf('timeZone'));
    }
  }, []);



  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (newZone) {
      addTargetZone(newZone);
      setNewZone('');
    }
  };

  const handleSwap = (zone: string) => {
    setIsLive(false);
    const converted = convertTimezone(baseTime, zone);
    setBaseZone(zone);
    setBaseTime(converted);
  };

  const PRESETS = [
    { name: 'Standard Tech', zones: ['UTC', 'America/Los_Angeles', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Hong_Kong'] },
    { name: 'US Coast-to-Coast', zones: ['America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York'] },
    { name: 'Europe Hubs', zones: ['Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Istanbul'] },
  ];

  const handleApplyPreset = (zones: string[]) => {
    zones.forEach(zone => addTargetZone(zone));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mounted && targetZones.map((zone) => {
          const converted = convertTimezone(baseTime, zone);
          const timeStr = formatTime(converted);
          const hourOffset = getHourOffset(baseTime, zone);
          const offsetStr = hourOffset >= 0 ? `+${hourOffset}h` : `${hourOffset}h`;
          const gmtOffset = Math.round(converted.offset / 60);
          const gmtStr = gmtOffset >= 0 ? `+${gmtOffset}` : `${gmtOffset}`;
          return (
            <div key={zone} className="card group relative overflow-hidden">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleSwap(zone)}
                  className="p-1 text-gray-400 hover:text-brand transition-colors"
                  title="Swap with Source"
                >
                  <ArrowLeftRight size={14} />
                </button>
                <button
                  onClick={() => handleCopy(timeStr, zone)}
                  className="p-1 text-gray-400 hover:text-brand transition-colors"
                  title="Copy time"
                >
                  {copiedId === zone ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => removeTargetZone(zone)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove location"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {zone.split('/').pop()?.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-medium text-brand">{offsetStr}</span>
                  {(() => {
                    const baseDay = baseTime.toISODate();
                    const targetDay = converted.toISODate();
                    if (baseDay && targetDay && baseDay !== targetDay) {
                      const isNextDay = targetDay > baseDay;
                      return (
                        <span className="text-xs text-brand font-bold">
                          {isNextDay ? '+1d' : '-1d'}
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
              <div className="text-5xl font-mono font-bold text-foreground text-center w-full">
                {timeStr}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-1 w-full px-2">
                <span>{zone}</span>
                <span>GMT{gmtStr}</span>
              </div>
            </div>
          );
        })}


        
        <form onSubmit={handleAddZone} className="card border-dashed flex items-center gap-2 p-4">
          <Plus size={20} className="text-brand flex-shrink-0" />
          <select
            className="bg-transparent flex-grow outline-none text-sm cursor-pointer appearance-none"
            value={newZone}
            onChange={(e) => setNewZone(e.target.value)}
          >
            <option value="">Select a timezone to add...</option>
            {availableZones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
          <button type="submit" className="text-brand font-bold text-sm disabled:opacity-30" disabled={!newZone}>
            Add
          </button>
        </form>

      </div>

      <div className="pt-8 border-t border-[var(--border)]">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Presets</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(preset => (
            <button
              key={preset.name}
              onClick={() => handleApplyPreset(preset.zones)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-brand hover:text-brand transition-colors text-gray-500 font-medium bg-[var(--card-bg)]"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
