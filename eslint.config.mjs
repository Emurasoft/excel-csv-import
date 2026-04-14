import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

const stylisticConfig = stylistic.configs.customize({
	indent: 'tab',
	quotes: 'single',
	semi: true,
	jsx: true,
	braceStyle: '1tbs',
});

export default [
	{
		ignores: ['components/licenses/**/*', '**/*.snap', '.pnp.cjs'],
	},
	js.configs.recommended,
	react.configs.flat.recommended,
	...tseslint.configs.recommended,
	{
		settings: {
			react: {
				version: '19.2',
			},
		},
	},
	{
		...stylisticConfig,
		rules: {
			...stylisticConfig.rules,
			'@stylistic/object-curly-spacing': ['error', 'never'],
			'@stylistic/jsx-quotes': ['error', 'prefer-single'],
			'@stylistic/block-spacing': ['error', 'never'],
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/indent': ['error', 'tab', {SwitchCase: 0}],
			'@typescript-eslint/ban-ts-comment': 'off',
		},
	},
	{
		files: ['**/*.test.ts*'],

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tseslint.parser,
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				project: 'tsconfig.json',

				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		settings: {
			react: {
				version: '19.2',
			},
		},

		rules: {
			'max-len': ['error', {
				code: 100,
			}],
			'comma-dangle': ['error', 'always-multiline'],
			'jsx-quotes': ['error', 'prefer-single'],
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-use-before-define': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-ignore': 'off',
		},
	},
	{
		files: ['**/*.js'],

		languageOptions: {
			globals: {
				...globals.node,
			},
		},

		rules: {
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
];
