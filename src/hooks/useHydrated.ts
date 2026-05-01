'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true after React has hydrated client-only UI.
 */
export const useHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return isHydrated;
};
