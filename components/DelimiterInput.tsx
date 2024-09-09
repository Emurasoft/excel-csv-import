import * as React from 'react';
import {Body1, Dropdown, Input, Label, Option, Subtitle1} from '@fluentui/react-components';
import {useState} from 'react';
import { useStyles } from './styles';

export const enum DropdownOption {
	comma = 'Comma',
	space = 'Space',
	tab = 'Tab',
	other = 'Other',
}

interface Props {
	showLengthError: boolean;
	value: string;
	onChange: (value: string) => void;
}

const stringToDropdownKey = {
	'\u002c': DropdownOption.comma,
	'\u0020': DropdownOption.space,
	'\u0009': DropdownOption.tab,
};

const dropdownToString = {
	[DropdownOption.comma]: '\u002c',
	[DropdownOption.space]: '\u0020',
	[DropdownOption.tab]: '\u0009',
	[DropdownOption.other]: '',
};

export function DelimiterInput({showLengthError, value, onChange}: Props): React.ReactElement {
	const [otherSelected, setOtherSelected] = useState(false);
	const styles = useStyles();

	const selectedKey = (): DropdownOption => {
		if (!otherSelected && value in stringToDropdownKey) {
			return stringToDropdownKey[value];
		}

		return DropdownOption.other;
	}

	const customInput = (
		<div className="smallDivider">
			<Input
				className={styles.monospace}
				value={value}
				onChange={(_, {value}) => onChange(value)}
				placeholder="Enter custom delimiter"
				spellCheck={false}
			/>
			<br />
			<Body1>{description(value)}</Body1>
			{
				showLengthError && value.length > 1 
				&& <Body1 className={styles.redText}>
					Delimiter length must be 1
				</Body1>
			}
		</div>
	);

	return (
		<>
			<Label> 
				<Subtitle1>Delimiter</Subtitle1>
				<br />
				<Dropdown
					placeholder="Delimiter"
					value={selectedKey()}
					onOptionSelect={(_, {optionValue}) => {
						setOtherSelected(optionValue === DropdownOption.other);
						onChange(dropdownToString[optionValue]);
					}}
				>
					<Option>{DropdownOption.comma}</Option>
					<Option>{DropdownOption.space}</Option>
					<Option>{DropdownOption.tab}</Option>
					<Option>{DropdownOption.other}</Option>
				</Dropdown>
				{
					otherSelected || !['\u002c', '\u0020', '\u0009'].includes(value)
						? customInput
						: null
				}
			</Label>
		</>
	);
}

function description(delimiter: string): string {
	if (delimiter.length == 1) {
		return codePoint(delimiter);
	} else {
		return '\u00A0';
	}
}

export function codePoint(c: string): string {
	return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
}