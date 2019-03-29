import * as Parser from './Parser';
import {
    _addQuotes,
    _chunkRange,
    _chunkString, _csvString,
    _nameToUse,
    _rowString,
    ChunkProcessor,
    ExportOptions,
    InputType,
    NewlineSequence,
    Source,
} from './Parser';
import {ParseConfig} from 'papaparse';
import * as assert from 'assert';
import {AbortFlag} from './AbortFlag';
import {ProgressCallback} from './Store';
import {Shape} from './ExcelAPI';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('ChunkProcessor', () => {
    it('progressPerChunk()', () => {
        const tests: {source: Source; expected: number}[] = [
            {
                source: {inputType: InputType.text, text: ''},
                expected: 1.0,
            },
            {
                source: {inputType: InputType.text, text: 'a'},
                expected: 10.0},
            {
                source: {inputType: InputType.file, text: '', file: new File([], '')},
                expected: 1.0,
            },
            {
                source: {inputType: InputType.file, text: '', file: new File(['a'], '')},
                expected: 10.0,
            },
        ];

        for (const test of tests) {
            // @ts-ignore
            assert.strictEqual(ChunkProcessor.progressPerChunk(test.source, 10), test.expected);
        }
    });

    describe('run()', () => {
        it('normal operation', async () => {
            let setChunkDone = false;
            let syncDone = false;
            let progressCallbackDone = false;

            const worksheetStub: any = {context: {
                application: {suspendApiCalculationUntilNextSync: () => {}},
                sync: async () => syncDone = true,
            }};

            const api: any = {};
            api.setChunk = (worksheet, row, data) => {
                assert.strictEqual(worksheet, worksheetStub);
                assert.strictEqual(row, 0);
                assert.deepStrictEqual(data, [['a', 'b']])
                setChunkDone = true;
            }

            const progressCallback: ProgressCallback = (progress): void => {
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

            const errors = await processor.run(importOptions);
            assert.deepStrictEqual(errors, []);
            assert(setChunkDone);
            assert(syncDone);
            assert(progressCallbackDone);
        });

        it('abort', async () => {
            const progressCallback: ProgressCallback = (progress): void => {
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

            const errors = await processor.run(importOptions);
            assert.deepStrictEqual(errors, []);
        });
    });
});

describe('Parser', () => {
    it('_chunkRange()', () => {
        interface Test {
            chunk: number;
            shape: Shape;
            chunkRows: number;
            expected: {
                startRow: number;
                startColumn: number;
                rowCount: number;
                columnCount: number;
            };
        }

        const tests: Test[] = [
            {
                chunk: 0,
                shape: {rows: 0, columns: 0},
                chunkRows: 0,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 0,
                    columnCount: 0,
                },
            },
            {
                chunk: 1,
                shape: {rows: 0, columns: 0},
                chunkRows: 0,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 0,
                    columnCount: 0,
                },
            },
            {
                chunk: 0,
                shape: {rows: 1, columns: 0},
                chunkRows: 0,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 0,
                    columnCount: 0,
                },
            },
            {
                chunk: 0,
                shape: {rows: 0, columns: 1},
                chunkRows: 0,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 0,
                    columnCount: 1,
                },
            },
            {
                chunk: 0,
                shape: {rows: 0, columns: 0},
                chunkRows: 1,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 0,
                    columnCount: 0,
                },
            },
            {
                chunk: 0,
                shape: {rows: 1, columns: 0},
                chunkRows: 1,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 1,
                    columnCount: 0,
                },
            },
            {
                chunk: 0,
                shape: {rows: 1, columns: 1},
                chunkRows: 1,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 1,
                    columnCount: 1,
                },
            },
            {
                chunk: 0,
                shape: {rows: 1, columns: 1},
                chunkRows: 2,
                expected: {
                    startRow: 0,
                    startColumn: 0,
                    rowCount: 1,
                    columnCount: 1,
                },
            },
            {
                chunk: 1,
                shape: {rows: 2, columns: 1},
                chunkRows: 1,
                expected: {
                    startRow: 1,
                    startColumn: 0,
                    rowCount: 1,
                    columnCount: 1,
                },
            },
            // chunk argument is never greater than or equal to shape.rows
        ];

        for (const test of tests) {
            const result = _chunkRange(test.chunk, test.shape, test.chunkRows);
            assert.deepStrictEqual(result, test.expected);
        }
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
                },
                expected: '\n',
            },
            {
                row: ['a'],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                },
                expected: 'a\n',
            },
            {
                row: ['\n'],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                },
                expected: '"\n"\n',
            },
            {
                row: [],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                },
                expected: '\n',
            },
            {
                row: ['a', 0],
                exportOptions: {
                    delimiter: '',
                    newline: NewlineSequence.LF,
                },
                expected: 'a0\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                },
                expected: 'a,b\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: ',,',
                    newline: NewlineSequence.LF,
                },
                expected: 'a,,b\n',
            },
            {
                row: ['a', 'b'],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.CRLF,
                },
                expected: 'a,b\r\n',
            },
        ];

        for (const test of tests) {
            const result = _rowString(test.row, test.exportOptions);
            assert.strictEqual(result, test.expected);
        }
    });

    it('_chunkString()', async () => {
        const tests: {values: any[][]; exportOptions: ExportOptions; expected: string}[] = [
            {
                values: [[]],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                },
                expected: '\n',
            },
            {
                values: [['a'], ['b']],
                exportOptions: {
                    delimiter: ',',
                    newline: NewlineSequence.LF,
                },
                expected: 'a\nb\n',
            },
        ];

        for (const test of tests) {
            assert.strictEqual(_chunkString(test.values, test.exportOptions), test.expected);
        }
    });

    describe('_csvString()', () => {
        it('normal operation', async () => {
            interface Test {
                shape: Shape;
                chunkRows: number;
                exportOptions: ExportOptions;
                chunks: any[][][];
                expected: string;
            }

            const exportOptions: ExportOptions = {
                delimiter: ',',
                newline: NewlineSequence.LF,
            }
            const tests: Test[] = [
                // shape and chunkRows is never 0
                {
                    shape: {
                        rows: 1,
                        columns: 1,
                    },
                    chunkRows: 1,
                    exportOptions,
                    chunks: [[['']]],
                    expected: '\n',
                },
                {
                    shape: {
                        rows: 1,
                        columns: 1,
                    },
                    chunkRows: 2,
                    exportOptions,
                    chunks: [[['']]],
                    expected: '\n',
                },
                {
                    shape: {
                        rows: 2,
                        columns: 1,
                    },
                    chunkRows: 1,
                    exportOptions,
                    chunks: [[['a']],[['b']]],
                    expected: 'a\nb\n',
                },
            ];

            for (const test of tests) {
                let chunk = 0;
                const worksheetStub: any = {
                    getRangeByIndexes: (
                        startRow: number,
                        startColumn: number,
                        rowCount: number,
                        columnCount: number,
                    ) => {
                        const expectedRange = _chunkRange(
                            chunk,
                            test.shape,
                            test.chunkRows,
                        );
                        assert.strictEqual(startRow, expectedRange.startRow);
                        assert.strictEqual(startColumn, expectedRange.startColumn);
                        assert.strictEqual(rowCount, expectedRange.rowCount);
                        assert.strictEqual(columnCount, expectedRange.columnCount);
                        return {load: () => ({values: test.chunks[chunk++]})};
                    },
                    context: {sync: async () => {}},
                };

                const result = await _csvString(
                    worksheetStub,
                    test.shape,
                    test.chunkRows,
                    test.exportOptions,
                    () => {},
                    new AbortFlag(),
                );
                assert.strictEqual(result, test.expected);
            }
        });

        it('progressCallback', async () => {
            const worksheetStub: any = {
                getRangeByIndexes: () => ({load: () => ({values: [[]]})}),
                context: {sync: async () => {}},
            };

            const shape: Shape = {rows: 2, columns: 1};

            const options: ExportOptions = {
                delimiter: ',',
                newline: NewlineSequence.LF,
            };
            let called = 0;
            const progressCallback = (progress): void => {
                switch (called) {
                case 0:
                    assert.strictEqual(progress, 0.0);
                    break;
                case 1:
                    assert.strictEqual(progress, 0.5);
                    break;
                default:
                    assert.fail('called too many times');
                }
                ++called;
            }

            await _csvString(
                worksheetStub,
                shape,
                1,
                options,
                progressCallback,
                new AbortFlag(),
            );
            assert.strictEqual(called, 2);
        });

        it('abort', async () => {
            const worksheetStub: any = {
                getRangeByIndexes: () => ({load: () => ({values: [['a']]})}),
                context: {sync: async () => {}},
            };

            const shape: Shape = {rows: 1, columns: 1};

            const options = {
                delimiter: ',',
                newline: NewlineSequence.LF,
            };

            const flag0 = new AbortFlag();
            const result0 = await _csvString(worksheetStub, shape, 1, options, () => {}, flag0);
            assert.strictEqual(result0, 'a\n');

            const flag1 = new AbortFlag();
            flag1.abort();
            const result1 = await _csvString(worksheetStub, shape, 1, options, () => {}, flag1);
            assert.strictEqual(result1, '');
        });
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