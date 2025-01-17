import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import { minifyCSS } from "@/utils/format-css/minifyCss";
import { minifySQL } from "@/utils/format-sql/minifySql";
import { Package } from "lucide-react";

const ButtonUpload = () => {
  const { input, setOutput } = useInputOutput()
  const { language } = useLanguage()

  const handleCompact = async () => {
    try {
      const compacted = language === 'json' ? JSON.stringify(JSON.parse(input)) :
      language === 'css' ? minifyCSS(input) :
      language === 'sql' ? minifySQL(input) :
      input
      setOutput(compacted);
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
        onClick={handleCompact}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
        <Package className="w-4 h-4 mr-2" />
        Compact
      </button>
    </div>
  )
}

export default ButtonUpload;