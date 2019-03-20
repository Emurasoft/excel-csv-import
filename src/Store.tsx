import * as React from 'react';
import * as Parser from './Parser';
import * as ExcelAPI from './ExcelAPI';
import {Logger} from './Logger';
import {CsvStringAndName} from './Parser';

export interface State {
    initialized: boolean;
    supported: boolean;
    parserStatus: ParserStatus;
    largeFile: boolean;
}

export interface ParserStatus {
    errorOccurred: boolean;
    output: string;
}

export const Context = React.createContext(undefined);

export class Store extends React.Component<{}, State> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            initialized: false,
            supported: true,
            parserStatus: {
                errorOccurred: false,
                output: '',
            },
            largeFile: false,
        };

        this._log = new Logger();

        // noinspection JSIgnoredPromiseFromCall
        this.initAPI();
    }

    public render(): React.ReactNode {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const value: {[key: string]: any} = {};
        for (const method of Object.getOwnPropertyNames(this)) {
            if (typeof (this as any)[method] === 'function') {
                value[method] = (this as any)[method];
            }
        }
        /* eslint-enable @typescript-eslint/no-explicit-any */

        value.state = this.state;

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    public log = () => this._log.log()

    public initAPI = async (): Promise<void> => {
        try {
            const version = await ExcelAPI.initAndGetAPIVersion();
            this.setState({initialized: true, supported: version.supported});
            this._log.push('APIVersion', version)
        } catch (err) {
            this.setParserError(err.stack);
        }
        this._log.push('initAPI');
        await this.checkLargeFile();
    }

    public checkLargeFile = async (): Promise<void> => {
        const aLargeExcelDocumentProbablyHasThisManyCells = 100000;
        const largeFile = await this.worksheetArea() > aLargeExcelDocumentProbablyHasThisManyCells;
        this.setState({largeFile});
        this._log.push('checkLargeFile');
    }

    public setParserError = (output: string) => {
        // output may contain something about refreshing the browser, in which case it should not
        // display an error and instead tell the user to refresh.
        this.setState({parserStatus: {errorOccurred: true, output}});
        this._log.push('setParserError', {output});
    }

    public import = async (options: Parser.ImportOptions): Promise<void> => {
        try {
            await Parser.importCSV(options);
        } catch (e) {
            this.logError(new Error(e.stack));
        }
        this._log.push('import', {options});
    }

    public worksheetArea = async (): Promise<number> => {
        let result = 0;
        try {
            result = await ExcelAPI.worksheetArea();
        } catch (err) {
            this.setParserError(err.stack);
        }
        this._log.push('worksheetArea');
        return result;
    }

    // Returns null if error occurred.
    public csvStringAndName = async (
        options: Parser.ExportOptions
    ): Promise<CsvStringAndName|null> => {
        let result: CsvStringAndName = null;
        try {
            result = await Parser.csvStringAndName(options);
        } catch (err) {
            this.setParserError(err.stack);
        }
        this._log.push('csvStringAndName', {options});
        return result;
    }

    private readonly _log: Logger;

    private logError = (err) => {
        // eslint-disable-next-line no-console
        console.trace(err.stack);
        this.setParserError(err.stack);
    }
}