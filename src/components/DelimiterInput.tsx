import * as React from 'react';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import * as style from './style.css';
import {
    ResponsiveMode,
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {BaseProps} from './BaseProps';
import {withTranslation} from 'react-i18next';

export enum DropdownOptionKey {comma, space, tab, other}

interface Props extends BaseProps<string> {
    showLengthError: boolean;
}

interface State {
    otherSelected: boolean;
}

export class DelimiterInputComponent extends React.Component<Props, State> {
    public constructor(props) {
        super(props);
        this.state = {otherSelected: false};

        this._stringToDropdownKey = {
            '\u002c': DropdownOptionKey.comma,
            '\u0020': DropdownOptionKey.space,
            '\u0009': DropdownOptionKey.tab,
        };
    }

    public render(): React.ReactNode {
        const t = this.props.t;

        const dropdownOptions: IDropdownOption[] = [
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
                text: t('Other'),
            },
        ];

        const customInput = (
            <div className={style.smallDivider}>
                <TextField
                    className={style.monospace}
                    value={this.props.value}
                    onChange={(_, value) => this.props.onChange(value)}
                    description={DelimiterInputComponent.description(this.props.value)}
                    onGetErrorMessage={this.getErrorMessage}
                    deferredValidationTime={1}
                    placeholder={t('Enter custom delimiter')}
                />
            </div>
        );

        return (
            <>
                <Dropdown
                    label={t('Delimiter')}
                    options={dropdownOptions}
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
            return DelimiterInputComponent.codePoint(delimiter);
        } else {
            return '\u00A0';
        }
    }

    private static codePoint(c: string): string {
        return 'U+' + c[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    }

    private readonly _stringToDropdownKey: {[key: string]: DropdownOptionKey};

    private showCustomInput(): boolean {
        if (this.state.otherSelected) {
            return true;
        }

        return !['\u002c', '\u0020', '\u0009'].includes(this.props.value);
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
            return this.props.t('Delimiter length must be 1');
        } else {
            return '';
        }
    }
}

export const DelimiterInput = withTranslation('importExport')(DelimiterInputComponent);