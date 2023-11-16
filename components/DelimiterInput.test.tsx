import {DelimiterInput, DropdownOptionKey, codePoint} from './DelimiterInput';
import * as React from 'react';
import * as assert from 'assert';
import {Dropdown, TextField} from '@fluentui/react';
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

		const commaElements = input.getAllByText('Comma (U+002C)');
		// Select item in menu
		await userEvent.click(commaElements[1]);
		
		expect(input.queryByRole('textbox')).toBeNull();

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Other'));
		
		expect(input.queryByRole('textbox')).not.toBeNull();

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Comma (U+002C)'));
		input.rerender(
			<DelimiterInput
				value={','}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(input.queryByText('Comma (U+002C)')).not.toBeNull();

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
		await userEvent.click(input.getByText('Comma (U+002C)'));
		expect(result).toEqual(',');

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Space (U+0020)'));
		expect(result).toEqual(' ');

		await userEvent.click(input.getByRole('combobox'));
		await userEvent.click(input.getByText('Tab (U+0009)'));
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