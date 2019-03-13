import * as React from 'react';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import * as style from '../style';
import {
    ResponsiveMode
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';

export enum DropdownOptionKey {autoDetect, comma, space, tab, other}

interface Props {
    value: string;
    onChange: (newDelimiter: string) => void;
}

interface State {
    selectedKey: DropdownOptionKey;
}

export class DelimiterInput extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            selectedKey: DropdownOptionKey.autoDetect,
        };
    }

    public render() {
        const options: IDropdownOption[] = [
            {
                key: DropdownOptionKey.autoDetect,
                text: 'Auto-detect'
            },
            {
                key: DropdownOptionKey.comma,
                text: 'Comma (U+002C)',
            },
            {
                key: DropdownOptionKey.space,
                text: 'Space (U+0020)',
            },
            {
                key: DropdownOptionKey.tab,
                text: 'Tab (U+0009)',
            },
            {
                key: DropdownOptionKey.other,
                text: 'Other',
            },
        ];

        const customInput =
        <div style={{marginTop: '5px'}}>
            <TextField
                style={style.monospace}
                value={this.props.value}
                onChange={this.textFieldOnChange}
                description={DelimiterInput.description(this.props.value)}
                onGetErrorMessage={DelimiterInput.getErrorMessage}
                deferredValidationTime={1}
                id='DelimiterInput-TextField'
                placeholder='Enter custom delimiter'
            />
        </div>;

        return (
            <>
                <Dropdown
                    label='Delimiter'
                    options={options}
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.selectedKey}
                    onChange={this.dropdownOnChange}
                    id='DelimiterInput-Dropdown'
                />
                {this.state.selectedKey == DropdownOptionKey.other ? customInput : null}
            </>
        );
    }

    private dropdownOnChange = (_, option: IDropdownOption) => {
        const optionKeyMap = {
            [DropdownOptionKey.autoDetect]: '',
            [DropdownOptionKey.comma]: '\u002c',
            [DropdownOptionKey.space]: '\u0020',
            [DropdownOptionKey.tab]: '\u0009',
            [DropdownOptionKey.other]: '',
        }

        this.setState({selectedKey: option.key as DropdownOptionKey});
        this.props.onChange(optionKeyMap[option.key]);
    }

    private textFieldOnChange = (_, value) => {
        this.props.onChange(value);
    }

    private static description(delimiter: string) {
        if (delimiter.length == 1) {
            return DelimiterInput.codePoint(delimiter);
        } else {
            return '';
        }
    }

    private static codePoint(c: string) {
        return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    }

    private static getErrorMessage(value: string) {
        if (value.length <= 1) {
            return '';
        } else {
            return 'Delimiter length must be 0 or 1';
        }
    }
}