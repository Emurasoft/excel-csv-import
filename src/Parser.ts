import {ExcelAPI} from './ExcelAPI';
import * as Papa from 'papaparse';
import {ParseConfig} from 'papaparse';

export enum InputSource {file, textinput, url}

export interface Source {
    inputSource: InputSource;
    file?: File;
    text: string;
}

type Config = {
    [P in 'delimiter' | 'newline' | 'encoding']: ParseConfig[P];
}

export interface ImportOptions extends Config {
    source: Source;
}

export class Parser {
    public static async init() {
        return new Parser(await ExcelAPI.init());
    }

    public import(importOptions: ImportOptions) {
        this._api.run((worksheet) => Parser.parse(worksheet, importOptions));
    }

    private static parse(worksheet, importOptions: ImportOptions & ParseConfig) {
        return new Promise((resolve) => {
            let row = 0;
            importOptions.chunk = (chunk: Papa.ParseResult) => {
                ExcelAPI.setChunk(worksheet, row, chunk.data);
                row += chunk.data.length;
            }
            importOptions.complete = resolve;
            switch (importOptions.source.inputSource) {
            case InputSource.file:
                Papa.parse(importOptions.source.file, importOptions);
                break;
            case InputSource.textinput:
                Papa.parse(importOptions.source.text, importOptions);
                break;
            case InputSource.url:
                Papa.parse(importOptions.source.text, {...importOptions, download: true});
                break;
            }
        });
    }

    private _api: ExcelAPI;

    private constructor(api: ExcelAPI) {
        this._api = api;
    }
}
