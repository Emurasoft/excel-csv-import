import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {PrimaryButton, Toggle, TooltipDelay, TooltipHost} from 'office-ui-fabric-react';
import {ImportOptions, InputType, NewlineSequence} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressText} from './ProgressText';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ErrorOutput} from './ErrorOutput';
import {StoredComponent} from './StoredComponent';

type State = ImportOptions & {processing: boolean};

export class ImportComponent extends StoredComponent<{store: Store}, State> {
    public constructor(props: {store: Store}) { // TODO check if initialization can be sped up
        super(props, 'Import', []);
        this.state = {
            source: {inputType: InputType.file, file: null, text: ''},
            delimiter: '',
            newline: NewlineSequence.AutoDetect,
            encoding: '',
            processing: false,
        };
    }

    public render(): React.ReactNode {
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
                <DelimiterDropdown
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
                <ProgressText hidden={!this.state.processing} onClick={this.props.store.abort} />
                <Toggle
                    label='Save options' inlineLabel
                />
                <ErrorOutput parserStatus={this.props.store.state.parserStatus} />
                <BottomBar />
            </div>
        );
    }

    private buttonOnClick = async () => {
        this.setState((state) => ({processing: !state.processing}));
        await this.props.store.import(this.state);
        this.setState((state) => ({processing: !state.processing}));
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

export const Import = connect(ImportComponent);