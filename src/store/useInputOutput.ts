import { create } from "zustand";

// Define the store's state and actions
interface InputOutputState {
  input: string;
  output: string;
  setInput: (input: string) => void;
  setOutput: (output: string) => void;
}

// Create the store
const getInitialInput = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("data");
    const dataParsed = data ? JSON.parse(data) : "";
    return dataParsed.input;
  }
  return "";
};

const useInputOutput = create<InputOutputState>((set) => {
    const initialInput = typeof window !== "undefined" ? getInitialInput() : "";
    return {
        input: initialInput,
        output: "",
        setInput: (input: string) => {
            set({ input });
        },
        setOutput: (output: string) => set({ output }),
    };
});

export default useInputOutput;
