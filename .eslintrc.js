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
        mocha: true,
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
    rules: {
        'max-len': ['error', {'code': 100}],
        '@typescript-eslint/indent': ['error', 4, {'SwitchCase': 0}],
        'jsx-quotes': ['error', 'prefer-single']
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
};