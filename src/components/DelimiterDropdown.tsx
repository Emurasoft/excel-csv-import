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
    selectedKey: DropdownOptionKey;
}

export class DelimiterDropdown extends React.Component<Props, State> {
    public constructor(props) {
        super(props);
        if (props.showAutoDetect) {
            this.state = {selectedKey: DropdownOptionKey.autoDetect};
        } else {
            this.state = {selectedKey: DropdownOptionKey.comma};
        }

        if (props.showAutoDetect) {
            this._dropdownOptions = [...DropdownOptionsWithAutoDetect];
        } else {
            this._dropdownOptions = [...DropdownOptionsNoAutoDetect];
        }
    }

    public render(): React.ReactNode {
        const customInput =
        <div className={style.smallDivider}>
            <TextField
                className={style.monospace}
                value={this.props.value}
                onChange={(_, value) => this.props.onChange(value)}
                description={DelimiterDropdown.description(this.props.value)}
                onGetErrorMessage={this.getErrorMessage}
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

    private static description(delimiter: string): string {
        if (delimiter.length == 1) {
            return DelimiterDropdown.codePoint(delimiter);
        } else {
            return '';
        }
    }

    private static codePoint(c: string): string {
        return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
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

    private getErrorMessage = (value: string) => {
        if (this.props.showLengthError && value.length > 1) {
            return 'Delimiter length must be 0 or 1';
        } else {
            return '';
        }
    }
}