import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import {App} from './components/App';

initializeIcons();

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);