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
        const config: ParseConfig = importOptions;
        if (importOptions.source.inputSource === InputSource.url) {
            config.download = true;
        }

        this._api.run((worksheet) => {
            return new Promise((resolve) => {
                let row = 0;
                config.chunk = (chunk: Papa.ParseResult) => {
                    ExcelAPI.setChunk(worksheet, row, chunk.data);
                    row += chunk.data.length;
                }
                config.complete = resolve;
                switch (importOptions.source.inputSource) {
                case InputSource.file:
                    Papa.parse(importOptions.source.file, config);
                    break;
                case InputSource.textinput:
                    Papa.parse(importOptions.source.text, config);
                    break;
                case InputSource.url:
                    Papa.parse(importOptions.source.text, {...config, download: true});
                    break;
                }
            });
        });
    }

    private _api: ExcelAPI;

    private constructor(api: ExcelAPI) {
        this._api = api;
    }
}
