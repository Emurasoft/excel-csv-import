const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css'],
	},
	target: 'web',
	output: {
		filename: '[name].[contenthash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({template: 'index.html'}),
		new CopyPlugin([{from: 'static/*'}]),
	],
};