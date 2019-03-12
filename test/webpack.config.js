module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    target: 'node',
    entry: __dirname + '/../src/components/import/SourceInput.tsx',
    output: {
        path: __dirname + '/../src/components/import',
        filename: 'SourceInput.js',
        library: 'SourceInput',
        libraryExport: 'SourceInput',
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
};