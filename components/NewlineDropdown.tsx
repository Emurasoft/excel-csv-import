import * as React from 'react';
import {Dropdown, IDropdownOption, ResponsiveMode} from '@fluentui/react';
import {BaseProps} from './BaseProps';
import {NewlineSequence} from '../Parser';

interface Props extends BaseProps<NewlineSequence> {
	showAutoDetect: boolean;
}

export class NewlineDropdown extends React.Component<Props, {}> {
	public constructor(props: Props) {
		super(props);
		const autoDetectOption: IDropdownOption = {
			key: NewlineSequence.AutoDetect,
			text: 'Auto-detect',
		};

		const newlineSequeneceMenu = [
			{
				key: NewlineSequence.CRLF,
				text: 'CRLF',
			},
			{
				key: NewlineSequence.CR,
				text: 'CR',
			},
			{
				key: NewlineSequence.LF,
				text: 'LF',
			},
		];

		if (props.showAutoDetect) {
			this._options = [autoDetectOption, ...newlineSequeneceMenu];
		} else {
			this._options = newlineSequeneceMenu;
		}
	}

	public render(): React.ReactNode {
		return (
			<Dropdown
				label={'Newline sequence'}
				responsiveMode={ResponsiveMode.large}
				selectedKey={this.props.value}
				options={this._options}
				onChange={(_, option) => this.props.onChange(option.key as NewlineSequence)}
			/>
		);
	}

	private readonly _options: IDropdownOption[];
}