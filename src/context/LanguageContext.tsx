"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { STRINGS, Language } from "@/lib/strings";

interface LanguageContextType {
  language: Language | null;
  setLanguage: (lang: Language) => void;
  strings: typeof STRINGS.en | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language | null>("en");

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("hackxjr_lang", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        strings: language ? STRINGS[language] : null,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
