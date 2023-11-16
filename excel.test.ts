import * as ExcelAPI from './excel';
import * as assert from 'assert';
import {CheckError} from './test/util';
import {describe, expect, test} from '@jest/globals';

describe('ExcelAPI', () => {
	test('_maxLength', () => {
		const tests: {a: string[][]; expected: number}[] = [
			{
				a: [[]],
				expected: 0,
			},
			{
				a: [[], ['a']],
				expected: 1,
			},
		];

		for (const test of tests) {
			assert.strictEqual(ExcelAPI._maxLength(test.a), test.expected);
		}
	});

	test('_resize', () => {
		interface Test {
			a: string[][];
			maxLength: number;
			expected: string[][];
			expectError: boolean;
		}
		const tests: Test[] = [
			{
				a: [[]],
				maxLength: 0,
				expected: [[]],
				expectError: false,
			},
			{
				a: [[]],
				maxLength: 1,
				expected: [new Array(1)],
				expectError: false,
			},
			{
				a: [['a']],
				maxLength: 1,
				expected: [['a']],
				expectError: false,
			},
			{
				a: [['a']],
				maxLength: 2,
				expected: [(() => {const a = new Array(2); a[0] = 'a'; return a})()],
				expectError: false,
			},
			{
				a: [['a']],
				maxLength: 0,
				expected: [['a']],
				expectError: true,
			},
			{
				a: [['a'], []],
				maxLength: 2,
				expected: [(() => {const a = new Array(2); a[0] = 'a'; return a})(), new Array(2)],
				expectError: false,
			},
		];

		for (const test of tests) {
			CheckError(ExcelAPI._resize.bind(null, test.a, test.maxLength), test.expectError);
			assert.deepStrictEqual(test.a, test.expected);
		}
	});
});