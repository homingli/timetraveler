'use client';

import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';
import { TimeProvider } from '@/hooks/useTimeContext';

/**
 * Provides client-only app state for theme preferences and timezone state.
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TimeProvider>
        {children}
      </TimeProvider>
    </ThemeProvider>
  );
};
