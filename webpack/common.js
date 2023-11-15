const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css'],
	},
	target: 'web',
	output: {
		filename: '[name].[fullhash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({template: 'index.html'}),
		new CopyPlugin({
			patterns: [{from: 'static/*'}],
		}),
	],
};
