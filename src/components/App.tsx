import {Store} from '../Store';
import * as React from 'react';
import {ErrorBoundary} from './ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import * as queryString from 'query-string';
import {Pages} from '../Pages';
import {i18n, languageList} from '../i18n';
import {I18nextProvider} from 'react-i18next';

// Returns checked parameters.
export function _parseQuery(query: queryString.ParsedQuery): {page: string; language: string} {
    let page = null;
    if (query.page in Pages) {
        page = Pages[query.page as string];
    } else {
        page = '';
    }

    let language = null;
    if (languageList.includes(query.language as string)) {
        language = query.language;
    } else {
        language = 'en';
    }

    return {page, language};
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

export function App(): JSX.Element { // TODO Add menu to index for iPad
    const query = _parseQuery(queryString.parse(location.search));
    // noinspection JSIgnoredPromiseFromCall
    i18n.changeLanguage(query.language);

    return (
        <ErrorBoundary>
            <Store>
                <React.Suspense fallback={''}>
                    <I18nextProvider i18n={i18n}>
                        <MemoryRouter initialEntries={[query.page]}>
                            <Route path={Pages.import} component={Import} />
                            <Route path={Pages.export} component={Export} />
                            <Route path={Pages.about} component={About} />
                            <Route path={Pages.licenseInformation} component={LicenseInformation} />
                        </MemoryRouter>
                    </I18nextProvider>
                </React.Suspense>
            </Store>
        </ErrorBoundary>
    );
}