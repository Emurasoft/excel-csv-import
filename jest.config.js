/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-fixed-jsdom',
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	setupFiles: ['<rootDir>/test/setup.ts'],
	snapshotSerializers: ['@griffel/jest-serializer'],
};
