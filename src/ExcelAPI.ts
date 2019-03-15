export async function init() {
    // TODO check API compatibility
    await Office.onReady();
}

export function run(batch: (worksheet: Excel.Worksheet) => Promise<any>) {
    // noinspection JSIgnoredPromiseFromCall
    Excel.run(async (context) => {
        const curretWorksheet = context.workbook.worksheets.getActiveWorksheet();
        const range = curretWorksheet.getUsedRangeOrNullObject(true).load('isNullObject');
        await context.sync();

        let worksheetToUse: Excel.Worksheet = null;
        if (range.isNullObject) {
            worksheetToUse = curretWorksheet;
            context.application.suspendApiCalculationUntilNextSync();
        } else {
            worksheetToUse = context.workbook.worksheets.add();
        }

        try {
            await batch(worksheetToUse);
        } finally {
            worksheetToUse.activate();
            await context.sync();
        }
    });
}

export function setChunk(worksheet: Excel.Worksheet, row: number, chunk: string[][]) {
    // New range values must have the same shape as range
    const maxLength = _maxLength(chunk);
    _resize(chunk, maxLength);
    worksheet.getRangeByIndexes(row, 0, chunk.length, maxLength).values = chunk;
}

export function _maxLength(a: string[][]) {
    let max = 0;
    for (const row of a) {
        if (row.length > max) {
            max = row.length;
        }
    }
    return max;
}

export function _resize(a: string[][], maxLength: number) {
    for (let i = 0; i < a.length; ++i) {
        // Not sure if filling is required, but I want to be on the safe side.
        a[i] = a[i].concat(new Array(maxLength - a[i].length).fill(''));
    }
}

export async function worksheetArea() {
    let result: number = null;
    await Excel.run(async (context) => {
        const curretWorksheet = context.workbook.worksheets.getActiveWorksheet();
        const range = curretWorksheet.getUsedRange(true).load(['rowCount', 'columnCount']);
        await context.sync();
        result = range.rowCount * range.columnCount;
    });
    return result;
}

export async function workbookNamesAndValues() {
    let result: {workbookName: string; worksheetName: string; values: string[][]} = null;
    await Excel.run(async (context) => {
        const workbook = context.workbook.load('name');
        const worksheet = context.workbook.worksheets.getActiveWorksheet().load('name');
        const range = worksheet.getUsedRange(true).load('values');
        await context.sync();
        result = {workbookName: workbook.name, worksheetName: worksheet.name, values: range.values};
    });
    return result;
}