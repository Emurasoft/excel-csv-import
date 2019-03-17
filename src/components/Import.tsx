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

type State = ImportOptions & {processing: boolean};

export class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
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
                <ProgressText hidden={!this.state.processing} />
                <Toggle
                    label='Save options' inlineLabel
                />
                <BottomBar />
            </div>
        );
        // TODO save options button
    }

    public setState<K extends keyof State>(state: Pick<State, K>): void {
        super.setState(state);
        // Need to add namespace to all entries
        for (const entry of Object.entries(state)) {
            localStorage.setItem(entry[0], JSON.stringify(entry[1]));
        }
    }

    private buttonOnClick = async () => {
        this.setState({processing: true});
        await this.props.store.import(this.state);
        this.setState({processing: false}); // TODO fix all setState race conditions
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