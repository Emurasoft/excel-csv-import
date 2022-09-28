const {merge} = require('webpack-merge');
const common = require('./common');
const fs = require('fs');
const os = require('os');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		compress: true,
		port: 3000,
		historyApiFallback: true,
		https: {
			key: fs.readFileSync(`${os.homedir()}/.office-addin-dev-certs/localhost.key`),
			cert: fs.readFileSync(`${os.homedir()}/.office-addin-dev-certs/localhost.crt`),
			ca: fs.readFileSync(`${os.homedir()}/.office-addin-dev-certs/ca.crt`),
		},
	},
	entry: __dirname + '/../index.tsx',
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
	devtool: 'eval-source-map',
});
