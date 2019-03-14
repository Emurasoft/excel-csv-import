module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        project: 'tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.js'],
            env: {
                node: true,
                es6: true,
            },
            rules: {
                '@typescript-eslint/no-var-requires': 0,
            },
        },
    ],
}