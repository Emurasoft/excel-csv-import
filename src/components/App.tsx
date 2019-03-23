import {Store} from '../Store';
import * as React from 'react';
import {ErrorBoundary} from './ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import * as queryString from 'query-string';
import {paths} from './Paths';

function initialEntry(name): string {
    // I don't know if this is necessary but extra precaution doesn't hurt.
    if (['import', 'export', 'about'].includes(name as string)) {
        return '/' + name;
    } else {
        return '';
    }
}

const Import = React.lazy(
    () => import(/* webpackChunkName: 'import', webpackPrefetch: true */'./Import')
);
const Export = React.lazy(
    () => import(/* webpackChunkName: 'export', webpackPrefetch: true */'./Export')
);
const About = React.lazy(
    () => import(/* webpackChunkName: 'about', webpackPrefetch: true */'./About')
);

export function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <Store>
                <React.Suspense fallback={''}>
                    <MemoryRouter
                        initialEntries={[initialEntry(queryString.parse(location.search).page)]}
                    >
                        <Route path={paths.import} component={Import} />
                        <Route path={paths.export} component={Export} />
                        <Route path={paths.about} component={About} />
                    </MemoryRouter>
                </React.Suspense>
            </Store>
        </ErrorBoundary>
    );
}