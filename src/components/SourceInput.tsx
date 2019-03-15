import * as React from 'react';
import {InputType, Source} from '../Parser';
import * as style from './style';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import {
    ResponsiveMode
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
            {
                key: InputType.url,
                text: 'URL',
            },
        ];

        const componentMap = {
            [InputType.file]: (
                <>
                    <input
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
                    style={style.monospace}
                    multiline rows={10}
                    wrap='off'
                    onChange={this.textOnChangeHandler(InputType.text)}
                    value={this.props.value.text as string}
                    id='SourceInput-TextInput'
                />
            ),
            [InputType.url]: (
                <TextField
                    onChange={this.textOnChangeHandler(InputType.url)}
                    placeholder='URL of CSV file'
                    value={this.props.value.text as string}
                    id='SourceInput-URLInput'
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
                <div style={{height: '5px'}} />
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

    private textOnChangeHandler(inputType: InputType): (_, value: string) => void {
        return (_, value) => {
            this.props.onChange({inputType, text: value});
        }
    }
}