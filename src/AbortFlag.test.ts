import * as assert from 'assert';

describe('AbortFlag', () => {
    it('aborted()', () => {
        const flag = new AbortFlag();
        assert.strictEqual(flag.aborted(), false);
        flag.abort();
        assert.strictEqual(flag.aborted(), true);
        flag.reset();
        assert.strictEqual(flag.aborted(), false);
    });
});