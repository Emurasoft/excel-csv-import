import {StoreComponent} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {
    CompoundButton,
    PrimaryButton,
    Text,
    TextField,
    Toggle,
    TooltipHost
} from 'office-ui-fabric-react';
import {CsvStringAndName, ExportOptions, NewlineSequence} from '../Parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {StoredComponent} from './StoredComponent';
import {TranslateFunction} from './BaseProps';
import {withTranslation} from 'react-i18next';
import {MenuBar} from './MenuBar';
import {MemoryHistory} from 'history';

export interface OutputText {
    // If show is false, do not show text.
    show: boolean;
    text: string;
}

interface Props extends TranslateFunction {
    store: StoreComponent;
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
        const t = this.props.t;
        const outputTextField = (
            <TextField
                label={t('Export result')}
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
                {t('Large file export is not supported')}
            </Text>
        );

        return (
            <>
                <MenuBar
                    hidden={navigator.platform !== 'iPad'}
                    onClick={(page) => this.props.history.push(page)}
                />
                <div className={style.pageMargin}>
                    <Text variant='xLarge'><strong>{t('Export CSV')}</strong></Text>
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
                            text={t('Export to CSV')}
                        />
                    </TooltipHost>
                    <br />
                    {this.props.store.state.largeFile ? largeFileWarning : null}
                    <ProgressBar
                        onClick={this.props.store.abort}
                        progress={this.props.store.state.progress}
                    />
                    <Toggle
                        inlineLabel label={t('Save options')}
                        defaultChecked={this.initialSaveStatus()}
                        onChange={(_, checked) => this.setSaveStatus(checked)}
                    />
                    {this.state.outputText.show ? outputTextField : null}
                    <ParserOutputBox parserOutput={this.props.store.state.parserOutput} />
                    <BottomBar />
                    <CompoundButton text="File test" onClick={this.onClick}/>
                </div>
            </>
        );
    }

    private onClick() {
        const blob = new Blob(["saved text"], {type: 'text/csv'});
        FileSaver.saveAs(blob, 'file.csv');
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
            return this.props.t('Excel API is not initialized');
        } else {
            return '';
        }
    }
}

export default withTranslation('importExport')(connect(ExportComponent));