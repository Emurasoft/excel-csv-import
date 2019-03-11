import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {Dropdown, IDropdownOption, PrimaryButton, TextField} from 'office-ui-fabric-react';
import {ResponsiveMode} from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import {ImportOptions, InputSource, Source} from '../Parser';

enum NewlineSequence {AutoDetect, CRLF, CR, LF}

interface State {
    inputSource: InputSource;
    source: Source | null;
    delimiter: string;
    newlineSequence: NewlineSequence;
    encoding: string;
}

class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            inputSource: InputSource.file,
            source: null,
            delimiter: "",
            newlineSequence: NewlineSequence.AutoDetect,
            encoding: "",
        };
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

        const inputComponentMap = {
            [InputSource.file]:
                <input
                    type="file"
                    onChange={(e) => this.setState(
                        {source: {inputSource: InputSource.file, value: e.target.files[0]}}
                    )}
                />,
            [InputSource.textfield]:
                <TextField
                    ariaLabel="CSV text input"
                    multiline rows={10}
                    wrap="off"
                    onChange={(_, value) => this.setState(
                        {source: {inputSource: InputSource.textfield, value: value}}
                    )}
                />,
            [InputSource.url]:
                <TextField
                    ariaLabel="URL input"
                    onChange={(_, value) => this.setState(
                        {source: {inputSource: InputSource.url, value: value}}
                    )}
                />,
        };

        const newlineSequeneceMenu: IDropdownOption[] = [
            {
                key: NewlineSequence.AutoDetect,
                text: "Auto-detect",
            },
            {
                key: NewlineSequence.CRLF,
                text: "CRLF",
            },
            {
                key: NewlineSequence.CR,
                text: "CR",
            },
            {
                key: NewlineSequence.LF,
                text: "LF",
            },
        ];

        return (
            <div>
                <Dropdown
                    label="Import type"
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.inputSource}
                    options={fileSourceMenu}
                    onChange={(_, option) => {
                        this.setState({inputSource: option.key as InputSource})
                    }}
                />
                <br />
                {inputComponentMap[this.state.inputSource]}
                <br /><br />
                <TextField
                    label="Delimiter"
                    value={this.state.delimiter}
                    description={ImportComponent.delimiterDescription(this.state.delimiter)}
                    onChange={(_, value) => this.setState({delimiter: value})}
                    onGetErrorMessage={ImportComponent.validateDelimiter}
                    deferredValidationTime={20}
                />
                <br />
                <Dropdown
                    label="Newline sequence"
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.newlineSequence}
                    options={newlineSequeneceMenu}
                    onChange={(_, option) => {
                        this.setState({newlineSequence: option.key as NewlineSequence})
                    }}
                />
                <br />
                {/*TODO should be a searchable dropdown*/}
                <TextField
                    label="Encoding"
                    value={this.state.encoding}
                    onChange={(_, value) => this.setState({encoding: value})}
                />
                <br />
                <PrimaryButton onClick={this.import}>
                    Import CSV
                </PrimaryButton>
            </div>
        );// TODO monospace where needed
    }

    private static delimiterDescription(delimiter: string) {
        if (delimiter.length == 0) {
            return "Auto-detect";
        } else {
            return delimiter;
        }
    }

    private static validateDelimiter(value: string) {
        if (value.length > 1) {
            return "Delimiter length must be 0 or 1";
        } else {
            return "";
        }
    }

    private import = () => {
        const newlineMap = {
            [NewlineSequence.AutoDetect]: '',
            [NewlineSequence.CRLF]: '\r\n',
            [NewlineSequence.CR]: '\r',
            [NewlineSequence.LF]: '\n',
        }

        const options: ImportOptions = {
            source: this.state.source,
            delimiter: this.state.delimiter,
            newline: newlineMap[this.state.newlineSequence],
            encoding: this.state.encoding,
        };
        this.props.store.import(options);
    }
}

export const Import = connect(ImportComponent);