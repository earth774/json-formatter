import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import useTabspace from "@/store/useTabspace";
import { formatCSS } from "@/utils/format-css/formatCss";
import { formatSQL } from "@/utils/format-sql/formatSql";
import { Upload } from "lucide-react";

const ButtonUpload = () => {
    const { tabSpace } = useTabspace()
    const { setInput, setOutput } = useInputOutput()
    const { language } = useLanguage()

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        try {
            const text = await file.text();
            setInput(text);
            const parsed = language === 'json' ? JSON.parse(text) :
            language === 'css' ? formatCSS(text, tabSpace) :
            language === 'sql' ? await formatSQL(text, tabSpace) :
            text
            setOutput(parsed);
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
                accept={`.${language}`}
                className="hidden"
                onChange={handleImport}
            />
        </div>
    )
}

export default ButtonUpload;