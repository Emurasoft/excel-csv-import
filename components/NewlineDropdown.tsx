import * as React from 'react';
import {Dropdown, Label, Option, Subtitle1} from '@fluentui/react-components';
import {NewlineSequence} from '../parser';

interface Props {
	showAutoDetect: boolean;
	value: NewlineSequence;
	onChange: (value: NewlineSequence) => void;
}

function getLabel(n: NewlineSequence): string {
	switch (n) {
	case NewlineSequence.AutoDetect:
		return 'Auto-detect';
	case NewlineSequence.CRLF:
		return 'CRLF';
	case NewlineSequence.CR:
		return 'CR';
	case NewlineSequence.LF:
		return 'LF';
	}
}

export function NewlineDropdown({showAutoDetect, value, onChange}: Props): React.ReactElement {
	return (
		<Label>
			<Subtitle1>Newline sequence</Subtitle1>
			<br />
			<Dropdown
				value={getLabel(value)}
				onOptionSelect={(_, {optionValue}) => onChange(optionValue as NewlineSequence)}
			>
				{
					showAutoDetect
					&& <Option value={NewlineSequence.AutoDetect}>
						{getLabel(NewlineSequence.AutoDetect)}
					</Option>
				}
				<Option value={NewlineSequence.CRLF}>
					{getLabel(NewlineSequence.CRLF)}
				</Option>
				<Option value={NewlineSequence.CR}>
					{getLabel(NewlineSequence.CR)}
				</Option>
				<Option value={NewlineSequence.LF}>
					{getLabel(NewlineSequence.LF)}
				</Option>
			</Dropdown>
		</Label>
	);
}