import {Import} from './Import';
import {Store} from '../Store';
import * as React from 'react';
import * as queryString from 'query-string';
import {Export} from './Export';

export function App(): JSX.Element {
    return (
        <Store>
            {page(queryString.parse(location.search).page)}
        </Store>
    );
}

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