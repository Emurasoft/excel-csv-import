import {Dropdown, Label, Subtitle1, Option} from '@fluentui/react-components';
import * as React from 'react';
import {NumberFormat} from '../parser';

interface Props {
	value: NumberFormat;
	onChange: (value: NumberFormat) => void;
}

function numberFormatToText(format: NumberFormat): string {
	if (format === NumberFormat.Text) {
		return 'Text';
	}

	return 'General';
}

export default function NumberFormatDropdown({value, onChange}: Props) {
	return (
		<Label>
			<Subtitle1>Number format</Subtitle1>
			<Dropdown
				value={numberFormatToText(value)}
				onOptionSelect={(_, {optionValue}) => onChange(optionValue as NumberFormat)}
			>
				<Option value={NumberFormat.Text}>
					{numberFormatToText(NumberFormat.Text)}
				</Option>
				<Option value={NumberFormat.General}>
					{numberFormatToText(NumberFormat.General)}
				</Option>
			</Dropdown>
		</Label>
	);
}
