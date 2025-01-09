// utils/formatJS.ts
import prettier from 'prettier/standalone';
import parserTypeScript from 'prettier/parser-typescript';
import estree from 'prettier/plugins/estree';
export const formatJS = async (js: string, tabSpace: number): Promise<string> => {
    return prettier.format(js, {
        parser: 'typescript',  // Use typescript parser directly
        plugins: [parserTypeScript,estree],
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: tabSpace,
    });
};