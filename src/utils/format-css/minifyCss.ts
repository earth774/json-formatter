export function minifyCSS(css: string): string {
    try {
        // Basic validation checks
        if (!css || typeof css !== 'string') {
            throw new Error('CSS input must be a non-empty string');
        }

        // Check for balanced braces
        const openBraces = (css.match(/{/g) || []).length;
        const closeBraces = (css.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
            throw new Error('CSS has unbalanced braces');
        }

        // Check for invalid characters in selectors
        const invalidSelectorChars = /[<>]/g;
        if (invalidSelectorChars.test(css)) {
            throw new Error('CSS contains invalid characters in selectors');
        }

        return css
            // Remove comments
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
            // Remove newlines, tabs and carriage returns
            .replace(/\n|\r|\t/g, '')
            // Remove space after colons
            .replace(/: /g, ':')
            // Remove space after commas
            .replace(/, /g, ',')
            // Remove space before opening braces
            .replace(/\s*{\s*/g, '{')
            // Remove space after opening braces
            .replace(/\s*}\s*/g, '}')
            // Remove trailing semicolons
            .replace(/;\}/g, '}')
            // Remove spaces around operators
            .replace(/\s*([+>~])\s*/g, '$1')
            // Remove unnecessary spaces
            .replace(/\s+/g, ' ')
            // Remove spaces at start and end
            .trim();
        } catch (error) {
            if (error instanceof Error) {
            throw error;
        }
        throw new Error('Invalid CSS: An unknown error occurred');
    }
}