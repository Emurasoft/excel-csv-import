module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: 'ie 11',
			},
		],
	],
	plugins: [
		[
			'babel-plugin-polyfill-corejs3',
			{
				method: 'usage-global',
				version: require('./package.json').dependencies['core-js'],
			},
		],
	],
};
