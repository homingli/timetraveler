'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TimezoneInputProps {
  value: string;
  onChange: (value: string) => void;
  timezones: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export const TimezoneInput = ({ value, onChange, timezones, placeholder = 'Search timezone...', onSelect, className = '' }: TimezoneInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const filteredZones = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();
    const matchingZones = normalizedFilter
      ? timezones.filter((zone) => zone.toLowerCase().includes(normalizedFilter))
      : timezones;

    return matchingZones.slice(0, 100);
  }, [filter, timezones]);

  const filteredZoneCount = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();

    if (!normalizedFilter) {
      return timezones.length;
    }

    return timezones.reduce((count, zone) => {
      return zone.toLowerCase().includes(normalizedFilter) ? count + 1 : count;
    }, 0);
  }, [filter, timezones]);

  const handleSelect = useCallback((zone: string) => {
    onChange(zone);
    setFilter('');
    setIsOpen(false);
    inputRef.current?.blur();
    if (onSelect) onSelect(zone);
  }, [onChange, onSelect]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 256),
        zIndex: 99999,
      });
    }
  }, [isOpen, filter]);

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className="font-sans text-sm bg-transparent border-0 w-full outline-none"
        placeholder={placeholder}
        value={isOpen ? filter : value}
        onChange={(e) => {
          setFilter(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => {
          setFilter('');
          setIsOpen(true);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />
      {isOpen && filteredZones.length > 0 && createPortal(
        <div 
          className="max-h-60 overflow-y-auto bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg"
          style={dropdownStyle}
        >
          {filteredZones.map(zone => (
            <button
              key={zone}
              className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--hover)] transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(zone);
              }}
            >
              {zone}
            </button>
          ))}
          {filteredZoneCount > filteredZones.length && (
            <div className="px-3 py-2 text-xs text-gray-400">
              Showing {filteredZones.length} of {filteredZoneCount} results
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
