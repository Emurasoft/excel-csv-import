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
    entry: __dirname + '/src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
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
    devtool: 'cheap-module-eval-source-map',
});