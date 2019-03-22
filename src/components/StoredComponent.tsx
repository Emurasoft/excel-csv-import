import * as React from 'react';

type StringKey = {[key: string]: any};

export class StoredComponent<P = {}, S extends StringKey = {}> extends React.Component<P, S> {
    public constructor(props: P, namespace: string, savedKeys: (keyof S)[]) {
        super(props);
        this._namespace = namespace;
        this._savedKeys = savedKeys;

        if (!localStorage) {
            // @ts-ignore
            localStorage = {setItem: () => {}};
        }

        this._save = localStorage['StoredComponent-save'] === '"true"';
    }

    public render() {
        return this.props.children;
    }

    public componentDidMount(): void {
        // TODO move to constructor
        const loadedState = {};
        for (const entry of Object.entries(localStorage)) {
            if (
                this._save
                && entry[0].substring(0, this._namespace.length + 1) === this._namespace + '-'
                && this._savedKeys.includes(entry[0].substring(this._namespace.length + 1))
            ) {
                loadedState[entry[0].substring(this._namespace.length + 1)] = JSON.parse(entry[1]);
            }
        }
        this.setState(loadedState);
    }

    // State is saved only if state is an object.
    public setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null))
             | (Pick<S, K> | S | null),
    ): void {
        super.setState(state);
        if (this._save && typeof state === 'object') {
            for (const entry of Object.entries(state)) {
                if (this._savedKeys.includes(entry[0])) {
                    const key = this._namespace + '-' + entry[0];
                    localStorage.setItem(key, JSON.stringify(entry[1]));
                }
            }
        }
    }

    public setSaveStatus(save: boolean) {
        this._save = save;

        if (save) {
            localStorage.setItem('StoredComponent-save', '"true"');
        } else {
            localStorage.clear();
        }
    }

    private readonly _namespace: string;
    private readonly _savedKeys: (keyof S)[];
    private _save: boolean;
}