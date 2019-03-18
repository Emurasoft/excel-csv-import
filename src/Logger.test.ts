import {Logger} from './Logger';
import * as assert from 'assert';

describe('Logger', () => {
    it('log()', () => {
        const logger = new Logger();
        assert.strictEqual(logger.log(), '[]');

        logger.push('action0');
        logger.push('action1', {a: 0});
        const expected = '[{"action":"action0","args":{}},{"action":"action1","args":{"a":0}}]';
        assert.strictEqual(logger.log().replace(/\s/g, ''), expected);
    });

    it('deepCopy()', () => {
        const a = {a:0};
        // @ts-ignore
        const result = Logger.deepCopy(a);
        a.a = 1;
        assert.deepStrictEqual(result, {a: 0});
    });
});