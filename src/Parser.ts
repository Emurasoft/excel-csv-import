// Make sure API is initialized before using
import * as ExcelAPI from './ExcelAPI';
import * as Papa from 'papaparse';
import {AbortFlag} from './AbortFlag';
import {ProgressCallback} from './Store';

export enum InputType {file, text}

export interface Source {
    inputType: InputType;
    file?: File;
    text: string;
}

type Config = {
    [P in 'delimiter' | 'encoding']: Papa.ParseConfig[P];
}

export enum NewlineSequence {
    AutoDetect = '',
    CRLF = '\r\n',
    CR = '\r',
    LF = '\n',
}

export interface ImportOptions extends Config {
    source: Source;
    newline: NewlineSequence;
}

export enum ExportType {file, text}

export interface ExportOptions {
    exportType: ExportType;
    delimiter: string;
    newline: NewlineSequence;
    encoding: string;
}

let reduceChunkSize = null;

export async function init() {
    const result = await ExcelAPI.init();
    if (result.platform === Office.PlatformType.OfficeOnline) {
        // Online API can throw error if request size is too large
        reduceChunkSize = true;
        // @ts-ignore
        Papa.LocalChunkSize = 10000;
    }
    return result;
}

export class ChunkProcessor {
    public constructor(
        worksheet: Excel.Worksheet,
        progressCallback: ProgressCallback,
        abortFlag: AbortFlag,
    ) {
        this._worksheet = worksheet;
        this._progressCallback = progressCallback;
        this._abortFlag = abortFlag;
        this._currRow = 0;
        this._currentProgress = 0.0;
    }

    public run(importOptions: ImportOptions & Papa.ParseConfig): Promise<Papa.ParseError[]> {
        this._progressCallback(0.0);
        this._progressPerChunk = ChunkProcessor.progressPerChunk(importOptions.source);

        return new Promise(resolve => {
            importOptions.chunk = this.chunk;
            importOptions.complete = results => resolve(results.errors);

            switch (importOptions.source.inputType) {
            case InputType.file:
                Papa.parse(importOptions.source.file, importOptions);
                break;
            case InputType.text:
                Papa.parse(importOptions.source.text, importOptions);
                break;
            }
        });
    }

    private static progressPerChunk(source: Source): number {
        switch (source.inputType) {
        case InputType.file:
            if (source.file.size === 0) {
                return 1.0;
            }
            // @ts-ignore
            return Papa.LocalChunkSize / source.file.size;
        case InputType.text:
            if (source.text.length === 0) {
                return 1.0;
            }
            // @ts-ignore
            return Papa.LocalChunkSize / source.text.length;
        }
    }

    private readonly _worksheet: Excel.Worksheet;
    private readonly _progressCallback: ProgressCallback;
    private readonly _abortFlag: AbortFlag;
    private readonly _excelAPI = ExcelAPI;
    private _currRow: number;
    private _progressPerChunk: number;
    private _currentProgress: number;

    private chunk = (chunk: Papa.ParseResult, parser: Papa.Parser) => {
        if (this._abortFlag.aborted()) {
            parser.abort();
        }

        this._worksheet.context.application.suspendApiCalculationUntilNextSync();
        this._excelAPI.setChunk(this._worksheet, this._currRow, chunk.data);
        this._currRow += chunk.data.length;
        parser.pause();
        // sync() must be called after each chunk, otherwise API may throw exception
        this._worksheet.context.sync().then(parser.resume);
        // Since the Excel API is so damn slow, updating GUI every chunk has a negligible impact
        // on performance.
        this._progressCallback(this._currentProgress += this._progressPerChunk);
    }
}

export async function importCSV(
    importOptions: ImportOptions,
    progressCallback: ProgressCallback,
    abortFlag: AbortFlag,
): Promise<Papa.ParseError[]> {
    let errors = null;
    await ExcelAPI.runOnBlankWorksheet(async (worksheet) => {
        const chunkProcessor = new ChunkProcessor(worksheet, progressCallback, abortFlag);
        errors = await chunkProcessor.run(importOptions);
    });
    return errors;
}

export function _nameToUse(workbookName: string, worksheetName: string): string {
    if (/^Sheet\d+$/.test(worksheetName)) { // 'Sheet1' isn't a good name to use
        // Workbook name usually includes the file extension
        const to = workbookName.lastIndexOf('.');
        return workbookName.substr(0, to === -1 ? workbookName.length : to);
    } else {
        return worksheetName;
    }
}

/*
RFC 4180 standard:
MS-DOS-style lines that end with (CR/LF) characters (optional for the last line).
An optional header record (there is no sure way to detect whether it is present, so care is required
when importing).
Each record "should" contain the same number of comma-separated fields.
Any field may be quoted (with double quotes).
Fields containing a line-break, double-quote or commas (delimiter) should be quoted. (If they are
not, the file will likely be impossible to process correctly).
A (double) quote character in a field must be represented by two (double) quote characters.
Thanks Wikipedia.
 */

export function _addQuotes(row: string[], delimiter: string): void {
    for (let i = 0; i < row.length; i++) {
        const charactersToWatchOutFor = ['\r', '\n', '\u0022' /*double quote*/];
        if (delimiter !== '') {
            charactersToWatchOutFor.push(delimiter);
        }

        if (charactersToWatchOutFor.some(c => row[i].includes(c))) {
            row[i] = '\u0022' + row[i].replace('\u0022', '\u0022\u0022') + '\u0022';
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function _rowString(row: any[], exportOptions: Readonly<ExportOptions>): string {
    const stringValues = row.map(a => a.toString());
    _addQuotes(stringValues, exportOptions.delimiter);
    return stringValues.join(exportOptions.delimiter) + exportOptions.newline;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function _chunkString(values: any[][], exportOptions: Readonly<ExportOptions>): string {
    let result = '';

    for (let i = 0; i < values.length; i++) {
        result += _rowString(values[i], exportOptions);
    }
    return result;
}

export async function _csvString(
    worksheet: Excel.Worksheet,
    shape: {rows: number, columns: number}, // TODO lock worksheet during operation
    exportOptions: Readonly<ExportOptions>,
    reduceChunkSize: boolean,
    progressCallback: ProgressCallback,
    abortFlag: AbortFlag,
): Promise<string> {
    let result = '';
    const chunkRows = reduceChunkSize ? Math.floor(10000 / shape.columns) : shape.rows;

    for (let i = 0; i < Math.floor(shape.rows / chunkRows); i++) {
        if (abortFlag.aborted()) {
            break;
        }

        progressCallback(i * chunkRows / shape.rows);

        const range = worksheet.getRangeByIndexes(
            i * chunkRows,
            0,
            (i + 1) * chunkRows,
            shape.columns,
        ).load('values');
        await worksheet.context.sync();
        result += _chunkString(range.values, exportOptions);
    }
    const range = worksheet.getRangeByIndexes(
        Math.floor(shape.rows / chunkRows) * chunkRows,
        0,
        shape.rows % chunkRows,
        shape.columns,
    ).load('values');
    await worksheet.context.sync();
    result += _chunkString(range.values, exportOptions);

    return result;
}
// TODO create CSVToString
export interface CsvStringAndName {
    name: string;
    string: string;
}

export async function csvStringAndName(
    exportOptions: ExportOptions,
    progressCallback: ProgressCallback,
    abortFlag: AbortFlag,
    excelAPI = ExcelAPI,
): Promise<CsvStringAndName> {
    const namesAndShape = await excelAPI.worksheetNamesAndShape();
    let resultString = '';
    await ExcelAPI.runOnCurrentWorksheet(async (worksheet) => {
        resultString = await _csvString(worksheet, namesAndShape.shape, exportOptions, reduceChunkSize, progressCallback, abortFlag);
    });

    return {
        name: _nameToUse(namesAndShape.workbookName, namesAndShape.worksheetName),
        string: resultString,
    };
}