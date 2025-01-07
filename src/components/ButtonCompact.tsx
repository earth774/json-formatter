import useInputOutput from "@/store/useInputOutput";
import { Package } from "lucide-react";

const ButtonUpload = () => {
  const { input, setOutput } = useInputOutput()

  const handleCompactJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
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
        onClick={handleCompactJSON}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
        <Package className="w-4 h-4 mr-2" />
        Compact
      </button>
    </div>
  )
}

export default ButtonUpload;