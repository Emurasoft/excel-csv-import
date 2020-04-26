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
        'max-len': ['error', {code: 100}],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/indent': ['error', 'tab'],
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
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