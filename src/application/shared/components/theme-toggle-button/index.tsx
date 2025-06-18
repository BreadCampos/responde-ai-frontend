"use client";

import { useState, useEffect } from "react"; // 1. Importe useState e useEffect
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-foreground bg-transparent hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-slate-800" />
      ) : (
        <Sun className="h-5 w-5 text-slate-200" />
      )}
    </button>
  );
}
