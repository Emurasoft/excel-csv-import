import * as React from 'react';
import {Context, Store} from './Store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function connect<P extends {store: Store}>(Component: React.ComponentClass): any {
	// eslint-disable-next-line react/display-name
	return (props: Pick<P, Exclude<keyof P, 'store'>>) => {
		return (
			<Context.Consumer>
				{(store: Store) => <Component {...props} store={store}/>}
			</Context.Consumer>
		);
	};
}