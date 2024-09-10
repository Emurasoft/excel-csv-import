import * as React from 'react';
import { InputType, Source } from '../parser';
import { Dropdown, Label, mergeClasses, Option, Subtitle1, Textarea } from '@fluentui/react-components';
import { useStyles } from './styles';

interface Props {
	value: Source;
	onChange: (value: Source) => void;
}

function fileInput(onChange: (value: File) => void): React.ReactElement {
	const styles = useStyles();
	return (
		<>
			<input
				className={styles.fullWidth}
				type="file"
				accept="text/csv"
				onChange={e => onChange(e.target.files[0])}
				id="SourceInput-FileInput"
			/>
			<br />
		</>
	);
}

function textInput(value: string, onChange: (value: string) => void): React.ReactElement {
	const styles = useStyles();
	return (
		<Textarea
			className={mergeClasses(styles.monospace, styles.fullWidth)}
			rows={10}
			spellCheck={false}
			wrap="off"
			onChange={(_, { value }) => onChange(value)}
			value={value}
			id="SourceInput-TextInput"
		/>
	);
}

export function SourceInput({ value, onChange }: Props): React.ReactElement {
	let input: React.ReactElement;
	switch (value.inputType) {
		case InputType.file:
			input = fileInput(file => onChange({ inputType: InputType.file, file, text: '' }));
			break;
		case InputType.text:
			input = textInput(
				value.text,
				text => onChange({ inputType: InputType.text, file: null, text }),
			);
	}

	return (
		<>
			<Label>
				<Subtitle1>Import type</Subtitle1>
				<br />
				<Dropdown
					value={value.inputType}
					onOptionSelect={(_, { optionValue }) => onChange(
						{ inputType: optionValue as InputType, file: null, text: '' },
					)}
					id="SourceInput-Dropdown"
				>
					<Option>
						{InputType.file}
					</Option>
					<Option>
						{InputType.text}
					</Option>
				</Dropdown>
			</Label>
			{input}
		</>
	);
}
