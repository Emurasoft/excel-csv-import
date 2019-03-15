import * as React from 'react';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import * as style from './style';
import {
    ResponsiveMode
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {BaseProps} from './BaseProps';

export enum DropdownOptionKey {autoDetect, comma, space, tab, other}

const DropdownOptionsNoAutoDetect: ReadonlyArray<IDropdownOption> = Object.freeze([
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
]);

const DropdownOptionsWithAutoDetect: ReadonlyArray<IDropdownOption> = Object.freeze([
    {
        key: DropdownOptionKey.autoDetect,
        text: 'Auto-detect',
    },
    ...DropdownOptionsNoAutoDetect,
]);

type Props = BaseProps<string> & {showAutoDetect: boolean};

interface State {
    selectedKey: DropdownOptionKey;
}

export class DelimiterDropdown extends React.Component<Props, State> {
    public constructor(props) {
        super(props);
        this.state = {
            selectedKey: props.showAutoDetect ? DropdownOptionKey.autoDetect
                                              : DropdownOptionKey.comma,
        };

        if (props.showAutoDetect) {
            this._dropdownOptions = [...DropdownOptionsWithAutoDetect];
        } else {
            this._dropdownOptions = [...DropdownOptionsNoAutoDetect];
        }
    }

    public render() {
        const customInput =
        <div style={{marginTop: '5px'}}>
            <TextField
                style={style.monospace}
                value={this.props.value}
                onChange={this.textFieldOnChange}
                description={DelimiterDropdown.description(this.props.value)}
                onGetErrorMessage={DelimiterDropdown.getErrorMessage}
                deferredValidationTime={1}
                id='DelimiterDropdown-TextField'
                placeholder='Enter custom delimiter'
            />
        </div>;

        return (
            <>
                <Dropdown
                    label='Delimiter'
                    options={this._dropdownOptions}
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.selectedKey}
                    onChange={this.dropdownOnChange}
                    id='DelimiterDropdown-Dropdown'
                />
                {this.state.selectedKey == DropdownOptionKey.other ? customInput : null}
            </>
        );
    }

    private readonly _dropdownOptions: IDropdownOption[];

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
            return DelimiterDropdown.codePoint(delimiter);
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