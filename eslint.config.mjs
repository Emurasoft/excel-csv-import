import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const stylisticConfig = stylistic.configs.customize({
	indent: 'tab',
	quotes: 'single',
	semi: true,
	jsx: true,
	braceStyle: '1tbs',
});

export default [
	{
		ignores: ['components/licenses/**/*', '**/*.snap'],
	}, ...compat.extends(
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	),
	{
		...stylisticConfig,
		rules: {
			...stylisticConfig.rules,
			'@stylistic/object-curly-spacing': ['error', 'never'],
			'@stylistic/jsx-quotes': ['error', 'prefer-single'],
			'@stylistic/block-spacing': ['error', 'never'],
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/indent': ['error', 'tab'],
		},
	},
	{
		files: ['**/*.test.ts*'],

		plugins: {
			react,
			'@typescript-eslint': typescriptEslint,
			'@stylistic': stylistic,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
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
				version: 'detect',
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
