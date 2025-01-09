export const formatCSS = (css: string, tabSpace: number): string => {
    try {
        // Basic validation checks
        if (!css || typeof css !== 'string') {
            throw new Error('CSS input must be a non-empty string');
        }

        if (typeof tabSpace !== 'number' || tabSpace < 0) {
            throw new Error('Tab space must be a non-negative number');
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

        // Remove comments, extra spaces, and newlines
        css = css.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
            .trim()
            .replace(/\s+/g, ' ');

        // Split rules
        const rules = css.split('}')
            .filter(rule => rule.trim())
            .map(rule => rule.trim() + '}');

        // Format each rule
        const formattedRules = rules.map(rule => {
            // Split selector and properties
            const [selector, ...rest] = rule.split('{');
            
            // Validate selector
            if (!selector || !selector.trim()) {
                throw new Error('CSS contains empty selectors');
            }

            const properties = rest.join('{')
                .replace('}', '')
                .split(';')
                .filter(prop => prop.trim())
                .map(prop => prop.trim());

            // Validate properties
            properties.forEach(prop => {
                if (!prop.includes(':')) {
                    throw new Error('CSS contains invalid property format');
                }
            });

            // Format properties with configurable indentation
            const indent = ' '.repeat(tabSpace);
            const formattedProperties = properties
                .map(prop => `${indent}${prop};`)
                .join('\n');

            return `${selector.trim()} {\n${formattedProperties}\n}`;
        });

        return formattedRules.join('\n\n');
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Invalid CSS: An unknown error occurred');
        }
};