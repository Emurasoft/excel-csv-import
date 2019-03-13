module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    'overrides': [
        {
            'files': ['*.js'],
            'env': {
                'node': true,
                'es6': true,
            },
            'rules': {
                '@typescript-eslint/no-var-requires': 0,
            },
        },
    ],
}