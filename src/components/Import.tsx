import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {Dropdown, IDropdownOption, Label, PrimaryButton, TextField} from 'office-ui-fabric-react';
import {ParseConfig} from 'papaparse';

enum InputSource {file, textfield, url}

enum NewlineSequence {
    CRLF = "\r\n",
    CR = "\r",
    LF = "\n",
    AutoDetect = "",
}

interface State {
    inputSource: InputSource;
    source: File|string;
    delimiter: string;
    newlineSequence: NewlineSequence;
    encoding: string;
}

class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            inputSource: InputSource.file,
            source: "",
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
                    selectedKey={this.state.inputSource}
                    options={fileSourceMenu}
                    onChange={(_, option) => {
                        this.setState({inputSource: option.key as InputSource})
                    }}
                />
                <br />
                {this.inputComponent(this.state.inputSource)}
                <br />
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
                    description={ImportComponent.encodingDescription(this.state.encoding)}
                    onChange={(_, value) => this.setState({encoding: value})}
                />
                <br />
                <PrimaryButton onClick={this.import}>
                    Import CSV
                </PrimaryButton>
            </div>
        );// TODO monospace where needed
    }

    private inputComponent = (importSource: InputSource) => {
        switch (importSource) {
        case InputSource.file:
            return (
                <input
                    onChange={(e) => this.setState({source: e.target.files[0]})}
                />
            );
        }
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

    private static encodingDescription(encoding: string) {
        if (encoding === "") {
            return "Auto-detect";
        } else {
            return "";
        }
    }

    private import = () => {
        const config: ParseConfig = {
            delimiter: this.state.delimiter,
            newline: this.state.newlineSequence,
            encoding: this.state.encoding,
        }
        this.props.store.importFile(this.state.source as File, config);
    }
}

export const Import = connect(ImportComponent);