const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    entry: __dirname + '/src/index.tsx',
    output: {
        filename: 'index.js',
        path: __dirname + '/build',
    },
});