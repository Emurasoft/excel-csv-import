import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeIcons} from '@fluentui/react/lib/Icons';
import * as queryString from 'query-string';
import {Pages} from './Pages';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Store} from './Store';
import {MemoryRouter, Route} from 'react-router';

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

function App(): JSX.Element {
	// pageValue could be an array but resulting behavior is expected either way
	const pageValue = queryString.parse(location.search).page as string;
	return (
		<ErrorBoundary>
			<Store>
				<React.Suspense fallback={''}>
					<MemoryRouter initialEntries={[pageValue]}>
						<Route path={Pages.import} component={Import} />
						<Route path={Pages.export} component={Export} />
						<Route path={Pages.about} component={About} />
						<Route path={Pages.licenseInformation} component={LicenseInformation} />
					</MemoryRouter>
				</React.Suspense>
			</Store>
		</ErrorBoundary>
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);