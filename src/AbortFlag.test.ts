import * as assert from 'assert';
import {AbortFlag} from './AbortFlag';

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