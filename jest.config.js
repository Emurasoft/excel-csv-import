/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	setupFiles: ['<rootDir>/test/setup.ts'],
};