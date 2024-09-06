import * as React from 'react';
import {Dropdown, Option} from '@fluentui/react-components';
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
		<>
			<Dropdown
				placeholder='Encoding'
				value={value}
				onOptionSelect={(_, {optionValue}) => onChange(optionValue)}
			>
				{dropdownOptions.map((v) => <Option>{v}</Option>)}
			</Dropdown>
			<br/>
		</>
	);
}