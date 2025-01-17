'use client'

import { create } from 'zustand';

interface LanguageState {
    language: string;
    setLanguage: (language: string) => void;
}

const getInitialLanguage = () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("data");
      const dataParsed = data ? JSON.parse(data) : { language: 'json' };
      return dataParsed.language;
    }
    return "json";
  };

const useLanguage = create<LanguageState>()(
        (set) => ({
            language: getInitialLanguage(),
            setLanguage: (language: string) => set({ language }),
        }),
);

export default useLanguage;