import { create } from 'zustand';

// Define the store's state and actions
interface InputOutputState {
    input: string;
    output: string;
    setInput: (input: string) => void;
    setOutput: (output: string) => void;
}

// Create the store
const useInputOutput = create<InputOutputState>((set) => ({
    input: '',
    output: '',
    setInput: (input: string) => set({ input }),
    setOutput: (output: string) => set({ output }),
}));

export default useInputOutput;
