import {Import} from './Import';
import {Store} from '../Store';
import * as React from 'react';
import * as queryString from 'query-string';
import {Export} from './Export';

function page(name: string[] | string ): React.ReactNode {
    switch (name) {
    case 'import':
        return <Import />;
    case 'export':
        return <Export />;
    default:
        return null;
    }
}

export function App(): JSX.Element { // TODO error boundary
    return (
        <Store>
            {page(queryString.parse(location.search).page)}
        </Store>
    );
}