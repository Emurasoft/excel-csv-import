import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, Text, TextField, Toggle, TooltipHost} from 'office-ui-fabric-react';
import {CsvStringAndName, ExportOptions, ExportType, NewlineSequence} from '../Parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ErrorOutput} from './ErrorOutput';
import {StoredComponent} from './StoredComponent';

export interface OutputText {
    // If show is false, do not show text.
    show: boolean;
    text: string;
}

type State = ExportOptions & {outputText: OutputText; processing: boolean};

export class ExportComponent extends StoredComponent<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props, 'Export', {
            exportType: ExportType.file,
            delimiter: '\u002c',
            newline: NewlineSequence.CRLF,
            encoding: 'UTF-8',
            processing: false,
            outputText: {
                show: false,
                text: '',
            },
        }, ['exportType', 'delimiter', 'newline', 'encoding']);
    }

    public render(): React.ReactNode {
        const outputTextField = (
            <TextField
                label='Export result'
                className={style.monospace}
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
            <div className={style.pageMargin}>
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
                <DelimiterInput
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
                <TooltipHost
                    styles={{root: {display: 'inline-block'}}}
                    content={this.buttonTooltipContent()}
                >
                    <PrimaryButton
                        onClick={this.buttonOnClick}
                        disabled={this.buttonTooltipContent() !== ''}
                    >
                        Export to CSV
                    </PrimaryButton>
                </TooltipHost>
                <br />
                {this.props.store.state.largeFile ? largeFileWarning : null}
                <ProgressBar
                    onClick={this.props.store.abort}
                    progress={this.props.store.state.progress}
                />
                <Toggle
                    inlineLabel label='Save options'
                    defaultChecked={this.initialSaveStatus()}
                    onChange={(_, checked) => this.setSaveStatus(checked)}
                />
                {this.state.outputText.show ? outputTextField : null}
                <ErrorOutput parserStatus={this.props.store.state.parserStatus} />
                <BottomBar />
            </div>
        );
    }

    private buttonOnClick = async () => {
        this.setState((state) => ({
            processing: !state.processing,
            outputText: {show: !state.outputText.show, text: state.outputText.text},
        }));

        // Copy values before async operation
        const exportOptions = {...this.state};

        const csvStringAndName = await this.props.store.csvStringAndName(this.state);
        this.setState((state) => ({processing: !state.processing}))
        if (csvStringAndName === null) {
            return;
        }

        this.saveOrOutput(csvStringAndName, exportOptions);
    }

    private saveOrOutput(csvStringAndName: CsvStringAndName, exportOptions: ExportOptions): void {
        switch (exportOptions.exportType) {
        case ExportType.file: {
            const options = {type: 'text/csv;charset=' + exportOptions.encoding};
            const blob = new Blob([csvStringAndName.string], options);
            FileSaver.saveAs(blob, csvStringAndName.name + '.csv');
            return;
        }
        case ExportType.text: {
            this.setState({outputText: {show: true, text: csvStringAndName.string}});
            return;
        }
        }
    }

    private buttonTooltipContent(): string {
        if (!this.props.store.state.initialized) {
            return 'Excel API is not initialized';
        } else {
            return '';
        }
    }
}

export default connect(ExportComponent);