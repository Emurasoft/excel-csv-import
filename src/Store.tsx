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

    public render() {
        const value: {[key: string]: any} = {};
        for (const method of Object.getOwnPropertyNames(this)) {
            if (typeof (this as any)[method] === 'function') {
                value[method] = (this as any)[method];
            }
        }

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

    public worksheetShape = async () => {
        const result = await ExcelAPI.worksheetShape();
        this._log.push('worksheetShape');
        return result
    }

    public csvStringAndName = async (options: Parser.ExportOptions) => {
        const result = await Parser.csvStringAndName(options);
        this._log.push('csvStringAndName', {options});
        return result;
    }

    private readonly _log: Logger;
}