import * as React from 'react';
import {ImportOptions, Parser} from './Parser';
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

    public import = (options: ImportOptions) => {
        this._parser.import(options);
        this._log.push("import", {options: options});
    }

    private readonly _log: Logger;
    private _parser: Parser;
}