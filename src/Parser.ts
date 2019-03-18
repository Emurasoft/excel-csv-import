// Make sure API is initialized before using
import * as ExcelAPI from './ExcelAPI';
import * as Papa from 'papaparse';
import {ParseConfig} from 'papaparse'; // TODO use service worker

export enum InputType {file, text}

export interface Source {
    inputType: InputType;
    file?: File;
    text: string;
}

type Config = {
    [P in 'delimiter' | 'encoding']: ParseConfig[P];
}

export enum NewlineSequence {
    AutoDetect = '',
    CRLF = '\r\n',
    CR = '\r',
    LF = '\n'
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

export function _parseAndSetCells(
    worksheet: Excel.Worksheet,
    importOptions: ImportOptions & ParseConfig,
    excelAPI = ExcelAPI,
): Promise<void> {
    return new Promise((resolve) => {
        let row = 0;
        importOptions.chunk = (chunk: Papa.ParseResult) => {
            excelAPI.setChunk(worksheet, row, chunk.data);
            row += chunk.data.length;
        }
        importOptions.complete = () => resolve();
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

export async function importCSV(importOptions: ImportOptions): Promise<void> {
    await ExcelAPI.runOnBlankWorksheet((worksheet) => _parseAndSetCells(worksheet, importOptions));
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

export function _rowString(row: string[], exportOptions: Readonly<ExportOptions>): string {
    _addQuotes(row, exportOptions.delimiter);
    return row.join(exportOptions.delimiter) + exportOptions.newline;
}

export function _csvString(values: string[][], exportOptions: Readonly<ExportOptions>): string {
    let result = '';
    for (const row of values) {
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
    excelAPI = ExcelAPI
): Promise<CsvStringAndName> {
    const namesAndValues = await excelAPI.workbookNamesAndValues();
    return {
        name: _nameToUse(namesAndValues.workbookName, namesAndValues.worksheetName),
        string: _csvString(namesAndValues.values, exportOptions)
    };
}