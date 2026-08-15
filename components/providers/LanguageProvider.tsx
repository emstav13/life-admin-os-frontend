"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export type Language = "en" | "fr";

const dictionaries = {
  en,
  fr,
} as const;

export type TranslationKeys = typeof en;

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: en,
});

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem(
      "language"
    ) as Language | null;

    if (saved === "en" || saved === "fr") {
      setLanguageState(saved);
    }
  }, []);

  function setLanguage(language: Language) {
    setLanguageState(language);

    localStorage.setItem(
      "language",
      language
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: dictionaries[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}