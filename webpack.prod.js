const merge = require('webpack-merge');
const common = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: __dirname + '/build',
    },
    entry: ['@babel/polyfill', __dirname + '/src/index.tsx'],
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
    plugins: [
        new CopyPlugin([
            {from: 'public/*', ignore: 'public/index.html', flatten: true},
        ]),
    ],
    devtool: 'source-map', // source-map gets the most accurate traces
});