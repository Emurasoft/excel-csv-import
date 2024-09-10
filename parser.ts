/* global Office */
import * as ExcelAPI from './excel';
import { Shape } from './excel';
import * as Papa from 'papaparse';

export const enum InputType {
	file = 'File',
	text = 'Text input',
}

export interface Source {
	inputType: InputType;
	file?: File;
	text: string;
}

type Config = Pick<Papa.ParseLocalConfig, 'delimiter' | 'encoding' | 'chunk' | 'complete'>;

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

export class Parser {
	constructor() {
		this.abortFlag = new AbortFlag();
	}

	async init(): Promise<Office.PlatformType> {
		const platform = await ExcelAPI.init();
		if (platform === Office.PlatformType.OfficeOnline) {
			// Online API can throw error if request size is too large
			reduceChunkSize = true;
			(Papa.LocalChunkSize as unknown as number) = 10_000;
		}
		else {
			reduceChunkSize = false;
		}
		return platform;
	}

	async importCSV(
		importOptions: ImportOptions,
		progressCallback: ProgressCallback,
	): Promise<Papa.ParseError[]> {
		this.abort();

		let errors = null;
		await ExcelAPI.runOnBlankWorksheet(async (worksheet) => {
			const chunkProcessor = new ChunkProcessor(worksheet, progressCallback, this.abortFlag);
			errors = await chunkProcessor.run(importOptions);
		});
		return errors;
	}

	async csvStringAndName(
		exportOptions: ExportOptions,
		progressCallback: ProgressCallback,
	): Promise<CsvStringAndName> {
		this.abort();

		let namesAndShape = null;
		let resultString = '';
		await ExcelAPI.runOnCurrentWorksheet(async (worksheet) => {
			namesAndShape = await ExcelAPI.worksheetNamesAndShape(worksheet);
			worksheet.context.application.suspendApiCalculationUntilNextSync();
			resultString = await csvString(
				worksheet,
				namesAndShape.shape,
				chunkRows(namesAndShape.shape),
				exportOptions,
				progressCallback,
				this.abortFlag,
			);
		});

		return {
			name: nameToUse(namesAndShape.workbookName, namesAndShape.worksheetName),
			string: resultString,
		};
	}

	abort(): void {
		this.abortFlag.abort();
		this.abortFlag = new AbortFlag();
	}

	private abortFlag: AbortFlag;
}

export class AbortFlag {
	public constructor() {
		this._aborted = false;
	}

	public abort(): void {
		this._aborted = true;
	}

	public aborted(): boolean {
		return this._aborted;
	}

	private _aborted: boolean;
}

type ProgressCallback = (progress: number) => void;

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

	public run(importOptions: ImportOptions): Promise<Papa.ParseError[]> {
		this._progressCallback(0.0);
		this._progressPerChunk = ChunkProcessor.progressPerChunk(
			importOptions.source,
			Papa.LocalChunkSize as unknown as number,
		);

		return new Promise((resolve) => {
			importOptions.chunk = this.chunk;
			importOptions.complete = results => resolve(results.errors);

			switch (importOptions.source.inputType) {
				case InputType.file:
					Papa.parse(importOptions.source.file, importOptions as Papa.ParseLocalConfig);
					break;
				case InputType.text:
					Papa.parse(
					/* eslint-disable @typescript-eslint/no-explicit-any */
						importOptions.source.text as any,
						importOptions as Papa.ParseLocalConfig,
					);
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

	private chunk = (chunk: Papa.ParseResult<string[]>, parser: Papa.Parser) => {
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
	};
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

export function chunkRange(
	chunk: number,
	shape: Shape,
	chunkRows: number,
): { startRow: number; startColumn: number; rowCount: number; columnCount: number } {
	return {
		startRow: chunk * chunkRows,
		startColumn: 0,
		rowCount: Math.min(chunkRows, shape.rows),
		columnCount: shape.columns,
	};
}

export function addQuotes(row: string[], delimiter: string): void {
	if (delimiter == '') {
		return;
	}

	const charactersToWatchOutFor = ['\r', '\n', '\u0022' /* double quote */, delimiter];
	for (let i = 0; i < row.length; i++) {
		if (charactersToWatchOutFor.some(c => row[i].includes(c))) {
			row[i] = '\u0022' + row[i].replace(/\u0022/g, '\u0022\u0022') + '\u0022';
		}
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function rowString(row: any[], exportOptions: Readonly<ExportOptions>): string {
	const stringValues = row.map(a => a.toString());
	addQuotes(stringValues, exportOptions.delimiter);
	return stringValues.join(exportOptions.delimiter) + exportOptions.newline;
}

export function chunkString(values: any[][], exportOptions: Readonly<ExportOptions>): string {
	let result = '';

	for (let i = 0; i < values.length; i++) {
		result += rowString(values[i], exportOptions);
	}

	return result;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function csvString(
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

		const chunkRange_ = chunkRange(chunk, shape, chunkRows);
		const range = worksheet.getRangeByIndexes(
			chunkRange_.startRow,
			chunkRange_.startColumn,
			chunkRange_.rowCount,
			chunkRange_.columnCount,
		).load('values');
		await worksheet.context.sync();

		result += chunkString(range.values, exportOptions);
	}

	return result;
}

export function nameToUse(workbookName: string, worksheetName: string): string {
	if (/^Sheet\d+$/.test(worksheetName)) { // 'Sheet1' isn't a good name to use
		// Workbook name usually includes the file extension
		const to = workbookName.lastIndexOf('.');
		return workbookName.substr(0, to === -1 ? workbookName.length : to);
	}
	else {
		return worksheetName;
	}
}

function chunkRows(shape: Shape): number {
	if (reduceChunkSize) {
		return Math.floor(10_000 / shape.columns);
	}
	else {
		return shape.rows;
	}
}

export interface CsvStringAndName {
	name: string;
	string: string;
}
