"use client";
import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';
import { useState } from "react";
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { json as jsonLang } from "@codemirror/lang-json";
import { Download, Package, Sparkles, Upload } from 'lucide-react';

const getJSONCompletions = (context: CompletionContext) => {
  const suggestions = [
    { label: '"name"', type: "keyword", info: "The name of the object" },
    { label: '"age"', type: "keyword", info: "Age in years" },
    { label: '"address"', type: "keyword", info: "The address of the person" },
  ];

  const word = context.matchBefore(/"[\w$]*"?/);
  if (word?.from === word?.to && !context.explicit) return null;

  return {
    from: word ? word.from : context.pos,
    options: suggestions,
  };
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Home = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      if (err instanceof Error) {
        setOutput(err.message);
      } else {
        setOutput('An unknown error occurred');
      }
    }
  };

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      setInput(text);
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      if (err instanceof Error) {
        setOutput(err.message);
      } else {
        setOutput('An unknown error occurred');
      }
    }
  };

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
    <div className="flex min-h-screen flex-col">
      <header className="h-20 border-b border-gray-300 bg-background">
        <nav className="flex h-full items-center justify-between mx-10">
          <h1 className={`text-2xl font-bold ${roboto.className}`}>JSON Formatter</h1>
          <div className="flex-row items-center justify-center gap-2 hidden md:flex">
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
            <button
              onClick={handleDownloadJSON}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleFormatJSON}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Beautiful
            </button>
            <button
              onClick={handleCompactJSON}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
              <Package className="w-4 h-4 mr-2" />
              Compact
            </button>
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
                autocompletion({ override: [getJSONCompletions] }),
              ]}
              onChange={setInput}
              aria-labelledby="json-input-label"
            />
          </div>

          <div className="flex-row items-center justify-center flex-wrap gap-2 flex md:hidden">
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
            <button
              onClick={handleDownloadJSON}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleFormatJSON}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Beautiful
            </button>
            <button
              onClick={handleCompactJSON}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex flex-row items-center justify-center gap-2">
              <Package className="w-4 h-4 mr-2" />
              Compact
            </button>
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