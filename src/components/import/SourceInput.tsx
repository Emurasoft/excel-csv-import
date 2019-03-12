import * as React from 'react';
import {InputSource, Source} from '../../Parser';
import * as style from '../style';
import {TextField} from 'office-ui-fabric-react';

interface Props {
    inputSource: InputSource;
    onChange: (newSource: Source) => void;
}

interface State {
    inputSource: InputSource;
    textFieldValue: string;
}

export class SourceInput extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {inputSource: null, textFieldValue: ''};
    }

    public componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.inputSource !== this.state.inputSource) {
            this.setState({inputSource: nextProps.inputSource, textFieldValue: ''});
        }
    }

    public render() {
        const componentMap = {
            [InputSource.file]: (
                <input
                    type="file"
                    onChange={(e) => this.props.onChange(
                        {inputSource: InputSource.file, value: e.target.files[0]}
                    )}
                />
            ),
            [InputSource.textfield]: (
                <TextField
                    style={style.monospace}
                    multiline rows={10}
                    wrap="off"
                    onChange={this.onChangeHandler(InputSource.textfield)}
                    value={this.state.textFieldValue}
                />
            ),
            [InputSource.url]: (
                <TextField
                    onChange={this.onChangeHandler(InputSource.url)}
                    placeholder="URL of CSV file"
                    value={this.state.textFieldValue}
                />
            ),
        };

        return componentMap[this.props.inputSource];
    }

    private onChangeHandler = (inputSource: InputSource) => (_, value) => {
        this.setState({textFieldValue: value});
        this.props.onChange({inputSource, value});
    }
}