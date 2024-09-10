import * as React from 'react';
import queryString from 'query-string';
import { Pages } from './Pages';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MemoryRouter, Route } from 'react-router';
import { ExtraArg, init, useAppDispatch } from './action';
import { Provider } from 'react-redux';
import { reducer } from './reducer';
import { Parser } from './parser';
import { errorHandler } from './errorhandler';
import { Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-components';
import { createRoot } from 'react-dom/client';
import { useAppSelector } from './state';

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

const extraArg: ExtraArg = { parser: new Parser() };
const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg,
			},
		}).concat(errorHandler),
});

function Initializer({ children }): React.ReactElement {
	useAppDispatch()(init());
	return children;
}

function Theme({ children }: React.PropsWithChildren) {
	const initialized = useAppSelector(state => state.initialized);

	const isDarkMode = initialized && Office.context && Office.context.officeTheme && Office.context.officeTheme.isDarkTheme;

	return (
		<FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
			{children}
		</FluentProvider>
	);
}

function App(): React.ReactElement {
	return (
		<ErrorBoundary>
			<React.Suspense fallback="">
				<Provider store={store}>
					<Theme>
						<Initializer>
							<MemoryRouter>
								<Routes>
									<Route path="/" element={<ParamRouter />} />
								</Routes>
							</MemoryRouter>
						</Initializer>
					</Theme>
				</Provider>
			</React.Suspense>
		</ErrorBoundary>
	);
}

function ParamRouter() {
	const page = queryString.parse(location.search).page as string;
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

createRoot(document.getElementById('root')).render(<App />);
