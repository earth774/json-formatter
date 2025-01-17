"use client";
import dynamic from "next/dynamic";
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});
import { json as jsonLang } from "@codemirror/lang-json";
import { css as cssLang } from "@codemirror/lang-css";
import { html as htmlLang } from "@codemirror/lang-html";
import { javascript as jsLang } from "@codemirror/lang-javascript";
import TabSpaceDropDown from "@/components/TabSpaceDropDown";
import useInputOutput from "@/store/useInputOutput";
import ButtonUpload from "@/components/ButtonUpload";
import ButtonDownload from "@/components/ButtonDownload";
import ButtonBeautiful from "@/components/ButtonBeautiful";
import ButtonCompact from "@/components/ButtonCompact";
import LanguageDropDown from "@/components/LanguageDropDown";
import useLanguage from "@/store/useLanguage";
import ButtonSave from "@/components/ButtonSave";

const Home = () => {
  const { input, output, setInput } = useInputOutput();
  const { language } = useLanguage();
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-20 border-b border-gray-300 bg-background">
        <nav className="flex h-full items-center justify-between mx-10">
          <LanguageDropDown />
          <div className="flex-row items-center justify-center gap-2 hidden md:flex">
            <TabSpaceDropDown />
            <ButtonUpload />
            <ButtonDownload />
            <ButtonBeautiful />
            <ButtonCompact />
            <ButtonSave />
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-row">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
          {/* Input JSON Editor */}
          <div className="flex flex-col w-full md:w-1/2">
            <label
              id={`${language}-input-label`}
              className="sr-only"
              htmlFor={`${language}-input`}
            >
              Paste your {language.toUpperCase()} here
            </label>
            <CodeMirror
              id={`${language}-input`}
              placeholder={`Paste your ${language.toUpperCase()} here`}
              value={input}
              height="calc(100vh - 120px)"
              width="100%"
              extensions={[
                language === "json"
                  ? jsonLang()
                  : language === "css"
                    ? cssLang()
                    : language === "html"
                      ? htmlLang()
                      : language === "js"
                        ? jsLang()
                        : jsLang(), // Default to JavaScript if no language matches
              ]}
              onChange={setInput}
              aria-labelledby={`${language}-input-label`}
            />
          </div>

          <div className="flex-row items-center justify-center flex-wrap gap-2 flex md:hidden">
            <TabSpaceDropDown />
            <ButtonUpload />
            <ButtonDownload />
            <ButtonBeautiful />
            <ButtonCompact />
            <ButtonSave />
          </div>

          {/* Formatted Viewer */}
          <div className="flex flex-col w-full md:w-1/2">
            <label
              id={`${language}-output-label`}
              className="sr-only"
              htmlFor={`${language}-output`}
            >
              Formatted {language.toUpperCase()}
            </label>
            <CodeMirror
              id={`${language}-output`}
              placeholder={`Formatted ${language.toUpperCase()}`}
              value={output}
              height="calc(100vh - 120px)"
              width="100%"
              extensions={[
                language === "json"
                  ? jsonLang()
                  : language === "css"
                    ? cssLang()
                    : language === "html"
                      ? htmlLang()
                      : language === "js"
                        ? jsLang()
                        : jsLang(), // Default to JavaScript if no language matches
              ]}
              readOnly
              aria-labelledby={`${language}-output-label`}
            />
          </div>
        </div>
      </main>

      <footer className="h-10 border-t border-gray-300 bg-background">
        <div className="flex h-full items-center justify-center">
          <a
            href="https://amiearth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs italic text-gray-500 hover:text-gray-700"
          >
            by @amiearth
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
