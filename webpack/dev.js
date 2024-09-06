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
		server: {
			type: 'https',
			options: {
				key: fs.readFileSync(`${os.homedir()}/.office-addin-dev-certs/localhost.key`),
				cert: fs.readFileSync(`${os.homedir()}/.office-addin-dev-certs/localhost.crt`),
				ca: fs.readFileSync(`${os.homedir()}/.office-addin-dev-certs/ca.crt`),
			},
		},
	},
	output: {
		publicPath: '/excel-csv-import/',
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
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devtool: 'eval-source-map',
});
