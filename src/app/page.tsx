"use client";
import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';
import { useState } from "react";
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { json as jsonLang } from "@codemirror/lang-json";

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
  const [error, setError] = useState('');

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      console.log(err);
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-10 border-b border-gray-300 bg-background">
        <nav className="flex h-full items-center justify-center">
          <h1 className={`text-2xl font-bold ${roboto.className}`}>JSON Formatter</h1>
        </nav>
      </header>

      <main className="flex flex-1 flex-row">
        <button
          onClick={handleFormatJSON}
          className="fixed bottom-5 right-5 z-10 rounded-full border border-gray-300 bg-background w-20 h-20 hover:bg-gray-100"
          aria-label="Format JSON"
        >
          📑
        </button>

        <div className="flex w-full">
          {/* Input JSON Editor */}
          <div className="flex flex-col w-1/2">
            <label id="json-input-label" className="sr-only" htmlFor="json-input">
              Paste your JSON here
            </label>
            <CodeMirror
              id="json-input"
              placeholder="Paste your JSON here"
              value={input}
              height="calc(100vh - 80px)"
              width="100%"
              extensions={[
                jsonLang(),
                autocompletion({ override: [getJSONCompletions] }),
              ]}
              onChange={setInput}
              aria-labelledby="json-input-label"
            />
          </div>

          {/* Formatted JSON Viewer */}
          <div className="flex flex-col w-1/2">
            <label id="json-output-label" className="sr-only" htmlFor="json-output">
              Formatted JSON
            </label>
            <CodeMirror
              id="json-output"
              placeholder="Formatted JSON"
              value={output}
              height="calc(100vh - 80px)"
              width="100%"
              extensions={[jsonLang()]}
              readOnly
              aria-labelledby="json-output-label"
            />
          </div>
        </div>

        {error && (
          <div className="fixed right-5 top-5 z-10 flex items-center gap-2 rounded bg-red-50 px-6 py-3 shadow-md">
            <span className="text-red-800">{error}</span>
            <button
              onClick={() => setError('')}
              className="text-red-800 hover:text-red-900"
              aria-label="Close error message"
            >
              ✕
            </button>
          </div>
        )}
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