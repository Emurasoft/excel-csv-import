export class ExcelAPI {
    public static async init() {
        await Office.onReady();
        return new ExcelAPI();
    }

    private constructor() {

    }
}