import {Import} from './Import';
import {Store} from '../Store';
import * as React from 'react';
import {Export} from './Export';
import {About} from './About';
import {ErrorBoundary} from './ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import * as queryString from 'query-string';

export function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <Store>
                <MemoryRouter
                    initialEntries={[initialEntry(queryString.parse(location.search).page)]}
                >
                    <Route path='/import' component={Import} />
                    <Route path='/export' component={Export} />
                    <Route path='/about' component={About} />
                </MemoryRouter>
            </Store>
        </ErrorBoundary>
    );
}

function initialEntry(name) {
    // I don't know if this is necessary but extra precaution doesn't hurt.
    if (['import', 'export', 'about'].includes(name as string)) {
        return '/' + name;
    } else {
        return '';
    }
}