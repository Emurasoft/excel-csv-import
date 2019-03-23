const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    target: 'web',
    entry: __dirname + '/src/index.tsx',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json',
                },
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
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ],
};