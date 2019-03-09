import * as React from 'react';
import {ParseConfig} from 'papaparse';
import {Parser} from './Parser';
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

        this.initParser(); // TODO disable import and export buttons until ready
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
        Parser.init()
            .then((parser) => {
                this._parser = parser;
                this.setState({initialized: true});
                this._log.push("initParser");
            });
    }

    public importFile = (file: File, config: ParseConfig) => {
        this._parser.import(file, config);
        this._log.push("importFile", {file: file.name, config});
    }

    private readonly _log: Logger;
    private _parser: Parser;
}