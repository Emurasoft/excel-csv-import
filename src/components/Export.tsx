import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {
    PrimaryButton,
    Text,
    TextField,
    Toggle,
    TooltipHost,
} from 'office-ui-fabric-react';
import {CsvStringAndName, ExportOptions, NewlineSequence} from '../Parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {StoredComponent} from './StoredComponent';
import {MenuBar} from './MenuBar';
import {MemoryHistory} from 'history';
import {TitleBar} from './TitleBar';

export interface OutputText {
    // If show is false, do not show text.
    show: boolean;
    text: string;
}

interface Props {
    store: Store;
    history: MemoryHistory;
}

export enum ExportType {file, text}

interface State extends ExportOptions {
    exportType: ExportType;
    outputText: OutputText;
    encoding: string;
}

export class ExportComponent extends StoredComponent<Props, State> {
    public constructor(props: Props) {
        super(props, 'export', {
            exportType: ExportType.file,
            delimiter: '\u002c',
            newline: NewlineSequence.CRLF,
            encoding: 'UTF-8',
            outputText: {
                show: false,
                text: '',
            },
        }, ['exportType', 'delimiter', 'newline', 'encoding']);
    }

    public render(): React.ReactNode {
        const outputTextField = (
            <TextField
                label={'Export result'}
                className={style.monospace}
                readOnly={true}
                multiline rows={15}
                spellCheck={false}
                wrap='off'
                value={this.state.outputText.text}
            />
        );

        const largeFileWarning = (
            <Text style={{color: 'red'}} variant='medium'>
                {'Large file export is not supported'}
            </Text>
        );

        const helpLink = 'https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md'
                       + '#export-csv';

        return (
            <>
                <MenuBar
                    // eslint-disable-next-line no-undef
                    hidden={this.props.store.state.platform !== Office.PlatformType.iOS}
                    onClick={(page) => this.props.history.push(page)}
                />
                <div className={style.pageMargin}>
                    <TitleBar
                        text={'Export CSV'}
                        helpLink={helpLink}
                        // eslint-disable-next-line no-undef
                        mac={this.props.store.state.platform === Office.PlatformType.Mac}
                    />
                    <ExportTypeDropdown
                        enableFileExport={Store.enableFileExport(this.props.store.state.platform)}
                        value={this.exportTypeDropdownValue()}
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
                            text={'Export to CSV'}
                        />
                    </TooltipHost>
                    <br />
                    {this.props.store.state.largeFile ? largeFileWarning : null}
                    <ProgressBar
                        onClick={this.props.store.abort}
                        progress={this.props.store.state.progress}
                    />
                    <Toggle
                        inlineLabel label={'Save options'}
                        defaultChecked={this.initialSaveStatus()}
                        onChange={(_, checked) => this.setSaveStatus(checked)}
                    />
                    {this.state.outputText.show ? outputTextField : null}
                    <ParserOutputBox parserOutput={this.props.store.state.parserOutput} />
                    <BottomBar />
                </div>
            </>
        );
    }

    private exportTypeDropdownValue = (): ExportType => {
        if (Store.enableFileExport(this.props.store.state.platform)) {
            return this.state.exportType
        } else {
            return ExportType.text;
        }
    }

    private buttonOnClick = async () => {
        function newOutputText(state, exportOptions): OutputText {
            // If exportType is text:
            //      If last outputText.show was true, flip twice otherwise change once later
            // If exportType is a file, show is set to false once.
            if (exportOptions.exportType === ExportType.text) {
                if (exportOptions.outputText.show) {
                    return {show: !state.outputText.show, text: state.outputText.text};
                } else {
                    return {show: state.outputText.show, text: state.outputText.text};
                }
            } else {
                return {show: false, text: ''};
            }
        }

        // Copy values before async operation
        const exportOptions = {...this.state};

        // If export is disabled, displayed export type is always text regardless of state. That is
        // why the state is ignored here.
        if (!Store.enableFileExport(this.props.store.state.platform)) {
            exportOptions.exportType = ExportType.text;
        }

        this.setState(state => ({outputText: newOutputText(state, exportOptions)}));

        const csvStringAndName = await this.props.store.csvStringAndName(this.state);
        if (csvStringAndName === null) {
            return;
        }

        this.saveOrOutput(csvStringAndName, exportOptions);
    }

    private saveOrOutput(csvStringAndName: CsvStringAndName, exportOptions: State): void {
        switch (exportOptions.exportType) {
        case ExportType.file: {
            const options = {type: 'text/csv;charset=' + exportOptions.encoding};
            const blob = new Blob([csvStringAndName.string], options);
            FileSaver.saveAs(blob, csvStringAndName.name + '.csv');
            // state.outputText.show is already false
            return;
        }
        case ExportType.text: {
            this.setState(state => ({
                outputText: {show: !state.outputText.show, text: csvStringAndName.string},
            }));
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