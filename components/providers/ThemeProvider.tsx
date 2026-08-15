"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("light");

  useEffect(() => {
    const saved =
      localStorage.getItem("theme") as Theme | null;

    if (saved) {
      setThemeState(saved);

      document.documentElement.classList.toggle(
        "dark",
        saved === "dark"
      );
    }
  }, []);

  function setTheme(theme: Theme) {
    setThemeState(theme);

    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}