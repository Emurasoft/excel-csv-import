import * as React from 'react';
import * as Parser from './Parser';
import * as ExcelAPI from './ExcelAPI';
import {Logger} from './Logger';
import {CsvStringAndName} from './Parser';
import {version} from './version.json';
import {AbortFlagArray} from './AbortFlag';
import {TranslateFunction} from './components/BaseProps';
import {withTranslation} from 'react-i18next';

export interface Progress {
    show: boolean;
    percent: number;
}

export interface State {
    initialized: boolean;
    supported: boolean;
    version: string;
    largeFile: boolean;
    parserOutput: ParserOutput;
    progress: Progress;
}

export enum OutputType {hidden, info, error}

export interface ParserOutput {
    type: OutputType;
    output: string;
}

export type ProgressCallback = (progress: number) => void

export const Context = React.createContext(undefined);

export class StoreComponent extends React.Component<TranslateFunction, State> {
    public constructor(props: TranslateFunction) {
        super(props);
        this.state = {
            version: version,
            initialized: false,
            supported: true,
            parserOutput: {
                type: OutputType.hidden,
                output: '',
            },
            largeFile: false,
            progress: {show: false, percent: 0.0},
        };

        this._log = new Logger();
        this._log.push('version', {version});

        this._abortFlags = new AbortFlagArray();
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

    public async componentDidMount(): Promise<void> {
        await this.initAPI();
    }

    public log = () => this._log.log()

    public initAPI = async (): Promise<void> => {
        try {
            const environmentInfo = await Parser.init();
            this.setState({initialized: true, supported: environmentInfo.supported});
            this._log.push('APIVersion', environmentInfo)

            if (!environmentInfo.supported) {
                const msg = this.props.t('Your version of Excel is not supported') + '\n'
                    + JSON.stringify(environmentInfo, null, 2);
                this.setParserError(new Error(msg));
            }
        } catch (err) {
            this.setParserError(new Error(StoreComponent.getErrorMessage(err)));
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

    public setParserOutput = (parserOutput: ParserOutput) => {
        this.setState({parserOutput});
        this._log.push('setParserOutput', {parserOutput});
    }

    public setParserError = (err: Error) => {
        // eslint-disable-next-line no-undef
        if (!process) { // If not running in unit test
            // eslint-disable-next-line no-console
            console.trace(StoreComponent.getErrorMessage(err));
        }

        let output = StoreComponent.getErrorMessage(err);
        if (
            output.includes('RichApi.Error')
            && output.includes('refresh the page')
        ) {
            output = this.props.t('Session has expired; please refresh the page.')
                     + '\n\n' + output;
        }

        // Action is logged inside setParserOutput()
        this.setParserOutput({type: OutputType.error, output});
    }

    // Aborts all import and export processes that are currently running.
    public abort = () => {
        this._abortFlags.abort();
        this._log.push('abort');
    }

    public import = async (options: Parser.ImportOptions): Promise<void> => {
        this.setState(
            state => ({progress: {show: !state.progress.show, percent: 0.0}}),
        );

        try {
            const errors = await Parser.importCSV(
                options,
                this.setProgress,
                this._abortFlags.newFlag(),
            );
            if (errors.length > 0) {
                this.setParserOutput({type: OutputType.info, output: JSON.stringify(errors)});
            }
        } catch (err) {
            this.setParserError(new Error(StoreComponent.getErrorMessage(err)));
        }
        this.setState(
            state => ({progress: {show: !state.progress.show, percent: 1.0}}),
        );

        this._log.push('import', {options});
    }

    public worksheetArea = async (): Promise<number> => {
        let result = 0;
        try {
            result = await ExcelAPI.worksheetArea();
        } catch (err) {
            this.setParserError(new Error(StoreComponent.getErrorMessage(err)));
        }
        this._log.push('worksheetArea');
        return result;
    }

    // Returns null if error occurred.
    public csvStringAndName = async (
        options: Parser.ExportOptions
    ): Promise<CsvStringAndName|null> => {
        this.setState(
            state => ({progress: {show: !state.progress.show, percent: 0.0}}),
        );

        let result: CsvStringAndName = null;
        try {
            result = await Parser.csvStringAndName(
                options,
                this.setProgress,
                this._abortFlags.newFlag(),
            );
        } catch (err) {
            this.setParserError(new Error(StoreComponent.getErrorMessage(err)));
        }
        this.setState(
            state => ({progress: {show: !state.progress.show, percent: 1.0}}),
        );

        this._log.push('csvStringAndName', {options});
        return result;
    }

    private static getErrorMessage(err: Error): string {
        return err.toString() + '\n' + err.stack
    }

    private readonly _log: Logger;
    private readonly _abortFlags: AbortFlagArray;

    private setProgress: ProgressCallback = (progress: number) => {
        this.setState(state => ({progress: {show: state.progress.show, percent: progress}}));
    }
}

// @ts-ignore
export const Store = withTranslation('store')(StoreComponent);