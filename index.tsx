import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from '@fluentui/react/lib/Icons';
import * as queryString from 'query-string';
import {Pages} from './Pages';
import {ErrorBoundary} from './components/ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import {ExtraArg} from './action';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {reducer} from './reducer';

initializeIcons();

const Import = React.lazy(
	() => import(/* webpackChunkName: 'import', webpackPrefetch: true */'./components/Import'),
);
const Export = React.lazy(
	() => import(/* webpackChunkName: 'export', webpackPrefetch: true */'./components/Export'),
);
const About = React.lazy(
	() => import(/* webpackChunkName: 'about' */'./components/About'),
);
const LicenseInformation = React.lazy(
	() => import(/* webpackChunkName: 'license' */'./components/LicenseInformation'),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const extraArg: ExtraArg = {};
const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(extraArg)));
const store = createStore(reducer, enhancer);

function App(): JSX.Element {
	// page could be an array but resulting behavior is expected either way
	const page = queryString.parse(location.search).page as string;
	return (
		<ErrorBoundary>
			<React.Suspense fallback={''}>
				<Provider store={store}>
					<MemoryRouter initialEntries={[page]}>
						<Route path={Pages.import} component={Import} />
						<Route path={Pages.export} component={Export} />
						<Route path={Pages.about} component={About} />
						<Route path={Pages.licenseInformation} component={LicenseInformation} />
					</MemoryRouter>
				</Provider>
			</React.Suspense>
		</ErrorBoundary>
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);