import * as React from 'react';

export class StoredComponent extends React.Component<{}, {}> {
    public constructor(props: {}, namespace: string) {
        super(props);
        this._namespace = namespace;
    }

    public render() {
        return this.props.children;
    }

    public componentDidMount(): void {
        const loadedState = {};
        for (const entry of Object.entries(localStorage)) {
            if (entry[0].substring(0, this._namespace.length + 1) === this._namespace + '-') {
                loadedState[entry[0].substring(this._namespace.length + 1)] = JSON.parse(entry[1]);
            }
        }
        this.setState(loadedState);
    }

    public setState(state: {}): void {
        super.setState(state);
        for (const entry of Object.entries(state)) {
            localStorage.setItem(this._namespace + '-' + entry[0], JSON.stringify(entry[1]));
        }
    }

    private readonly _namespace: string;
}