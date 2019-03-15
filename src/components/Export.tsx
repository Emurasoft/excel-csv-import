import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, Text, TextField} from 'office-ui-fabric-react';
import {ExportOptions, ExportType, NewlineSequence} from '../Parser';
import * as style from './style';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';

export interface OutputText {
    show: boolean;
    text: string;
}

type State = ExportOptions & {outputText: OutputText, processing: boolean};

export class ExportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            exportType: ExportType.file,
            delimiter: '\u002c',
            newline: NewlineSequence.CRLF,
            encoding: 'UTF-8',
            processing: false,
            outputText: {
                show: false,
                text: '',
            },
        };
    }

    public render() {
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
                <EncodingDropdown
                    value={this.state.encoding}
                    onChange={(encoding) => this.setState({encoding})}
                    hidden={this.state.exportType === ExportType.text}
                    showAutoDetect={false}
                />
                <DelimiterDropdown
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                    showAutoDetect={false}
                />
                <br />
                <NewlineDropdown
                    value={this.state.newline}
                    onChange={(newline) => this.setState({newline})}
                    showAutoDetect={false}
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