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

    public setChunk(worksheet: Excel.Worksheet, row: number, chunk: string[][]) {
        // New range values must have the same shape as range
        const maxLength = ExcelAPI.maxLength(chunk);
        ExcelAPI.resize(chunk, maxLength);
        worksheet.getRangeByIndexes(row, 0, chunk.length, maxLength).values = chunk;
    }

    private static resize(a: string[][], maxLength: number) {
        for (const row of a) {
            row.concat(new Array(maxLength - row.length));
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