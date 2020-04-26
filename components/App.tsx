import {Store} from '../Store';
import * as React from 'react';
import {ErrorBoundary} from './ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import * as queryString from 'query-string';
import {Pages} from '../Pages';

// Returns checked parameters.
export function _parseQuery(query: queryString.ParsedQuery): {page: string} {
    if (query.page in Pages) {
        return {page: Pages[query.page as string]};
    } else {
        return {page: ''};
    }
}

const Import = React.lazy(
    () => import(/* webpackChunkName: 'import', webpackPrefetch: true */'./Import'),
);
const Export = React.lazy(
    () => import(/* webpackChunkName: 'export', webpackPrefetch: true */'./Export'),
);
const About = React.lazy(
    () => import(/* webpackChunkName: 'about', webpackPrefetch: true */'./About'),
);
const LicenseInformation = React.lazy(
    () => import(/* webpackChunkName: 'license' */'./LicenseInformation'),
);

export function App(): JSX.Element {
    const query = _parseQuery(queryString.parse(location.search));
    return (
        <ErrorBoundary>
            <Store>
                <React.Suspense fallback={''}>
                    <MemoryRouter initialEntries={[query.page]}>
                        <Route path={Pages.import} component={Import} />
                        <Route path={Pages.export} component={Export} />
                        <Route path={Pages.about} component={About} />
                        <Route path={Pages.licenseInformation} component={LicenseInformation} />
                    </MemoryRouter>
                </React.Suspense>
            </Store>
        </ErrorBoundary>
    );
}