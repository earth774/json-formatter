import { useToast } from "@/hooks/use-toast";
import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import { Save } from "lucide-react";

export default function ButtonSave() {
  const { input } = useInputOutput();
  const { language } = useLanguage();
  const { toast } = useToast();
  return (
    <div>
      <button
        onClick={() => {
          localStorage.setItem("data", JSON.stringify({language,input}));
          toast({
            title: "Saved",
            description: "Your input has been saved",
          });
        }}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2"
      >
        <Save className="w-4 h-4 mr-2" />
        Save
      </button>
    </div>
  );
}
