"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div
      className="
        bg-white
        dark:bg-[#2B2724]

        border
        border-gray-200
        dark:border-[#3D3834]

        rounded-2xl
        shadow-lg

        p-6

        transition-colors
      "
    >

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          🎨 {t.appearanceTitle}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {t.chooseTheme}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {/* Light */}

        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`rounded-xl border-2 p-4 transition-all text-left ${
            theme === "light"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 dark:border-[#3D3834] bg-white dark:bg-[#34302D] hover:border-blue-400"
          }`}
        >

          <div className="text-2xl">
            ☀️
          </div>

          <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">
            {t.light}
          </h3>

          {theme === "light" && (
            <div className="mt-2 inline-flex rounded-full bg-blue-600 text-white px-2 py-0.5 text-[10px] font-medium">
              ✓ {t.selected}
            </div>
          )}

        </button>

        {/* Dark */}

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`rounded-xl border-2 p-4 transition-all text-left ${
            theme === "dark"
              ? "border-blue-600 bg-[#34302D]"
              : "border-gray-200 dark:border-[#3D3834] bg-white dark:bg-[#34302D] hover:border-blue-400"
          }`}
        >

          <div className="text-2xl">
            🌙
          </div>

          <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">
            {t.dark}
          </h3>

          {theme === "dark" && (
            <div className="mt-2 inline-flex rounded-full bg-blue-600 text-white px-2 py-0.5 text-[10px] font-medium">
              ✓ {t.selected}
            </div>
          )}

        </button>

      </div>

    </div>
  );
}