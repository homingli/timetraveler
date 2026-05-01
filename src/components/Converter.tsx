'use client';

import { useTimeContext } from '@/hooks/useTimeContext';
import { formatTime, convertTimezone, getHourOffset } from '@/lib/timeUtils';
import { X, Plus, Copy, Check, ArrowLeftRight, Shuffle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { TimezoneInput } from './TimezoneInput';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableCardProps {
  zone: string;
  baseTime: DateTime;
  copiedId: string | null;
  onSwap: (zone: string) => void;
  onCopy: (timeStr: string, zone: string) => void;
  onRemove: (zone: string) => void;
}

const SortableCard = ({ zone, baseTime, copiedId, onSwap, onCopy, onRemove }: SortableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: zone });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto' as any,
  };

  const converted = convertTimezone(baseTime, zone);
  const timeStr = formatTime(converted);
  const hourOffset = getHourOffset(baseTime, zone);
  const offsetStr = hourOffset >= 0 ? `+${hourOffset}h` : `${hourOffset}h`;
  const gmtOffset = Math.round(converted.offset / 60);
  const gmtStr = gmtOffset >= 0 ? `+${gmtOffset}` : `${gmtOffset}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card group relative overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onSwap(zone); }}
          className="p-1 text-gray-400 hover:text-brand transition-colors"
          title="Swap with Source"
        >
          <ArrowLeftRight size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onCopy(timeStr, zone); }}
          className="p-1 text-gray-400 hover:text-brand transition-colors"
          title="Copy time"
        >
          {copiedId === zone ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(zone); }}
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
        <div className="text-5xl font-mono font-bold text-foreground text-center w-full">
          {timeStr}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-1 w-full px-2">
          <span>{zone}</span>
          <span>GMT{gmtStr}</span>
        </div>
      </div>
    </div>
  );
};

export const Converter = () => {
  const { baseTime, setBaseTime, setBaseZone, targetZones, removeTargetZone, addTargetZone, reorderTargetZones, isLive, setIsLive } = useTimeContext();
  const [newZone, setNewZone] = useState('');
  const [mounted, setMounted] = useState(false);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof Intl !== 'undefined' && (Intl as any).supportedValuesOf) {
      const tzList = (Intl as any).supportedValuesOf('timeZone');
      if (!tzList.includes('UTC')) {
        tzList.unshift('UTC');
      }
      setTimezones(tzList);
    }
  }, []);


  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddZone = (zone: string) => {
    if (zone) {
      addTargetZone(zone);
      setNewZone('');
    }
  };

  const handleSwap = (zone: string) => {
    setIsLive(false);
    const converted = convertTimezone(baseTime, zone);
    setBaseZone(zone);
    setBaseTime(converted);
  };

  const MAJOR_CITIES = [
    { city: 'New York', zone: 'America/New_York' },
    { city: 'Los Angeles', zone: 'America/Los_Angeles' },
    { city: 'London', zone: 'Europe/London' },
    { city: 'Paris', zone: 'Europe/Paris' },
    { city: 'Berlin', zone: 'Europe/Berlin' },
    { city: 'Moscow', zone: 'Europe/Moscow' },
    { city: 'Dubai', zone: 'Asia/Dubai' },
    { city: 'Tokyo', zone: 'Asia/Tokyo' },
    { city: 'Shanghai', zone: 'Asia/Shanghai' },
    { city: 'Sydney', zone: 'Australia/Sydney' },
    { city: 'Singapore', zone: 'Asia/Singapore' },
    { city: 'Mumbai', zone: 'Asia/Kolkata' },
    { city: 'Toronto', zone: 'America/Toronto' },
    { city: 'Mexico City', zone: 'America/Mexico_City' },
    { city: 'Buenos Aires', zone: 'America/Buenos_Aires' },
    { city: 'Johannesburg', zone: 'Africa/Johannesburg' },
    { city: 'Hong Kong', zone: 'Asia/Hong_Kong' },
    { city: 'Taipei', zone: 'Asia/Taipei' },
  ];
  const CITIES_DISPLAY_COUNT_DEFAULT = 8;
  const [citiesDisplay, setCitiesDisplay] = useState<{ city: string; zone: string }[]>([]);

  const shuffleCities = () => {
    const shuffled = MAJOR_CITIES
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(CITIES_DISPLAY_COUNT_DEFAULT, MAJOR_CITIES.length))
      .map(c => ({ city: c.city, zone: c.zone }));
    setCitiesDisplay(shuffled);
  };

  useEffect(() => {
    shuffleCities();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = targetZones.indexOf(active.id as string);
      const newIndex = targetZones.indexOf(over.id as string);
      reorderTargetZones(oldIndex, newIndex);
    }
  };

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={targetZones}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mounted && targetZones.map((zone) => (
              <SortableCard
                key={zone}
                zone={zone}
                baseTime={baseTime}
                copiedId={copiedId}
                onSwap={handleSwap}
                onCopy={handleCopy}
                onRemove={removeTargetZone}
              />
            ))}
            <div className="card border-dashed flex items-center gap-2 p-4">
              <Plus size={20} className="text-brand flex-shrink-0" />
              <TimezoneInput
                value={newZone}
                onChange={setNewZone}
                onSelect={handleAddZone}
                timezones={timezones}
                placeholder="Search timezone to add..."
                className="flex-1"
              />
            </div>
          </div>
        </SortableContext>
      </DndContext>

      <div className="pt-8 border-t border-[var(--border)]">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Major Cities</h3>
        <div className="flex flex-wrap gap-2">
          {citiesDisplay.map(c => (
            <button
              key={c.zone}
              onClick={() => addTargetZone(c.zone)}
              disabled={targetZones.includes(c.zone)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-brand hover:text-brand transition-colors font-medium bg-[var(--card-bg)] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-gray-500"
            >
              {c.city}
            </button>
          ))}
          <button
            onClick={shuffleCities}
            aria-label="Shuffle cities"
            className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-brand hover:text-brand transition-colors text-gray-500 font-medium bg-[var(--card-bg)]"
          >
            <Shuffle size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};