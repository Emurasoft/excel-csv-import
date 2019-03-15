import * as React from 'react';
import {BaseProps} from './BaseProps';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {
    ResponsiveMode
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {ExportType} from '../Parser';

export class ExportTypeDropdown extends React.Component<BaseProps<ExportType>, {}> {
    public render() {
        const options: IDropdownOption[] = [
            {
                key: ExportType.file,
                text: 'File',
            },
            {
                key: ExportType.text,
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