import {StoreComponent} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {PrimaryButton, Toggle, TooltipDelay, TooltipHost} from 'office-ui-fabric-react';
import {ImportOptions, InputType, NewlineSequence} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {StoredComponent} from './StoredComponent';
import {withTranslation} from 'react-i18next';
import {TranslateFunction} from './BaseProps';

interface Props extends TranslateFunction {
    store: StoreComponent;
}

export class ImportComponent extends StoredComponent<Props & TranslateFunction, ImportOptions> {
    public constructor(props: Props) {
        super(props, 'import', {
            source: {inputType: InputType.file, file: null, text: ''},
            delimiter: '',
            newline: NewlineSequence.AutoDetect,
            encoding: '',
        }, ['delimiter', 'newline', 'encoding']);
    }

    public render(): React.ReactNode {
        const t = this.props.t;
        return (
            <div className={style.pageMargin}>
                <SourceInput
                    value={this.state.source}
                    onChange={(source) => this.setState({source})}
                />
                <br />
                <EncodingDropdown
                    value={this.state.encoding}
                    onChange={(encoding) => this.setState({encoding})}
                    hidden={this.state.source.inputType === InputType.text}
                    showAutoDetect={true}
                />
                <DelimiterInput
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                    showAutoDetect={true}
                    showLengthError={true}
                />
                <br />
                <NewlineDropdown
                    value={this.state.newline as NewlineSequence}
                    onChange={(newline) => this.setState({newline})}
                    showAutoDetect={true}
                />
                <br />
                <TooltipHost
                    styles={{root: {display: 'inline-block'}} /* Resize to fit button */}
                    content={this.buttonTooltipContent()}
                    delay={TooltipDelay.zero}
                >
                    <PrimaryButton
                        disabled={this.buttonTooltipContent() !== ''}
                        onClick={this.buttonOnClick}
                        text={t('Import.Import CSV')}
                    />
                </TooltipHost>
                <br />
                <ProgressBar
                    onClick={this.props.store.abort}
                    progress={this.props.store.state.progress}
                />
                <Toggle
                    inlineLabel label={t('Save options')}
                    defaultChecked={this.initialSaveStatus()}
                    onChange={(_, checked) => this.setSaveStatus(checked)}
                />
                <ParserOutputBox parserOutput={this.props.store.state.parserOutput} />
                <BottomBar />
            </div>
        );
    }

    private buttonOnClick = async () => {
        await this.props.store.import(this.state);
    }

    private buttonTooltipContent(): string {
        const t = this.props.t;
        if (this.state.source.inputType == InputType.file && this.state.source.file == null) {
            return t('Import.Import source is not selected');
        } else if (this.state.delimiter.length > 1) {
            return t('Import.Delimiter is invalid');
        } else if (!this.props.store.state.initialized) {
            return t('Excel API is not initialized');
        } else {
            return '';
        }
    }
}

export default withTranslation('importExport')(connect(ImportComponent));