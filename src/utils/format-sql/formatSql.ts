import prettier from 'prettier';

export const formatSQL = async (sql: string, tabSpace: number = 2): Promise<string> => {
    try {
        if (!sql || typeof sql !== 'string') {
            throw new Error('SQL input must be a non-empty string');
        }

        const prettierPluginSql = await import('prettier-plugin-sql');
        const formattedSql = await prettier.format(sql, {
            parser: 'sql',
            plugins: [prettierPluginSql.default],
            tabWidth: tabSpace,
        });
        return formattedSql;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Invalid SQL: An unknown error occurred');
    }
}; 