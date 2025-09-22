"use client"

import { useCallback } from 'react';

export const useHaptic = () => {
  const triggerHaptic = useCallback((type = 'light') => {
    // Check if the device supports haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      switch (type) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(20);
          break;
        case 'heavy':
          navigator.vibrate([30, 10, 30]);
          break;
        case 'success':
          navigator.vibrate([50, 25, 50]);
          break;
        case 'error':
          navigator.vibrate([100, 50, 100, 50, 100]);
          break;
        case 'notification':
          navigator.vibrate([25, 25, 25]);
          break;
        default:
          navigator.vibrate(10);
      }
    }

    // For iOS devices that support Taptic Engine (requires user gesture)
    if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
      try {
        // This only works in certain contexts on iOS
        if (window.navigator.userAgent.includes('iPhone') || window.navigator.userAgent.includes('iPad')) {
          // iOS haptic feedback would need native implementation
          // For now, we'll use the vibration API fallback
        }
      } catch (error) {
        // Silently fail if haptic feedback is not available
      }
    }
  }, []);

  const lightTap = useCallback(() => triggerHaptic('light'), [triggerHaptic]);
  const mediumTap = useCallback(() => triggerHaptic('medium'), [triggerHaptic]);
  const heavyTap = useCallback(() => triggerHaptic('heavy'), [triggerHaptic]);
  const successTap = useCallback(() => triggerHaptic('success'), [triggerHaptic]);
  const errorTap = useCallback(() => triggerHaptic('error'), [triggerHaptic]);
  const notificationTap = useCallback(() => triggerHaptic('notification'), [triggerHaptic]);

  return {
    triggerHaptic,
    lightTap,
    mediumTap,
    heavyTap,
    successTap,
    errorTap,
    notificationTap,
  };
};

export default useHaptic;