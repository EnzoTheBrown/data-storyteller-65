import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: { en: string; fr: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectUserLanguage = (): Language => {
  // Check localStorage first
  const stored = localStorage.getItem("preferred-language");
  if (stored === "en" || stored === "fr") return stored;

  // Detect from browser
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectUserLanguage);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("preferred-language", lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (translations: { en: string; fr: string }) => translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
