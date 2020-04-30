import * as React from 'react';
import {Dropdown, IDropdownOption, ResponsiveMode} from '@fluentui/react';
import {NewlineSequence} from '../Parser';

interface Props {
	showAutoDetect: boolean;
	value: NewlineSequence;
	onChange: (value: NewlineSequence) => void;
}

const autoDetectOption: IDropdownOption = {
	key: NewlineSequence.AutoDetect,
	text: 'Auto-detect',
};

const newlineSequeneceMenu = [
	{
		key: NewlineSequence.CRLF,
		text: 'CRLF',
	},
	{
		key: NewlineSequence.CR,
		text: 'CR',
	},
	{
		key: NewlineSequence.LF,
		text: 'LF',
	},
];

export function NewlineDropdown({showAutoDetect, value, onChange}: Props): React.ReactElement {
	let options: IDropdownOption[];
	if (showAutoDetect) {
		options = [autoDetectOption, ...newlineSequeneceMenu];
	} else {
		options = newlineSequeneceMenu;
	}

	return (
		<Dropdown
			label={'Newline sequence'}
			responsiveMode={ResponsiveMode.large}
			selectedKey={value}
			options={options}
			onChange={(_, option) => onChange(option.key as NewlineSequence)}
		/>
	);
}