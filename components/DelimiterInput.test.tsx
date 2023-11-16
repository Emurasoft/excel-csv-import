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
		const wrapper0 = render(
			<DelimiterInput
				value={value}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(wrapper0.queryByRole('textbox')).toBeNull();

		await userEvent.click(wrapper0.getByRole('combobox'));

		const commaElements = wrapper0.getAllByText('Comma (U+002C)');
		// Select item in menu
		await userEvent.click(commaElements[1]);
		
		expect(wrapper0.queryByRole('textbox')).toBeNull();

		await userEvent.click(wrapper0.getByRole('combobox'));
		await userEvent.click(wrapper0.getByText('Other'));
		
		expect(wrapper0.queryByRole('textbox')).not.toBeNull();

		await userEvent.click(wrapper0.getByRole('combobox'));
		await userEvent.click(wrapper0.getByText('Comma (U+002C)'));
		wrapper0.rerender(
			<DelimiterInput
				value={','}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(wrapper0.queryByText('Comma (U+002C)')).not.toBeNull();

		// Show custom input regardless of state if value is not a dropdown key
		// (Happens if value is loaded from storage)
		wrapper0.rerender(
			<DelimiterInput
				value={'a'}
				onChange={onChange}
				showLengthError={true}
			/>
		);
		expect(wrapper0.queryByRole('textbox')).not.toBeNull();
	});

	// it('onChangeCallback', () => {
	// 	let result = null;

	// 	const wrapper = shallow(
	// 		<DelimiterInput
	// 			value={''}
	// 			onChange={(newDelimiter) => result = newDelimiter}
	// 			showLengthError={true}
	// 		/>
	// 	);
	// 	const dropdown = wrapper.find(Dropdown);

	// 	dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
	// 	assert.strictEqual(result, '\u002c');

	// 	dropdown.simulate('change', null, {key: DropdownOptionKey.space});
	// 	assert.strictEqual(result, '\u0020');

	// 	dropdown.simulate('change', null, {key: DropdownOptionKey.tab});
	// 	assert.strictEqual(result, '\u0009');

	// 	dropdown.simulate('change', null, {key: DropdownOptionKey.other});
	// 	assert.strictEqual(result, '');

	// 	const textfield = wrapper.find(TextField);
	// 	textfield.simulate('change', null, 'a');
	// 	assert.strictEqual(result, 'a');

	// 	textfield.simulate('change', null, ',');
	// 	assert.strictEqual(result, ',');

	// 	dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
	// 	assert.strictEqual(result, '\u002c');
	// });

	// it('TextField description', () => {
	// 	const tests: {value: string; expectIncludes: string}[] = [
	// 		{
	// 			value: 'a',
	// 			expectIncludes: 'U+0061',
	// 		},
	// 	];

	// 	for (const [i, test] of tests.entries()) {
	// 		const wrapper = shallow(
	// 			<DelimiterInput
	// 				value={''}
	// 				onChange={() => {}}
	// 				showLengthError={true}
	// 			/>
	// 		);
	// 		wrapper.find(Dropdown)
	// 			.simulate('change', null, {key: DropdownOptionKey.other});

	// 		wrapper.setProps({value: test.value});
	// 		assert(wrapper.html().includes(test.expectIncludes), i.toString());
	// 	}
	// });

	// it('codePoint()', () => {
	// 	const tests: {c: string; expected: string}[] = [
	// 		{
	// 			c: ',',
	// 			expected: 'U+002C',
	// 		},
	// 	];

	// 	for (const [i, test] of tests.entries()) {
	// 		assert.strictEqual(codePoint(test.c), test.expected, i.toString());
	// 	}
	// });
});