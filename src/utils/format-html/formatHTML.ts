export const formatHTML = (html: string,tabSpace:number): string => {
    try {
        // Basic validation checks
        if (!html || typeof html !== 'string') {
            throw new Error('HTML input must be a non-empty string');
        }

        if (typeof tabSpace !== 'number' || tabSpace < 0) {
            throw new Error('Tab space must be a non-negative number');
        }

        // Check for balanced tags
        // const openTags = (html.match(/<[^!][^/][^>]*>/g) || []).length;
        // const closeTags = (html.match(/<\/[^>]*>/g) || []).length;

        // Check for invalid characters
        // const invalidChars = /[<>](?![^<>]*>)/g;
        // if (invalidChars.test(html)) {
        //     throw new Error('HTML contains invalid characters outside tags');
        // }

        // Remove extra whitespace and normalize line endings
        html = html.replace(/>\s+</g, '><')
            .trim()
            .replace(/\s+/g, ' ');

        // Split into individual tags
        const tags = html.split(/(<[^>]*>)/g)
            .filter(tag => tag.trim());

        let indent = 0;
        let formattedHtml = '';
        const indentStr = ' '.repeat(tabSpace);

        for (const tag of tags) {
            // Skip empty tags
            if (!tag.trim()) continue;
        
            // Special handling for DOCTYPE and comments
            if (tag.startsWith('<!')) {
                formattedHtml += tag + '\n';
                continue;
            }
        
            // Decrease indent for closing tags
            if (tag.startsWith('</')) {
                indent--;
            }
        
            // Add indentation and tag
            formattedHtml += indentStr.repeat(Math.max(0, indent)) + tag + '\n';
        
            // Increase indent for opening tags, except self-closing
            if (tag.startsWith('<') && !tag.startsWith('</') && !tag.endsWith('/>') && !tag.startsWith('<!')) {
                indent++;
            }
        }

        return formattedHtml.trim();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Invalid HTML: An unknown error occurred');
    }
};