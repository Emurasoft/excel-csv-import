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
        '@typescript-eslint/indent': ['error', 'tab', {SwitchCase: 0}],
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
    },
    overrides: [
        {
            files: '*.test.ts*',
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/ban-ts-ignore': 'off',
            },
        },
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