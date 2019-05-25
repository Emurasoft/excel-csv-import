import * as React from 'react';
import {BaseProps} from './BaseProps';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {
    ResponsiveMode,
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {ExportType} from './Export';

interface Props extends BaseProps<ExportType> {
    enableFileExport: boolean;
}

export class ExportTypeDropdown extends React.Component<Props, {}> {
    public render(): React.ReactNode {

        const textOption: IDropdownOption = {
            key: ExportType.text,
            text: 'Textbox',
        }

        let options: IDropdownOption[];
        if (this.props.enableFileExport) {
            options = [
                {
                    key: ExportType.file,
                    text: 'File',
                },
                textOption,
            ];
        } else {
            options = [textOption];
        }

        return (
            <Dropdown
                label={'Export type'}
                options={options}
                responsiveMode={ResponsiveMode.large}
                selectedKey={this.props.value}
                onChange={(_, option) => this.props.onChange(option.key as ExportType)}
            />
        );
    }
}