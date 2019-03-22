import * as React from 'react';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import * as style from './style.css';
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

type Props = BaseProps<string> & {showAutoDetect: boolean; showLengthError: boolean};

interface State {
    otherSelected: boolean;
}

export class DelimiterInput extends React.Component<Props, State> {
    public constructor(props) {
        super(props);
        this.state = {otherSelected: false};

        this._stringToDropdownKey = {
            '\u002c': DropdownOptionKey.comma,
            '\u0020': DropdownOptionKey.space,
            '\u0009': DropdownOptionKey.tab,
        };

        if (props.showAutoDetect) {
            this._stringToDropdownKey[''] = DropdownOptionKey.autoDetect;
            this._dropdownOptions = [...DropdownOptionsWithAutoDetect];
        } else {
            this._dropdownOptions = [...DropdownOptionsNoAutoDetect];
        }
    }

    public render(): React.ReactNode {
        const customInput = (
            <div className={style.smallDivider}>
                <TextField
                    className={style.monospace}
                    value={this.props.value}
                    onChange={(_, value) => this.props.onChange(value)}
                    description={DelimiterInput.description(this.props.value)}
                    onGetErrorMessage={this.getErrorMessage}
                    deferredValidationTime={1}
                    placeholder='Enter custom delimiter'
                />
            </div>
        );

        return (
            <>
                <Dropdown
                    label='Delimiter'
                    options={this._dropdownOptions}
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.selectedKey()}
                    onChange={this.dropdownOnChange}
                />
                {this.showCustomInput() ? customInput : null}
            </>
        );
    }

    private static description(delimiter: string): string {
        if (delimiter.length == 1) {
            return DelimiterInput.codePoint(delimiter);
        } else {
            return '';
        }
    }

    private static codePoint(c: string): string {
        return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    }

    private readonly _dropdownOptions: IDropdownOption[];
    private readonly _stringToDropdownKey: {[key: string]: DropdownOptionKey};

    private showCustomInput(): boolean {
        if (this.state.otherSelected) {
            return true;
        }

        const delimitersInDropdown = ['\u002c', '\u0020', '\u0009'];
        if (this.props.showAutoDetect) {
            delimitersInDropdown.push('');
        }
        return !delimitersInDropdown.includes(this.props.value);
    }

    private selectedKey(): DropdownOptionKey {
        if (this.state.otherSelected) {
            return DropdownOptionKey.other;
        }

        if (this.props.value in this._stringToDropdownKey) {
            return this._stringToDropdownKey[this.props.value];
        } else {
            return DropdownOptionKey.other;
        }
    }

    private dropdownOnChange = (_, option: IDropdownOption) => {
        const dropdownToString = {
            [DropdownOptionKey.autoDetect]: '',
            [DropdownOptionKey.comma]: '\u002c',
            [DropdownOptionKey.space]: '\u0020',
            [DropdownOptionKey.tab]: '\u0009',
            [DropdownOptionKey.other]: '',
        };

        this.setState({otherSelected: option.key === DropdownOptionKey.other});
        this.props.onChange(dropdownToString[option.key]);
    }

    private getErrorMessage = (value: string) => {
        if (this.props.showLengthError && value.length > 1) {
            return 'Delimiter length must be 0 or 1';
        } else {
            return '';
        }
    }
}