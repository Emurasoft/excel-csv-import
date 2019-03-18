/* global Office, Excel */

export async function init(): Promise<void> {
    await Office.onReady();
}

// Executes batch on a blank worksheet.
export async function runOnBlankWorksheet(batch: (worksheet: Excel.Worksheet) => Promise<void>) {
    await Excel.run(async (context) => {
        await batch(await blankWorksheet(context));
        await context.sync();
    });
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
    const range = worksheet.getRangeByIndexes(row, 0, chunk.length, maxLength);
    range.values = chunk;
    range.untrack();
}

export async function worksheetArea(): Promise<number> {
    let result: number = null;
    await Excel.run(async (context) => {
        const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
        const range = currentWorksheet.getUsedRange(true).load(['rowCount', 'columnCount']);
        result = range.rowCount * range.columnCount;
        await context.sync();
    });
    return result;
}

interface WorkbookNamesAndValues {
    workbookName: string;
    worksheetName: string;
    values: string[][];
}

export async function workbookNamesAndValues(): Promise<WorkbookNamesAndValues> {
    let result: WorkbookNamesAndValues = null;
    await Excel.run(async (context) => {
        const workbook = context.workbook.load('name');
        const worksheet = context.workbook.worksheets.getActiveWorksheet().load('name');
        const range = worksheet.getUsedRange(true).getBoundingRect('A1:A1').load('values');
        result = {workbookName: workbook.name, worksheetName: worksheet.name, values: range.values};
        await context.sync();
    });
    return result;
}