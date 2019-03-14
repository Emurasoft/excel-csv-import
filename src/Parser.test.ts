import {ImportOptions, InputType, Parser} from './Parser';
import {ParseConfig} from 'papaparse';
import * as assert from 'assert';

describe('Parser', () => {
    it('import', (done) => {
        const api: any = {};
        api.setChunk = (worksheet, row, data) => {
            assert.strictEqual(worksheet, 'worksheet');
            assert.strictEqual(row, 0);
            assert.deepStrictEqual(data, [['a', 'b']])
            done();
        }

        const importOptions: ImportOptions & ParseConfig = {
            source: {inputType: InputType.text, text: 'a,b'},
            delimiter: ',',
            newline: '\n',
            encoding: '',
        };
        // @ts-ignore
        // noinspection JSIgnoredPromiseFromCall
        Parser.processImport('worksheet' as any, importOptions, api);
    });
});