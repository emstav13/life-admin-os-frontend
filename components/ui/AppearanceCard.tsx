"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const selected =
    "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-[#3D3834] dark:bg-[#2B2724]">
      <div className="mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <Palette className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.appearanceTitle}
          </h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.chooseTheme}</p>
      </div>

      <div className="flex w-full max-w-xl items-center rounded-xl border border-gray-200 bg-gray-100/70 p-1 dark:border-[#403B37] dark:bg-[#211F1D]">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 ${theme === "light" ? selected : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
        >
          <Sun className="h-4 w-4" />
          <span>{t.light}</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 ${theme === "dark" ? selected : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
        >
          <Moon className="h-4 w-4" />
          <span>{t.dark}</span>
        </button>
      </div>
    </div>
  );
}