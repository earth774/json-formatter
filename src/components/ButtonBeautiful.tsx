import useInputOutput from "@/store/useInputOutput";
import useTabspace from "@/store/useTabspace";
import { Sparkles, Upload } from "lucide-react";

const ButtonBeautiful = () => {
  const { tabSpace } = useTabspace()
  const { input, setOutput } = useInputOutput()

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, tabSpace);
      setOutput(formatted);
    } catch (err) {
      if (err instanceof Error) {
        setOutput(err.message);
      } else {
        setOutput('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleFormatJSON}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 mr-2" />
        Beautiful
      </button>
    </div>
  )
}

export default ButtonBeautiful;