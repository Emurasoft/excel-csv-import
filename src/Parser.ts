import {ExcelAPI} from './ExcelAPI';

export class Parser {
    public static async init() {
        return new Parser(await ExcelAPI.init());
    }

    private _api: ExcelAPI;

    private constructor(api: ExcelAPI) {
        this._api = api;
    }
}
/*
If current worksheet is empty:
    Pause Excel process until sync (Check what happens if sync is not called)
Otherwise:
    Create new worksheet but keep focus on current one
Parse file
Chunk callback:
    Send chunk to api with i
Sync
 */