import * as Parser from './Parser';
import {
    _addQuotes,
    _csvString,
    _nameToUse,
    _rowString,
    ExportOptions,
    NewlineSequence
} from './Parser';
import {ParseConfig} from 'papaparse';
import * as assert from 'assert';

describe('Parser', () => {
    it('_parseAndSetCells()', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            newline: NewlineSequence.LF,
            encoding: '',
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Parser._parseAndSetCells('worksheet' as any, importOptions, api);
    });

    it('_addQuotes()', () => {
        const tests: {row: string[]; delimiter: string; expected: string[]}[] = [
            {
                row: [],
                delimiter: '',
                expected: [],
            },
            {
                row: [''],
                delimiter: ',',
                expected: [''],
            },
            {
                row: ['\n'],
                delimiter: ',',
                expected: ['"\n"'],
            },
            {
                row: ['a,'],
                delimiter: ',',
                expected: ['"a,"'],
            },
            {
                row: ['a,'],
                delimiter: '',
                expected: ['a,'],
            },
            {
                row: ['"'],
                delimiter: ',',
                expected: ['""""'],
            },
            {
                row: ['a\t'],
                delimiter: '\t',
                expected: ['"a\t"'],
            },
        ];

        for (const test of tests) {
            _addQuotes(test.row, test.delimiter);
            assert.deepStrictEqual(test.row, test.expected);
        }
    });

    it('_rowString()', () => {
        const tests: {row: string[]; exportOptions: ExportOptions; expected: string}[] = [
            {
                row: [],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: '\n',
            },
            {
                row: ['a'],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a\n',
            },
            {
                row: ['\n'],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: '"\n"\n',
            },
            {
                row: [],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: '\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'ab\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a,b\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: ',,',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a,,b\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.CRLF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a,b\r\n',
            },
        ];

        for (const test of tests) {
            assert.strictEqual(_rowString(test.row, test.exportOptions), test.expected);
        }
    });

    it('_csvString()', () => {
        const tests: {values: string[][]; exportOptions: ExportOptions; expected: string}[] = [
            {
                values: [[]],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: '\n',
            },
            {
                values: [['a', 'b']],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a,b\n',
            },
            {
                values: [['a', 'b'], ['c']],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a,b\nc\n',
            },
            {
                values: [['a', 'b'], ['c'], ['d','e']],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.CRLF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a,b\r\nc\r\nd,e\r\n',
            },
        ];

        for (const test of tests) {
            assert.strictEqual(_csvString(test.values, test.exportOptions), test.expected);
        }
    });

    it('_nameToUse()', () => {
        const tests: {workbookName: string; worksheetName: string; expected: string}[] = [
            {
                workbookName: '',
                worksheetName: '',
                expected: '',
            },
            {
                workbookName: 'workbook',
                worksheetName: 'Sheet11',
                expected: 'workbook',
            },
            {
                workbookName: 'workbook.',
                worksheetName: 'Sheet11',
                expected: 'workbook',
            },
            {
                workbookName: '.xlsx',
                worksheetName: 'Sheet11',
                expected: '',
            },
            {
                workbookName: 'workbook',
                worksheetName: 'Sheet',
                expected: 'Sheet',
            },
        ];

        for (const test of tests) {
            assert.strictEqual(_nameToUse(test.workbookName, test.worksheetName), test.expected);
        }
    });
});