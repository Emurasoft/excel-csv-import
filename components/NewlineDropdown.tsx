import * as React from 'react';
import {Dropdown, Label, Option, Subtitle1} from '@fluentui/react-components';
import {NewlineSequence} from '../parser';

interface Props {
	showAutoDetect: boolean;
	value: NewlineSequence;
	onChange: (value: NewlineSequence) => void;
}

export function NewlineDropdown({showAutoDetect, value, onChange}: Props): React.ReactElement {
	return (
		<Label>
			<Subtitle1>Newline sequence</Subtitle1>
			<br />
			<Dropdown
				value={value}
				selectedOptions={[value]}
				onOptionSelect={(_, {optionValue}) => onChange(optionValue as NewlineSequence)}
			>
				{
					showAutoDetect
					&& <Option value={NewlineSequence.AutoDetect}>
						Auto-detect
					</Option>
				}
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