import * as React from 'react';
import {BaseProps} from './BaseProps';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import {
    ResponsiveMode,
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {withTranslation} from 'react-i18next';
import {ExportType} from './Export';

export class ExportTypeDropdownComponent extends React.Component<BaseProps<ExportType>, {}> {
    public render(): React.ReactNode {
        const t = this.props.t;
        const options: IDropdownOption[] = [
            {
                key: ExportType.file,
                text: t('File'),
            },
            {
                key: ExportType.text,
                text: t('Textbox'),
            },
        ];

        return (
            <Dropdown
                label={t('Export type')}
                options={options}
                responsiveMode={ResponsiveMode.large}
                selectedKey={this.props.value}
                onChange={(_, option) => this.props.onChange(option.key as ExportType)}
            />
        );
    }
}

// @ts-ignore
export const ExportTypeDropdown = withTranslation('importExport')(ExportTypeDropdownComponent);