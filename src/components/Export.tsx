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
import {ProgressText} from './ProgressText';

export interface OutputText {
    show: boolean;
    text: string;
}

type State = ExportOptions & {outputText: OutputText; processing: boolean; largeFile: boolean};

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
            largeFile: false,
        };
    }

    public render(): React.ReactNode {
        const outputTextField = (
            <TextField
                label='Export result'
                style={style.monospace}
                readOnly={true}
                multiline rows={15}
                wrap='off'
                value={this.state.outputText.text}
            />
        );

        const largeFileWarning = (
            <Text style={{color: 'red'}} variant='medium'>
                Large file export is not supported.
            </Text>
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
                    showLengthError={false}
                />
                <br />
                <NewlineDropdown
                    value={this.state.newline}
                    onChange={(newline) => this.setState({newline})}
                    showAutoDetect={false}
                />
                <br />
                <PrimaryButton
                    onClick={this.buttonOnClick}
                    disabled={this.props.store.state.initialized}
                >
                    Export as CSV
                </PrimaryButton> {/*TODO disable button when initializing*/}
                <br />
                {this.state.largeFile ? largeFileWarning : null}
                <ProgressText hidden={!this.state.processing} />
                {this.state.outputText.show ? outputTextField : null}
            </>
        );
    }

    public async componentDidMount(): Promise<void> {
        // 1gb divided by 50 bytes per cell = 20,000,000 cells
        const aLargeExcelDocumentProbablyHasThisManyCells = 10**9 / 50;
        const largeFile =
            await this.props.store.worksheetArea() > aLargeExcelDocumentProbablyHasThisManyCells;
        this.setState({largeFile});
    }

    private buttonOnClick = async () => {
        this.setState({processing: true, outputText: {show: false, text: ''}});

        // Copy values before async operation
        const exportType = this.state.exportType;
        const blobOptions = {type: 'text/csv;charset=' + this.state.encoding};

        const csvStringAndName = await this.props.store.csvStringAndName(this.state);
        this.setState({processing: false});
        switch (exportType) {
        case ExportType.file: {
            const blob = new Blob([csvStringAndName.string], blobOptions);
            FileSaver.saveAs(blob, csvStringAndName.name + '.csv');
            return;
        }
        case ExportType.text: {
            this.setState({outputText: {show: true, text: csvStringAndName.string}});
            return;
        }
        }
    }
}

export const Export = connect(ExportComponent);