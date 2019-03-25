import {Logger} from './Logger';
import * as assert from 'assert';

describe('Logger', () => {
    it('log()', () => {
        const logger = new Logger();
        assert.strictEqual(logger.log(), '[]');

        logger.push('action0');
        logger.push('action1', {a: 0});
        const expected = '[{"name":"action0","args":{}},{"name":"action1","args":{"a":0}}]';
        assert.strictEqual(logger.log().replace(/\s/g, ''), expected);
    });

    it('deepCopy()', () => {
        const a = {a:0};
        // @ts-ignore
        const result = Logger.deepCopy(a);
        a.a = 1;
        assert.deepStrictEqual(result, {a: 0});

        const file = new File([], 'filename');
        const importOptions = {options: {source: {file}}};
        const expected =  {options: {source: {file: {name: 'filename'}}}};
        // @ts-ignore
        assert.deepStrictEqual(Logger.deepCopy(importOptions), expected);
    });
});