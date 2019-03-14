// Make sure API is initialized before using
import * as ExcelAPI from './ExcelAPI';
import * as Papa from 'papaparse';
import {ParseConfig} from 'papaparse';
import {NewlineSequence} from './components/NewlineDropdown';

export enum InputType {file, text, url}

export interface Source {
    inputType: InputType;
    file?: File;
    text: string;
}

type Config = {
    [P in 'delimiter' | 'newline' | 'encoding']: ParseConfig[P];
}

export interface ImportOptions extends Config {
    source: Source;
}

export enum ExportType {file, text}

export interface ExportOptions {
    exportType: ExportType;
    delimiter: string;
    newlineSequence: NewlineSequence;
    encoding: string;
}

export function importCSV(importOptions: ImportOptions) {
    ExcelAPI.run((worksheet) => _processImport(worksheet, importOptions))
}

export function _processImport(
    worksheet: Excel.Worksheet,
    importOptions: ImportOptions & ParseConfig,
    excelAPI = ExcelAPI,
) {
    return new Promise((resolve) => {
        let row = 0;
        importOptions.chunk = (chunk: Papa.ParseResult) => {
            excelAPI.setChunk(worksheet, row, chunk.data);
            row += chunk.data.length;
        }
        importOptions.complete = resolve;
        switch (importOptions.source.inputType) {
        case InputType.file:
            Papa.parse(importOptions.source.file, importOptions);
            break;
        case InputType.text:
            Papa.parse(importOptions.source.text, importOptions);
            break;
        case InputType.url:
            Papa.parse(importOptions.source.text, {...importOptions, download: true});
            break;
        }
    });
}

export async function exportCSV(exportOptions: ExportOptions) {
    console.log(exportOptions);
    let result = '';
    for (const row of await ExcelAPI.worksheetValues()) {
        result += row.join(exportOptions.delimiter) + exportOptions.newlineSequence;
    }

    console.log(result);
}