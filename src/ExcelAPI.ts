export class ExcelAPI {
    public static async init() {
        await Office.onReady();
        return new ExcelAPI();
    }

    public run(batch: (worksheet: Excel.Worksheet) => Promise<void>) {
        Excel.run((context) => {
            return batch(context.workbook.worksheets.getActiveWorksheet())
                .then(() => context.sync());
        });
    }

    public static setChunk(worksheet: Excel.Worksheet, row: number, chunk: string[][]) {
        // New range values must have the same shape as range
        const maxLength = ExcelAPI.maxLength(chunk);
        ExcelAPI.resize(chunk, maxLength);
        worksheet.getRangeByIndexes(row, 0, chunk.length, maxLength).values = chunk;
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