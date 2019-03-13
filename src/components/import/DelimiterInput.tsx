import * as React from 'react';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import * as style from '../style';
import {ResponsiveMode} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';

export enum DropdownOptionKey {autoDetect, comma, space, tab, other}

interface Props {
    // Called with string if valid delimiter, or null if invalid.
    onChange: (newDelimiter: string | null) => void;
}

interface State {
    selectedKey: DropdownOptionKey;
    textFieldValue: string;
}

export class DelimiterInput extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            selectedKey: DropdownOptionKey.autoDetect,
            textFieldValue: '',
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
                value={this.state.textFieldValue}
                onChange={this.textFieldOnChange}
                description={DelimiterInput.description(this.state.textFieldValue)}
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

        this.setState({
            selectedKey: option.key as DropdownOptionKey,
            textFieldValue: optionKeyMap[option.key],
        });
        this.props.onChange(optionKeyMap[option.key]);
    }

    private textFieldOnChange = (_, value) => {
        this.setState({textFieldValue: value});

        if (!DelimiterInput.valid(value)) {
            this.props.onChange(null);
        } else {
            this.props.onChange(value);
        }
    }

    private static description(delimiter: string) {
        if (delimiter.length == 0) {
            return 'Auto-detect';
        } else if (delimiter.length == 1) {
            return DelimiterInput.codePoint(delimiter);
        } else {
            return '';
        }
    }

    private static codePoint(c: string) {
        return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    }

    private static valid(value: string) {
        return value.length <= 1;
    }

    private static getErrorMessage(value: string) {
        if (DelimiterInput.valid(value)) {
            return '';
        } else {
            return 'Delimiter length must be 0 or 1';
        }
    }
}