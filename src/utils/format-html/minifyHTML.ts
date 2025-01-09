export function minifyHTML(html: string): string {
    try {
        // Basic validation checks
        if (!html || typeof html !== 'string') {
            throw new Error('HTML input must be a non-empty string');
        }

        // // Check for balanced tags
        // const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
        // const closeTags = (html.match(/<\/[^>]*>/g) || []).length;
        // if (openTags !== closeTags) {
        //     throw new Error('HTML has unbalanced tags');
        // }

        // // Check for invalid characters
        // const invalidChars = /[<>](?![^<>]*>)/g;
        // if (invalidChars.test(html)) {
        //     throw new Error('HTML contains invalid characters outside tags');
        // }

        return html
            // Remove comments
            .replace(/<!--[\s\S]*?-->/g, '')
            // Remove whitespace between tags
            .replace(/>\s+</g, '><')
            // Remove whitespace at start/end of tags
            .replace(/\s+>/g, '>')
            .replace(/<\s+/g, '<')
            // Remove newlines, tabs and carriage returns
            .replace(/\n|\r|\t/g, '')
            // Remove multiple spaces
            .replace(/\s+/g, ' ')
            // Remove spaces around attributes
            .replace(/\s*=\s*/g, '=')
            // Remove spaces at start and end
            .trim();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Invalid HTML: An unknown error occurred');
    }
}