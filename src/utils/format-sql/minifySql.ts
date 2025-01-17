export const minifySQL = (sql: string): string => {
    try {
        if (!sql || typeof sql !== 'string') {
            throw new Error('SQL input must be a non-empty string');
        }

        return sql
            .replace(/--.*$/gm, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/\s*([(),;])\s*/g, '$1') // Remove spaces around punctuation
            .trim();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Invalid SQL: An unknown error occurred');
    }
}; 