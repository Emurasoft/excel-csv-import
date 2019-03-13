import * as React from 'react';
import {InputSource, Source} from '../../Parser';
import * as style from '../style';
import {Dropdown, IDropdownOption, TextField} from 'office-ui-fabric-react';
import {ResponsiveMode} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';

interface Props {
    defaultInputSource: InputSource;
    onChange: (newSource: Source) => void;
}

interface State {
    inputSource: InputSource;
    textFieldValue: string;
}

export class SourceInput extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {inputSource: props.defaultInputSource, textFieldValue: ''};
    }

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
                        onChange={(e) => this.props.onChange(
                            {inputSource: InputSource.file, value: e.target.files[0]}
                        )}
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
                    onChange={this.onChangeHandler(InputSource.textinput)}
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
                    label='Import type'
                    options={fileSourceMenu}
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.inputSource}
                    onChange={(_, option) => {
                        this.setState({inputSource: option.key as InputSource, textFieldValue: ''})
                    }}
                    id='SourceInput-Dropdown'
                /><br />
                {componentMap[this.state.inputSource]}
            </>
        );
    }

    private onChangeHandler = (inputSource: InputSource) => (_, value) => {
        this.setState({textFieldValue: value});
        this.props.onChange({inputSource, value});
    }
}