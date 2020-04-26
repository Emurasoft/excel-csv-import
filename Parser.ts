/* global Office */
import * as ExcelAPI from './ExcelAPI';
import * as Papa from 'papaparse';
import {AbortFlag} from './AbortFlag';
import {ProgressCallback} from './Store';
import {APIVersionInfo, Shape} from './ExcelAPI';

export const enum InputType {file, text}

export interface Source {
	inputType: InputType;
	file?: File;
	text: string;
}

type Config = {
	[P in 'delimiter' | 'encoding']: Papa.ParseConfig[P];
}

export const enum NewlineSequence {
	AutoDetect = '',
	CRLF = '\r\n',
	CR = '\r',
	LF = '\n',
}

export interface ImportOptions extends Config {
	source: Source;
	newline: NewlineSequence;
}

export interface ExportOptions {
	delimiter: string;
	newline: NewlineSequence;
}

let reduceChunkSize = null;

export async function init(): Promise<APIVersionInfo> {
	const result = await ExcelAPI.init();
	if (result.platform === Office.PlatformType.OfficeOnline) {
		// Online API can throw error if request size is too large
		reduceChunkSize = true;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(Papa.LocalChunkSize as any) = 10_000;
	} else {
		reduceChunkSize = false;
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
		this._progressPerChunk = ChunkProcessor.progressPerChunk(
			importOptions.source,
			// @ts-ignore
			Papa.LocalChunkSize,
		);

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

	private static progressPerChunk(source: Source, chunkSize: number): number {
		switch (source.inputType) {
			case InputType.file:
				if (source.file.size === 0) {
					return 1.0;
				}
				return chunkSize / source.file.size;
			case InputType.text:
				if (source.text.length === 0) {
					return 1.0;
				}
				return chunkSize / source.text.length;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export function _chunkRange(
	chunk: number,
	shape: Shape,
	chunkRows: number,
): {startRow: number; startColumn: number; rowCount: number; columnCount: number} {
	return {
		startRow: chunk * chunkRows,
		startColumn: 0,
		rowCount: Math.min(chunkRows, shape.rows),
		columnCount: shape.columns,
	};
}

export function _addQuotes(row: string[], delimiter: string): void {
	console.assert(delimiter !== '');
	const charactersToWatchOutFor = ['\r', '\n', '\u0022' /*double quote*/, delimiter];
	for (let i = 0; i < row.length; i++) {
		if (charactersToWatchOutFor.some(c => row[i].includes(c))) {
			row[i] = '\u0022' + row[i].replace(/\u0022/g, '\u0022\u0022') + '\u0022';
		}
	}
}

export function _rowString(row: any[], exportOptions: Readonly<ExportOptions>): string {
	const stringValues = row.map(a => a.toString());
	_addQuotes(stringValues, exportOptions.delimiter);
	return stringValues.join(exportOptions.delimiter) + exportOptions.newline;
}

export function _chunkString(values: any[][], exportOptions: Readonly<ExportOptions>): string {
	let result = '';

	for (let i = 0; i < values.length; i++) {
		result += _rowString(values[i], exportOptions);
	}

	return result;
}

export async function _csvString(
	worksheet: Excel.Worksheet,
	shape: Shape,
	chunkRows: number,
	exportOptions: Readonly<ExportOptions>,
	progressCallback: ProgressCallback,
	abortFlag: AbortFlag,
): Promise<string> {
	let result = '';

	// chunkRows is never 0
	for (let chunk = 0; chunk < Math.ceil(shape.rows / chunkRows); chunk++) {
		if (abortFlag.aborted()) {
			break;
		}

		// shape.rows is never 0
		progressCallback(chunk * chunkRows / shape.rows);

		const chunkRange = _chunkRange(chunk, shape, chunkRows);
		const range = worksheet.getRangeByIndexes(
			chunkRange.startRow,
			chunkRange.startColumn,
			chunkRange.rowCount,
			chunkRange.columnCount,
		).load('values');
		await worksheet.context.sync();

		result += _chunkString(range.values, exportOptions);
	}

	return result;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function _nameToUse(workbookName: string, worksheetName: string): string {
	if (/^Sheet\d+$/.test(worksheetName)) { // 'Sheet1' isn't a good name to use
		// Workbook name usually includes the file extension
		const to = workbookName.lastIndexOf('.');
		return workbookName.substr(0, to === -1 ? workbookName.length : to);
	} else {
		return worksheetName;
	}
}

function chunkRows(shape: Shape): number {
	if (reduceChunkSize) {
		return Math.floor(10_000 / shape.columns)
	} else {
		return shape.rows;
	}
}

export interface CsvStringAndName {
	name: string;
	string: string;
}

export async function csvStringAndName(
	exportOptions: ExportOptions,
	progressCallback: ProgressCallback,
	abortFlag: AbortFlag,
): Promise<CsvStringAndName> {
	let namesAndShape = null;
	let resultString = '';
	await ExcelAPI.runOnCurrentWorksheet(async (worksheet) => {
		namesAndShape = await ExcelAPI.worksheetNamesAndShape(worksheet);
		worksheet.context.application.suspendApiCalculationUntilNextSync();
		resultString = await _csvString(
			worksheet,
			namesAndShape.shape,
			chunkRows(namesAndShape.shape),
			exportOptions,
			progressCallback,
			abortFlag,
		);
	});

	return {
		name: _nameToUse(namesAndShape.workbookName, namesAndShape.worksheetName),
		string: resultString,
	};
}