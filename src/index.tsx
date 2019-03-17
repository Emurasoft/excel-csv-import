import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import {Import} from './components/Import';
import {BrowserRouter, Route} from 'react-router-dom';
import {Export} from './components/Export';
import {Store} from './Store';

initializeIcons();

ReactDOM.render(
    <BrowserRouter>
        <Store>
            <Route path='/import' component={Import} />
            <Route path='/export' component={Export} />
        </Store>
    </BrowserRouter>,
    document.getElementById('root'),
);