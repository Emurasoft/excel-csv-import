import * as assert from 'assert';
import {AbortFlag, AbortFlagArray} from './AbortFlag';

describe('AbortFlag', () => {
    it('abort()', () => {
        const flag0 = new AbortFlag();
        assert.strictEqual(flag0.aborted(), false);
        flag0.abort();
        assert.strictEqual(flag0.aborted(), true);
        flag0.abort();
        assert.strictEqual(flag0.aborted(), true);

        const flag1 = new AbortFlag();
        flag1.abort();
        assert.strictEqual(flag1.aborted(), true);
    });
});

describe('AbortFlagArray', () => {
    it('abort()', () => {
        const array = new AbortFlagArray();
        array.abort();

        const flag0 = array.newFlag();
        assert.strictEqual(flag0.aborted(), false);
        array.abort();
        assert.strictEqual(flag0.aborted(), true);
        array.abort();
        assert.strictEqual(flag0.aborted(), true);

        const flag1 = array.newFlag();
        assert.strictEqual(flag1.aborted(), false);
        const flag2 = array.newFlag();
        array.abort();
        assert.strictEqual(flag1.aborted(), true);
        assert.strictEqual(flag2.aborted(), true);
        array.abort();
        array.newFlag();
    });
});