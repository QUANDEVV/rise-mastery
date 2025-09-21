
"use client";

import { useEffect, useState, useRef } from "react";
import { Download, Share } from "lucide-react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua) && !window.MSStream;
    setIsIOS(isIosDevice);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight;
      document.body.style.setProperty('--banner-height', `${bannerHeight}px`);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      document.body.style.removeProperty('--banner-height');
    }
  }, [showBanner, isIOS]);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner && !isIOS) return null;

  return (
    <div ref={bannerRef} className="fixed top-0 left-0 right-0 bg-secondary text-secondary-foreground p-3 flex items-center justify-between z-50 shadow-md">
      <div className="flex items-center gap-3">
        <Download className="h-5 w-5 text-primary" />
        {isIOS ? (
          <span className="text-sm">
            Install this app: Tap <Share className="inline h-4 w-4 mx-1" /> and then{" "}
            <b>Add to Home Screen</b>
          </span>
        ) : (
          <span className="text-sm">Install our app for the best experience!</span>
        )}
      </div>

      <div className="flex gap-2">
        {!isIOS && (
          <button
            onClick={installApp}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
          >
            Install
          </button>
        )}
      </div>
    </div>
  );
}
