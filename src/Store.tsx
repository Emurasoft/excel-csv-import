import * as React from 'react';
import {ParseConfig} from 'papaparse';
import {Parser} from './Parser';

export interface State {
    initialized: boolean;
}

interface ActionRecord {
    action: string;
    args?: {};
}

export const Context = React.createContext(undefined);

export class Store extends React.Component<{}, State> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            initialized: false,
        };

        this._actionList = [];
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

    public actionList = () => {
        return [...this._actionList];
    }

    public initParser = () => {
        Parser.init()
            .then((parser) => {
                this._parser = parser;
                this.setState({initialized: true});
                this._actionList.push({action: "initParser"});
            });
    }

    public importFile = (file: File, config: ParseConfig) => {
        this._parser.import(file, config);
        this._actionList.push({
            action: "importFile",
            args: {file: file.name, config: Store.deepCopy(config)},
        })
    }

    private static deepCopy(a: any): any {
        return JSON.parse(JSON.stringify(a));
    }

    private readonly _actionList: ActionRecord[];
    private _parser: Parser;
}