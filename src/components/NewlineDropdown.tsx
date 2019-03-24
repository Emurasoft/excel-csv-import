import * as React from 'react';
import {
    ResponsiveMode,
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {BaseProps} from './BaseProps';
import {NewlineSequence} from '../Parser';
import {withTranslation} from 'react-i18next';

const autoDetectOption: Readonly<IDropdownOption> = Object.freeze({
    key: NewlineSequence.AutoDetect,
    text: "Auto-detect",
});

const newlineSequeneceMenu: ReadonlyArray<IDropdownOption> = Object.freeze([
    {
        key: NewlineSequence.CRLF,
        text: "CRLF",
    },
    {
        key: NewlineSequence.CR,
        text: "CR",
    },
    {
        key: NewlineSequence.LF,
        text: "LF",
    },
]);

interface Props extends BaseProps<NewlineSequence> {
    showAutoDetect: boolean;
}

export class NewlineDropdownComponent extends React.Component<Props, {}> {
    public constructor(props: Props) {
        super(props);
        if (props.showAutoDetect) {
            this._options = [autoDetectOption, ...newlineSequeneceMenu];
        } else {
            this._options = [...newlineSequeneceMenu];
        }
    }

    public render(): React.ReactNode {
        return (
            <Dropdown
                label='Newline sequence'
                responsiveMode={ResponsiveMode.large}
                selectedKey={this.props.value}
                options={this._options}
                onChange={(_, option) => {this.props.onChange(option.key as NewlineSequence)}}
            />
        );
    }

    private readonly _options: IDropdownOption[];
}

// @ts-ignore
export const NewlineDropdown = withTranslation('importExport')(NewlineDropdownComponent);