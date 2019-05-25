import * as React from 'react';
import {InputType, Source} from '../Parser';
import * as style from './style.css';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import {
    ResponsiveMode,
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {BaseProps} from './BaseProps';
import {withTranslation} from 'react-i18next';

export class SourceInputComponent extends React.Component<BaseProps<Source>, {}> {
    public render(): React.ReactNode {
        const t = this.props.t;
        const fileSourceMenu: IDropdownOption[] = [
            {
                key: InputType.file,
                text: t('File'),
            },
            {
                key: InputType.text,
                text: t('Text input'),
            },
        ];

        const usingEdgeOrIE = navigator.userAgent.includes('Edge')
            || navigator.userAgent.includes('Trident');

        const componentMap = {
            [InputType.file]: (
                <>
                    <input
                        className={usingEdgeOrIE ? style.fullWidth : null}
                        type='file'
                        accept='text/csv'
                        onChange={this.fileOnChange}
                        id='SourceInput-FileInput'
                    />
                    <br />
                </>
            ),
            [InputType.text]: (
                <TextField
                    className={style.monospace}
                    multiline rows={10}
                    spellCheck={false}
                    wrap='off'
                    onChange={(_, text) => this.props.onChange({inputType: InputType.text, text})}
                    value={this.props.value.text as string}
                    id='SourceInput-TextInput'
                />
            ),
        };

        return (
            <>
                <Dropdown
                    label={'Import type'}
                    options={fileSourceMenu}
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.props.value.inputType}
                    onChange={this.dropdownOnChange}
                    id='SourceInput-Dropdown'
                />
                <div className={style.smallDivider} />
                {componentMap[this.props.value.inputType]}
            </>
        );
    }

    private dropdownOnChange = (_, option) => {
        this.props.onChange({inputType: option.key as InputType, file: null, text: ''});
    }

    private fileOnChange =(e) => {
        this.props.onChange({inputType: InputType.file, file: e.target.files[0], text: ''});
    }
}

// @ts-ignore
export const SourceInput = withTranslation('importExport')(SourceInputComponent);