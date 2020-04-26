const merge = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: __dirname + '/../build',
    },
    entry: ['@babel/polyfill', __dirname + '/../index.tsx'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    devtool: 'source-map', // source-map gets the most accurate traces
});