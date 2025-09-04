// useMobileLayout.js
import { useState, useEffect } from 'react';

export const useMobileLayout = () => {
  const [screenInfo, setScreenInfo] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    safeAreaTop: 0,
    safeAreaBottom: 0,
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      // Detect safe areas for different devices
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const hasNotch = window.innerHeight < window.screen.height * 0.9;

      setScreenInfo({
        height: window.innerHeight,
        width: window.innerWidth,
        safeAreaTop: isIOS && hasNotch ? 44 : 20, // Status bar + notch
        safeAreaBottom: isIOS ? 34 : 16, // Home indicator
      });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', updateScreenInfo);

    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  return screenInfo;
};
