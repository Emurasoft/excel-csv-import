import * as Parser from './Parser';
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

        const importOptions: Parser.ImportOptions & ParseConfig = {
            source: {inputType: Parser.InputType.text, text: 'a,b'},
            delimiter: ',',
            newline: '\n',
            encoding: '',
        };
        // noinspection JSIgnoredPromiseFromCall
        Parser._processImport('worksheet' as any, importOptions, api);
    });
});