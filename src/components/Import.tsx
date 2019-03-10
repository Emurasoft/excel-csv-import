import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {Dropdown, IDropdownOption, Label, TextField} from 'office-ui-fabric-react';

enum FileSource {file, textfield, url}

enum NewlineSequence {CRLF, CR, LF}

interface State {
    fileSource: FileSource;
    delimiter: string;
    newlineSequence: NewlineSequence;
}

class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            fileSource: FileSource.file,
            delimiter: "\u002c",
            newlineSequence: NewlineSequence.CRLF,
        }
    }

    public render() {
        const fileSourceMenu: IDropdownOption[] = [
            {
                key: FileSource.file,
                text: 'File',
            },
            {
                key: FileSource.textfield,
                text: 'Text input',
            },
            {
                key: FileSource.url,
                text: 'URL',
            },
        ];

        const newlineSequeneceMenu: IDropdownOption[] = [
            {
                key: NewlineSequence.CRLF,
                text: "\\r\\n",
            },
            {
                key: NewlineSequence.CR,
                text: "\\r",
            },
            {
                key: NewlineSequence.LF,
                text: "\\n",
            },
        ];

        return (
            <div>
                <Dropdown
                    label="Import type"
                    selectedKey={this.state.fileSource}
                    options={fileSourceMenu}
                    onChange={(_, option) => this.setState({fileSource: option.key as FileSource})}
                />
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
}

export const Import = connect(ImportComponent);