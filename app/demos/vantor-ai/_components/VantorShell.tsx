"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useStoredValue } from "../../client-store";
import CommandPalette from "./CommandPalette";

type Theme = "dark" | "light";
const THEME_KEY = "vantor-theme";

const ShellContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  openPalette: () => void;
}>({ theme: "dark", toggleTheme: () => {}, openPalette: () => {} });

export function useShell() {
  return useContext(ShellContext);
}

/** The demo's root: holds the light/dark theme and the ⌘K command palette. */
export default function VantorShell({ className, children }: { className: string; children: ReactNode }) {
  const [stored, setStored] = useStoredValue(THEME_KEY, "dark");
  const theme: Theme = stored === "light" ? "light" : "dark";
  const [paletteOpen, setPaletteOpen] = useState(false);

  const toggleTheme = useCallback(() => setStored(theme === "dark" ? "light" : "dark"), [theme, setStored]);

  const openPalette = useCallback(() => setPaletteOpen(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ShellContext.Provider value={{ theme, toggleTheme, openPalette }}>
      <div data-theme={theme} className={`vantor relative min-h-screen overflow-x-clip pb-24 ${className}`}>
        {children}
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </ShellContext.Provider>
  );
}
