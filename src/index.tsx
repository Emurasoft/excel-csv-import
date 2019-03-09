import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import {Store} from './Store';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

ReactDOM.render(
    <Store>
        <App />
    </Store>,
    document.getElementById('root'),
);