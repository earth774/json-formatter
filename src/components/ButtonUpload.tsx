import useInputOutput from "@/store/useInputOutput";
import useTabspace from "@/store/useTabspace";
import { Upload } from "lucide-react";

const ButtonUpload = () => {
    const { tabSpace } = useTabspace()
    const { setInput, setOutput } = useInputOutput()

    const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        try {
            const text = await file.text();
            setInput(text);
            const parsed = JSON.parse(text);
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
            <label
                htmlFor="file-upload"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2 cursor-pointer"
            >
                <Upload className="w-4 h-4 mr-2" />
                Import
            </label>
            <input
                id="file-upload"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportJSON}
            />
        </div>
    )
}

export default ButtonUpload;