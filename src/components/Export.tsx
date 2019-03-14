import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown, NewlineSequence} from './NewlineDropdown';
import {EncodingDropdownOptions} from './EncodingDropdownOptions';
import {Dropdown, PrimaryButton, Text, TextField} from 'office-ui-fabric-react';
import {ExportOptions, ExportType} from '../Parser';
import * as style from './style';
import * as FileSaver from 'file-saver';

export interface OutputText {
    show: boolean;
    text: string;
}

type State = ExportOptions & {outputText: OutputText, processing: boolean};

class ExportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            exportType: ExportType.file,
            delimiter: ',',
            newlineSequence: NewlineSequence.CRLF,
            encoding: 'UTF-8',
            processing: false,
            outputText: {
                show: false,
                text: '',
            },
        };
    }

    public render() {
        const encodingDropdown = (
            <>
                <Dropdown
                    label="Encoding"
                    selectedKey={this.state.encoding}
                    options={EncodingDropdownOptions}
                    onChange={(_, option) => this.setState({encoding: option.key as string})}
                />
                <br />
            </>
        )

        const processingText = (
            <>
                <br />
                <Text variant='small'>Processing</Text>
            </>
        );

        const outputTextField = (
            <>
                <br />
                <TextField
                    label="Export result"
                    style={style.monospace}
                    readOnly={true}
                    multiline rows={15}
                    wrap="off"
                    value={this.state.outputText.text}
                />
            </>
        );

        return (
            <>
                <ExportTypeDropdown
                    value={this.state.exportType}
                    onChange={(exportType) => this.setState({exportType})}
                />
                <br />
                {this.state.exportType === ExportType.text ? null : encodingDropdown}
                <DelimiterDropdown
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                /> {/*TODO remove auto-detect option*/}
                <br />
                <NewlineDropdown
                    value={this.state.newlineSequence}
                    onChange={(newlineSequence) => this.setState({newlineSequence})}
                />
                <br />
                <PrimaryButton onClick={this.buttonOnClick}>
                    Export as CSV
                </PrimaryButton>
                {this.state.processing ? processingText : null}
                {this.state.outputText.show ? outputTextField : null}
            </>
        );
        // TODO if spreadsheet is big show notice that large files are not supported, below button
    }

    private buttonOnClick = async () => {
        this.setState({processing: true, outputText: {show: false, text: ''}});

        // Copy values before async operation
        const exportType = this.state.exportType;
        const blobOptions = {type: 'text/csv;charset=' + this.state.encoding};

        const text = await this.props.store.export(this.state);
        this.setState({processing: false});
        switch (exportType) {
        case ExportType.file:
            const blob = new Blob([text], blobOptions);
            FileSaver.saveAs(blob, 'name.csv'); // TODO filename
            return;
        case ExportType.text:
            this.setState({outputText: {show: true, text}});
            return;
        }
    }
}

export const Export = connect(ExportComponent);