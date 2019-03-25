import {BaseProps} from './BaseProps';
import * as React from 'react';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {EncodingDropdownOptions} from './EncodingDropdownOptions';
import {withTranslation} from 'react-i18next';

interface Props extends BaseProps<string> {
    showAutoDetect: boolean;
    hidden: boolean;
}

export class EncodingDropdownComponent extends React.Component<Props, {}> {
    public constructor(props: Props) {
        super(props);

        const AutoDetectOption: IDropdownOption = {
            'key': '',
            'text': props.t('Auto-detect'),
        };

        if (props.showAutoDetect) {
            this._dropdownOptions = [AutoDetectOption, ...EncodingDropdownOptions];
        } else {
            this._dropdownOptions = EncodingDropdownOptions;
        }
    }

    public render(): React.ReactNode {
        const t = this.props.t;
        if (this.props.hidden) {
            return null;
        } else {
            return (
                <>
                    <Dropdown
                        label={t('EncodingDropdown.Encoding')}
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

// @ts-ignore
export const EncodingDropdown = withTranslation('importExport')(EncodingDropdownComponent);