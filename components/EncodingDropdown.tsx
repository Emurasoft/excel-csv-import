import {BaseProps} from './BaseProps';
import * as React from 'react';
import {Dropdown, IDropdownOption} from '@fluentui/react';
import {EncodingDropdownOptions} from './EncodingDropdownOptions';

interface Props extends BaseProps<string> {
    showAutoDetect: boolean;
    hidden: boolean;
}

export class EncodingDropdown extends React.Component<Props, {}> {
    public constructor(props: Props) {
        super(props);

        const AutoDetectOption: IDropdownOption = {
            'key': '',
            'text': 'Auto-detect',
        };

        if (props.showAutoDetect) {
            this._dropdownOptions = [AutoDetectOption, ...EncodingDropdownOptions];
        } else {
            this._dropdownOptions = EncodingDropdownOptions;
        }
    }

    public render(): React.ReactNode {
        if (this.props.hidden) {
            return null;
        } else {
            return (
                <>
                    <Dropdown
                        label={'Encoding'}
                        selectedKey={this.props.value}
                        options={this._dropdownOptions}
                        onChange={(_, option) => this.props.onChange(option.key as string)}
                    />
                    <br/>
                </>
            );
        }
    }

    private readonly _dropdownOptions: IDropdownOption[];
}