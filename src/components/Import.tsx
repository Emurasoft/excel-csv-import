import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {PrimaryButton, TooltipDelay, TooltipHost} from 'office-ui-fabric-react';
import {ImportOptions, InputType, NewlineSequence} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';

export class ImportComponent extends React.Component<{store: Store}, ImportOptions> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            source: {inputType: InputType.file, file: null, text: ''},
            delimiter: '',
            newline: NewlineSequence.AutoDetect,
            encoding: '',
        };
    }

    public render() {
        return (
            <>
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
                        onClick={() => this.props.store.import(this.state)}
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
}

export const Import = connect(ImportComponent);