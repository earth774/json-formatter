/**
 * Minifies JavaScript code into a single line.
 * @param {string} js - The JavaScript code to minify.
 * @returns {Promise<string>} - The minified JavaScript code.
 */
export async function minifyJS(js: string): Promise<string> {
    if (!js || typeof js !== 'string') {
        throw new Error('Input must be a non-empty JavaScript string.');
    }

    try {
        return js.replace(/\s+/g, ' ').trim();
    } catch (error) {
        throw new Error(`Failed to minify JavaScript: ${error}`);
    }
}