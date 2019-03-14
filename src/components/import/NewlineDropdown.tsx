import * as React from 'react';
import {ResponsiveMode} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {BaseProps} from '../BaseProps';

export enum NewlineSequence {
    AutoDetect = '',
    CRLF = '\r\n',
    CR = '\r',
    LF = '\n'
}

export class NewlineDropdown extends React.Component<BaseProps<NewlineSequence>, {}> {
    public render() {
        const newlineSequeneceMenu: IDropdownOption[] = [
            {
                key: NewlineSequence.AutoDetect,
                text: "Auto-detect",
            },
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
        ];

        return (
            <Dropdown
                label="Newline sequence"
                responsiveMode={ResponsiveMode.large}
                selectedKey={this.props.value}
                options={newlineSequeneceMenu}
                onChange={(_, option) => {this.props.onChange(option.key as NewlineSequence)}}
            />
        );
    }
}