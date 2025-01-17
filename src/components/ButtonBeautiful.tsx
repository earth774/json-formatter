'use client'

import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import useTabspace from "@/store/useTabspace";
import { formatCSS } from "@/utils/format-css/formatCss";
import { formatSQL } from "@/utils/format-sql/formatSql";
import { Sparkles } from "lucide-react";

const ButtonBeautiful = () => {
  const { tabSpace } = useTabspace()
  const { input, setOutput } = useInputOutput()
  const { language } = useLanguage()

  const handleFormat = async () => {
    try {
      const formatted = language === 'json' ? JSON.stringify(JSON.parse(input), null, tabSpace) :
      language === 'css' ? formatCSS(input, tabSpace) :
      language === 'sql' ? await formatSQL(input, tabSpace) :
      input
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
        onClick={handleFormat}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 mr-2" />
        Beautiful
      </button>
    </div>
  )
}

export default ButtonBeautiful;