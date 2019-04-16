import * as React from 'react';

interface StringKey {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export class StoredComponent<P = {}, S extends StringKey = {}> extends React.Component<P, S> {
    public constructor(
        props: Readonly<P>,
        namespace: string,
        defaultState: Readonly<S>,
        saveKeys: ReadonlyArray<keyof S>
    ) {
        super(props);
        this._namespace = namespace;
        this._saveKeys = saveKeys;
        this._initialSave = localStorage && localStorage['StoredComponent-save'] === '"true"';
        this._save = this._initialSave;

        let loadedState = {};
        if (this._save) {
            loadedState = StoredComponent.loadState(namespace, saveKeys as string[]);
        }
        this.state = {...defaultState, ...loadedState};
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    // State is saved only if state is an object.
    public setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null))
        | (Pick<S, K> | S | null),
    ): void {
        super.setState(state);
        if (this._save && typeof state === 'object') {
            this.saveState(state);
        }
    }

    public initialSaveStatus(): boolean {
        return this._initialSave;
    }

    public setSaveStatus(save: boolean): void {
        this._save = save;

        if (save) {
            localStorage.setItem('StoredComponent-save', '"true"');
            this.saveState(this.state);
        } else {
            localStorage.clear();
            localStorage.setItem('app1-firstVisit', 'false'); // TODO refactor (if necessary)
        }
    }

    protected static loadState(namespace: string, saveKeys: string[]): {} {
        const loadedState = {};
        for (const entry of Object.entries(localStorage)) {
            if (
                entry[0].substring(0, namespace.length + 1) === namespace + '-'
                && saveKeys.includes(entry[0].substring(namespace.length + 1))
            ) {
                loadedState[entry[0].substring(namespace.length + 1)] = JSON.parse(entry[1]);
            }
        }
        return loadedState;
    }

    private readonly _namespace: string;
    private readonly _saveKeys: ReadonlyArray<keyof S>;
    private readonly _initialSave: boolean;
    protected _save: boolean;

    private saveState<K extends keyof S>(state: Pick<S, K> | S | null): void {
        for (const entry of Object.entries(state)) {
            if (this._saveKeys.includes(entry[0])) {
                const key = this._namespace + '-' + entry[0];
                localStorage.setItem(key, JSON.stringify(entry[1]));
            }
        }
    }
}