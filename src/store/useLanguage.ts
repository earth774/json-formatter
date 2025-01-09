import { create } from 'zustand';

// Define the store's state and actions
interface LanguageState {
    language: string;
    setLanguage: (language: string) => void;
}

// Create the store
const useLanguage = create<LanguageState>((set) => ({
    language: 'json',
    setLanguage: (language: string) => set({ language }),
}));

export default useLanguage;
