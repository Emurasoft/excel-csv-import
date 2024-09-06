import * as React from 'react';
import {InputType, Source} from '../parser';
import {Dropdown, Option, Textarea} from '@fluentui/react-components';

interface Props {
	value: Source;
	onChange: (value: Source) => void;
}

function fileInput(onChange: (value: File) => void): React.ReactElement {
	return (
		<>
			<input
				className="fullWidth"
				type='file'
				accept='text/csv'
				onChange={e => onChange(e.target.files[0])}
				id='SourceInput-FileInput'
			/>
			<br />
		</>
	);
}

function textInput(value: string, onChange: (value: string) => void): React.ReactElement {
	return (
		<Textarea
			className="monospace"
			rows={10}
			spellCheck={false}
			wrap='off'
			onChange={(_, {value}) => onChange(value)}
			value={value}
			id='SourceInput-TextInput'
		/>
	);
}

export function SourceInput({value, onChange}: Props): React.ReactElement {
	let input: React.ReactElement;
	switch (value.inputType) {
	case InputType.file:
		input = fileInput(file => onChange({inputType: InputType.file, file, text: ''}));
		break;
	case InputType.text:
		input = textInput(
			value.text,
			text => onChange({inputType: InputType.text, file: null, text}),
		);
	}

	return (
		<>
			<Dropdown
				value={value.inputType}
				onOptionSelect={
					(_, {optionValue}) => onChange(
						{inputType: optionValue as InputType, file: null, text: ''},
					)
				}
				placeholder='Import type'
				id='SourceInput-Dropdown'
			>
				<Option
					value={InputType.file}
				>
					File
				</Option>
				<Option>
					Text input
				</Option>
			</Dropdown>
			<div className="smallDivider" />
			{input}
		</>
	);
}