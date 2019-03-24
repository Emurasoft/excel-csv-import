import * as React from 'react';
import {InputType, Source} from '../Parser';
import * as style from './style.css';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import {
    ResponsiveMode,
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {BaseProps} from './BaseProps';

export class SourceInput extends React.Component<BaseProps<Source>, {}> {
    public render(): React.ReactNode {
        const fileSourceMenu: IDropdownOption[] = [
            {
                key: InputType.file,
                text: 'File',
            },
            {
                key: InputType.text,
                text: 'Text input',
            },
        ];

        const componentMap = {
            [InputType.file]: (
                <>
                    <input
                        className={style.fullWidth}
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
                    label='Import type'
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