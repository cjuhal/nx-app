"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita errores de hidratación esperando a que el componente monte
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 transition-colors"
    >
      {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
}