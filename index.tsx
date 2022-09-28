import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from '@fluentui/react/lib/Icons';
import * as queryString from 'query-string';
import {Pages} from './Pages';
import {ErrorBoundary} from './components/ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import {ExtraArg, init} from './action';
import thunk from 'redux-thunk';
import {Provider, useDispatch} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {reducer} from './reducer';
import {Parser} from './parser';
import {errorHandler} from './errorhandler';
import {Routes} from 'react-router-dom';

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

const extraArg: ExtraArg = {parser: new Parser()};
const enhancer = composeEnhancers(applyMiddleware(errorHandler, thunk.withExtraArgument(extraArg)));
const store = createStore(reducer, enhancer);

function Initializer({children}): React.ReactElement {
	useDispatch()(init());
	return children;
}

function App(): React.ReactElement {
	return (
		<ErrorBoundary>
			<React.Suspense fallback={''}>
				<Provider store={store}>
					<Initializer>
						<MemoryRouter>
							<Routes>
								<Route path='/' element={<ParamRouter />} />
							</Routes>
						</MemoryRouter>
					</Initializer>
				</Provider>
			</React.Suspense>
		</ErrorBoundary>
	);
}

function ParamRouter() {
	const page = (queryString.parse(location.search).page as string);
	switch (page) {
	case Pages.import:
		return <Import />;
	case Pages.export:
		return <Export />;
	case Pages.about:
		return <About />;
	case Pages.licenseInformation:
		return <LicenseInformation />;
	default:
		throw new Error(`unknown page: ${page}`);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);
