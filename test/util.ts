import * as assert from 'assert';

export function CheckError(f: Function, expectError: boolean) {
    if (expectError) {
        assert.throws(f);
    } else {
        assert.doesNotThrow(f);
    }
}