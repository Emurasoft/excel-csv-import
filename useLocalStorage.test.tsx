import {namespacedUseLocalStorage} from './useLocalStorage';
import * as React from 'react';
import {describe, beforeEach, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('useLocalStorage', () => {
	beforeEach(() => window.localStorage.clear());

	test('set and get', async () => {
		function E(): React.ReactElement {
			const [v, setV] = namespacedUseLocalStorage('namespace')('key', 0);
			return (
				<>
					<p>{v}</p>
					<button onClick={() => setV(1)} />
				</>
			);
		}

		{
			const element = render(<E />);
			expect(localStorage.getItem('namespace-key')).toBeNull();

			await userEvent.click(element.getByRole('button'));
			expect(localStorage.getItem('namespace-key')).toEqual('1');

			element.baseElement.innerHTML = '';
		}
		{
			// Simulate reload app
			const element = render(<E />);
			expect(element.baseElement.textContent).toEqual('1');
		}
	});
});
