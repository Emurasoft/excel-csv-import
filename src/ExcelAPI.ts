export class ExcelAPI { // TODO restructure
    public static async init() {
        await Office.onReady();
        return new ExcelAPI();
    }

    public run(batch: (worksheet: Excel.Worksheet) => Promise<any>) {
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

            await batch(worksheetToUse);

            worksheetToUse.activate();
            await context.sync();
        });
    }

    public static setChunk(worksheet: Excel.Worksheet, row: number, chunk: string[][]) {
        // New range values must have the same shape as range
        const maxLength = ExcelAPI.maxLength(chunk);
        ExcelAPI.resize(chunk, maxLength);
        worksheet.getRangeByIndexes(row, 0, chunk.length, maxLength).values = chunk;
    }

    public static values(): Promise<string[][]> {
        return new Promise((resolve) => {
            Excel.run(async (context) => {
                const curretWorksheet = context.workbook.worksheets.getActiveWorksheet();
                const range = curretWorksheet.getUsedRange(true).load('values');
                await context.sync();
                resolve(range.values);
            });
        });
    }

    private static resize(a: string[][], maxLength: number) {
        for (let i = 0; i < a.length; ++i) {
            // Not sure if filling is required, but I want to be on the safe side.
            a[i] = a[i].concat(new Array(maxLength - a[i].length).fill(""));
        }
    }

    private static maxLength(a: string[][]) {
        let max = 0;
        for (const row of a) {
            if (row.length > max) {
                max = row.length;
            }
        }
        return max;
    }
}