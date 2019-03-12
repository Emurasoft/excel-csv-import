const webpack = require('webpack');

module.exports.compileModule = (path, exportClassName) => {
    return new Promise((resolve) => {
        webpack(
            {
                mode: 'development',
                resolve: {
                    extensions: ['.ts', '.tsx', '.js'],
                },
                target: 'node',
                entry: path + '/' + exportClassName + '.tsx',
                output: {
                    path,
                    filename: exportClassName + '.js',
                    library: exportClassName,
                    libraryExport: exportClassName,
                    libraryTarget: 'commonjs',
                },
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
            },
            (err) => {
                if (err) {
                    throw err;
                } else {
                    resolve();
                }
            }
        )
    });
}