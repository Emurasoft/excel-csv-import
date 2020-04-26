import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from '@fluentui/react/lib/Icons';
import {App} from './components/App';

initializeIcons();

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);