import {ExcelAPI} from './ExcelAPI';
import * as Papa from 'papaparse';

export class Parser {
    public static async init() {
        return new Parser(await ExcelAPI.init());
    }

    public import(file: File, config: Papa.ParseConfig) {
        this._api.run((worksheet) => {
            return new Promise((resolve) => {
                let row = 0;
                config.chunk = (chunk: Papa.ParseResult) => {
                    row += chunk.data.length;
                    this._api.setChunk(worksheet, row, chunk.data);
                }
                config.complete = resolve as any;
                Papa.parse(file, config);
            });
        });
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
    Save any errors
Sync
Return errors
 */