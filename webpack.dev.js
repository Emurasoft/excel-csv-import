const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: __dirname + '/public',
        compress: true,
        port: 3000,
        https: true,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
});