"use client";

import { useThemeStore } from "@/store/themeStore";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};
