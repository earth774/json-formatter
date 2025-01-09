export const formatCSS = (css: string, tabSpace: number): string => {
    try {
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
            const properties = rest.join('{')
                .replace('}', '')
                .split(';')
                .filter(prop => prop.trim())
                .map(prop => prop.trim());

            // Format properties with configurable indentation
            const indent = ' '.repeat(tabSpace);
            const formattedProperties = properties
                .map(prop => `${indent}${prop};`)
                .join('\n');

            return `${selector.trim()} {\n${formattedProperties}\n}`;
        });

        return formattedRules.join('\n\n');
    } catch (error) {
        throw new Error('Invalid CSS');
    }
};