const merge = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		compress: true,
		port: 3000,
		https: true,
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
	devtool: 'cheap-module-eval-source-map',
});