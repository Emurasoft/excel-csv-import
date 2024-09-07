import {DelimiterInput, codePoint} from './DelimiterInput';
import * as React from 'react';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('DelimiterInput', () => {
	test('custom input display status', async () => {
		let value = ',';
		function onChange(v): void {
			value = v;
		}

		// When the user selects other, show custom input
		const input = render(
			<DelimiterInput
				value={value}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(input.queryByRole('textbox')).toBeNull();

		await userEvent.click(input.getByRole('combobox'));

		const commaElements = input.getAllByText('Comma');
		// Select item in menu
		await userEvent.click(commaElements[1]);
		
		expect(input.queryByRole('textbox')).toBeNull();

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Other'));
		
		expect(input.queryByRole('textbox')).not.toBeNull();

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Comma'));
		input.rerender(
			<DelimiterInput
				value={','}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(input.queryAllByText('Comma').length).toBeGreaterThanOrEqual(1);

		// Show custom input regardless of state if value is not a dropdown key
		// (Happens if value is loaded from storage)
		input.rerender(
			<DelimiterInput
				value={'a'}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(input.queryByRole('textbox')).not.toBeNull();
	});

	test('onChangeCallback', async () => {
		let result = '';

		const input = render(
			<DelimiterInput
				value={''}
				onChange={(v) => result = v}
				showLengthError={true}
			/>
		);
		
		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Comma'));
		expect(result).toEqual(',');

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Space'));
		expect(result).toEqual(' ');

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Tab'));
		expect(result).toEqual('\t');

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getAllByText('Other')[1]);
		expect(result).toEqual('\t');

		await userEvent.click(input.queryByRole('textbox'));
		await userEvent.keyboard('a');
		expect(result).toEqual('a');
	});

	test('codePoint', () => {
		expect(codePoint(',')).toEqual('U+002C')
	});
});