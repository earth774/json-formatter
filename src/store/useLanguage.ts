'use client'

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LanguageState {
    language: string;
    setLanguage: (language: string) => void;
}


const useLanguage = create<LanguageState>()(
  persist(
        (set) => ({
            language: "json",
            setLanguage: (language: string) => set({ language }),
        }),
        {
            name: "language",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
              console.log('State rehydrated:', state);
            },

        }
    )
);

export default useLanguage;