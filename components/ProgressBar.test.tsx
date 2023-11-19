import {ProgressBar} from './ProgressBar';
import * as React from 'react';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('ProgressBar', () => {
	test('ProgressBar', async () => {
		let clicked = false;
		const wrapper = render(
			<ProgressBar
				onClick={() => { clicked = true; }}
				progress={{show: true, aborting: false, percent: 0.0}}
			/>
		);

		await userEvent.click(wrapper.getByRole('button'));
        
		expect(clicked);
	});
});