import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {PrimaryButton, TooltipDelay, TooltipHost} from 'office-ui-fabric-react';
import {ImportOptions, InputType, Source} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown, NewlineSequence} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';

interface State {
    source: Source;
    delimiter: string | null;
    newlineSequence: NewlineSequence;
    encoding: string;
}

export class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            source: {inputType: InputType.file, file: null, text: ''},
            delimiter: '',
            newlineSequence: NewlineSequence.AutoDetect,
            encoding: '',
        };
    }

    public render() {
        return (
            <>
                <DelimiterDropdown
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                />
                <br />
                <NewlineDropdown
                    value={this.state.newlineSequence}
                    onChange={(newlineSequence) => this.setState({newlineSequence})}
                />
                <br />
                <SourceInput
                    value={this.state.source}
                    onChange={(source) => this.setState({source})}
                />
                <br />
                <EncodingDropdown
                    value={this.state.encoding}
                    onChange={(encoding) => this.setState({encoding})}
                    hidden={this.state.source.inputType === InputType.text}
                />
                <br />
                <TooltipHost
                    styles={{root: {display: 'inline-block'}} /* Resize to fit button */}
                    content={this.buttonTooltipContent()}
                    delay={TooltipDelay.zero}
                >
                    <PrimaryButton
                        disabled={this.buttonTooltipContent() !== ''}
                        onClick={this.import}
                    >
                        Import CSV
                    </PrimaryButton>{/*TODO progress text*/}
                </TooltipHost>
            </>
        );
    }

    private buttonTooltipContent() {
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

    private import = () => {
        const options: ImportOptions = {
            source: this.state.source,
            delimiter: this.state.delimiter,
            newline: this.state.newlineSequence,
            encoding: this.state.encoding,
        }; // TODO inherit ImportOptions for state
        this.props.store.import(options);
    }
}

export const Import = connect(ImportComponent);