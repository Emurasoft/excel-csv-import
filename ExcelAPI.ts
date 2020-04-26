/* global Office, Excel */

export interface APIVersionInfo {
    platform: Office.PlatformType;
    diagnostics: Office.ContextInformation;
    userAgent: string;
}

export async function init(): Promise<APIVersionInfo> {
    await Office.onReady();
    return {
        platform: Office.context.platform,
        diagnostics: {...Office.context.diagnostics},
        userAgent: window.navigator.userAgent,
    };
}

// Returns current worksheet if empty, otherwise returns new worksheet.
async function blankWorksheet(context: Excel.RequestContext): Promise<Excel.Worksheet> {
    const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
    const range = currentWorksheet.getUsedRangeOrNullObject(true).load('isNullObject');
    await context.sync();

    if (range.isNullObject) {
        return currentWorksheet;
    } else {
        return context.workbook.worksheets.add();
    }
}

// Executes batch on a blank worksheet.
export async function runOnBlankWorksheet(
    batch: (worksheet: Excel.Worksheet) => Promise<void>,
): Promise<void> {
    await Excel.run(async (context) => {
        const worksheetToUse = await blankWorksheet(context);
        await batch(worksheetToUse);
        worksheetToUse.activate();
        await context.sync();
    });
}

export async function runOnCurrentWorksheet(
    batch: (worksheet: Excel.Worksheet) => Promise<void>,
): Promise<void> {
    await Excel.run(async (context) => {
        await batch(context.workbook.worksheets.getActiveWorksheet());
        await context.sync();
    });
}

export function _maxLength(a: string[][]): number {
    let max = 0;
    for (const row of a) {
        if (row.length > max) {
            max = row.length;
        }
    }
    return max;
}

export function _resize(a: string[][], maxLength: number): void {
    for (let i = 0; i < a.length; ++i) {
        a[i] = a[i].concat(new Array(maxLength - a[i].length));
    }
}

export function setChunk(worksheet: Excel.Worksheet, row: number, chunk: string[][]): void {
    // New range values must have the same shape as range
    const maxLength = _maxLength(chunk);
    _resize(chunk, maxLength);
    // getRangeByIndexes() throws error if rowCount or columnCount is 0
    if (chunk.length > 0 && maxLength > 0) {
        const range = worksheet.getRangeByIndexes(row, 0, chunk.length, maxLength);
        range.values = chunk;
        range.untrack();
    }
}

export async function worksheetArea(): Promise<number> {
    let result: number = null;
    await Excel.run(async (context) => {
        const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
        const range = currentWorksheet.getUsedRange(true).load(['rowCount', 'columnCount']);
        await context.sync();
        result = range.rowCount * range.columnCount;
    });
    return result;
}

export interface Shape {
    rows: number;
    columns: number;
}

interface WorksheetNamesAndShape {
    workbookName: string;
    worksheetName: string;
    shape: Shape;
}

export async function worksheetNamesAndShape(
    worksheet: Excel.Worksheet
): Promise<WorksheetNamesAndShape> {
    const workbook = worksheet.context.workbook.load('name');
    worksheet.load('name');
    const range = worksheet.getUsedRange(true).getBoundingRect('A1:A1')
        .load(['rowCount', 'columnCount']);
    await worksheet.context.sync();
    return {
        workbookName: workbook.name,
        worksheetName: worksheet.name,
        shape: {rows: range.rowCount, columns: range.columnCount},
    };
}