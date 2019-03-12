import * as React from 'react';
import {InputSource, Source} from '../../Parser';
import * as style from '../style';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import {ResponsiveMode} from '../ResponsiveMode';

interface Props {
    onChange: (newSource: Source) => void;
}

interface State {
    inputSource: InputSource;
    textFieldValue: string;
}

export class SourceInput extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {inputSource: InputSource.file, textFieldValue: ''};
    }

    public render() {
        const fileSourceMenu: IDropdownOption[] = [
            {
                key: InputSource.file,
                text: 'File',
            },
            {
                key: InputSource.textfield,
                text: 'Text input',
            },
            {
                key: InputSource.url,
                text: 'URL',
            },
        ];

        const componentMap = {
            [InputSource.file]: (
                <input
                    type="file"
                    onChange={(e) => this.props.onChange(
                        {inputSource: InputSource.file, value: e.target.files[0]}
                    )}
                    id="SourceInput-FileInput"
                />
            ),
            [InputSource.textfield]: (
                <TextField
                    style={style.monospace}
                    multiline rows={10}
                    wrap="off"
                    onChange={this.onChangeHandler(InputSource.textfield)}
                    value={this.state.textFieldValue}
                    id="SourceInput-TextInput"
                />
            ),
            [InputSource.url]: (
                <TextField
                    onChange={this.onChangeHandler(InputSource.url)}
                    placeholder="URL of CSV file"
                    value={this.state.textFieldValue}
                    id="SourceInput-URLInput"
                />
            ),
        };

        return (
            <>
                <Dropdown
                    label="Import type"
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.inputSource}
                    options={fileSourceMenu}
                    onChange={(_, option) => {
                        this.setState({inputSource: option.key as InputSource, textFieldValue: ''})
                    }}
                    id='SourceInput-Dropdown'
                /><br />
                {componentMap[this.state.inputSource]}
                <br />
            </>
        );
    }

    private onChangeHandler = (inputSource: InputSource) => (_, value) => {
        this.setState({textFieldValue: value});
        this.props.onChange({inputSource, value});
    }
}