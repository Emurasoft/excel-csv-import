import * as React from 'react';
import {InputSource, Source} from '../../Parser';
import * as style from '../style';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import {
    ResponsiveMode
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';

interface Props {
    value: Source;
    onChange: (newSource: Source) => void;
}

export class SourceInput extends React.Component<Props, {}> {
    public render() {
        const fileSourceMenu: IDropdownOption[] = [
            {
                key: InputSource.file,
                text: 'File',
            },
            {
                key: InputSource.textinput,
                text: 'Text input',
            },
            {
                key: InputSource.url,
                text: 'URL',
            },
        ];

        const componentMap = {
            [InputSource.file]: (
                <>
                    <input
                        type="file"
                        onChange={this.fileOnChange}
                        id="SourceInput-FileInput"
                    />
                    <br />
                </>
            ),
            [InputSource.textinput]: (
                <TextField
                    style={style.monospace}
                    multiline rows={10}
                    wrap="off"
                    onChange={this.textOnChangeHandler(InputSource.textinput)}
                    value={this.props.value.text as string}
                    id="SourceInput-TextInput"
                />
            ),
            [InputSource.url]: (
                <TextField
                    onChange={this.textOnChangeHandler(InputSource.url)}
                    placeholder="URL of CSV file"
                    value={this.props.value.text as string}
                    id="SourceInput-URLInput"
                />
            ),
        };

        return (
            <>
                <Dropdown
                    label='Import type'
                    options={fileSourceMenu}
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.props.value.inputSource}
                    onChange={this.dropdownOnChange}
                    id='SourceInput-Dropdown'
                />
                <div style={{height: '5px'}} />
                {componentMap[this.props.value.inputSource]}
            </>
        );
    }

    private dropdownOnChange = (_, option) => {
        this.props.onChange({inputSource: option.key as InputSource, file: null, text: ''});
    }

    private fileOnChange =(e) => {
        this.props.onChange({inputSource: InputSource.file, file: e.target.files[0], text: ''});
    }

    private textOnChangeHandler(inputSource: InputSource) {
        return (_, value) => {
            this.props.onChange({inputSource, text: value});
        }
    }
}