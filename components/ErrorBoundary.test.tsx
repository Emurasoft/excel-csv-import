import {ErrorBoundary} from './ErrorBoundary';
import * as React from 'react';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';

describe('ErrorBoundary', () => {
	test('message appears', () => {
		const errorBoundary = render(<ErrorBoundary><div /></ErrorBoundary>);
		expect(errorBoundary.queryByRole('textbox')).toBeNull();

		// Silence errors for test
		const consoleError = console.error;
		console.error = () => {};

		const msg = 'you should see this';

		function BuggyComponent(): JSX.Element {
			throw new Error(msg);
		}
		errorBoundary.rerender(<ErrorBoundary><BuggyComponent /></ErrorBoundary>);
		expect(errorBoundary.getByRole('textbox').textContent.includes(msg));

		console.error = consoleError;
	});
});