import * as Parser from './Parser';
import {
    _addQuotes,
    _csvString,
    _nameToUse,
    _rowString, ChunkProcessor,
    ExportOptions,
    NewlineSequence
} from './Parser';
import {ParseConfig} from 'papaparse';
import * as assert from 'assert';
import {AbortFlag} from './AbortFlag';
import {ProgressCallback} from './Store';

describe('ChunkProcessor', () => {
    describe('run()', () => {
        it('normal operation', async () => {
            let setChunkDone = false;
            let syncDone = false;
            let progressCallbackDone = false;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const worksheetStub: any = {context: {
                    application: {suspendApiCalculationUntilNextSync: () => {}},
                    sync: async () => syncDone = true,
                }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const api: any = {};
            api.setChunk = (worksheet, row, data) => {
                assert.strictEqual(worksheet, worksheetStub);
                assert.strictEqual(row, 0);
                assert.deepStrictEqual(data, [['a', 'b']])
                setChunkDone = true;
            }

            const progressCallback: ProgressCallback = progress => {
                assert(progress === 0.0 || progress > 1.0);
                if (progress > 1.0) {
                    progressCallbackDone = true;
                }
            }

            const processor = new ChunkProcessor(
                worksheetStub as any,
                progressCallback,
                new AbortFlag(),
            );
            // @ts-ignore
            processor._excelAPI = api;

            const importOptions: Parser.ImportOptions & ParseConfig = {
                source: {inputType: Parser.InputType.text, text: 'a,b'},
                delimiter: ',',
                newline: NewlineSequence.LF,
                encoding: '',
            };

            await processor.run(importOptions);
            assert(setChunkDone);
            assert(syncDone);
            assert(progressCallbackDone);
        });

        it('abort', async () => {
            const progressCallback: ProgressCallback = progress => {
                assert.strictEqual(progress, 0.0);
            };

            const flag = new AbortFlag();
            flag.abort();
            const processor = new ChunkProcessor(null, progressCallback, flag);
            // @ts-ignore
            processor._excelAPI = null;

            const importOptions: Parser.ImportOptions & ParseConfig = {
                source: {inputType: Parser.InputType.text, text: 'a,b'},
                delimiter: ',',
                newline: NewlineSequence.LF,
                encoding: '',
            };

            await processor.run(importOptions);
        });
    });
});

describe('Parser', () => {
    it('_parseAndSetCells()', (done) => {
        const worksheetStub = {context: {
            application: {suspendApiCalculationUntilNextSync: () => {}},
            sync: async () => {},
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const api: any = {};
        api.setChunk = (worksheet, row, data) => {
            assert.strictEqual(worksheet, worksheetStub);
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

        const flag = new AbortFlag();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Parser._parseAndSetCells(worksheetStub as any, importOptions, ()=>{}, flag, api);
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
        const tests: {row: any[]; exportOptions: ExportOptions; expected: string}[] = [
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
                row: ['a', 0],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                    exportType: null,
                    encoding: null,
                },
                expected: 'a0\n',
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
        const tests: {values: any[][]; exportOptions: ExportOptions; expected: string}[] = [
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

        const flag = new AbortFlag();
        for (const test of tests) {
            assert.strictEqual(_csvString(test.values, test.exportOptions, flag), test.expected);
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