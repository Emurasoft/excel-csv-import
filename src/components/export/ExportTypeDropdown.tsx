import * as React from 'react';
import {CustomBaseProps} from '../CustomBaseProps';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {ResponsiveMode} from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';

export enum ExportType{file, textbox}

export class ExportTypeDropdown extends React.Component<CustomBaseProps<ExportType>, {}> {
    public render() {
        const options: IDropdownOption[] = [
            {
                key: ExportType.file,
                text: 'File',
            },
            {
                key: ExportType.textbox,
                text: 'Textbox',
            },
        ];

        return (
            <Dropdown
                label='Export type'
                options={options}
                responsiveMode={ResponsiveMode.large}
                selectedKey={this.props.value}
                onChange={(_, option) => this.props.onChange(option.key as any)}
            />
        );
    }
}