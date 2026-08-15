"use client";

import {
  useLanguage,
  Language,
} from "@/components/providers/LanguageProvider";

export default function LanguageCard() {
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
      <div className="mb-4">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          🌍 Language
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Choose your preferred language.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {languages.map((lang) => (

          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              language === lang.code
                ? "border-blue-600 bg-blue-50 dark:bg-[#34302D]"
                : "border-gray-200 dark:border-[#3D3834] bg-white dark:bg-[#34302D] hover:border-blue-400"
            }`}
          >

            <div className="text-2xl">
              {lang.flag}
            </div>

            <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">
              {lang.name}
            </h3>

            {language === lang.code && (
              <div className="mt-2 inline-flex rounded-full bg-blue-600 text-white px-2 py-0.5 text-[10px] font-medium">
                ✓ Selected
              </div>
            )}

          </button>

        ))}

      </div>

    </div>
  );
}