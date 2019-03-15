import * as React from 'react';
import * as Parser from './Parser';
import * as ExcelAPI from './ExcelAPI';
import {Logger} from './Logger';

export interface State {
    initialized: boolean;
}

export const Context = React.createContext(undefined);

export class Store extends React.Component<{}, State> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            initialized: false,
        };

        this._log = new Logger();

        this.initParser();
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

    public initParser = () => {
        ExcelAPI.init()
            .then(() => {
                this.setState({initialized: true});
                this._log.push('initParser');
            });
    }

    public import = (options: Parser.ImportOptions) => {
        Parser.importCSV(options);
        this._log.push('import', {options});
    }

    public worksheetArea = async () => {
        const result = await ExcelAPI.worksheetArea();
        this._log.push('worksheetArea');
        return result;
    }

    public csvStringAndName = async (options: Parser.ExportOptions) => {
        const result = await Parser.csvStringAndName(options);
        this._log.push('csvStringAndName', {options});
        return result;
    }

    private readonly _log: Logger;
}