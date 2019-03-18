const merge = require('webpack-merge');
const common = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    entry: __dirname + '/src/index.tsx',
    output: {
        filename: 'index.js',
        path: __dirname + '/build',
    },
    plugins: [
        new CopyPlugin([
            {from: 'public/*.png', flatten: true},
        ]),
    ],
});