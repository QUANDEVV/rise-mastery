"use client";

import { useEffect, useState } from "react";

// Small ThemeProvider that applies the 'dark' class to <html> when appropriate.
// It uses localStorage if present, otherwise falls back to the system preference.
export default function ThemeProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const useDark = saved ? saved === "dark" : prefersDark;

      if (useDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (err) {
      // ignore
    }
  }, []);

  // Render nothing — this component only manipulates the DOM class.
  if (!mounted) return null;
  return null;
}
