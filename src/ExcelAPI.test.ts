import {ExcelAPI} from './ExcelAPI';
import * as assert from 'assert';
import {CheckError} from '../test/util';

describe("ExcelAPI", () => {
    it("resize", () => {
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
                expected: [[""]],
                expectError: false,
            },
            {
                a: [["a"]],
                maxLength: 1,
                expected: [["a"]],
                expectError: false,
            },
            {
                a: [["a"]],
                maxLength: 2,
                expected: [["a", ""]],
                expectError: false,
            },
            {
                a: [["a"]],
                maxLength: 0,
                expected: [["a"]],
                expectError: true,
            },
            {
                a: [["a"], []],
                maxLength: 2,
                expected: [["a", ""], ["", ""]],
                expectError: false,
            },
        ];

        for (const test of tests) {
            // @ts-ignore
            CheckError(ExcelAPI.resize.bind(null, test.a, test.maxLength), test.expectError);
            assert.deepStrictEqual(test.a, test.expected);
        }
    });

    it("maxLength", () => {
        const tests: {a: string[][], expected: number}[] = [
            {
                a: [[]],
                expected: 0,
            },
            {
                a: [[], ["a"]],
                expected: 1,
            },
        ];

        for (const test of tests) {
            // @ts-ignore
            assert.strictEqual(ExcelAPI.maxLength(test.a), test.expected);
        }
    });
});