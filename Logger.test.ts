import {Logger} from './Logger';
import * as assert from 'assert';

describe('Logger', () => {
	it('write()', () => {
		const logger = new Logger();
		logger.write('action0');
		logger.write('action1', {a: 0});
		const expected = '{"name":"action0","args":{}}\n{"name":"action1","args":{"a":0}}\n';
		assert.strictEqual(logger.log(), expected);
	});

	it('addFileName()', () => {
		const a = {a:0};
		// @ts-ignore
		const result = Logger.addFileName(a);
		assert.deepStrictEqual(result, {a: 0});

		const file = new File([], 'filename');
		const importOptions = {options: {source: {file}}};
		const expected =  {options: {source: {file: {name: 'filename'}}}};
		// @ts-ignore
		assert.deepStrictEqual(Logger.addFileName(importOptions), expected);
	});
});