import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import {Import} from './components/Import';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {Export} from './components/Export';

initializeIcons();

ReactDOM.render(
    <BrowserRouter>
        <>
            <Route path='/import' component={Import} />
            <Route path='/export' component={Export} />
        </>
    </BrowserRouter>,
    document.getElementById('root'),
);