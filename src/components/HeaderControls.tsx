'use client';

import { useTheme } from 'next-themes';
import { Clock3, Monitor, Moon, Sun } from 'lucide-react';
import { useHydrated } from '@/hooks/useHydrated';
import { useTimeContext } from '@/hooks/useTimeContext';

const THEME_SEQUENCE = ['system', 'light', 'dark'] as const;
type ThemeChoice = (typeof THEME_SEQUENCE)[number];

const THEME_META: Record<ThemeChoice, { label: string; nextLabel: string; icon: typeof Monitor }> = {
  system: { label: 'System theme', nextLabel: 'light theme', icon: Monitor },
  light: { label: 'Light theme', nextLabel: 'dark theme', icon: Sun },
  dark: { label: 'Dark theme', nextLabel: 'system theme', icon: Moon },
};

const getNextTheme = (theme: ThemeChoice) => {
  const currentIndex = THEME_SEQUENCE.indexOf(theme);
  return THEME_SEQUENCE[(currentIndex + 1) % THEME_SEQUENCE.length];
};

const getThemeChoice = (theme?: string): ThemeChoice => {
  return THEME_SEQUENCE.includes(theme as ThemeChoice) ? (theme as ThemeChoice) : 'system';
};

/**
 * Renders global display controls for theme and clock precision.
 */
export const HeaderControls = () => {
  const isHydrated = useHydrated();
  const { theme, setTheme } = useTheme();
  const { showSeconds, toggleShowSeconds } = useTimeContext();
  const currentTheme = getThemeChoice(theme);
  const nextTheme = getNextTheme(currentTheme);
  const themeMeta = THEME_META[currentTheme];
  const ThemeIcon = themeMeta.icon;
  const secondsLabel = showSeconds ? 'Hide seconds' : 'Show seconds';

  if (!isHydrated) {
    return <div className="h-8 w-20 flex-shrink-0" />;
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--control-bg)] p-1">
      <button
        type="button"
        onClick={() => setTheme(nextTheme)}
        className="icon-button"
        title={`${themeMeta.label}. Switch to ${THEME_META[nextTheme].label.toLowerCase()}.`}
        aria-label={`${themeMeta.label}. Switch to ${THEME_META[nextTheme].label.toLowerCase()}.`}
      >
        <ThemeIcon size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={toggleShowSeconds}
        className={`icon-button ${showSeconds ? 'icon-button-active' : ''}`}
        title={secondsLabel}
        aria-label={secondsLabel}
        aria-pressed={showSeconds}
      >
        <Clock3 size={16} aria-hidden="true" />
      </button>
    </div>
  );
};
