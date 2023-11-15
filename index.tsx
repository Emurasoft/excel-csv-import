import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from '@fluentui/react/lib/Icons';
import queryString from 'query-string';
import {Pages} from './Pages';
import {ErrorBoundary} from './components/ErrorBoundary';
import {MemoryRouter, Route} from 'react-router';
import {ExtraArg, init, useAppDispatch} from './action';
import {Provider, useDispatch} from 'react-redux';
import {reducer} from './reducer';
import {Parser} from './parser';
import {errorHandler} from './errorhandler';
import {Routes} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit'

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

const extraArg: ExtraArg = {parser: new Parser()};
const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg
			},
		}).concat(errorHandler),
});

function Initializer({children}): React.ReactElement {
	useAppDispatch()(init());
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
