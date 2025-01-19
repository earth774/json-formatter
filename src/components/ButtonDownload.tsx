import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import { Download } from "lucide-react";

const ButtonDownload = () => {
  const { output } = useInputOutput()
  const { language } = useLanguage()

  const handleDownload = () => {
    if (!output) {
      return;
    }
    const mimeTypes = {
      json: 'application/json',
      css: 'text/css',
      sql: 'text/sql',
    };

    if (language in mimeTypes) {
      const mimeType = mimeTypes[language as keyof typeof mimeTypes];
      const blob = new Blob([output], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `formatted.${language}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
        <Download className="w-4 h-4 mr-2" />
        Download
      </button>
    </div>
  )
}

export default ButtonDownload;