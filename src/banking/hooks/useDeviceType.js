import { useState, useEffect, useMemo } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useDeviceType = () => {
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return MOBILE_BREAKPOINT + 1; // Default to desktop for SSR
  });

  const deviceType = useMemo(() => {
    const isMobile = windowWidth <= MOBILE_BREAKPOINT;
    return { isMobile, isWeb: !isMobile };
  }, [windowWidth]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 16); // ~60fps
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceType;
};