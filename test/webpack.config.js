const HtmlWebpackPlugin = require('html-webpack-plugin');

require('./populateTests');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: __dirname + '/public',
        compress: true,
        port: 3000,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    target: 'web',
    entry: __dirname + '/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json',
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
        }),
    ],
};