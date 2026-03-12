"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-28 rounded-full border border-slate-200/60 bg-white/70 dark:border-slate-700/60 dark:bg-slate-900/60" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
      aria-label="Toggle theme"
    >
      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] dark:bg-sky-400 dark:shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
