import {ExcelAPI} from './ExcelAPI';
import * as assert from 'assert';

describe("ExcelAPI", () => {
    it("maxLength", () => {
        const tests: [{a: string[][], expected: number}] = [
            {
                a: [[]],
                expected: 0,
            },
        ];

        for (const test of tests) {
            // @ts-ignore
            assert.strictEqual(ExcelAPI.maxLength(test.a), test.expected);
        }
    });
});