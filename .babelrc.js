module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                targets: 'ie 11',
                corejs: '3.0.0',
            },
        ],
    ],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
};