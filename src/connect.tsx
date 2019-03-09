import * as React from 'react';
import {Context, Store} from './Store';

export function connect<P extends {store: Store}>(Component: React.ComponentClass<any>) {
    return (props: Pick<P, Exclude<keyof P, 'store'>>) => {
        return (
            <Context.Consumer>
                {(store: Store) => <Component {...props} store={store}/>}
            </Context.Consumer>
        );
    };
}