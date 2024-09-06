import * as React from 'react';
import {Dropdown, Label, Option, Subtitle1} from '@fluentui/react-components';
import {NewlineSequence} from '../parser';

interface Props {
	showAutoDetect: boolean;
	value: NewlineSequence;
	onChange: (value: NewlineSequence) => void;
}

const newlineSequeneceMenu = [NewlineSequence.CRLF, NewlineSequence.CR, NewlineSequence.LF];

export function NewlineDropdown({showAutoDetect, value, onChange}: Props): React.ReactElement {
	let options: string[];
	if (showAutoDetect) {
		options = ['Auto-detect', ...newlineSequeneceMenu];
	} else {
		options = newlineSequeneceMenu;
	}

	return (
		<Label>
			<Subtitle1>Newline sequence</Subtitle1>
			<br />
			<Dropdown
				value={value}
				onOptionSelect={(_, {optionValue}) => onChange(optionValue as NewlineSequence)}
				placeholder='Newline sequence'
			>
				<Option value={NewlineSequence.CRLF}>
					CRLF
				</Option>
				<Option value={NewlineSequence.CR}>
					CR
				</Option>
				<Option value={NewlineSequence.LF}>
					LF
				</Option>
			</Dropdown>
		</Label>
	);
}