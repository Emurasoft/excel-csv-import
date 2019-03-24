import {Store} from '../Store';
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
import i18next from 'i18next';

interface Props {
    store: Store;
    t: i18next.TFunction;
}

export class ImportComponent extends StoredComponent<Props, ImportOptions> {
    public constructor(props: Props) {
        super(props, 'Import', {
            source: {inputType: InputType.file, file: null, text: ''},
            delimiter: '',
            newline: NewlineSequence.AutoDetect,
            encoding: '',
        }, ['delimiter', 'newline', 'encoding']);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.pageMargin}>
                {this.props.t('import.title')}
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
                    >
                        Import CSV
                    </PrimaryButton>
                </TooltipHost>
                <br />
                <ProgressBar
                    onClick={this.props.store.abort}
                    progress={this.props.store.state.progress}
                />
                <Toggle
                    inlineLabel label='Save options'
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
        if (this.state.source.inputType == InputType.file && this.state.source.file == null) {
            return 'Import source is not selected';
        } else if (this.state.delimiter.length > 1) {
            return 'Delimiter is invalid';
        } else if (!this.props.store.state.initialized) {
            return 'Excel API is not initialized';
        } else {
            return '';
        }
    }
}

export default withTranslation()(connect(ImportComponent));