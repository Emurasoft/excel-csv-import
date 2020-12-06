module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                targets: 'ie 11',
                corejs: {version: '3.8'},
            },
        ],
    ],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
};
