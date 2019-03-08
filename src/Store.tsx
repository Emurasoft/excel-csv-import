import * as React from 'react';

export interface State {

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
        }
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

    private readonly _actionList: ActionRecord[];
}