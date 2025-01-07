import useInputOutput from "@/store/useInputOutput";
import { Download } from "lucide-react";

const ButtonDownload = () => {
  const { output } = useInputOutput()

  const handleDownloadJSON = () => {
    if (!output) {
      return;
    }

    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        onClick={handleDownloadJSON}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
        <Download className="w-4 h-4 mr-2" />
        Download
      </button>
    </div>
  )
}

export default ButtonDownload;