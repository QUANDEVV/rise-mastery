
"use client";

import { useEffect, useState } from "react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(ua) && !window.MSStream;
    setIsIOS(isIosDevice);

    // PWA event (Android + Desktop)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner && !isIOS) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-3 flex items-center justify-between z-50">
      {isIOS ? (
        <span>
          📲 Install this app: Tap{" "}
          <span className="bg-gray-700 px-2 py-1 rounded">Share</span> →{" "}
          <b>Add to Home Screen</b>
        </span>
      ) : (
        <span>📲 Install our app for the best experience!</span>
      )}

      <div className="flex gap-2">
        {!isIOS && (
          <button
            onClick={installApp}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Install
          </button>
        )}
        <button onClick={() => setShowBanner(false)} className="text-gray-400">
          ✕
        </button>
      </div>
    </div>
  );
}
