import * as React from 'react';
import {InputType, Source} from '../parser';
import {Dropdown, IDropdownOption, ResponsiveMode, TextField} from '@fluentui/react-components';

interface Props {
	value: Source;
	onChange: (value: Source) => void;
}

const fileSourceMenu: IDropdownOption[] = [
	{
		key: InputType.file,
		text: 'File',
	},
	{
		key: InputType.text,
		text: 'Text input',
	},
];

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
		<TextField
			className="monospace"
			multiline rows={10}
			spellCheck={false}
			wrap='off'
			onChange={(_, text) => onChange(text)}
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
				label={'Import type'}
				options={fileSourceMenu}
				responsiveMode={ResponsiveMode.large}
				selectedKey={value.inputType}
				onChange={
					(_, option) => onChange(
						{inputType: option.key as InputType, file: null, text: ''},
					)
				}
				id='SourceInput-Dropdown'
			/>
			<div className="smallDivider" />
			{input}
		</>
	);
}