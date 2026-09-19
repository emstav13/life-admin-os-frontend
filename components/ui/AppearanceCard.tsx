"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const optionClass = (selected: boolean) =>
    `group relative rounded-xl border p-4 text-left transition-all duration-200 ${selected
      ? "border-blue-500/80 bg-blue-500/[0.06] shadow-[0_0_0_1px_rgba(59,130,246,0.12)]"
      : "border-gray-200 bg-gray-50/60 hover:border-gray-300 hover:bg-gray-50 dark:border-[#403B37] dark:bg-[#302C29]/70 dark:hover:border-[#514B47] dark:hover:bg-[#34302D]"}`;

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

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setTheme("light")} className={optionClass(theme === "light")}>
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Sun className="h-5 w-5" />
            </div>
            {theme === "light" && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"><span className="text-[11px]">✓</span></span>}
          </div>
          <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{t.light}</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Light interface</p>
        </button>

        <button type="button" onClick={() => setTheme("dark")} className={optionClass(theme === "dark")}>
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Moon className="h-5 w-5" />
            </div>
            {theme === "dark" && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"><span className="text-[11px]">✓</span></span>}
          </div>
          <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{t.dark}</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Dark interface</p>
        </button>
      </div>
    </div>
  );
}