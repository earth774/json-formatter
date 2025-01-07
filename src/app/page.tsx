"use client";
import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });
import { json as jsonLang } from "@codemirror/lang-json";
import TabSpaceDropDown from '@/components/TabSpaceDropDown';
import useInputOutput from '@/store/useInputOutput';
import ButtonUpload from '@/components/ButtonUpload';
import ButtonDownload from '@/components/ButtonDownload';
import ButtonBeautiful from '@/components/ButtonBeautiful';
import ButtonCompact from '@/components/ButtonCompact';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Home = () => {
  const { input, output, setInput } = useInputOutput()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-20 border-b border-gray-300 bg-background">
        <nav className="flex h-full items-center justify-between mx-10">
          <h1 className={`text-2xl font-bold ${roboto.className}`}>JSON Formatter</h1>
          <div className="flex-row items-center justify-center gap-2 hidden md:flex">
            <TabSpaceDropDown />
            <ButtonUpload />
            <ButtonDownload />
            <ButtonBeautiful />
            <ButtonCompact />
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-row">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
          {/* Input JSON Editor */}
          <div className="flex flex-col w-full md:w-1/2">
            <label id="json-input-label" className="sr-only" htmlFor="json-input">
              Paste your JSON here
            </label>
            <CodeMirror
              id="json-input"
              placeholder="Paste your JSON here"
              value={input}
              height="calc(100vh - 120px)"
              width="100%"
              extensions={[
                jsonLang(),
              ]}
              onChange={setInput}
              aria-labelledby="json-input-label"
            />
          </div>

          <div className="flex-row items-center justify-center flex-wrap gap-2 flex md:hidden">
            <TabSpaceDropDown />
            <ButtonUpload />
            <ButtonDownload />
            <ButtonBeautiful />
            <ButtonCompact />
          </div>

          {/* Formatted JSON Viewer */}
          <div className="flex flex-col w-full md:w-1/2">
            <label id="json-output-label" className="sr-only" htmlFor="json-output">
              Formatted JSON
            </label>
            <CodeMirror
              id="json-output"
              placeholder="Formatted JSON"
              value={output}
              height="calc(100vh - 120px)"
              width="100%"
              extensions={[
                jsonLang(),
              ]}
              readOnly
              aria-labelledby="json-output-label"
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