'use client'

import { create } from 'zustand';

interface LanguageState {
    language: string;
    setLanguage: (language: string) => void;
}

const getInitialLanguage = () => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("data") || "");
      return data.language;
    }
    return "";
  };

const useLanguage = create<LanguageState>()(
        (set) => ({
            language: getInitialLanguage(),
            setLanguage: (language: string) => set({ language }),
        }),
);

export default useLanguage;