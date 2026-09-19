"use client";

import {
  useLanguage,
  Language,
} from "@/components/providers/LanguageProvider";

export default function LanguageCard({ embedded = false }: { embedded?: boolean }) {
  const { language, setLanguage } = useLanguage();

  function changeLanguage(lang: Language) {
    setLanguage(lang);
  }

  const languages = [
    {
      code: "en" as Language,
      flag: "🇬🇧",
      name: "English",
    },
    {
      code: "fr" as Language,
      flag: "🇫🇷",
      name: "Français",
    },
  ];

  return (
    <div className={embedded ? "p-0" : "rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors dark:border-[#3D3834] dark:bg-[#2B2724]"}>
      <div className="mb-4">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          🌍 Language
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Choose your preferred language.
        </p>

      </div>

      <div className="flex w-full max-w-xl items-center rounded-xl border border-gray-200 bg-gray-100/70 p-1 dark:border-[#403B37] dark:bg-[#211F1D]">
        {languages.map((lang) => (
          <button key={lang.code} type="button" onClick={() => changeLanguage(lang.code)}
            className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 ${language === lang.code ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}>
            <span>{lang.flag}</span><span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}