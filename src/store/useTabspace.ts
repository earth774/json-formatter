import { create } from 'zustand';

// Define the store's state and actions
interface TabspaceState {
    tabSpace: number;
    setTabSpace: (tabSpace: number) => void;
}

// Create the store
const useTabspace = create<TabspaceState>((set) => ({
    tabSpace: 2,
    setTabSpace: (tabSpace: number) => set({ tabSpace }),
}));

export default useTabspace;
