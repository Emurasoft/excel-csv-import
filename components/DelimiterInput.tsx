import * as React from 'react';
import {Dropdown, IDropdownOption, TextField, ResponsiveMode} from '@fluentui/react';
import {useState} from 'react';

export const enum DropdownOptionKey {comma, space, tab, other}

interface Props {
	showLengthError: boolean;
	value: string;
	onChange: (value: string) => void;
}

const stringToDropdownKey = {
	'\u002c': DropdownOptionKey.comma,
	'\u0020': DropdownOptionKey.space,
	'\u0009': DropdownOptionKey.tab,
};

const dropdownToString = {
	[DropdownOptionKey.comma]: '\u002c',
	[DropdownOptionKey.space]: '\u0020',
	[DropdownOptionKey.tab]: '\u0009',
	[DropdownOptionKey.other]: '',
};

export function DelimiterInput({showLengthError, value, onChange}: Props): React.ReactElement {
	const dropdownOptions: IDropdownOption[] = [
		{
			key: DropdownOptionKey.comma,
			text: 'Comma (U+002C)',
		},
		{
			key: DropdownOptionKey.space,
			text: 'Space (U+0020)',
		},
		{
			key: DropdownOptionKey.tab,
			text: 'Tab (U+0009)',
		},
		{
			key: DropdownOptionKey.other,
			text: 'Other',
		},
	];

	const [otherSelected, setOtherSelected] = useState(false);

	const selectedKey = (): DropdownOptionKey => {
		if (!otherSelected && value in stringToDropdownKey) {
			return stringToDropdownKey[value];
		}

		return DropdownOptionKey.other;
	}

	const customInput = (
		<div className="smallDivider">
			<TextField
				className="monospace"
				value={value}
				onChange={(_, v) => onChange(v)}
				description={description(value)}
				onGetErrorMessage={
					(v) => showLengthError && v.length > 1 ? 'Delimiter length must be 1' : ''
				}
				deferredValidationTime={1}
				placeholder={'Enter custom delimiter'}
				spellCheck={false}
			/>
		</div>
	);

	return (
		<>
			<Dropdown
				label={'Delimiter'}
				options={dropdownOptions}
				responsiveMode={ResponsiveMode.large}
				selectedKey={selectedKey()}
				onChange={(_, option: IDropdownOption) => {
					setOtherSelected(option.key === DropdownOptionKey.other);
					onChange(dropdownToString[option.key]);
				}}
			/>
			{
				otherSelected || !['\u002c', '\u0020', '\u0009'].includes(value)
					? customInput
					: null
			}
		</>
	);
}

function description(delimiter: string): string {
	if (delimiter.length == 1) {
		return codePoint(delimiter);
	} else {
		return '\u00A0';
	}
}

export function codePoint(c: string): string {
	return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
}