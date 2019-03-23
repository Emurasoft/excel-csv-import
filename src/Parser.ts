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

// @ts-ignore
Papa.LocalChunkSize = 10000;

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

    public run(importOptions: ImportOptions & Papa.ParseConfig): Promise<void> {
        this._progressCallback(0.0);
        this._progressPerChunk = ChunkProcessor.progressPerChunk(importOptions.source);

        return new Promise(resolve => {
            importOptions.chunk = this.chunk;
            importOptions.complete = () => resolve(); // TODO output any errors

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
        this._worksheet.context.sync().then(parser.resume);
        this._progressCallback(this._currentProgress += this._progressPerChunk);
    }
}

export async function importCSV(
    importOptions: ImportOptions,
    progressCallback: ProgressCallback,
    abortFlag: AbortFlag,
): Promise<void> {
    await ExcelAPI.runOnBlankWorksheet(async (worksheet) => {
        const chunkProcessor = new ChunkProcessor(worksheet, progressCallback, abortFlag);
        await chunkProcessor.run(importOptions);
    });
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

export function _rowString(row: any[], exportOptions: Readonly<ExportOptions>): string {
    const stringValues = row.map(a => a.toString());
    _addQuotes(stringValues, exportOptions.delimiter);
    return stringValues.join(exportOptions.delimiter) + exportOptions.newline;
}

export function _csvString(
    values: any[][],
    exportOptions: Readonly<ExportOptions>,
    abortFlag: AbortFlag,
): string {
    let result = '';

    for (const row of values) {
        if (abortFlag.aborted()) {
            return result;
        }
        result += _rowString(row, exportOptions);
    }
    return result;
}

export interface CsvStringAndName {
    name: string;
    string: string;
}

export async function csvStringAndName(
    exportOptions: ExportOptions,
    abortFlag: AbortFlag,
    excelAPI = ExcelAPI,
): Promise<CsvStringAndName> {
    const namesAndValues = await excelAPI.workbookNamesAndValues();
    return {
        name: _nameToUse(namesAndValues.workbookName, namesAndValues.worksheetName),
        string: _csvString(namesAndValues.values, exportOptions, abortFlag)
    };
}