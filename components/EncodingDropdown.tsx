import * as React from 'react';
import {Dropdown, Label, Option, Subtitle1} from '@fluentui/react-components';
import {EncodingDropdownOptions} from './EncodingDropdownOptions';

interface Props {
	showAutoDetect: boolean;
	value: string;
	onChange: (value: string) => void;
}

export function EncodingDropdown({showAutoDetect, value, onChange}: Props): React.ReactElement {
	let dropdownOptions: string[];
	if (showAutoDetect) {
		dropdownOptions = ['Auto-detect', ...EncodingDropdownOptions];
	} else {
		dropdownOptions = EncodingDropdownOptions;
	}

	return (
		<Label>
			<Subtitle1>Encoding</Subtitle1>
			<br />
			<Dropdown
				value={value}
				onOptionSelect={(_, {optionValue}) => onChange(optionValue)}
			>
				{dropdownOptions.map((v) => <Option key={v}>{v}</Option>)}
			</Dropdown>
		</Label>
	);
}